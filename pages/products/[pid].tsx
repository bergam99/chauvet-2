//  @products/:[pid]
import { GetServerSideProps, NextPage } from "next";
import { IProduct } from "@/types/product";
import Image from "next/image";
import { NextPageWithLayout } from "@/types/next";
import NestedLayout from "@/components/layout/nestedLayout";
import { ReactElement } from "react";
import { useRouter } from "next/router";

type ProductDetailPageProps = {
  detail?: IProduct;
};

const ProductDetailPage: NextPageWithLayout<ProductDetailPageProps> = ({
  detail,
}) => {
  const router = useRouter();

  if (!detail) return <div>detail not found</div>;

  return (
    <>
      <button className="Link" type="button" onClick={() => router.back()}>
        retour
      </button>
      <br />
      <Image
        src={detail?.images[0]?.url}
        alt={detail?.name}
        width={100}
        height={100}
      />
      <h1>{detail.name}</h1>
      <p>{detail.description}</p>
      <p>{detail.price}</p>

      <button type="button" disabled={detail.stock <= 0}>
        Ajouter au panier
      </button>

      <p>{detail?.stock <= 0 && "stock épuisé"}</p>
      <p>{detail?.description}</p>
      {detail?.images?.map((img) => (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pid = context.params?.pid;

  const apiUrl = process.env.DB_HOST;
  const res = await fetch(`${apiUrl}/api/products`);
  const { products } = await res.json();

  const detail = products.find((product: IProduct) => product._id === pid);

  if (detail.length === 0) {
    return { notFound: true };
  }

  return {
    props: { detail: detail || null },
  };
};

ProductDetailPage.getLayout = (page: ReactElement) => (
  <NestedLayout>{page}</NestedLayout>
);

export default ProductDetailPage;
