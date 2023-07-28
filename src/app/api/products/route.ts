import Product from "@/models/Products";
import { connect } from "@/utils/moongose";
import { NextResponse } from "next/server"

export const POST = async (req: Request, res: Response) => {
    const {title, desc, price}= await req.json()
    await connect()
    try{
      const product = await Product.create({title, desc, price})
      return NextResponse.json(product, {status:201})
    }catch(e){
      return new NextResponse('Database Error', {status:500})
    }
  };

export const GET = async (req: Request) => {

  await connect()
  try{
    const products = await Product.find()
    // console.log(post)
    return NextResponse.json(products, {status:200})
  }catch(e){
    console.error(e)
    return new NextResponse('Database Error', {status:500})
  }
  
  
}

