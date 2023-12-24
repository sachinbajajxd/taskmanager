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