import { IPosts } from "@/types/posts";
import { connectDB } from "./connectDB";
import { serializeMongoObjectId } from "./convert";
import { IProduct } from "@/types/products";
import { ObjectId } from "mongodb";

// ===== /products =====
export const getProducts = async (): Promise<IProduct[]> => {
  try {
    const db = await connectDB();
    const products = await db
      .collection<IProduct>("Products")
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

// ===== /products/:[productId] =====
export async function getProduct(productId: string | undefined) {
  if (!productId) {
    throw new Error("Product ID not provided");
  }

  try {
    const db = await connectDB();
    const product = await db
      .collection<IProduct>("Products")
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

// ===== /posts =====
export const getPosts = async (): Promise<IPosts[]> => {
  try {
    const db = await connectDB();
    const posts = await db.collection<IPosts>("Posts").find({}).toArray();
    if (posts.length === 0) {
      throw new Error("Posts not found");
    }
    const convertedPosts = serializeMongoObjectId(posts);
    return convertedPosts;
  } catch (error) {
    throw new Error("Failed to fetch posts");
  }
};

// ===== /:[productId] =====
export async function getPost(postId: string | undefined) {
  if (!postId) {
    throw new Error("Post ID not provided");
  }

  try {
    const db = await connectDB();
    const post = await db
      .collection<IPosts>("Posts")
      .findOne({ _id: new ObjectId(postId) }); // _id from params -> ObjectId

    if (!post) {
      throw new Error("Post not found");
    }

    const convertedPost = serializeMongoObjectId(post); // _id -> string
    return convertedPost;
  } catch (error) {
    throw new Error("Failed to fetch post");
  }
}
