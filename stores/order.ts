import { IOrders } from "@/types/order";
import { create } from "zustand";

type OrderStore = {
  isLoading: boolean;
  orders: IOrders[];
  totalOrderCount: number;
  fetchAllOrders: () => Promise<void>;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  totalOrderCount: 0,
  isLoading: true,

  fetchAllOrders: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/orders", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.orders && data.orders.length > 0) {
        const sortedOrders = sortOrders(data.orders);
        set({
          orders: sortedOrders,
          totalOrderCount: data.ordersCount,
          isLoading: false,
        });
      } else {
        set({ orders: [], isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
      throw new Error("Fetching All Orders failed");
    }
  },
}));

export function sortOrders(orders: IOrders[]): IOrders[] {
  return orders.sort((a, b) => b.paymentInfo.created - a.paymentInfo.created);
}
