import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/connectDB";
import { securingEndpoint } from "@/utils/securingEndpoint";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  const user_id = token?.sub || undefined;

  const { id } = req.query;

  if (req.method === "DELETE") {
    securingEndpoint(token, user_id, res);
    try {
      const db = await connectDB();
      const collection = db.collection("UserAddresses");
      const result = await collection.deleteOne({ id });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Successfully deleted address" });
      } else {
        res.status(404).json({ message: "Address not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete address", error });
    }
  } else {
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
