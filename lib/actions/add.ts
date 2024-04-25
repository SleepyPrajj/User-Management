"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import connectDB from "../mongodb";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
// import { signIn } from "../auth";

type Tenant = {
  tenantName: string;
  role: string;
};
type FormDataParsed = {
  name: string;
  email: string;
  PropertyName: string;
  password: string;
  tenants: string; 
};
export const addUser = async (formData: FormData): Promise<void> => {
  const entries = Object.fromEntries(formData) as unknown as FormDataParsed;
  const { name,PropertyName , email, password, tenants } = entries;
  let tenantObjects: Tenant[];
  try {
    tenantObjects = JSON.parse(tenants);
  } catch (error) {
    console.error("Error parsing tenant information:", error);
    throw new Error("Invalid tenant information format!");
  }
  try {
    await connectDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      PropertyName,
      email,
      password: hashedPassword,
      tenant: tenantObjects, 
    });

    await newUser.save();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create user!");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};





