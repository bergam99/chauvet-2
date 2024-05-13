// stripe login
// DEV) stripe listen --events checkout.session.completed --forward-to localhost:3000/api/webhook
// PROD) stripe listen --events checkout.session.completed --forward-to https://chauvet.vercel.app/api/webhook
import { connectDB } from "@/utils/connectDB";
import { safeParseFloat } from "@/utils/parseFloat";
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
      // console.log({ session });

      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id // id of the session
      );

      const cartItems = [];
      for (const item of line_items.data) {
        const product = await stripe.products.retrieve(
          item.price!.product as string
        );
        const priceInCents = safeParseFloat(
          item?.price?.unit_amount_decimal as string
        );

        cartItems.push({
          product_id: product.id,
          name: product.name,
          price: priceInCents,
          quantity: item.quantity,
          //   image: product.images[0],
        });
      }

      const userId = session.client_reference_id;
      const amountPaid = session.amount_total! / 100;

      const paymentInfo = {
        session_id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
        created: session.created,
      };

      const orderData = {
        user_id: userId,
        shippingAddress: session.metadata!.shippingAddress,
        paymentInfo,
        orderItems: cartItems,
      };

      // console.log({ orderData });

      const db = await connectDB();
      const orderCollection = db.collection("Orders");
      await orderCollection.insertOne(orderData);

      res.status(201).json({ message: "order created", order: orderData });
    } else {
      res.status(400).json({ message: "Unhandled event type" });
    }
  } catch (error) {
    console.error("Error in webhook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
