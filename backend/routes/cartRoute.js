// backend/routes/cartRoutes.js
const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/remove/:productId", protect, removeFromCart);

module.exports = router;