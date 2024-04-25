import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET (req:Request) {
  try{
    await connectDB().catch(err=>NextResponse.json(err + "get-users"));
    // const db = await connectDB().catch((err) => NextResponse.json(err + " during database connection."));
    
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users },{status:200});
  }catch(error){
    console.log(error)
    return NextResponse.json({
      success:false,
      error:error
    },{status:500})
  }
}
