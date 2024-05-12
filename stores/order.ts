import { IOrders } from "@/types/order";
import { create } from "zustand";

type OrderStore = {
  orders: IOrders[];
  totalOrderCount: number;
  fetchAllOrders: () => Promise<void>;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  totalOrderCount: 0,

  fetchAllOrders: async () => {
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
        set({ orders: sortedOrders });
        set({ totalOrderCount: data.ordersCount });
      } else {
        console.log("No orders found or empty orders list.");
        set({ orders: [] });
      }
    } catch (error) {
      console.error("Fetching user addresses failed:", error);
    }
  },
}));

export function sortOrders(orders: IOrders[]): IOrders[] {
  return orders.sort((a, b) => b.paymentInfo.created - a.paymentInfo.created);
}
