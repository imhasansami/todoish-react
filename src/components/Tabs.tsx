import { type LucideIcon } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon: LucideIcon;
  currentSelected: string;
  icoColor?: string;
  fontWeight?: string;
}

export default function Tabs({
  title,
  icon: Icon,
  icoColor,
  currentSelected,
  fontWeight,
  ...props
}: Props) {
  const isSelected = currentSelected == title;

  return (
    <div
      {...props}
      className={`flex text-sm text-left text-black m-0 border-0 rounded-md p-2 w-full hover:cursor-pointer select-none gap-2 items-center transition-all duration-200 ${isSelected ? "bg-purple-300 text-purple-900" : "hover:bg-[#f3e1ff]"}`}
    >
      <Icon size={18} strokeWidth={1.5} className={icoColor} />
      <span className={fontWeight}>{title}</span>
    </div>
  );
}
