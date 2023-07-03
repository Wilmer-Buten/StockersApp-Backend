import { Schema, model } from "mongoose";
import { roles } from "../libs/roles.enum";

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    quantity_per_book: [
      {
        date: String,
        quantity: [],
      },
    ],
    total_books: Number,
    role: {
      type: String,
      default: roles.STUDENT,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", userSchema);
