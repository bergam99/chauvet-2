import { ObjectId } from "mongodb";

export interface IUser {
  _id: ObjectId | string;
  email: string;
  name: string;
}
