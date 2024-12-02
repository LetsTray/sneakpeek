import Stripe from "stripe";
import { Order } from "../models/Order.js";

// Initialize Stripe with API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to create Stripe payment session
const createPaymentSession = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    const lineItems = order.orderItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          description: item.product.description,
        },
        unit_amount: item.product.price * 100, // Price in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    return session.url;
  } catch (error) {
    throw new Error(`Failed to create payment session: ${error.message}`);
  }
};

// Function to handle Stripe payment webhook
const handlePaymentWebhook = async (req) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const { orderId } = event.data.object.metadata;
      const order = await Order.findById(orderId);
      if (order) {
        order.status = "Paid";
        await order.save();
      }
    }

    return { received: true };
  } catch (error) {
    throw new Error("Webhook signature verification failed");
  }
};

export { createPaymentSession, handlePaymentWebhook };