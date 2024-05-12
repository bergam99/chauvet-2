// TODO : rename => address.ts
import { IUserAddress } from "@/types/userAddress";
import { ObjectId } from "mongodb";
import { create } from "zustand";

type CheckoutStore = {
  shippingAddress: IUserAddress;
  setShippingAddress: (address: IUserAddress) => void;
  allAddresses: IUserAddress[];
  setAllAddresses: (addresses: IUserAddress[]) => void;
  postAddress: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputChange: any;
  resetShippingAddress: () => void;
  deleteAddress: (id: string | ObjectId | undefined) => Promise<void>;
  // fetchTrigger: boolean;
  // setFetchTrigger: (value: boolean) => void;
};

export const baseAddress = {
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

  // fetchTrigger: true,

  setShippingAddress: (address: IUserAddress) => {
    set({ shippingAddress: address });
  },

  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    set((state) => ({
      shippingAddress: {
        ...state.shippingAddress,
        [name]: value,
      },
    }));
  },

  // setFetchTrigger: (value: boolean) => set({ fetchTrigger: value }),
  // resrt
  resetShippingAddress: () =>
    set({ shippingAddress: { _id: "", localId: "", ...baseAddress } }), // clear _id, localId

  postAddress: async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { shippingAddress } = get();
    const newShippingAddress = {
      ...shippingAddress,
      localId: generateRandomID(),
    };
    // console.log("checkout avant post", newShippingAddress);
    set({ shippingAddress: newShippingAddress });

    const response = await fetch("/api/userAddress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newShippingAddress),
    });
    const data = await response.json();
    // resetShippingAddress();
    console.log("address posted", data);
  },

  setAllAddresses: (addresses) => set({ allAddresses: addresses }),

  deleteAddress: async (id) => {
    const { allAddresses } = get();
    try {
      const response = await fetch(`/api/deleteAddress`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete the address");

      // Update local state after successful deletion
      const updatedAddresses = allAddresses.filter(
        (address) => address._id !== id
      );
      set({ allAddresses: updatedAddresses });
      console.log("address deleted");
    } catch (error) {
      console.error("Error deleting address:", error);
    }
    // add fetch trigger
  },
}));

function generateRandomID() {
  return Math.random().toString(36).substring(2); // TODO: replace
}
