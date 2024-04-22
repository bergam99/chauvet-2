import { NextApiRequest, NextApiResponse } from "next";
// import { getToken } from "next-auth/jwt";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list(); // list() : get all products
  const availableProducts = checkProducts.data.filter(
    (product) => product.active === true
  );
  return availableProducts;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // User
  // const token = await getToken({ req });
  // const user_email = token?.email;

  // ====== creating the products from front-end (cart) ======
  const { products } = req.body;
  console.log({ products });
  console.log(products[1]?.images[0]?.url);

  try {
    const activeProducts = await getActiveProducts(); // available products

    for (const product of products) {
      const stripeProduct = activeProducts.find(
        (sp) => sp.name.toLowerCase() === product.name.toLowerCase() //avoid case sensetive pb (double fetch)
      );

      // if product don't exists on stripe dashboard then create one
      if (!stripeProduct) {
        await stripe.products.create({
          // create() : build stripe fc
          name: product.name,
          default_price_data: {
            unit_amount: product.price * 100,
            currency: "EUR",
          },
          // images: [product?.images?.url[0]],
          active: true,
        });
        // console.log("product created on stripe product catalog");
      }
    }

    // // ====== create payment session =====

    let stripeItems: any = [];
    for (const product of products) {
      const stripeProduct = activeProducts?.find(
        (prod) => prod?.name.toLowerCase() === product?.name.toLowerCase()
      );

      if (!stripeProduct) {
        throw new Error(`Product not found: ${product.name}`);
      }

      // If available product push to stripeItems array to create session (price: default unit price, quantity: cart quantity)
      // console.log(product?.images.url[0]);
      // console.log({ product });
      if (stripeProduct) {
        stripeItems.push({
          price: stripeProduct?.default_price,
          quantity: product?.count,
        });
        console.log({ stripeItems });
      }
    }

    const baseUrl = process.env.BASE_URL;
    const successUrl = `${baseUrl}/payment-success`;
    const cancelUrl = `${baseUrl}/payment-failed`;

    // session create
    const session = await stripe.checkout.sessions.create({
      line_items: stripeItems, // order items
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    // customer_email: user_email,
    // client_reference_id: token?.sub

    return res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
}
