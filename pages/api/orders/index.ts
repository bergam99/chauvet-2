import { IOrders } from "@/types/order";
import { connectDB } from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const token = await getToken({ req });
      const user_id = token?.sub || undefined;

      const db = await connectDB();
      const ordersCount = await db.collection("Orders").countDocuments(); // count total number of orders

      const orders = await db
        .collection<IOrders>("Orders")
        .aggregate([
          { $match: { user_id } }, // Match orders by user_id
        ])
        .toArray();

      if (orders.length > 0) {
        res.status(200).json({ ordersCount, orders });
      } else {
        res.status(200).json({ message: "No order yet" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
