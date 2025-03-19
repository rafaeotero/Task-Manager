import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/app/utils/connect";

export async function DELETE(req: Request, {params}: {params: {id: string}}) {
    try {
        const{userId} = await auth();
        const {id} = params;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401});
        }

        const task = await prisma.task.delete({
            where: {
                id,
            },
        });

        console.log("TASK DELETED: ", task)
        return NextResponse.json(task);
    }catch(error){
        console.log("ERROR DELETING A TASK: ", error);
        return NextResponse.json({ error: "Error deleting a task", statuts: 500});
    }
}