import mongoose from 'mongoose'

export const connnectdb = async () => {
  await mongoose.connect(process.env.DATABASE_URL!)
}