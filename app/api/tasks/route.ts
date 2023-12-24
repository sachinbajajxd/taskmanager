import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/app/utils/connect";

export async function POST(req: Request) {
    try{

        const {userId} = auth();

        if(!userId){
            return NextResponse.json({error: "Unauthorized", status: 401});
        }

        const {title, description, date, completed, important} = await req.json();

        if(!title || !description || !date) {
            return NextResponse.json({error: "Missing required fields", status: 400});
        }

        if(title.length<3){
            return NextResponse.json({
                error: "title must be atleast 3 characters long",
                status: 400
            })
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
                userId
            }
        });

        console.log(task, "TASK CREATED SUCCESSFULLY")

        return NextResponse.json(task)
        
    } catch(error){
        console.log("error creating task", error);
        return NextResponse.json({error: "Error creating task", status: 500})
    }
}

export async function GET(req: Request) {
    try{

        const {userId} = auth()

        if(!userId){
            return NextResponse.json({error: "Unauthorized", status: 401});
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId,
            }
        })

        console.log(tasks);

        return NextResponse.json(tasks);

    } catch(error){
        console.log("error getting task", error);
        return NextResponse.json({error: "Error getting task", status: 500})
    }
}

export async function PUT(req: Request) {
    try{
        const {userId} = auth()
        const {isCompleted, id} = await req.json();

        if(!userId){
            return NextResponse.json({error: "Unauthorized", status: 401});
        }

        const task = await prisma.task.update({
            where: {
                id,
            },
            data: {
                isCompleted,
            },
        });

        return NextResponse.json({error: "Error updating task"})

    } catch(error){
        console.log("error updating task", error);
        return NextResponse.json({error: "Error updating task", status: 500})
    }
}
