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

      // TODO: populate user from orders
      const db = await connectDB();
      const ordersCount = await db.collection("Orders").countDocuments(); // count total number of orders
      const orders = await db
        .collection<any>("Orders")
        .find({ user_id })
        .toArray();

      res.status(200).json({ message: "api/order:ok", ordersCount, orders });
    } catch (error) {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  }
}
