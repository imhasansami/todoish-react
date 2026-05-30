import { useEffect, useState } from "react";
import { type Task } from "../assets/data";
import "react-day-picker/dist/style.css";
import DateButton from "./DateButton";
import { startOfDay } from "date-fns";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onCancelClick?: () => void;
  onAddTask?: (event: Task) => void;
}

export default function AddTask({ onCancelClick, onAddTask, ...props }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(),
  );
  const [reset, setReset] = useState(false);
  let isTitleEmpty = title.trim().length === 0;

  function handleAddTask() {
    if (isTitleEmpty) return;
    onAddTask?.({
      title,
      description,
      date: startOfDay(selectedDate || new Date()),
      isDone: false,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      checkedAt: undefined,
      uncheckedAt: undefined,
    });
    setReset(true);
  }

  useEffect(() => {
    setTitle("");
    setDescription("");
    setSelectedDate(new Date());
    setReset(false);
  }, [reset]);

  function handleKeypress(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") {
      handleAddTask();
    }
  }

  return (
    <div
      {...props}
      onKeyUp={handleKeypress}
      className={`w-full border bg-[#0f0f0f] text-zinc-200 border-zinc-600 rounded-xl p-4 flex flex-col gap-2  @container ${props.className || ""}`}
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
        placeholder="Description (optional)"
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
          <button className="border border-white/30 px-6 py-1 rounded-lg text-[14px] cursor-pointer hover:bg-zinc-500/20 transition-all duration-300">
            Attachment
          </button>
        </div>
        <div className="flex gap-2 align-center justify-end">
          <button
            className="border border-white/30 px-6 py-1 rounded-lg bg-zinc-800 text-[14px] cursor-pointer hover:bg-zinc-300/20 transition-all duration-300"
            onClick={onCancelClick}
          >
            Cancel
          </button>
          <button
            className={`${isTitleEmpty ? "bg-[#581c6e] cursor-not-allowed" : "bg-purple-500/90 cursor-pointer hover:bg-purple-500"} transition-all duration-300 border-0 px-6 py-1 rounded-lg  text-white text-[14px]`}
            onClick={handleAddTask}
            disabled={isTitleEmpty}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
