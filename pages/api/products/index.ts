// import product from "@/models/product";
// import connectDB from "../../lib/connectDB";
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   pds: Object;
// };

// export default async function handler(
//   // req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { db } = await connectDB();
//   const products = await db.collection("products").find({}).toArray();

//   res.status(200).json({ pds: products });
// }
// pages/api/products/index.ts
