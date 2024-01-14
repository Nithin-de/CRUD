
import { connectMongodDB } from "@/libs/mongodb";
import Topic from "@/models/topic"
import { NextResponse } from "next/server"

export async function GET(request,{params}){
    const {id} = params;
    await connectMongodDB();
    const topic = await Topic.findOne({_id: id})
    return NextResponse.json({topic},{status: 200})
}

export async function PUT(request,{params}){
    const { id } = params;
    const { newTitle: title, newDescription: description } = await request.json();
    await connectMongodDB();
    await Topic.findByIdAndUpdate(id,{title,description});
    return NextResponse.json({message: "Topic updated"},{status: 200});
}