// import clientPromise from "../lib/mongodb";

// type pd = {
//   products: Object;
// };

// export default function Movies({ products }) {
//   return (
//     <div>
//       <h1>Top 20 products of All Time</h1>
//       <p>
//         <small>(According to Metacritic)</small>
//       </p>
//       <ul>
//         {products.map((product) => (
//           <li key={product._id}>
//             <h2>{products.name}</h2>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export async function getServerSideProps() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("products");

//     const movies = await db
//       .collection("products")
//       .find({})
//       .sort({ metacritic: -1 })
//       .limit(20)
//       .toArray();

//     return {
//       props:
//       { products: JSON.parse(JSON.stringify(products)) },
//     };
//   } catch (e) {
//     console.error(e);
//   }
// }
// pages/products/index.tsx
import { GetServerSideProps } from "next";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

type Props = {
  products: Product[];
};

export default function ProductsPage({ products }: Props) {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link href={`/products/${product._id}`}>
              <a>{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("/api/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const products: Product[] = await res.json();
  if (!products) {
    console.log("no pds found");
  }

  return { props: { products } };
};
