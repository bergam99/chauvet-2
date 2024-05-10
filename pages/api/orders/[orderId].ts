import { IOrders } from "@/types/order";
import { connectDB } from "@/utils/connectDB";
import { securingEndpoint } from "@/utils/securingEndpoint";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { orderId },
  } = req;

  if (req.method === "GET") {
    try {
      const token = await getToken({ req });
      const user_id = token?.sub || undefined;

      securingEndpoint(token, user_id, res);

      const db = await connectDB();

      const orderObjectId = new ObjectId(orderId as string); // Convert orderId to ObjectId

      const matchIdOrder = await db
        .collection<IOrders>("Orders")
        .aggregate([
          { $match: { _id: orderObjectId, user_id } }, // Match orders by user_id
          {
            $lookup: {
              from: "UserAddresses",
              localField: "shippingAddress",
              foreignField: "localId",
              as: "shippingAddress",
            },
          },
          {
            $lookup: {
              from: "Users",
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

      if (matchIdOrder.length > 0) {
        const order = matchIdOrder[0];
        res.status(200).json({ order });
        // console.log({ order });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
