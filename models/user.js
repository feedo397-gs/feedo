import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpires: { type: Date }
});

export default mongoose.model("User", userSchema);
