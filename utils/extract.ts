import { connectDB } from "./connectDB";
import { serializeMongoObjectId } from "./convert";
import { IProduct } from "@/types/product";
import { ObjectId } from "mongodb";

// ===== @/products =====
export const getProducts = async (): Promise<IProduct[]> => {
  try {
    const db = await connectDB();
    const products = await db
      .collection<IProduct>("products")
      .find({})
      .toArray();
    if (products.length === 0) {
      throw new Error("Products not found");
    }
    const convertedProducts = serializeMongoObjectId(products);
    return convertedProducts;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

// ===== @/products/:[productId] =====
export async function getProduct(productId: string | undefined) {
  if (!productId) {
    throw new Error("Product ID not provided");
  }

  try {
    const db = await connectDB();
    const product = await db
      .collection<IProduct>("products")
      .findOne({ _id: new ObjectId(productId) });

    if (!product) {
      throw new Error("Product not found");
    }

    const convertedProduct = serializeMongoObjectId(product);
    return convertedProduct;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
}
