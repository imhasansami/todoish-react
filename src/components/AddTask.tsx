import { useEffect, useState } from "react";
import { type Task } from "../assets/data";
import "react-day-picker/dist/style.css";
import DateButton from "./DateButton";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onCancelClick?: () => void;
  onAddTask?: (event: Task) => void;
}

export default function AddTask({ onCancelClick, onAddTask, ...props }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [reset, setReset] = useState(false);

  function handleAddTask() {
    if (!title) return;
    onAddTask?.({
      title,
      description,
      date: selectedDate || new Date(),
      isDone: false,
    });
    setReset(true);
  }

  useEffect(() => {
    setTitle("");
    setDescription("");
    setSelectedDate(new Date());
    setReset(false);
  }, [reset]);

  return (
    <div
    {...props}
    className={`w-full border border-gray-200 rounded-xl p-4 flex flex-col gap-2 bg-white @container ${props.className || ""}`}
    >
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="outline-none font-bold"
      />
      <input
        type="text"
        name="description"
        id="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="outline-none text-sm"
      />
      <div className="flex justify-between mt-3 @lg:flex-row flex-col gap-2">
        <div className="flex gap-2">
          <DateButton
            initDate={selectedDate}
            selectedDate={(date: Date | undefined) => {
              setSelectedDate(date ?? new Date());
            }}
          />
          <button className="border border-gray-300 px-6 py-1 rounded-lg text-[14px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            Attachment
          </button>
        </div>
        <div className="flex gap-2 align-center justify-end">
          <button
            className="border border-gray-300 px-6 py-1 rounded-lg bg-gray-100 text-[14px] cursor-pointer hover:bg-gray-200 transition-all duration-300"
            onClick={onCancelClick}
          >
            Cancel
          </button>
          <button
            className="transition-all duration-300 border-0 px-6 py-1 rounded-lg bg-purple-400 text-white text-[14px] cursor-pointer hover:bg-purple-500"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
