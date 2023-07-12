import clientPromise from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (req: Request, res: Response) => {
    const {title, desc, price}= await req.json()
    console.log({title, desc, price})
    // if (method !== "POST") {
    //   return;
    // }
    return NextResponse.json({title, desc, price})
    // Your code here
  };