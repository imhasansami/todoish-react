import { format } from "date-fns";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
}

export default function DateHeading({ date, ...props }: Props) {
  return (
    <h2 className="text-base w-full text-left">
      {format(
        date,
        `MMM dd ${date.getFullYear() === new Date().getFullYear() ? "" : "yyyy"} ‧ EEEE`,
      )}
    </h2>
  );
}
