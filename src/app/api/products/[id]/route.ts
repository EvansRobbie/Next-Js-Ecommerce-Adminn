import Product from "@/models/Products"
import { connect } from "@/utils/moongose"
import { NextResponse } from "next/server"
import { isAdminRequest } from "../../auth/[...nextauth]/route"

export const GET = async (req:Request, {params:{id}}:{params:{id:String}}) =>{
    // console.log(id)
    await connect()
    await isAdminRequest()
    try {
        const product = await Product.findById(id)
        return NextResponse.json(product, {status:200})
    } catch (error) {
        console.error(error)
        return  new NextResponse("Product with that Id not found", {status:500})
    }
}

export const PUT =async (req:Request,{params:{id}}:{params:{id:String}} ) => {
    await connect()
    await isAdminRequest()
    const {title, desc, price, image, category, propInfo:properties} =  await req.json()
        // console.log(id)
    try{
        const product = await Product.updateOne({_id:id},{ title, desc, price, image, category, properties}) 
        return NextResponse.json(product, {status:200})
    }catch(e){
        return new NextResponse('Failed to update product', {status:500})
    }
    
  }

export const DELETE = async (request:Request, {params:{id}}:{params:{id:String}}) =>{
    try {
        await connect()
        await isAdminRequest()
        // await Product.findByIdAndDelete(id)
        await Product.deleteOne({_id:id})
        return new NextResponse("Post Deleted", {status:200})
    } catch (error) {
        
        return new NextResponse('Database Error', {status: 500})
    }



}