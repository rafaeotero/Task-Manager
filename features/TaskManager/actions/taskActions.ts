"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/app/utils/connect";
import { revalidatePath } from "next/cache";

export async function getAllTasks() {
  const { userId } = await auth();
  if (!userId) return [];

  return await prisma.task.findMany({ where: { userId } });
}

export async function createTask({
  title,
  description,
  date,
  isComplete,
  isImportant,
}: {
  title: string;
  description: string | null;
  date: string;
  isComplete?: boolean;
  isImportant?: boolean;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.task.create({
    data: {
      title,
      description,
      date,
      isComplete: isComplete ?? false,
      isImportant: isImportant ?? false,
      userId,
    },
  });

  revalidatePath("/"); // Atualiza a página após alteração
}

export async function updateTask({
  id,
  title,
  description,
  date,
  isComplete,
  isImportant,
}: {
  id: string;
  title?: string;
  description?: string | null;
  date?: string;
  isComplete?: boolean;
  isImportant?: boolean;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.task.update({
    where: { id },
    data: {
      title,
      description,
      date,
      isComplete,
      isImportant,
    },
  });

  revalidatePath("/");
}

export async function deleteTask(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.task.delete({ where: { id } });

  revalidatePath("/");
}
