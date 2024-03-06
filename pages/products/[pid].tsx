//  @products/:[pid]
import { GetServerSideProps } from "next";
import { IProduct } from "@/types/product";
import { NextPageWithLayout } from "@/types/next";
import { getProduct } from "@/utils/rendering";
import ProductInfo from "@/components/Products/productItem/productInfo/productInfo";
import ProductDescription from "@/components/Products/productItem/productDescription/productDescription";
import GoBack from "@/components/Buttons/goBack/goBack";

type ProductPageProps = {
  product?: IProduct;
};

const ProductPage: NextPageWithLayout<ProductPageProps> = ({ product }) => {
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
  const pid = context.params?.pid?.toString();

  try {
    const product = await getProduct(pid);
    return {
      props: { product },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default ProductPage;

// todos---
// créer stock table. qui prend les produits en array.
// product details page ne pas fetcher
// getProduct, getproducts ... faire des fonctions dans ts page et appeler
// post page
