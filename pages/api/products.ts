// /api/products
import { MongoClient, Db, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const client = new MongoClient(process.env.DATABASE_URL as string);
let db: Db | null = null;

interface Product {
  _id: ObjectId;
  name: string;
  price: number;
  description: string;
  stock: number;
  images: { url: string }[];
}

interface ApiResponse {
  message: string;
  products?: Product[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  if (!db) {
    await client.connect();
    db = client.db("Chauvet");
  }

  try {
    const products = await db
      .collection<Product>("products")
      .find({})
      .toArray();
    res.status(200).json({ message: "api/products:ok ", products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}
