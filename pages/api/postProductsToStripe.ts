import { IProduct } from "@/types/products";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// only fetch active product
const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
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
    let activeProducts = await getActiveProducts();

    for (const product of products) {
      const stripeProduct = activeProducts.find(
        (sp: any) => sp.name.toLowerCase() === product.name.toLowerCase() //avoid case sensetive pb (double fetch)
      );

      // if product don't exists on stripe dashboard then create one
      if (!stripeProduct) {
        await stripe.products.create({
          // create : build stripe fc
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

  // return res.json({ url: "" });
}
