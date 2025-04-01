import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";


export async function POST(req:Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        

        const {title, description, date, completed, important} = await req.json();

        if (!title || !description || !date) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }

        if (title.length < 1) {
            return NextResponse.json({
                error: "Please insert a title", 
                status: 400,
            });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                date, 
                isComplete: completed, 
                isImportant: important,
                userId,
            },
        });

        return NextResponse.json(task)

    }catch(error) {
        console.log("ERROR CREATING TASK: ", error);
        return NextResponse.json({error: "Error creating a task", status: 500});
    }
}

export async function GET(req:Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({error: "Unauthorized", status: 401});
        }
        const tasks = await prisma.task.findMany({
            where: {
                userId,
            },
        });
        console.log("TASKS: ", tasks);
        return NextResponse.json(tasks);

    }catch(error) {
        console.log("ERROR GETTING TASK: ", error);
        return NextResponse.json({error: "Error getting a task", status: 500});
    }
}

export async function PUT(req: Request) {
    try {
        const { userId } = await auth();
        const { id, title, description, date, isComplete, isImportant } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const task = await prisma.task.update({
            where: { id },
            data: {
                title,
                description,
                date,
                isComplete,
                isImportant,
            },
        });

        return NextResponse.json(task);
    } catch (error) {
        console.log("ERROR UPDATING TASK: ", error);
        return NextResponse.json({ error: "Error updating a task", status: 500 });
    }
}


