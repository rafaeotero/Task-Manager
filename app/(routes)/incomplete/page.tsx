"use client";
import React from "react";
import Tasks from "../../../features/TaskManager/Components/Tasks/tasks";
import { useTaskStore } from "@/features/TaskManager/store/taskStore";

function page() {
  const tasks = useTaskStore((state) => state.tasks);
  const incompleteTasks = tasks.filter((task) => task.isComplete);
  return <Tasks title="Incomplete Tasks" tasks={incompleteTasks} />;
}

export default page;
