import Category from "@/models/Categories"
import { connect } from "@/utils/moongose"
import { NextResponse } from "next/server"
import { isAdminRequest } from "../auth/[...nextauth]/route"

export const POST = async (req:Request) =>{
    const {category, parentCategory, properties} = await req.json()
    try{
        await connect()
        await isAdminRequest()
        const categories = await Category.create({category, parentCategory, properties})
        return NextResponse.json(categories, {status:201})
    }catch(e){
        console.log(e)
        return new NextResponse('Database Error', {status:500})
    }
}

export const GET = async (req:Request, res:Response) =>{
   
    try{
        await connect()
        await isAdminRequest()
        const categories = await Category.find().populate("parentCategory")
        return NextResponse.json(categories, {status:200})
    }catch(e){
        console.log(e)
        return new NextResponse('Database Error', {status:500})
    }
}

export const PUT = async (req:Request) =>{
    const {_id, category, parentCategory, properties} = await req.json()
    // console.log(_id)
    try{
        await connect()
        const categories = await Category.updateOne({_id}, {category, parentCategory, properties})
        return NextResponse.json(categories, {status:201})
    }catch(e){
        console.log(e)
        return new NextResponse('Database Error', {status:500})
    }
}

// export const DELETE = async({params:{id}}: {params:{id:string}}) =>{
//     return new NextResponse('Ok')

// }