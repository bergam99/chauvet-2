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
      const user_id = token?.sub || undefined;

      const db = await connectDB();
      const userAddress = await db
        .collection<IUserAddress>("UserAddresses")
        .find({ user_id })
        .toArray();

      res.status(200).json({ message: "api/getAllAddresses:ok", userAddress });
    } catch (error) {
      throw new Error("Failed to fetch Add addresses");
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
