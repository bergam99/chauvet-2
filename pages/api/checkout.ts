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
      return res.status(401).json({ error: "You should login." });
    }

    const userId = token?.sub;

    const db = await connectDB();
    const userInfosCollection = db.collection("userInfos");
    const existingUserInfo = await userInfosCollection.findOne({ userId });
    const { ...newUserInfos } = req.body;

    if (existingUserInfo) {
      // Update existing user information
      await userInfosCollection.updateOne({ userId }, { $set: newUserInfos });
      res
        .status(201)
        .json({ message: "updated user Info", userId, newUserInfos });
    } else {
      await userInfosCollection.insertOne({ userId, ...newUserInfos });
      res
        .status(201)
        .json({ message: "created user info", userId, newUserInfos });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
