//  @products/:[pid]
import { GetServerSideProps } from "next";
import { IProduct } from "@/types/product";
import Image from "next/image";
import { NextPageWithLayout } from "@/types/next";
import { useRouter } from "next/router";
import { connectDB } from "@/utils/connectDB";

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
  const pid = parseInt(context.params?.pid?.toString() ?? "", 10);

  if (!pid) {
    return { notFound: true };
  }
  // try
  // extract method
  //
  const db = await connectDB();
  const product = await db
    .collection<IProduct>("products")
    .findOne({ _id: pid });
  // const apiUrl = process.env.DB_HOST;
  // const res = await fetch(`${apiUrl}/api/products`);
  // const { products } = await res.json();

  // const detail = products.find((product: IProduct) => product._id === pid);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
  };
};

// ProductDetailPage.getLayout = (page: ReactElement) => (
//   <NestedLayout>{page}</NestedLayout>
// );

export default ProductDetailPage;

// créer stock table. qui prend les produits en array.
// product details page ne pas fetcher
// uml avec "s" image"s"
// getProduct, getproducts ... faire des fonctions dans ts page et appeler
// post page
