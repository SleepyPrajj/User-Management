import connectDB  from "@/lib/mongodb";
import ForgotPasswordToken from "@/lib/models/ForgotPasswordToken";
import User from "@/lib/models/user.model";
import mongoose, { startSession } from "mongoose";
import { NextResponse } from "next/server"
import { genSalt, hash } from "bcrypt";

export async function POST(req: Request) {

  let session;

  try {
    const { password, resetToken } = await req.json()
    await connectDB().catch(err => NextResponse.json(err))

    const passResetToken = await ForgotPasswordToken.findOne({
      token: resetToken,
      resetAt: null,
      createdAt: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 2) }
    })

    if (!passResetToken) {
      return NextResponse.json({ success: false, error: "Either this link is expired or it's invalid" }, { status: 401 })
    }

    session = await startSession()
    session.startTransaction()

    passResetToken.resetAt = new Date()
    await passResetToken.save({ session })

    const user = await User.findById(passResetToken.userId)
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)
    user.password = hashedPassword
    await user.save({ session })

    await session.commitTransaction()
    session.endSession()

    return NextResponse.json({
      success: true,
      msg: "Password Updated successfully"
    })
  } catch (error) {
    session?.abortTransaction()

    if (error instanceof mongoose.Error.ValidationError) {
      for (let field in error.errors) {
        const msg = error.errors[field].message
        return NextResponse.json({ success: false, error: msg }, { status: 403 })
      }
    }

    return NextResponse.json({ success: false, error }, { status: 520 })
  }
}