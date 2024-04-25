import mongoose from "mongoose"

const connection: { isConnected?: number } ={}

const connectDB = async () => {
  if (connection.isConnected) {
    return
  }

  if (!process.env.MONGODB_URI) {
    console.log("Error: Invalid/Missing environment variable MONGODB_URI")
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI)
    console.log(db)
    connection.isConnected = db.connections[0].readyState

    if (connection.isConnected === 1) {
      console.log("🚀 Successfully connected to database")
    } else {
      console.log("🔴 Failed to connect to database")
    }
  } catch (error) {
    console.log("🔴 Failed to connect to MongoDB:", (error as Error).message)
  }
}

export default connectDB
// import mongoose from "mongoose";

// const { MONGODB_URI } = process.env

// if (!MONGODB_URI)
//   throw new Error("Invalid env variable: MONGODB_URI");

// export const connectDB = async () => {
//   if (mongoose.connection.readyState !== 0) {
//     return
//   }

//   try {
//     const { connection } = await mongoose.connect(MONGODB_URI)

//     if (connection.readyState === 1) {
//       return Promise.resolve(true)
//     }
//   } catch (error) {
//     return Promise.reject(error)
//   }
// }