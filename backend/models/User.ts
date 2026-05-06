import mongoose, { Schema, Document, Model } from "mongoose";

// ✅ Interface (Type)
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: number;     // 1 = admin, 2 = user
  status: number;   // 1 = active, 2 = inactive

    // ✅ ADD THIS
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

// ✅ Schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      enum: [1, 2],
      default: 2,
    },
    status: {
      type: Number,
      enum: [1, 2],
      default: 1,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;