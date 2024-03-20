import { GetServerSideProps, NextPage } from "next";
import { IProduct } from "@/types/products";
import { getProduct } from "@/utils/extract";
import ProductInfo from "@/components/products/productItem/ProductInfo/productInfo";
import ProductDescription from "@/components/products/productItem/ProductDescription/productDescription";
import GoBack from "@/components/buttons/goBack/goBack";

type ProductPageProps = {
  product?: IProduct;
};

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  if (!product) return <div>product not found</div>;

  return (
    <>
      <GoBack />
      <ProductInfo
        name={product.name}
        description={product.description}
        price={product.price.toString()}
        img={product.images}
        stock={product.stock}
      />

      <ProductDescription
        img={product.images}
        description={product.description}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productId = context.params?.productId?.toString();

  try {
    const product = await getProduct(productId);
    return {
      props: { product },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default ProductPage;
