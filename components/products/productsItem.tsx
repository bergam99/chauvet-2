import { IProduct } from "@/types/products";
import Image from "next/image";
import Link from "next/link";
import classes from "./productsItem.module.css";
interface ProductsItemProps {
  product: IProduct;
}

const ProductsItem = ({ product }: ProductsItemProps) => {
  return (
    <li>
      <Link href={`/products/${product._id}`}>
        <div>
          <Image
            src={product.images[0]?.url}
            alt={product.name}
            width={300}
            height={200}
            className={classes.img}
          />
          <div className={classes.description}>
            <h2 className={classes.name}>{product.name}</h2>

            <button className={` DefaultButton ${classes.detail}`}>
              Voir plus
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductsItem;
