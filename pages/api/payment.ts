import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
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
  // ====== creating the products from front-end (cart) ======
  const { products } = req.body;
  try {
    const activeProducts = await getActiveProducts();

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
          active: true,
        });
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

      if (stripeProduct) {
        stripeItems.push({
          price: stripeProduct?.default_price,
          quantity: product?.count,
        });
      }
    }

    const baseUrl = process.env.BASE_URL;
    const successUrl = `${baseUrl}/payment-success`;
    const cancelUrl = `${baseUrl}/payment-failed`;

    const session = await stripe.checkout.sessions.create({
      line_items: stripeItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
}
