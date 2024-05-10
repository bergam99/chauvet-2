import { IUserAddress } from "@/types/userAddress";
import { create } from "zustand";

type CheckoutStore = {
  shippingAddress: IUserAddress;
  setShippingAddress: (address: IUserAddress) => void;
  allAddresses: IUserAddress[];
  setAllAddresses: (addresses: IUserAddress[]) => void;
  postAddress: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputChange: any;
  resetShippingAddress: () => void;
  validationError: "";
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
  validationError: "",

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
  // resrt
  resetShippingAddress: () => set({ shippingAddress: { ...baseAddress } }),

  postAddress: async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { shippingAddress } = get();
    const newShippingAddress = {
      ...shippingAddress,
      localId: generateRandomID(),
    };
    console.log("checkout avant post", newShippingAddress);
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
}));

function generateRandomID() {
  return Math.random().toString(36).substring(2); // uudi?
}
