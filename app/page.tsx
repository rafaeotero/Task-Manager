"use client";

import Tasks from "./Components/Tasks/tasks";
import { useTaskStore } from "./store/taskStore";

export default function Home() {
  const { tasks } = useTaskStore();
  return <Tasks title="All tasks" tasks={tasks} />;
}
