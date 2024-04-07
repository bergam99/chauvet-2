import { NextApiRequest, NextApiResponse } from "next";

import { connectDB } from "@/utils/connectDB";
// import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getSession({ req });
  // console.log({ session });

  const token = await getToken({ req });

  if (!token) {
    return res.status(401).json({ error: "You should login." });
  }

  if (req.method === "POST") {
    const email = req.body.email; //retreive

    // server side validation
    if (!email || email.trim() === "" || !email.includes("@")) {
      res.status(422).json({ message: "invalid email address." });
      return; // cancel this function execution
    }

    const db = await connectDB();
    const userId = token?.sub;
    const newObject = {
      userId,
      email,
    };

    await db.collection("userInfos").insertOne(newObject);

    res.status(201).json({ message: "this works", newObject });
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
