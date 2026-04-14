import * as Icons from "lucide-react";
import Tabs from "./Tabs";
import { TABS_DATA } from "../assets/data.ts";
import { useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onItemClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  sidebarToggle: () => void;
}

export default function SideBar({
  onItemClick,
  sidebarToggle,
  ...props
}: Props) {
  const [selectedItem, setSelectedItem] = useState("Inbox");

  function btnClick(e: React.MouseEvent<HTMLDivElement>) {
    setSelectedItem(e.currentTarget.textContent || "");
    onItemClick?.(e);
  }

return (
  <div
    {...props}
    className={`shrink-0 overflow-hidden w-64 h-full transition-all duration-300 ${props.className ?? ""}`}
  >
    <div className="flex flex-col items-center gap-4 p-4 bg-[#151515] text-gray-200 h-full w-64">
      <div className="flex items-center gap-2 w-full justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Icons.CircleUserRound strokeWidth={1} />
          <span>Hasan</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <Icons.Bell size={20} strokeWidth={1.5} />
          <Icons.PanelLeft
            size={20}
            strokeWidth={1.5}
            onClick={sidebarToggle}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="p-0 flex flex-col gap-1 m-0 w-full">
        {TABS_DATA.map((tab) => {
          const IconComponent = (Icons as any)[tab.icon];
          return (
            <Tabs
              key={tab.title}
              componentTitle={tab.title}
              icon={IconComponent}
              currentSelected={selectedItem}
              onClick={btnClick}
              {...(tab.title == "Add Task" && {
                icoColor: "text-purple-300",
                fontWeight: "font-semibold",
              })}
            />
          );
        })}
      </div>
    </div>
  </div>
);
}
