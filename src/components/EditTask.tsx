import { type Task } from "../assets/data.ts";
import { X } from "lucide-react";
import DateButton from "./DateButton.tsx";
import { format } from "date-fns/format";
import { useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  currTask: Task;
  close: () => void;
  onUpdateTask?: (updatedTask: Task) => void;
  onDeleteTask?: (taskToDelete: Task) => void;
}

export default function EditTask({
  currTask,
  close,
  onUpdateTask,
  onDeleteTask,
  ...props
}: Props) {
  const [title, setTitle] = useState(currTask.title);
  const [description, setDescription] = useState(currTask.description);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    currTask.date ? new Date(currTask.date) : undefined,
  );

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  function handleSave() {
    if (title.trim() === "") return;
    const updatedTask: Task = {
      ...currTask,
      title,
      description,
      date: selectedDate ? selectedDate : currTask.date,
    };
    onUpdateTask?.(updatedTask);
  }

  function handleDelete() {
    onDeleteTask?.(currTask);
  }

  return (
    <div
      {...props}
      className="absolute top-0 left-0 w-full h-full bg-black/50 z-10 flex items-center justify-center"
      onClick={close}
    >
      <div className="flex flex-col bg-[#1c1c1c] rounded-lg p-4 w-120 h-96 m-5" onClick={(e) => e.stopPropagation()}>
        <div
          id="topbar"
          className="flex flex-row items-center justify-between p-2"
        >
          <h2 className="font-semibold text-xl">Edit Task</h2>
          <X
            className="cursor-pointer text-gray-200 hover:text-white transition-all ease-in-out duration-500"
            onClick={close}
          />
        </div>
        <div className="flex flex-col gap-4 p-4">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Edit Title"
            className="outline-none font-bold py-1 px-2 border border-gray-500/30 rounded-md"
            value={title}
            onChange={handleTitleChange}
          />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Edit Description"
            className="outline-none py-1 px-2 border border-gray-500/30 rounded-md"
            value={description}
            onChange={handleDescriptionChange}
          />
          <DateButton
            selectedDate={(date: Date | undefined) => {
              setSelectedDate(date ?? new Date(currTask.date));
            }}
            btnText={currTask?.date && format(new Date(currTask.date), "PPP")}
          />
          <button
            onClick={handleSave}
            className="cursor-pointer bg-purple-500 text-white px-4 py-1.5 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Save
          </button>
          <button onClick={handleDelete} className="cursor-pointer bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
