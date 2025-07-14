import mongoose from "mongoose";

const UserAuthSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "", // or default avatar URL
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "auth",
  }
);

export default mongoose.models.UserAuth ||
  mongoose.model("Auth", UserAuthSchema);
