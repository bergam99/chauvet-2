//  @products/:[pid]
import { GetServerSideProps } from "next";
import { IProduct } from "@/types/product";
import Image from "next/image";
import { NextPageWithLayout } from "@/types/next";
import { useRouter } from "next/router";
import { connectDB } from "@/utils/connectDB";
import { ObjectId } from "mongodb";
import { serializeMongoObjectId } from "@/utils/parse";

type ProductDetailPageProps = {
  product?: IProduct;
};

const ProductDetailPage: NextPageWithLayout<ProductDetailPageProps> = ({
  product,
}) => {
  const router = useRouter();

  if (!product) return <div>product not found</div>;

  return (
    <>
      <button className="Link" type="button" onClick={() => router.back()}>
        retour
      </button>
      <br />
      <Image
        src={product?.images[0]?.url}
        alt={product?.name}
        width={100}
        height={100}
      />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>

      <button type="button" disabled={product.stock <= 0}>
        Ajouter au panier
      </button>

      <p>{product?.stock <= 0 && "stock épuisé"}</p>
      <p>{product?.description}</p>
      {product?.images?.map((img) => (
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
  const pid = context.params?.pid?.toString();

  if (!pid) {
    return { notFound: true };
  }

  try {
    const db = await connectDB();
    const product = await db
      .collection<IProduct>("products")
      .findOne({ _id: new ObjectId(pid) });

    if (!product) {
      return { notFound: true };
    }

    const serializedProduct = serializeMongoObjectId(product);

    return {
      props: { product: serializedProduct },
    };
  } catch (error) {
    return {
      props: {
        error: "Product fetch failed",
      },
    };
  }
};

export default ProductDetailPage;

// créer stock table. qui prend les produits en array.
// product details page ne pas fetcher
// mcd avec "s" image"s"
// getProduct, getproducts ... faire des fonctions dans ts page et appeler
// post page
