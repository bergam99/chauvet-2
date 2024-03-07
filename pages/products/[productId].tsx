import { GetServerSideProps, NextPage } from "next";
import { IProduct } from "@/types/product";
import { getProduct } from "@/utils/extract";
import ProductInfo from "@/components/Products/productItem/productInfo/productInfo";
import ProductDescription from "@/components/Products/productItem/productDescription/productDescription";
import GoBack from "@/components/Buttons/goBack/goBack";

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
