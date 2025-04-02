"use client";
import React from "react";
import Tasks from "../../../features/TaskManager/Components/Tasks/tasks";
import { useTaskStore } from "@/features/TaskManager/store/taskStore";

function page() {
  const tasks = useTaskStore((state) => state.tasks);
  const completedTasks = tasks.filter((task) => task.isComplete);
  return <Tasks title="Completed Tasks" tasks={completedTasks} />;
}

export default page;
