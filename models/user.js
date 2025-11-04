import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  name: { type: String },
  otp: { type: String },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
