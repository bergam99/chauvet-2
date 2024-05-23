import { ObjectId } from "mongodb";

export interface IProduct {
  _id: ObjectId | string;
  name: string;
  price: number;
  description: string;
  stock: number;
  images: { url: string }[];
  createdAt: string;
}
