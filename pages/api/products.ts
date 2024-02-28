// /api/products
import { IProduct } from "@/types/product";
import { MongoClient, Db } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const DATABASE_URL = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.vxm2yn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
interface ApiResponse {
  message: string;
  products?: IProduct[];
}
const client = new MongoClient(DATABASE_URL);
let db: Db | null = null;

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
      .collection<IProduct>("products")
      .find({})
      .toArray();
    res.status(200).json({ message: "api/products:ok ", products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}
