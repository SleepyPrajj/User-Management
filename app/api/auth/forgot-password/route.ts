// import ForgotPasswordToken from "@/lib/models/ForgotPasswordToken";
// import User from "@/lib/models/user.model";
// import connectDB from "@/lib/mongodb";
// import { NextResponse } from "next/server";
// import {Resend} from 'resend';

// const resend= new Resend(process.env.RESEND_API_KEY);
// export async function POST(req:Request){
//   try {
//     await connectDB().catch(err=>NextResponse.json(err));

//     const {email}=await req.json();
//     const user=await User.findOne({email:email})

//     if(!user){
//       return NextResponse.json({
//         success:false,
//         error:"User with this email does not exist"
//       },{status:404})
//     }

//     const resetToken= `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g,'');

//     const tokenRes=await ForgotPasswordToken.create({
//       userId:user._id,
//       token:resetToken,
//       resetAt:null
//     })
//     console.log("sent forgot password")

//     const resetPasswordLink=`${process.env.NEXTAUTH_URL}/reset-password/${tokenRes.token}`
//     console.log('API URL:', resetPasswordLink);
//     console.log(resetPasswordLink);
//     console.log(email)
//     resend.emails.send({
//       from: 'user-manage <onboarding@resend.dev>',
//       to: `${email}`,
//       subject: 'Reset Password Link',
//       html: `<p>Click here to reset your password - ${resetPasswordLink}</p>`
//     });

//     return NextResponse.json({
//       success:true,
//       message:"Please follow instructions to reset password. If email is not received checck spam folder"
//     })
    
//   } catch (error:any) {
//     console.log("error reset mailst")
//     return NextResponse.json({
//       success:false,
//       error:error
//     },{status:500})
//   }
// }


import ForgotPasswordToken from "@/lib/models/ForgotPasswordToken";
import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { render } from '@react-email/render'; // Assuming you have `@react-email/render` installed

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    // Connect to MongoDB (assuming connectDB function)
    await connectDB().catch((err) => NextResponse.json(err));

    // Extract email from request body
    const { email } = await req.json();

    // Find user by email
    const user = await User.findOne({ email });

    // Handle user not found case
    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User with this email does not exist",
      }, {
        status: 404,
      });
    }

    // Generate reset token
    const resetToken = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, '');

    // Create ForgotPasswordToken (assuming schema)
    const tokenRes = await ForgotPasswordToken.create({
      userId: user._id,
      token: resetToken,
      resetAt: null,
    });

    console.log("Sent forgot password");

    // Construct reset password link
    const resetPasswordLink = `http://localhost:3000/reset-password/${tokenRes.token}`;
    // const resetPasswordLink = `${process.env.NEXTAUTH_URL}/reset-password/${tokenRes.token}`;

    // **Using Mailersend API with Optional Email Templating**
    const sentFrom = new Sender("prajjwal@trial-3yxj6lj67r04do2r.mlsender.net", "Prajjwal");
    const recipients = [
      new Recipient(email, "Your Client"),
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("Reset Password Link")
      .setText(`Click here to reset your password: ${resetPasswordLink}`) // Plain text for wider compatibility
    await mailerSend.email.send(emailParams);

    return NextResponse.json({
      success: true,
      message: "Please follow instructions to reset password. If email is not received, check your spam folder.",
    });
  } catch (error: any) {
    console.error("Error sending reset email:", error);
    return NextResponse.json({
      success: false,
      error: "Error sending reset email",
    }, {
      status: 500,
    });
  }
}