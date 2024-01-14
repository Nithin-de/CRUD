import { connectMongodDB } from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server"

export async function POST(request){
    const {title,description} = await request.json();
    await connectMongodDB();
    await Topic.create({title,description})
    return NextResponse.json({message: "Topic Created"},{status: 201})
}

export async function GET(){
    await connectMongodDB();
    const topic = await Topic.find();
    return NextResponse.json({topic})
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get('id')
    await connectMongodDB();
    await Topic.findByIdAndDelete(id)
    return NextResponse.json({message: "Topic deleted"},{status: 200})
}