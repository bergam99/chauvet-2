import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  name: string;
  age: Number;
}

const User = new mongoose.Schema(
  {
    name: String,
    age: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>("User", User);

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
