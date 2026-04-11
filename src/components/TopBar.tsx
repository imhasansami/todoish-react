import { PanelLeft } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  sidebarToggle?: () => void;
  isSidebarVisible?: boolean;
}

export default function TopBar({
  sidebarToggle,
  isSidebarVisible,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className="w-full p-4 flex flex-row items-center justify-between h-auto"
    >
      <PanelLeft
        size={24}
        strokeWidth={1.5}
        onClick={sidebarToggle}
        className={`cursor-pointer transition-all duration-300 ${isSidebarVisible ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
}
