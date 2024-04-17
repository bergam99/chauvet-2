import { IProduct } from "@/types/products";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// retrieve a list of active products from Stripe
const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list(); // list() : calls the Stripe API to get a list of all products
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true
  );
  return availableProducts;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = req.body;

  // creating the products from front-end (cart)
  try {
    const activeProducts = await getActiveProducts();

    for (const product of products) {
      const stripeProduct = activeProducts.find(
        (sp: IProduct) => sp.name.toLowerCase() === product.name.toLowerCase() //avoid case sensetive pb (double fetch)
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
    res.status(200).json({ message: "Products synchronized with Stripe." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }

  // ====== create payment session =====
  try {
    // get updated products
    const activeProducts = await getActiveProducts();

    let stripeItems: any = [];
    for (const product of products) {
      const stripeProduct = activeProducts?.find(
        (prod: any) => prod?.name.toLowerCase() === product?.name.toLowerCase()
      );

      if (!stripeProduct) {
        throw new Error(`Product not found: ${product.name}`);
      }

      if (!product.quantity || product.quantity < 1) {
        throw new Error(
          `Quantity is required and must be at least 1 for: ${product.name}`
        );
      }

      if (stripeProduct) {
        stripeItems.push({
          price: stripeProduct?.default_price,
          quantity: product?.quantity,
        });
      }
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      };
    }

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
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
    console.error("Error in creating Stripe session:", error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
}
