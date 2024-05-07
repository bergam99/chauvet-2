import { ObjectId } from "mongodb";
import { IUserAddress } from "./userAddress";
import { IUser } from "./user";

export interface IOrders {
  _id: ObjectId | string;
  user_id: string;
  orderItems: {
    product_id: string;
    name: string;
    price: number | null; // can be null if there's a parsing error
    quantity: number;
    image?: string;
  }[];
  paymentInfo: {
    session_id: string;
    status: string;
    amountPaid: number;
    created: number;
  };
  shippingAddress: IUserAddress[];
  user: IUser[];
}
