// import Link from "next/link";
// import { useEffect, useState } from "react";
// type Product = {
//   _id: number;
//   name: String;
// };
// export default function Products() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     async function fetchProducts() {
//       const res = await fetch("/api/products/products");
//       const data = await res.json();
//       setProducts(data);
//     }
//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h1>products</h1>
//       <ul>
//         {products.map((product) => (
//           <li key={product._id}>
//             <Link href={`/product/${product._id}`}>
//               <p>{product.name}</p>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// pages/products/index.tsx
// pages/api/products/index.ts
// pages/products.tsx
import { GetServerSideProps, NextPage } from "next";
import React from "react";

interface Product {
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("/api/products");
  const products = await res.json();

  return {
    props: { products },
  };
};

export default ProductsPage;
