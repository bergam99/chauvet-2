// pages/products/[id].tsx
import { GetServerSideProps } from "next";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

type Props = {
  product: Product;
};
const ProductPage = ({ product }: Props) => {
  return (
    <div>
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

// export default function ProductPage({ product }: Props) {
//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <p>{product.description}</p>
//       <p>${product.price}</p>
//     </div>
//   );
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch("/api/products/products");
  const product: Product = await res.json();

  return { props: { product } };
};

export default ProductPage;
