//  @/products
import { IProduct } from "@/types/product";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import NestedLayout from "@/components/layout/nestedLayout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "@/types/next";

interface ProductsProps {
  products: IProduct[];
}

const ProductsPage: NextPageWithLayout<ProductsProps> = ({ products }) => {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products?.map((product) => (
          <li key={product?._id}>
            <Image
              src={product?.images[0]?.url}
              alt={product?.name}
              width={100}
              height={100}
            />
            <h2>{product?.name}</h2>
            <p>{product?.description}</p>
            <p>{product?.price}</p>
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
  const apiUrl = process.env.DB_HOST;
  const res = await fetch(`${apiUrl}/api/products`);
  const { products } = await res.json();

  if (products.length === 0) {
    return { notFound: true };
  }

  return {
    props: { products },
  };
};

ProductsPage.getLayout = (page: ReactElement) => (
  <NestedLayout>{page}</NestedLayout>
);

export default ProductsPage;
