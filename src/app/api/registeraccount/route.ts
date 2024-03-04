import client from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export const POST = async (req:Request) => {
  const {name, email, password, imageUrl} = await req.json()
  const hashedPass = await bcrypt.hash(password, 10)

  try {
    const validate = await client.user.findUnique({
      where:{
        email
      }
    })
    
    if(validate){
      return NextResponse.json({message:"User already exists", success:false})
    }else{
      const res = await client.user.create({
        data:{
          name,
          email,
          password: hashedPass,
          image: imageUrl
        }
      })
      if(res){
        return NextResponse.json({message:"Account created", success:true})
      }else{
        return NextResponse.json({message:"Failed to create an account", success:false})
      }
    }
    
  } catch (error: any) {
    console.log("account create error", error);
    return NextResponse.json({message:"Internal server error", success:false})
  }
  
}