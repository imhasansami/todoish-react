export const TABS_DATA = [
  {
    icon: "CirclePlus",
    title: "Add Task",
  },
  {
    icon: "Inbox",
    title: "Inbox",
  },
  {
    icon: "Calendar",
    title: "Today",
  },
  {
    icon: "CalendarDays",
    title: "Upcoming",
  },
  {
    icon: "CircleCheckBig",
    title: "Completed",
  },
];

export interface Task {
  title: string;
  description: string;
  date: Date | string;
  isDone: boolean;
}