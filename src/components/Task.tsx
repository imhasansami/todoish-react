import { Circle, CircleCheckBig, PencilLine } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import type { Task } from "../assets/data";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  task: Task;
}

export default function Task({ task, ...props }: Props) {
  const [isDone, setIsDone] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      {...props}
      className="flex items-center justify-between border-b border-gray-200 p-2 w-full hover:bg-gray-100 rounded-md transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex items-center justify-center"
          onClick={(e) => {
            setIsDone((prev) => !prev);
            e.stopPropagation();
          }}
        >
          {isDone ? (
            <CircleCheckBig
              size={20}
              strokeWidth={1.5}
              className="hover:cursor-pointer"
            />
          ) : (
            <Circle
              size={20}
              strokeWidth={1.5}
              className="hover:cursor-pointer"
            />
          )}
        </div>
        <p className="m-0">{task.title}</p>
      </div>
      <div className={`flex items-center gap-4 transition-all duration-300 ${isHovered ? "-translate-x-4" : "translate-x-0"}`}>
        <span>
          {typeof task.date === "string"
            ? task.date
            : format(new Date(task.date), "PP")}
        </span>
        <PencilLine strokeWidth={1} size={18} className={`opacity-0 transition-all duration-300 ${isHovered && "opacity-100"}`}/>
      </div>
    </div>
  );
}
