import SideBar from "./components/SideBar.tsx";
// import MainContent from "./components/MainContent.tsx";
import Inbox from "./components/Inbox.tsx";
import Today from "./components/Today.tsx";
import Upcoming from "./components/Upcoming.tsx";
import Completed from "./components/Completed.tsx";
import React, { useEffect, useState } from "react";
import { type Task } from "./assets/data.ts";
import EditTask from "./components/EditTask.tsx";
import AddTask from "./components/AddTask.tsx";

function App() {
  const [currTask, setCurrTask] = useState<Task>({
    title: "",
    description: "",
    date: new Date(),
    isDone: false,
    id: "",
    createdAt: 0,
    checkedAt: 0,
    uncheckedAt: 0,
  });
  const [tasksList, setTasksList] = useState<Task[]>(() => {
    const savedTasks = window.localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          date: new Date(task.date),
        }))
      : [];
  });
  const [mainContent, setMainContent] = useState("Inbox");
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarMounted, setSidebarMounted] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setSidebarVisible(false);
      } else {
        setSidebarMounted(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setSidebarVisible(true));
        });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasksList));
  }, [tasksList]);

  function handleTaskClick(taskIndex: number) {
    setCurrTask(tasksList[taskIndex]);
    setIsEditingTask(true);
  }

  function handleCloseEdit() {
    setIsEditingTask(false);
  }

  function handleAddTask(newTask: Task) {
    let { title, description, date, id, createdAt, checkedAt, uncheckedAt: unCheckedAt } =
      newTask;
    setTasksList((prev) => [
      ...prev,
      {
        title,
        description,
        date,
        isDone: false,
        id,
        createdAt,
        checkedAt,
        uncheckedAt: unCheckedAt,
      },
    ]);
  }

  function hideSidebar() {
    if (sidebarVisible) {
      setSidebarVisible(false);
    } else {
      setSidebarMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setSidebarVisible(true));
      });
    }
  }

  function handleSidebarTransitionEnd() {
    if (!sidebarVisible) setSidebarMounted(false);
  }

  function handleItemClick(e: React.MouseEvent<HTMLDivElement>) {
    const text = e.currentTarget.innerText;
    if (text == "Add Task") {
      setIsAddingTask(true);
    } else setMainContent(text);
  }

  function handleUpdateTask(updatedTask: Task) {
    updateTask(updatedTask);
    setCurrTask(updatedTask);
    setIsEditingTask(false);
  }

  function handleDeleteTask() {
    setTasksList((prev) => prev.filter((task) => task.id !== currTask.id));
    setIsEditingTask(false);
  }

  function updateTask(updatedTask: Task) {
    setTasksList((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  }

  function renderMainContent() {
    switch (mainContent) {
      case "Inbox":
        return (
          <Inbox
            sidebarToggle={hideSidebar}
            isSidebarVisible={sidebarVisible}
            onAddTask={(newTask) => handleAddTask(newTask)}
            handleTaskClick={handleTaskClick}
            tasksList={tasksList}
            onCheck={(task) =>
              updateTask({
                ...task,
                checkedAt: task.isDone ? Date.now() : undefined,
                uncheckedAt: !task.isDone ? Date.now() : undefined,
              })
            }
          />
        );
      case "Today":
        return <Today />;
      case "Upcoming":
        return <Upcoming />;
      case "Completed":
        return <Completed />;
      default:
        break;
    }
  }

  return (
    <div className="flex flex-row h-screen font-sans">
      {sidebarMounted && (
        <SideBar
          onItemClick={handleItemClick}
          sidebarToggle={hideSidebar}
          onTransitionEnd={handleSidebarTransitionEnd}
          className={
            sidebarVisible
              ? "opacity-100"
              : "opacity-0 w-0! -translate-x-10 p-0! m-0!"
          }
        />
      )}
      {isAddingTask && (
        <div className="fixed flex bg-black/50 z-100 top-0 h-screen w-screen items-center justify-center">
          <AddTask
            className="m-4 shadow-[0px_2px_27px_0px_rgba(0,0,0,0.3)] max-w-180"
            onCancelClick={() => setIsAddingTask(false)}
            onAddTask={(newTask) => {
              handleAddTask(newTask);
              setIsAddingTask(false);
            }}
          />
        </div>
      )}
      {isEditingTask && (
        <EditTask
          onDeleteTask={handleDeleteTask}
          currTask={currTask}
          close={handleCloseEdit}
          onUpdateTask={handleUpdateTask}
        />
      )}
      {renderMainContent()}
    </div>
  );
}

export default App;
