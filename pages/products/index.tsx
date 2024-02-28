//  @/products
import { IProduct } from "@/types/product";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
interface ProductsProps {
  products: IProduct[];
}

const ProductsPage: NextPage<ProductsProps> = ({ products }) => {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products?.map((product) => (
          <li key={product._id}>
            <Image
              src={product?.images[0]?.url}
              alt={product?.name}
              width={100}
              height={100}
            />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
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
  const apiUrl = process.env.next_public_api_url;
  const res = await fetch(`${apiUrl}/api/products`);
  const { products } = await res.json();

  return {
    props: { products },
  };
};

export default ProductsPage;
