// // models/Product.ts
// import mongoose, { Document } from "mongoose";

// interface IProduct extends Document {
//   name: string;
//   price: number;
//   description: string;
//   stock: number;
//   images: { url: string }[];
// }

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   description: { type: String, required: true },
//   stock: { type: Number, required: true },
//   images: [{ url: String }],
// });

// export default mongoose.models.Product ||
//   mongoose.model<IProduct>("Product", productSchema);

// models/Product.ts
