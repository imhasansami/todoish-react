import { Plus } from "lucide-react";

export default function AddTaskBtn(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className="w-full p-2 flex flex-row items-center gap-2 rounded-md cursor-pointer hover:text-purple-700 transition-all duration-300 select-none">
      <Plus strokeWidth={1.5} />
      <span className="text-sm">Add Task</span>
    </div>
  );
}
