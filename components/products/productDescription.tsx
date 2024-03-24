import Image from "next/image";
import classes from "./productDescription.module.css";

interface ProductImage {
  url: string;
}

interface productDescriptionProps {
  img: ProductImage[];
  description: string;
}

const productDescription = ({ img, description }: productDescriptionProps) => {
  return (
    <>
      <ul className={classes.imageListContainer}>
        {img?.map((img) => (
          <li key={img.url} className={classes.imageListItem}>
            <Image
              src={img?.url}
              alt={img?.url}
              width={400}
              height={300}
              className={classes.img}
            />
          </li>
        ))}
      </ul>
      <p className={classes.des}>{description}</p>
    </>
  );
};

export default productDescription;
