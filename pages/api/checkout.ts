import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/connectDB";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // server side validation
    // if (!prenom || prenom.trim() === "" || !prenom.includes("@")) {
    //   res.status(422).json({ message: "invalid prenom." });
    //   return; // cancel this function execution
    // }

    const token = await getToken({ req });

    if (!token) {
      return res.status(401).json({ error: "You should login before." });
    }

    const user_id = token?.sub;

    const db = await connectDB();
    const userAddressCollection = db.collection("UserAddress");
    const existingUserAddress = await userAddressCollection.findOne({
      user_id,
    });
    const { ...newUserAddress } = req.body;

    if (existingUserAddress) {
      await userAddressCollection.updateOne(
        { user_id },
        { $set: newUserAddress }
      );
      res
        .status(201)
        .json({ message: "User address updated", user_id, newUserAddress });
    } else {
      await userAddressCollection.insertOne({ user_id, ...newUserAddress });
      res.status(201).json({
        message: "User address created",
        user_id,
        newUserAddress,
      });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
