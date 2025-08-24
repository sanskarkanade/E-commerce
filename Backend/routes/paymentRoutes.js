const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const { protect } = require("../middleware/authMiddleware");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/orders");

router.post("/create-checkout-session", protect, async (req, res) => {
  const { cartItems } = req.body;
  const userId = req.user.id;

  try {
    // Prepare Stripe line items
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          images: [ item.image], // consistent image usage
        },
        unit_amount: Math.round(item.price * 100), // ₹ → paise
      },
      quantity: item.quantity || 1,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://e-commerce-poe9.vercel.app/success",
      cancel_url: "https://e-commerce-poe9.vercel.app/cancel",
    });

    // Map cart items to order items
    const orderItems = cartItems.map((item) => ({
      productId: item._id,
      title: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.thumbnail || item.image,
      quantity: item.quantity || 1,
    }));

    // Save order in DB
    let order = await Order.findOne({ userId });

    if (!order) {
      order = new Order({
        userId,
        items: orderItems,
      });
    } else {
      order.items.push(...orderItems); // push multiple items
    }

    await order.save();

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Payment failed" });
  }
});

module.exports = router;
