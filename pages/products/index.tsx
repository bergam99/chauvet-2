import { IProduct } from "@/types/product";
import { GetServerSideProps } from "next";
import { NextPageWithLayout } from "@/types/next";
import { getProducts } from "@/utils/rendering";
import ProductsItem from "@/components/Products/productsItem/productsItem";

interface ProductsProps {
  products: IProduct[];
}

const ProductsPage: NextPageWithLayout<ProductsProps> = ({ products }) => {
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
