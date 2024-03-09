import { IProduct } from "@/types/products";
import { GetServerSideProps, NextPage } from "next";
import { getProducts } from "@/utils/extract";
import ProductsItem from "@/components/products/productsItem/productsItem";

interface ProductsProps {
  products: IProduct[];
}

const ProductsPage: NextPage<ProductsProps> = ({ products }) => {
  return (
    <div>
      <h3 className="Heading">Shop</h3>
      <ul>
        {products?.map((product) => (
          <ProductsItem key={product._id.toString()} product={product} />
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const products = await getProducts();
    return {
      props: { products },
    };
  } catch (error) {
    return { notFound: true };
  }
};
export default ProductsPage;
