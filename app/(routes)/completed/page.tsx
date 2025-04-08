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

  const completedTasks = tasks.filter((task) => task.isComplete);

  return <Tasks title="Completed Tasks" tasks={completedTasks} />;
}

export default Page;
