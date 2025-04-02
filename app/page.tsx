"use client";

import Tasks from "../features/TaskManager/Components/Tasks/tasks";
import { useTaskStore } from "../features/TaskManager/store/taskStore";

export default function Home() {
  const { tasks } = useTaskStore();
  return <Tasks title="All tasks" tasks={tasks} />;
}
