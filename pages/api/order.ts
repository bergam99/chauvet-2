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
      // const orders = await db
      //   .collection<IOrders>("Orders")
      //   .find({ user_id })
      //   .toArray();

      // orders JOIN userAddress & users tables
      // TODO: aggregate order type in .ts
      const orders = await db
        .collection<IOrders>("Orders")
        .aggregate([
          { $match: { user_id } }, // Match orders by user_id
          {
            $lookup: {
              from: "UserAddress", // The collection to join
              localField: "user_id", // Field from the orders collection
              foreignField: "user_id", // Field from the userAddresses collection
              as: "userAddress", // Output array field with joined documents
            },
          },
          {
            $lookup: {
              from: "users",
              let: { userId: "$user_id" }, // Pass the user_id from Orders as a variable
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: [{ $toString: "$_id" }, "$$userId"], // Convert _id to string and compare
                    },
                  },
                },
              ],
              as: "user",
            },
          },
        ])
        .toArray();

      res.status(200).json({ message: "api/order:ok", ordersCount, orders });
    } catch (error) {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  }
}
