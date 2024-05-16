// pages/api/modifyAddress.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/connectDB";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import { securingEndpoint } from "@/utils/securingEndpoint";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const token = await getToken({ req });
    const user_id = token?.sub || undefined;
    securingEndpoint(token, user_id, res);

    try {
      const { id, ...addressData } = req.body;
      console.log("Received PUT request with ID:", id);
      console.log("Address data:", addressData);

      const objectId = new ObjectId(id as string);

      const db = await connectDB();
      const collection = db.collection("UserAddresses");

      // Exclude _id from addressData before updating
      const { _id, ...updateData } = addressData;

      const result = await collection.updateOne(
        { _id: objectId },
        { $set: updateData }
      );

      // console.log("MongoDB update result:", result);

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
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
