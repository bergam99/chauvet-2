import { ObjectId } from "mongodb";

// TODO: populate user infos

export interface IOrder {
  _id: ObjectId | string;
  user_id: string;
  paymentInfo: {
    session_id: string;
    status: string;
    amountPaid: number;
  };
  orderItems: {
    product_id: string;
    name: string;
    price: number | null; // can be null if there's a parsing error
    quantity: number;
    image?: string;
  }[];
}
