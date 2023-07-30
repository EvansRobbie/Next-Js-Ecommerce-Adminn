import Category from "@/models/Categories"
import { connect } from "@/utils/moongose"
import { NextResponse } from "next/server"

export const POST = async (req:Request) =>{
    const {category, parentCategory} = await req.json()
    try{
        await connect()
        const categories = await Category.create({category, parentCategory})
        return NextResponse.json(categories, {status:201})
    }catch(e){
        console.log(e)
        return new NextResponse('Database Error', {status:500})
    }
}

export const GET = async () =>{
    try{
        await connect()
        const categories = await Category.find().populate("parentCategory")
        return NextResponse.json(categories, {status:200})
    }catch(e){
        console.log(e)
        return new NextResponse('Database Error', {status:500})
    }
}

export const PUT = async (req:Request) =>{
    const {_id, category, parentCategory} = await req.json()
    console.log(_id)
    try{
        await connect()
        const categories = await Category.updateOne({_id}, {category, parentCategory})
        return NextResponse.json(categories, {status:201})
    }catch(e){
        console.log(e)
        return new NextResponse('Database Error', {status:500})
    }
}