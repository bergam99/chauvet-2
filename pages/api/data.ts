// /api/data
import user from "@/models/user";
import connectDB from "../lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { name, age } = req.body;
  const person = new user({
    name: name,
    age: age,
  });
  await person.save();
  console.log("inside api", name, age);
  res.status(200).json({ done: true, person: person });
}
