import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/connectDB";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const { id, ...modifiedAddress } = req.body;
      const objectId = new ObjectId(id as string);

      const db = await connectDB();
      const collection = db.collection("UserAddresses");

      // Exclude _id from modifiedAddress before updating
      const { _id, ...updateData } = modifiedAddress;

      const result = await collection.updateOne(
        { _id: objectId },
        { $set: updateData }
      );

      if (result.matchedCount === 1) {
        res.status(200).json({ message: "Successfully updated address" });
      } else {
        res.status(404).json({ message: "Address not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update address", error });
    }
  } else {
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
