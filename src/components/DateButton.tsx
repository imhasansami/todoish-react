import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function DateButton({
  selectedDate,
  btnText = "Select Date",
  initDate
}: {
  selectedDate?: (date: Date | undefined) => void;
  btnText?: string;
  initDate?: Date;
}) {
  const [selected, setSelected] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (initDate) {
      setSelected(initDate);
    }
  }, [initDate]);

  return (
    <>
      <button
        onClick={() => setShowCalendar((prev) => !prev)}
        className="border border-gray-300 px-6 py-1 rounded-lg text-[14px] cursor-pointer hover:bg-gray-100 transition-all duration-300"
      >
        {selected ? format(selected, "PP") : btnText}
      </button>

      {showCalendar && (
        <>
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setShowCalendar(false)}
          />

          <div className="absolute z-50 mt-2 p-3 bg-white border border-slate-200 rounded-2xl shadow-[0px_2px_27px_0px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-200">
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
    </>
  );
}
