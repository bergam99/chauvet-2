// import product from "@/models/product";
// import connectDB from "../../lib/connectDB";
// import type { NextApiRequest, NextApiResponse } from "next";
// import { ObjectId } from "mongodb";

// type Data = {
//   //   pd: Object;
//   pid: String;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { pid } = req.query;
//   const { db } = await connectDB();

//   const product = await db
//     .collection("products")
//     .find()
//     .sort({ _id: -1 })
//     .toArray();

//   res.status(200).json({ pid: product });
// }

// pages/api/products/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/pages/lib/connectDB";
import mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pid } = req.query;
  const { db } = await connectDB();

  const items = await db
    .collection("products")
    .find()
    .sort({ _id: -1 })
    .toArray();
  // await connectDB();

  // if (!mongoose.Types.ObjectId.isValid(id as string)) {
  //   return res.status(400).json({ error: "Invalid product ID." });
  // }

  // const Product = await product.findById(id);
  // if (!Product) {
  //   return res.status(404).json({ error: "Product not found." });
  // }

  res.status(200).json(items);
};

export default handler;
