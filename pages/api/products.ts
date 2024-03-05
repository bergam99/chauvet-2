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
    const db = await connectDB(); // Get the db instance
    const products = await db
      .collection<IProduct>("products") // Now you're calling .collection on the db instance
      .find({})
      .toArray();
    res.status(200).json({ message: "api/products:ok ", products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}
