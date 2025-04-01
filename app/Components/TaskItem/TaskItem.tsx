"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/app/store/taskStore";
import formatDate from "@/app/utils/fomatDate";
import { edit, trash } from "@/app/utils/Icons";

interface Props {
  title: string;
  description: string;
  date: string;
  isComplete: boolean;
  id: string;
}

export default function TaskItem({
  title,
  description,
  date,
  isComplete,
  id,
}: Props) {
  const { deleteTask, updateTask, setSelectedTask, openModal } = useTaskStore();
  const formatedDate = formatDate(date);

  return (
    <Card className="w-full shadow-md border border-gray-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
        <p className="text-sm text-gray-400 mt-2">{formatedDate}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          className={`${isComplete ? "bg-green-500" : "bg-red-500"} text-white`}
          onClick={() => updateTask({ id, isComplete: !isComplete })}
        >
          {isComplete ? "Completed" : "Incomplete"}
        </Button>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedTask({
                id,
                title,
                description,
                date,
                isComplete,
                isImportant: false,
              });
              openModal();
            }}
          >
            {edit}
          </Button>
          <Button variant="ghost" onClick={() => deleteTask(id)}>
            {trash}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
