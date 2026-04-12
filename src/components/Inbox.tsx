import Task from "./Task";
import AddTask from "./AddTask";
import AddTaskBtn from "./AddTaskBtn";
import TopBar from "./TopBar";
import { useState } from "react";
import { type Task as TaskType } from "../assets/data";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  sidebarToggle?: () => void;
  isSidebarVisible?: boolean;
  onAddTask: (event: TaskType) => void;
  handleTaskClick?: (index: number) => void;
  tasksList: TaskType[];
  onCheck: (task: TaskType) => void;
}

export default function Inbox({
  sidebarToggle,
  isSidebarVisible,
  onAddTask,
  handleTaskClick,
  tasksList,
  onCheck,
  ...props
}: Props) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  return (
    <div
      {...props}
      className="flex flex-col w-full h-full items-center gap-2 flex-1"
    >
      <TopBar
        sidebarToggle={sidebarToggle}
        isSidebarVisible={isSidebarVisible}
      ></TopBar>
      <div className="flex flex-col w-[80%] h-full items-center p-2 gap-2 min-w-75">
        <h2 className="text-[40px] font-black m-0 w-full">Inbox</h2>
        <div className="w-full">
          {tasksList.filter((e) => !e.isDone).length === 0 ? (
            <p className="text-gray-500">No tasks</p>
          ) : (
            tasksList
              .filter((task) => !task.isDone)
              .sort((a, b) => {
                if (a.uncheckedAt && b.uncheckedAt)
                  return a.uncheckedAt - b.uncheckedAt;
                if (a.uncheckedAt) return 1; // a goes to bottom
                if (b.uncheckedAt) return -1; // b goes to bottom
                return a.createdAt - b.createdAt; // both never unchecked, sort by add order
              })
              .map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onCheck={onCheck}
                  onClick={() => handleTaskClick?.(tasksList.indexOf(task))}
                />
              ))
          )}
        </div>

        {isAddingTask ? (
          <AddTask
            onAddTask={(event) => onAddTask(event)}
            onCancelClick={() => setIsAddingTask(false)}
          />
        ) : (
          <AddTaskBtn onClick={() => setIsAddingTask(true)} />
        )}
        {tasksList
          .filter((task) => task.isDone)
          .sort((a, b) => (b.checkedAt ?? 0) - (a.checkedAt ?? 0))
          .map((task) => (
            <Task
              key={task.id}
              task={task}
              onCheck={onCheck}
              onClick={() => handleTaskClick?.(tasksList.indexOf(task))}
            />
          ))}
      </div>
    </div>
  );
}
