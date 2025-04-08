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

  const importantTasks = tasks.filter((task) => task.isImportant);

  return <Tasks title="Important Tasks" tasks={importantTasks} />;
}

export default Page;
