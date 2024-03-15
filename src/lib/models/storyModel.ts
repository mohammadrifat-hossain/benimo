import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.mongo.ObjectId,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userImage: {
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now,
    index:{
      expires: 8640
    }
  },
  imageUrl:{
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    index: { expires: 86400 } // Expires in 24 hours (adjust as needed)
  }
})

export const StoryModel = mongoose.models.Story || mongoose.model("Story",schema)