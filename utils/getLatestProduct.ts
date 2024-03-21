// get main product in products page (header level).

import { IProduct } from "@/types/products";

export function getLatestProduct(products: IProduct[]): IProduct | null {
  if (products.length === 0) {
    return null;
  }

  const sortedProducts = products.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  // Date : transform string to Date object.
  // getTime() : transform to milisec

  return sortedProducts[0];
}
