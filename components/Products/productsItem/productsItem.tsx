import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface ProductsItemProps {
  product: IProduct;
}

const ProductsItem = ({ product }: ProductsItemProps) => {
  return (
    <li>
      <Image
        src={product.images[0]?.url}
        alt={product.name}
        width={100}
        height={100}
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <Link href={`/products/${product._id}`}>
        <button className="DefaultButton">Voir plus</button>
      </Link>
    </li>
  );
};

export default ProductsItem;
