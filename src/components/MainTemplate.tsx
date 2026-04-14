import TopBar from "./TopBar";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  sidebarToggle: (() => void) | undefined;
  isSidebarVisible: boolean | undefined;
  componentTitle: string;
}

export default function MainTemplate({
  children,
  sidebarToggle,
  isSidebarVisible,
  componentTitle,
  ...props
}: Props) {
  return (
    <div {...props} className={`flex flex-col w-full h-full items-center gap-2 flex-1 bg-[#0F0F0F] text-gray-200 ${props.className}`}>
      <TopBar
        sidebarToggle={sidebarToggle}
        isSidebarVisible={isSidebarVisible}
      ></TopBar>
      <div className="flex flex-col w-[80%] h-full items-center p-2 gap-2 min-w-75">
        <h2 className="text-[40px] font-black m-0 w-full">{componentTitle}</h2>
        {children}
      </div>
    </div>
  );
}
