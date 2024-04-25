import { IProduct } from "@/types/products";
import { create } from "zustand";

export interface CartItem extends IProduct {
  count: number;
}

type CartStore = {
  cart: CartItem[];
  count: () => number;
  add: (product: IProduct) => void;
  remove: (idProduct: string) => void;
  clearCart: () => void;
  loadCart: () => void;
};

// load cart data stored in session storage
const loadCartFromSessionStorage = (): CartItem[] => {
  // verify if client side (is execution in browser?)
  if (typeof window !== "undefined") {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return []; // if not client side return []
};

const saveCartToSessionStorage = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
};

// =============================================================
// create useCartStore. take state param & callback functions for update
export const useCartStore = create<CartStore>((set, get) => ({
  cart: [], // load previous session storage

  loadCart: () => {
    const cart = loadCartFromSessionStorage(); // Load the cart from sessionStorage
    set({ cart });
  },

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
    saveCartToSessionStorage(updatedCart);
  },

  remove: (idProduct: string) => {
    const { cart } = get();
    const updatedCart = removeCart(idProduct, cart);
    set({ cart: updatedCart });
    saveCartToSessionStorage(updatedCart);
  },

  clearCart: () => {
    set({ cart: [] });
    saveCartToSessionStorage([]);
  },
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
  return cart.filter((item) => item._id !== idProduct);
}
