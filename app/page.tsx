"use client";

import Tasks from "./Components/Tasks/tasks";
import { GlobalProvider, useGlobalState } from "./context/globalProvider";
import Image from "next/image";

export default function Home() {
  const { tasks } = useGlobalState();
  return <Tasks title="All tasks" tasks={tasks} />;
}
