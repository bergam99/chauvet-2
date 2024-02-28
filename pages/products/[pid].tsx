//  @products/:[pid]
import { GetServerSideProps, NextPage } from "next";
import { IProduct } from "@/types/product";
import Image from "next/image";

type ProductDetailPageProps = {
  detail?: IProduct;
};

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ detail }) => {
  if (!detail) return <div>detail not found</div>;

  return (
    <div>
      <Image
        src={detail?.images[0]?.url}
        alt={detail?.name}
        width={100}
        height={100}
      />
      <h1>{detail.name}</h1>
      <p>{detail.description}</p>
      <p>{detail.price}</p>
      <p>{detail?.stock < 0 && "stock épuisé"}</p>

      {detail?.images?.map((img) => (
        <Image
          src={img?.url}
          alt={img?.url}
          key={img.url}
          width={100}
          height={100}
        />
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pid = context.params?.pid;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/products`);
  const { products } = await res.json();

  const detail = products.find((product: IProduct) => product._id === pid);

  return {
    props: { detail: detail || null },
  };
};

export default ProductDetailPage;
