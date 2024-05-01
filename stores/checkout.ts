import { IUserAddress } from "@/types/userAddress";
import { create } from "zustand";
type CheckoutStore = {
  shippingAddress: IUserAddress;
  handleshippingAddress: (address: IUserAddress) => void;
  allAddresses: IUserAddress[];
  setAllAddresses: (addresses: IUserAddress[]) => void;
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
  allAddresses: [{ ...baseAddress }],

  handleshippingAddress: (address: IUserAddress) => {
    set({ shippingAddress: address });
  },

  setAllAddresses: (addresses) => set({ allAddresses: addresses }),
}));
