import { CartItem } from "@/stores/cart";

export const totalPrice = (cart: CartItem[]): string => {
  return cart
    .reduce((acc, item) => acc + item.count * item.price, 0)
    .toFixed(2);
};
