import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

const options = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      scope: "email",
      scope: "public_profile",
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
