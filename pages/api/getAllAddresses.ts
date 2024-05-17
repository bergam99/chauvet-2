import { IUserAddress } from "@/types/userAddress";
import { connectDB } from "@/utils/connectDB";
import { securingEndpoint } from "@/utils/securingEndpoint";
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

      securingEndpoint(token, user_id, res);

      const db = await connectDB();
      const userAddress = await db
        .collection<IUserAddress>("UserAddresses")
        .find({})
        .toArray();

      res.status(200).json({ message: "api/getAllAddresses:ok", userAddress });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
