// import { NextApiRequest, NextApiResponse } from "next";

import { connectDB } from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email; //retreive

    // server side validation
    if (!email || email.trim() === "" || !email.includes("@")) {
      res.status(422).json({ message: "invalid email address." });
      return; // cancel this function execution
    }

    const db = await connectDB();
    // const userId = session?.user?.id;

    const newObject = {
      id: new Date().toISOString(),
      email,
    };

    await db.collection("userInfos").insertOne({ newObject });

    res.status(201).json({ message: "this works", newObject });
  }
  // else {
  //   res.status(405).end(`Method ${req.method} Not Allowed`);
  // }
}

// import { getSession } from "next-auth/react";
// import { connectDB } from "@/utils/connectDB";
// import UserInfo from "@/types/checkoutUserInfo";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const session = await getSession({ req });

//   if (!session) {
//     return res.status(401).json({ error: "로그인해야 합니다." });
//   }

//   if (req.method === "POST") {
//     await connectDB();
//     const userId = session?.user?.id;
//     const { address } = req.body;

//     const newAddress = await UserInfo.create({ userId, ...address });

//     res.status(200).json({ success: true, address: newAddress });
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
