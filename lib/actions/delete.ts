"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import connectDB from "../mongodb";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export const addUser = async (formData: Iterable<readonly [PropertyKey, any]>) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);
  try {
    connectDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData: Iterable<readonly [PropertyKey, any]>) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};



