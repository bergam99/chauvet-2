import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

const options = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? "",
      clientSecret: process.env.FACEBOOK_SECRET ?? "",
      authorization: {
        params: {
          scope: "email,public_profile", // Specify scopes here, separated by commas
        },
      },
    }),
  ],
};

const nextauth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default nextauth;
