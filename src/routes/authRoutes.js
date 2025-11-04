import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import twilio from "twilio";

const router = express.Router();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Request OTP
router.post("/request-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: "Phone is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + process.env.OTP_EXPIRY_MINUTES * 60000);

    let user = await User.findOne({ phone });
    if (!user) user = await User.create({ phone, otp, otpExpires });
    else {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    }

    // Send WhatsApp message
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:+91${phone}`,
      body: `Your Feedo OTP is ${otp}. Valid for ${process.env.OTP_EXPIRY_MINUTES} minutes.`
    });

    res.json({ success: true, message: "OTP sent via WhatsApp" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp || user.otpExpires < Date.now())
      return res.status(400).json({ error: "Invalid or expired OTP" });

    const token = jwt.sign({ phone }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
