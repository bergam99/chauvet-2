import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/connectDB";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const objectId = new ObjectId(id as string);
    try {
      const db = await connectDB();
      const collection = db.collection("UserAddresses");
      const result = await collection.deleteOne({ _id: objectId });

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
