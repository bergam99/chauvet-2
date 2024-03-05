//  @/products
import { IProduct } from "@/types/product";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { NextPageWithLayout } from "@/types/next";
import { connectDB } from "@/utils/connectDB";

interface ProductsProps {
  products: IProduct[];
}

const ProductsPage: NextPageWithLayout<ProductsProps> = ({ products }) => {
  return (
    <div>
      <h3 className="Heading">Shop</h3>
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
              <button className="DefaultButton">Voir plus</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // const apiUrl = process.env.DB_HOST;
  // const res = await fetch(`${apiUrl}/api/products`);
  // const { products } = await res.json();

  //try catch
  // try {

  // } catch (error) {

  // }

  const db = await connectDB();

  const products = await db.collection<IProduct>("products").find({}).toArray();
  if (products.length === 0) {
    return { notFound: true };
  }

  return {
    props: { products },
  };
};

export default ProductsPage;
