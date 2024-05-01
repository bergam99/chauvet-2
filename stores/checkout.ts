import { UserAddress } from "@/types/checkout";
import { IUserAddress } from "@/types/userAddress";
import { create } from "zustand";
type CheckoutStore = {
  shippingAddress: IUserAddress;
  // allAddresses: UserAddress[];
  handleshippingAddress: (address: any) => void;
};

const baseAddress = {
  _id: "",
  gender: "",
  firstName: "",
  lastName: "",
  address: "",
  additionalAddresse: "",
  zipcode: "",
  city: "",
  region: "",
  country: "",
  tel: "",
  tel2: "",
  additionalInfo: "",
};

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
  shippingAddress: { ...baseAddress },
  // allAddresses: [{ ...baseAddress }],

  handleshippingAddress: (address: any) => {
    set({ shippingAddress: address });
  },
}));
