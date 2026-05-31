import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";

export default function DateButton({
  selectedDate,
  btnText = "Select Date",
  initDate,
}: {
  selectedDate?: (date: Date | undefined) => void;
  btnText?: string;
  initDate?: Date;
}) {
  const [selected, setSelected] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initDate) {
      setSelected(initDate);
    }
  }, [initDate]);

  function toggleCalendar() {
    if (!showCalendar && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUpwards(spaceBelow < 350);
    }
    setShowCalendar((prev) => !prev);
  }

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        onClick={toggleCalendar}
        className="border border-white/30 px-6 py-1 rounded-lg text-[14px] cursor-pointer hover:bg-zinc-500/20 transition-all duration-300"
      >
        {selected ? format(selected, "PP") : btnText}
      </button>

      {showCalendar && (
        <>
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setShowCalendar(false)}
          />

          <div
            className={`absolute z-50 p-3 bg-[#0f0f0f] border border-white/20 rounded-2xl shadow-[0px_2px_27px_0px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-200 ${openUpwards ? "bottom-full mb-2" : "top-full mt-2"}`}
          >
            {" "}
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(date) => {
                setSelected(date);
                selectedDate?.(date);
                setShowCalendar(false);
              }}
              disabled={{ before: new Date() }}
            />
          </div>
        </>
      )}
    </div>
  );
}
