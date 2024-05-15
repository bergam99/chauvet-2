// pages/api/modifyAddress.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/connectDB";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const { id, ...addressData } = req.body;
      console.log("Received PUT request with ID:", id);
      console.log("Address data:", addressData);

      if (!ObjectId.isValid(id)) {
        console.log("Invalid ObjectId:", id);
        return res.status(400).json({ message: "Invalid address ID" });
      }

      const objectId = new ObjectId(id);

      const db = await connectDB();
      const collection = db.collection("UserAddresses");

      // Log all IDs in the collection
      const allIds = await collection
        .find({}, { projection: { _id: 1 } })
        .toArray();
      console.log(
        "All IDs in collection:",
        allIds.map((doc) => doc._id.toString())
      );

      // Exclude _id from addressData before updating
      const { _id, ...updateData } = addressData;

      const result = await collection.updateOne(
        { _id: objectId },
        { $set: updateData }
      );

      console.log("MongoDB update result:", result);

      if (result.matchedCount === 1) {
        res.status(200).json({ message: "Successfully updated address" });
      } else {
        res.status(404).json({ message: "Address not found" });
      }
    } catch (error) {
      console.error("Error updating address:", error);
      res.status(500).json({ message: "Failed to update address", error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
