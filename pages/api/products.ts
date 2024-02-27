//  =>  /api/products
import { IProduct } from "@/types/product";
import { MongoClient, Db } from "mongodb";
import type { NextApiResponse } from "next";

const client = new MongoClient(process.env.DATABASE_URL as string);
let db: Db | null = null;

interface ApiResponse {
  message: string;
  products?: IProduct[];
}

export default async function handler(
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  if (!db) {
    await client.connect();
    db = client.db("Chauvet");
  }

  try {
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
