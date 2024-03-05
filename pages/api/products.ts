// /api/products
import { IProduct } from "./../../types/product";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../utils/connectDB";
interface ApiResponse {
  message: string;
  products?: IProduct[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  try {
    const db = await connectDB();
    const products = await db
      .collection<IProduct>("products")
      .find({})
      .toArray();
    res.status(200).json({ message: "api/products:ok ", products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}
