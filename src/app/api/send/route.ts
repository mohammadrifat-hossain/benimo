import { EmailTemplate } from '@/components/EmailTemplate';
import { NextResponse } from 'next/server';
import client from '@/lib/prismadb';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: Request) => {

  const {name, email} = await req.json()
  


  const randomOtp = Math.floor(1000 + Math.random() * 9000)
  
  const result = await client.otp.create({
    data:{
      code: randomOtp,
      expireAt: new Date(Date.now() + 120000)
    }
  })

  

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: 'Hello world',
    react: EmailTemplate({ name: name, code: randomOtp }),
    text: 'This is the plain text version of the email.', // Add this line
  });

  if (error) {
    return NextResponse.json(error)
  }

  return NextResponse.json({
    id: result.id,
    code: result.code,
    expireIn: result.expireAt
  })
};