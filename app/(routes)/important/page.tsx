"use client";
import React from "react";
import Tasks from "../../../features/TaskManager/Components/Tasks/tasks";
import { useTaskStore } from "@/features/TaskManager/store/taskStore";

function page() {
  const tasks = useTaskStore((state) => state.tasks);
  const importantTasks = tasks.filter((task) => task.isImportant);

  return <Tasks title="Important Tasks" tasks={importantTasks} />;
}

export default page;
