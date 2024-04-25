import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  PropertyName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  tenant: [{
    tenantName: {
      type: String,
      required: true,
    },
    Phone_Number: {
      type: String,  
      default:"",
      required: true
    },
    Occupation_Type: {
      type: String,  
      default:"rented"
    },
  }],
  password: {
    type: String
  },
  image: {
    type: String
  },
  Role: {
    type: String,
    enum: ["user","admin","manager"],
    default: "user"
  },
  provider: {
    type: String,
    default: "credentials"
  }
}, { timestamps: true })
interface Tenant {
  tenantName: string;
  Occupation_Type: string;
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  PropertyName: string;
  email: string;
  tenants: Tenant[];
  password?: string;
  image?: string;
  Role: string;
  provider: string;
  createdAt?: Date;
  updatedAt?: Date;
}
const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User