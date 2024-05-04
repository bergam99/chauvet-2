import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/connectDB";
import { getToken } from "next-auth/jwt";
import { securingEndpoint } from "@/utils/securingEndpoint";
// import serverSideCheckoutFormValidation from "./../../utils/serverSideCheckoutFormValidation";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const token = await getToken({ req });

    // serverside validation!! => third party?
    // const SSvalidationError = serverSideCheckoutFormValidation(req.body);
    // if (Object.keys(SSvalidationError).length > 0) {
    //   return res.status(422).json({ SSvalidationError });
    // }

    const user_id = token?.sub;

    securingEndpoint(token, user_id, res);

    const db = await connectDB();
    const userAddressCollection = db.collection("UserAddress");
    // const existingUserAddress = await userAddressCollection.findOne({
    //   user_id,
    // });
    const { ...newUserAddress } = req.body;

    // if (existingUserAddress) {
    //   await userAddressCollection.updateOne(
    //     { user_id },
    //     { $set: newUserAddress }
    //   );
    //   res
    //     .status(201)
    //     .json({ message: "User address updated", user_id, newUserAddress });
    // } else {
    await userAddressCollection.insertOne({ user_id, ...newUserAddress });
    res.status(201).json({
      message: "User address created",
      user_id,
      newUserAddress,
    });
    // }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
