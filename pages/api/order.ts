import { connectDB } from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import getRawBody from "raw-body";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false, // raw body
  },
};

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

// webhook

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //npm i raw-body --save
    const rawBody = await getRawBody(req);
    const signature = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object; //session from stripe checkout
      console.log({ session });

      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id // id of the session
      );

      const cartItems = [];
      for (const item of line_items.data) {
        const product = await stripe.products.retrieve(
          item.price!.product as string
        );
        cartItems.push({
          product: product.id,
          name: product.name,
          //   price: item.price.unit_amount_decimal! / 100,
          quantity: item.quantity,
          //   image: product.images[0],
        });
      }
      const userId = session.client_reference_id;
      const amountPaid = session.amount_total! / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
      };

      const orderData = {
        user: userId,
        paymentInfo,
        orderItems: cartItems,
      };
      console.log({ orderData });

      const db = await connectDB();
      const orderCollection = db.collection("Orders");
      await orderCollection.insertOne(orderData);

      //   const order = await Order.create(orderData);
      res.status(201).json({ message: "order created", order: orderData });
      //   get cart items
    } else {
      res.status(400).json({ message: "Unhandled event type" });
    }
  } catch (error) {
    console.error("Error in webhook:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error?.toString() });
  }
}
