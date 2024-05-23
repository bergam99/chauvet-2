import { IUserAddress } from "@/types/userAddress";
import { ObjectId } from "mongodb";
import { create } from "zustand";

type AddressStore = {
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
  shippingAddress: { ...baseAddress },
  allAddresses: [{ ...baseAddress }],
  fetchTrigger: false,

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

  setFetchTrigger: (value: boolean) => set({ fetchTrigger: value }),

  resetShippingAddress: () => set({ shippingAddress: { ...baseAddress } }),

  postAddress: async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { shippingAddress } = get();
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
  },

  fetchAllAddresses: async () => {
    try {
      const response = await fetch("/api/getAllAddresses", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      set({ allAddresses: data.userAddress });
    } catch (error) {
      throw new Error("Failed to fetch all addresses");
    }
  },

  deleteAddress: async (id) => {
    const { allAddresses, setFetchTrigger } = get();
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
      set({ allAddresses: updatedAddresses });
      setFetchTrigger(true);
    } catch (error) {
      throw new Error("Failed to delete the address");
    }
  },

  updateAddress: async (id, modifiedAddress) => {
    const { allAddresses, setFetchTrigger } = get();
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

      set({ allAddresses: updatedAddresses });
      setFetchTrigger(true);
    } catch (error) {
      throw new Error("Failed to update the modifiedAddress");
    }
  },
}));

function generateRandomID() {
  return Math.random().toString(36).substring(2); // TODO: replace
}
