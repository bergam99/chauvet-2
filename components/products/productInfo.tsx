import Image from "next/image";

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
    <>
      <Image src={img[0]?.url} alt={name} width={100} height={100} />
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{price}</p>
      <button type="button" disabled={stock <= 0}>
        Ajouter au panier
      </button>

      <p>{stock <= 0 && "stock épuisé"}</p>
    </>
  );
};

export default ProductInfo;
