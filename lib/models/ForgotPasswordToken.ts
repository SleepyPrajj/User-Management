import mongoose, { model } from "mongoose";

const TokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },token:{
    type:String,
    required:true,
    unique:true
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  resetAt:{
    type:Date
  }
})

const ForgotPasswordToken= mongoose.models.ForgotPasswordToken ||model("ForgotPasswordToken",TokenSchema);
export default ForgotPasswordToken