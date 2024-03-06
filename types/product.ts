import { ObjectId } from "mongodb";

export interface IProduct {
  _id: ObjectId | string;
  name: string;
  price: number;
  description: string;
  stock: number;
  images: { url: string }[];
}

// import { ObjectId } from "mongodb";
// import mongoose, { Document } from "mongoose";

// const productSchema = new mongoose.Schema({
//   _id: { type: Number },
//   name: { type: String },
//   price: { type: Number },
//   description: { type: String },
//   stock: { type: Number, required: true },
//   images: [{ url: String }],
// });

// export default mongoose.models.Product ||
//   mongoose.model<IProduct>("Product", productSchema);
