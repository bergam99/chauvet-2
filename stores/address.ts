import { IUserAddress } from "@/types/userAddress";
import { ObjectId } from "mongodb";
import { create } from "zustand";

type AddressStore = {
  isLoading: boolean;
  shippingAddress: IUserAddress;
  setShippingAddress: (address: IUserAddress) => void;
  allAddresses: IUserAddress[];
  postAddress: (
    e: React.FormEvent<HTMLFormElement>,
    isFirstTimeSubmission?: boolean
  ) => Promise<void>;
  handleInputChange: any;
  resetShippingAddress: () => void;
  deleteAddress: (id: string | ObjectId | undefined) => Promise<void>;
  fetchAllAddresses: () => Promise<void>;
  updateAddress: (
    id: string,
    modifiedAddress: Partial<IUserAddress>
  ) => Promise<void>;
  formValidationErrors: Partial<IUserAddress>;
  setFormValidationErrors: (
    errors:
      | Partial<IUserAddress>
      | ((prevErrors: Partial<IUserAddress>) => Partial<IUserAddress>)
  ) => void;
  clearFormValidationErrors: () => void;
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

export const useAddressStore = create<AddressStore>((set, get) => ({
  isLoading: true,
  shippingAddress: { ...baseAddress },
  allAddresses: [{ ...baseAddress }],
  formValidationErrors: {},

  setFormValidationErrors: (errors) =>
    set((state) => ({
      formValidationErrors:
        typeof errors === "function"
          ? errors(state.formValidationErrors)
          : errors,
    })),

  clearFormValidationErrors: () => set({ formValidationErrors: {} }),

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

  resetShippingAddress: () => set({ shippingAddress: { ...baseAddress } }),

  postAddress: async (
    e: React.FormEvent<HTMLFormElement>,
    isFirstTimeSubmission?: boolean
  ) => {
    set({ isLoading: true });
    e.preventDefault();
    const { shippingAddress, allAddresses } = get();
    const newShippingAddress = {
      ...shippingAddress,
      localId: generateRandomID(),
    };
    set({ shippingAddress: newShippingAddress });

    await fetch("/api/postUserAddress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newShippingAddress),
    });
    if (!isFirstTimeSubmission) {
      set({
        allAddresses: [...allAddresses, newShippingAddress], // re-run
      });
    }
    set({ isLoading: false });
  },

  fetchAllAddresses: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/getAllAddresses", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      set({ allAddresses: data.userAddress, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error("Failed to fetch all addresses");
    }
  },

  deleteAddress: async (id) => {
    set({ isLoading: true });
    const { allAddresses } = get();
    try {
      const response = await fetch(`/api/deleteAddress`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete the address");
      const updatedAddresses = allAddresses.filter(
        (address) => address._id !== id
      );
      set({ allAddresses: updatedAddresses, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error("Failed to delete the address");
    }
  },

  updateAddress: async (id, modifiedAddress) => {
    set({ isLoading: true });
    const { allAddresses } = get();
    try {
      const response = await fetch(`/api/updateAddress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...modifiedAddress }),
      });
      if (!response.ok) {
        throw new Error("Failed to update the modifiedAddress");
      }
      const updatedAddresses = allAddresses.map((addr) =>
        addr._id === id ? { ...addr, ...modifiedAddress } : addr
      );
      set({ allAddresses: updatedAddresses, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error("Failed to update the modifiedAddress");
    }
  },
}));

function generateRandomID() {
  return Math.random().toString(36).substring(2);
}
