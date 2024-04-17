import { IUserAddress } from "@/types/userAddress";
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

      if (!token) {
        return res.status(401).json({ error: "You must log in first." });
      }
      const db = await connectDB();
      const userAddress = await db
        .collection<IUserAddress>("UserAddress")
        .find({})
        .toArray();

      res.status(200).json({ message: "api/summary:ok", userAddress });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
