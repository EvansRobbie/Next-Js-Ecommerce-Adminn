import product from "@/app/products/[id]/page"
import Product from "@/models/Products"
import { connect } from "@/utils/moongose"
import { NextResponse } from "next/server"

export const GET = async (req:Request, {params:{id}}:{params:{id:String}}) =>{
    // console.log(id)
    await connect()
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
    const {title, desc, price} =  await req.json()
        // console.log(id)
    try{
        const product = await Product.updateOne({_id:id},{ title, desc, price}) 
        return NextResponse.json(product, {status:200})
    }catch(e){
        return new NextResponse('Failed to update product', {status:500})
    }
    
  }