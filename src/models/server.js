import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";
import shopRoutes from "../routes/shopRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => res.send("✅ Feedo backend running successfully!"));

app.use("/api/auth", authRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
