import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
      authorization: {
        params: {
          scope: "email,public_profile",
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

const nextauth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default nextauth;
