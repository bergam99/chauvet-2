import { IProduct } from "@/types/products";
import { create } from "zustand";

interface CartItem extends IProduct {
  count: number;
}

type CartStore = {
  cart: CartItem[];
  count: () => number;
  add: (product: IProduct) => void;
  remove: (idProduct: string) => void;
  removeAll: () => void;
};

// create useCartStore. take state param & update callback functions
export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  // count total quandity
  count: () => {
    const { cart } = get(); // get() : bring actual store state.
    if (cart.length)
      return cart.map((item) => item.count).reduce((prev, curr) => prev + curr);
    return 0;
  },

  add: (product: IProduct) => {
    const { cart } = get();
    const updatedCart = updateCart(product, cart);
    set({ cart: updatedCart });
  },

  remove: (idProduct: string) => {
    const { cart } = get();
    const updatedCart = removeCart(idProduct, cart);
    set({ cart: updatedCart });
  },

  removeAll: () => set({ cart: [] }),
}));

function updateCart(product: IProduct, cart: CartItem[]): CartItem[] {
  const cartItem = { ...product, count: 1 } as CartItem;

  const productOnCart = cart.map((item) => item._id).includes(product._id);

  if (!productOnCart) cart.push(cartItem);
  else {
    return cart.map((item) => {
      if (item._id === product._id)
        return { ...item, count: item.count + 1 } as CartItem;
      return item;
    });
  }

  return cart;
}

function removeCart(idProduct: string, cart: CartItem[]): CartItem[] {
  return cart
    .map((item) => {
      if (item._id === idProduct.toString())
        return { ...item, count: item.count - 1 };
      return item;
    })
    .filter((item) => {
      return item.count;
    });
}
