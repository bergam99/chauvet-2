import { NextApiRequest, NextApiResponse } from "next";

import { connectDB } from "@/utils/connectDB";
// import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getSession({ req });
  // console.log({ session });

  const token = await getToken({ req });

  if (!token) {
    return res.status(401).json({ error: "You should login." });
  }

  if (req.method === "POST") {
    const prenom = req.body.prenom; //retreive
    const civilite = req.body.civilite;
    const nom = req.body.nom;
    const address = req.body.address;
    const addressSupp = req.body.addressSupp;
    const codePostal = req.body.codePostal;
    const city = req.body.city;
    const region = req.body.region;
    const country = req.body.country;
    const additionnalInfo = req.body.additionnalInfo;
    const tel = req.body.tel;
    const tel2 = req.body.tel2;

    // server side validation
    // if (!prenom || prenom.trim() === "" || !prenom.includes("@")) {
    //   res.status(422).json({ message: "invalid prenom address." });
    //   return; // cancel this function execution
    // }

    const userId = token?.sub;

    const db = await connectDB();
    const userInfosCollection = db.collection("userInfos");
    const existingUserInfo = await userInfosCollection.findOne({ userId });

    const newObject = {
      userId,
      civilite,
      prenom,
      nom,
      address,
      addressSupp,
      codePostal,
      city,
      region,
      country,
      additionnalInfo,
      tel,
      tel2,
    };

    if (existingUserInfo) {
      await userInfosCollection.updateOne({ userId }, { $set: newObject });
      res.status(201).json({ message: "updated user Info", newObject });
    } else {
      await userInfosCollection.insertOne(newObject);
      res.status(201).json({ message: "created user info", newObject });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
