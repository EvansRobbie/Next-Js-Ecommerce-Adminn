import Category from "@/models/Categories";
import { connect } from "@/utils/moongose";
import { NextResponse } from "next/server";
import { isAdminRequest } from "../../auth/[...nextauth]/route";

export const DELETE = async (
  req: Request,
  { params: { id } }: { params: { id: String } }
) => {
  try {
    await connect();
    await isAdminRequest()
    await Category.deleteOne({ _id: id });
    return new NextResponse("Category Deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

// }
