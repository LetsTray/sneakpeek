// backend/routes/productRoutes.js
const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new product (Admin only)
router.post("/", async (req, res) => {
  const { name, description, price, stock, image } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      image,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;