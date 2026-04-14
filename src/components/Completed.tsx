import MainTemplate from "./MainTemplate";
import DateHeading from "./DateHeading";
import { type Task as TaskType } from "../assets/data";
import { startOfDay } from "date-fns";
import Task from "./Task";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  sidebarToggle: () => void;
  isSidebarVisible: boolean;
  tasksList: TaskType[];
}

export default function Completed({
  sidebarToggle,
  isSidebarVisible,
  tasksList,
  ...props
}: Props) {
  let tasksDone = tasksList.filter((e) => e.isDone);
  let timeList = tasksList.map((e) => e.date.getTime());
  let seen = new Set<number>();
  let lastDateTaskIndex = tasksList.findIndex(
    (t) => t.date.getTime() === Math.max(...timeList),
  );

  return (
    <MainTemplate
      {...props}
      componentTitle="Completed"
      isSidebarVisible={isSidebarVisible}
      sidebarToggle={sidebarToggle}
    >
      {tasksDone
        .reduce((acc, c) => {
          const key = startOfDay(c.date).getTime();
          if (!seen.has(key)) {
            seen.add(key);
            acc.push(c.date);
          }
          return acc;
        }, [] as Date[])
        .sort((a, b) => a.getTime() - b.getTime()) //accending order sort 
        .map((c) => (
          <>
            <DateHeading key={c.getTime()} date={c} />
            <Task task={tasksList[1]}/>
          </>
        ))}
    </MainTemplate>
  );
}
