import Image from "next/image";

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
      <p>{description}</p>
      {img?.map((img) => (
        <Image
          src={img?.url}
          alt={img?.url}
          key={img.url}
          width={100}
          height={100}
        />
      ))}
    </>
  );
};

export default productDescription;
