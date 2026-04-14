import { format } from "date-fns";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
}

export default function DateHeading({ date }: Props) {
  return (
    <h2 className="font-bold text-base w-full text-left border-b border-zinc-500/30 my-3 p-2">
      {format(
        date,
        `MMM dd ${date.getFullYear() === new Date().getFullYear() ? "" : "yyyy"} ‧ EEEE`,
      )}
    </h2>
  );
}
