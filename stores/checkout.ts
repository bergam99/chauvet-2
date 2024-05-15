// TODO : rename => address.ts
import { IUserAddress } from "@/types/userAddress";
import { ObjectId } from "mongodb";
import { create } from "zustand";

type CheckoutStore = {
  shippingAddress: IUserAddress;
  setShippingAddress: (address: IUserAddress) => void;
  allAddresses: IUserAddress[];
  postAddress: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputChange: any;
  resetShippingAddress: () => void;
  deleteAddress: (id: string | ObjectId | undefined) => Promise<void>;
  fetchAllAddresses: () => Promise<void>;
  fetchTrigger: boolean;
  setFetchTrigger: (value: boolean) => void;
  updateAddress: (
    id: string,
    addressData: Partial<IUserAddress>
  ) => Promise<void>;
  selectedAddress: IUserAddress | null; // modify
  setSelectedAddress: (address: IUserAddress | null) => void;
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
  fetchTrigger: false,
  selectedAddress: null,
  setSelectedAddress: (address) => set({ selectedAddress: address }),

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

  setFetchTrigger: (value: boolean) => set({ fetchTrigger: value }),

  // resrt
  resetShippingAddress: () => set({ shippingAddress: { ...baseAddress } }), // clear _id, localId

  postAddress: async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { shippingAddress } = get();
    const newShippingAddress = {
      ...shippingAddress,
      localId: generateRandomID(),
    };
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

  fetchAllAddresses: async () => {
    try {
      const response = await fetch("/api/summary", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      set({ allAddresses: data.userAddress });
    } catch (error) {
      console.error("Fetching user addresses failed:", error);
    }
  },

  deleteAddress: async (id) => {
    const { allAddresses, setFetchTrigger } = get();
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
      setFetchTrigger(true);

      console.log("address deleted");
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  },

  updateAddress: async (id, addressData) => {
    const { allAddresses, setFetchTrigger } = get();
    try {
      console.log("Updating address with ID:", id);
      console.log("Address data:", addressData);

      const response = await fetch(`/api/modifyAddress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...addressData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error("Failed to update the addressData");
      }

      const updatedAddresses = allAddresses.map((addr) =>
        addr._id === id ? { ...addr, ...addressData } : addr
      );

      set({ allAddresses: updatedAddresses });
      console.log("Updated addresses:", updatedAddresses);
      setFetchTrigger(true);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  },
}));

function generateRandomID() {
  return Math.random().toString(36).substring(2); // TODO: replace
}
