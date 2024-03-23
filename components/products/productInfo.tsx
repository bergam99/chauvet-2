import Image from "next/image";
import classes from "./productInfo.module.css";
import Link from "next/link";
interface ProductImage {
  url: string;
}

interface ProductInfoProps {
  name: string;
  description: string;
  price: string;
  img: ProductImage[];
  stock: number;
}

const ProductInfo = ({
  name,
  description,
  price,
  img,
  stock,
}: ProductInfoProps) => {
  return (
    <section className={classes.infoContainer}>
      <Image
        src={img[0]?.url}
        alt={name}
        width={400}
        height={300}
        className={classes.img}
      />
      <div className={classes.mainInfo}>
        <h2 className={`${classes.title} Link`}>{name}</h2>
        <p className={classes.des}>{description}</p>
        <p className={classes.price}>{price} €</p>
        <div className={classes.gap}></div>
        <p className={classes.stock}>{stock <= 0 && "stock épuisé"}</p>
        {/* add disabled color className from global.css when 0 stock */}

        <button
          type="button"
          disabled={stock <= 0}
          className={`${classes.btn} DefaultButton`}
        >
          Ajouter au panier
        </button>
      </div>
    </section>
  );
};

export default ProductInfo;
