import { GetServerSideProps, NextPage } from "next";
import { IProduct } from "@/types/products";
import { getProduct } from "@/utils/extract";
import GoBack from "@/components/buttons/goBack";
import ProductInfo from "@/components/products/productInfo";
import ProductDescription from "@/components/products/productDescription";

type ProductPageProps = {
  product?: IProduct;
};

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  if (!product) return <div>product not found</div>;

  return (
    <>
      <GoBack />
      <ProductInfo product={product} />

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
