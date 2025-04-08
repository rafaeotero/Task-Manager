"use client";

import { useEffect } from "react";
import Tasks from "../features/TaskManager/Components/Tasks/tasks";
import { useTaskStore } from "../features/TaskManager/store/taskStore";

export default function Home() {
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  return <Tasks title="All tasks" tasks={tasks} />;
}
