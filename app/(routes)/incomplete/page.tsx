"use client";
import React, { useEffect } from "react";
import Tasks from "@/features/TaskManager/Components/Tasks/tasks";
import { useTaskStore } from "@/features/TaskManager/store/taskStore";

function Page() {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const incompleteTasks = tasks.filter((task) => task.isComplete === false);

  return <Tasks title="Incomplete Tasks" tasks={incompleteTasks} />;
}

export default Page;
