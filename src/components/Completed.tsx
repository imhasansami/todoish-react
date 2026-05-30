import MainTemplate from "./MainTemplate";
import DateHeading from "./DateHeading";
import { type Task as TaskType } from "../assets/data";
import Task from "./Task";
import { Fragment } from "react/jsx-runtime";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  sidebarToggle: () => void;
  isSidebarVisible: boolean;
  tasksList: TaskType[];
  handleTaskClick: (id: string) => void;
}

export default function Completed({
  sidebarToggle,
  isSidebarVisible,
  tasksList,
  handleTaskClick,
  ...props
}: Props) {
  let tasksDone = tasksList.filter((e) => e.isDone);
  let mapOfTasksDone = new Map();

  tasksDone.map((e) => {
    const key = e.date.getTime();
    if (!mapOfTasksDone.has(key)) mapOfTasksDone.set(key, [e]);
    else mapOfTasksDone.get(key).push(e);
  });

  return (
    <MainTemplate
      {...props}
      componentTitle="Completed"
      isSidebarVisible={isSidebarVisible}
      sidebarToggle={sidebarToggle}
    >
      {tasksDone.length === 0 && (
        <p className="w-full mt-4">No Completed Tasks</p>
      )}
      
      {[...mapOfTasksDone]
        .sort((a, b) => a[0] - b[0])
        .map(([key, val]) => (
          <Fragment key={key}>
            <DateHeading date={new Date(key)} />
            <div className="w-full">
              {val.map((e: TaskType) => (
                <Task
                  isStrikethrough={false}
                  key={e.id}
                  task={e}
                  handleTaskClick={handleTaskClick}
                />
              ))}
            </div>
          </Fragment>
        ))}
    </MainTemplate>
  );
}
