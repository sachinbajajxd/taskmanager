import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/app/utils/connect";

export async function DELETE(req: Request, {params}:{params : {id: string}}){
    try{
        const {userId} = auth()
        const {id} = params
        if(!userId){
            return NextResponse.json({error: "Unauthorized", status: 500});
        }

        const task = await prisma.task.delete({
            where: {
                id,
            },
        });

        console.log(task, "task deleted");
        return NextResponse.json(task);
    } catch(error){
        console.log("Error deleting task", error);
        return NextResponse.json({error: "Error deleting task", status: 500});
    }
}

export async function PUT(req: Request, {params}:{params : {id: string}}){
    try{
        const {userId} = auth()
        const {id} = params
        if(!userId){
            return NextResponse.json({error: "Unauthorized", status: 500});
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


        const task = await prisma.task.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
            }
        });

        console.log(task, "task updated");
        return NextResponse.json(task);
    } catch(error){
        console.log("Error updating task", error);
        return NextResponse.json({error: "Error updating task", status: 500});
    }
}