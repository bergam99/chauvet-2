import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/connectDB";
import { getToken } from "next-auth/jwt";
import { securingEndpoint } from "@/utils/securingEndpoint";
import { schema } from "@/utils/yupFormValidation";
import * as Yup from "yup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const token = await getToken({ req });

    const user_id = token?.sub;

    securingEndpoint(token, user_id, res);

    const db = await connectDB();
    const userAddressCollection = db.collection("UserAddresses");
    const { ...newUserAddress } = req.body;

    // Server side validation
    try {
      const validatedData = await schema.validate(req.body, {
        abortEarly: true,
      });
      res.status(200).json(validatedData);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        return res.status(400).json({ errors: err });
      }
    }

    await userAddressCollection.insertOne({ user_id, ...newUserAddress });
    res.status(201).json({
      message: "User address created",
      user_id,
      newUserAddress,
    });
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
