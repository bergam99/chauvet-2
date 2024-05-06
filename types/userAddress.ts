import { ObjectId } from "mongodb";

export interface IUserAddress {
  _id?: ObjectId | string;
  gender: string;
  firstName: string;
  lastName: string;
  address: string;
  additionalAddresse: string;
  zipcode: string;
  city: string;
  region: string;
  country: string;
  tel: string;
  tel2: string;
  additionalInfo: string;
}
