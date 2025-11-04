import express from "express";
import Shop from "../models/Shop.js";

const router = express.Router();

// Create demo shops (seed)
router.get("/seed", async (req, res) => {
  try {
    const count = await Shop.countDocuments();
    if (count === 0) {
      await Shop.insertMany([
        {
          name: "Mister Chef",
          items: [
            {
              name: "Margherita Pizza",
              type: "veg",
              price: 199,
              image: "https://images.dominos.co.in/new_margherita_2502.jpg"
            },
            {
              name: "Paneer Tikka Pizza",
              type: "veg",
              price: 249,
              image: "https://images.dominos.co.in/updated_paneer_tikka.jpg"
            },
            {
              name: "Veg Burger",
              type: "veg",
              price: 149,
              image: "https://www.kindpng.com/picc/m/22-223386_burger-hd-png-transparent-png.png"
            }
          ]
        },
        {
          name: "Fly Pizza",
          items: [
            {
              name: "Pepperoni Pizza",
              type: "non-veg",
              price: 299,
              image: "https://images.dominos.co.in/new_pepperoni.jpg"
            },
            {
              name: "Chicken Burger",
              type: "non-veg",
              price: 179,
              image: "https://www.kindpng.com/picc/m/222-2225405_chicken-burger-png-image-free-download-searchpng-chicken.png"
            },
            {
              name: "Cold Coffee",
              type: "drink",
              price: 99,
              image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
            }
          ]
        }
      ]);
    }
    res.json({ success: true, message: "Shops added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all shops
router.get("/", async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
