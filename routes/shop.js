const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { checkCartNotEmpty } = require("../middleware/cartMiddleware");

// Checkout page
router.get("/checkout", checkCartNotEmpty, (req, res) => {
  res.render("shop/checkout", {
    cart: req.session.cart
  });
});

// Place order
router.post("/checkout", checkCartNotEmpty, async (req, res) => {
  const { customerName, email } = req.body;
  const cart = req.session.cart;

  const order = new Order({
    customerName,
    email,
    items: cart.items,
    totalAmount: cart.total
  });

  await order.save();

  req.session.cart = { items: [], total: 0 };

  res.redirect("/order-confirmation");
});

// Order confirmation
router.get("/order-confirmation", (req, res) => {
  res.render("shop/order-confirmation");
});

module.exports = router;
