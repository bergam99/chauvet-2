import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

interface ProductsProps {
  products: Product[];
}

const ProductsPage: NextPage<ProductsProps> = ({ products }) => {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products?.map((product) => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Link href={`/products/${product._id}`}>
              <button>Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/products`);
  const { products } = await res.json();

  return {
    props: { products },
  };
};

export default ProductsPage;
