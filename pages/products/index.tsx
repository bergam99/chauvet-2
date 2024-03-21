import { IProduct } from "@/types/products";
import { GetServerSideProps, NextPage } from "next";
import { getProducts } from "@/utils/extract";
import ProductsItem from "@/components/products/productsItem";
import classes from "./products.module.css";
import { getLatestProduct } from "@/utils/getLatestProduct";
import Image from "next/image";
import { imageStyle } from "@/utils/imageStyle";
import Link from "next/link";
interface ProductsProps {
  products: IProduct[];
}

const ProductsPage: NextPage<ProductsProps> = ({ products }) => {
  const mainProduct = getLatestProduct(products);
  const mainPdImg = mainProduct?.images[1]?.url || "";
  const mainPdAlt = mainProduct?.name || "";

  return (
    <>
      <div className={classes.mainProductContainer}>
        <Image
          src={mainPdImg}
          alt={mainPdAlt}
          width={1170}
          height={840}
          style={imageStyle}
          priority={true}
        />
        <h2 className={`${classes.heading} Heading`}>Shop</h2>
        <div className={classes.mainBottom}>
          <p className={classes.bottomTxt}>
            Commandez nos magazines et ayez des idées pour partir ou voyagez
            dans votre chambre au chaud ..
          </p>
          <Link
            href={`/products/${mainProduct?._id}`}
            className={classes.button}
          >
            <button className="DefaultButton">Voir plus</button>
          </Link>
        </div>
      </div>

      <ul className={classes.gridContainer}>
        {products?.map((product) => (
          <ProductsItem key={product._id.toString()} product={product} />
        ))}
      </ul>
    </>
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
