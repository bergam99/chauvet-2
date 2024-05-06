import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "../../../utils/connectDB";

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
  callbacks: {
    async signIn({ user }) {
      // Executed when login
      const { email, name } = user; // extract email, name
      const db = await connectDB();
      const userCollection = db.collection("Users"); // select db name to register
      const existingUser = await userCollection.findOne({ email, name });

      if (existingUser) {
        await userCollection.updateOne({ email }, { $set: { name: name } }); // Update the name in case it has changed
        user.id = existingUser._id.toString(); // _id for user ID in DB
      } else {
        const { insertedId } = await userCollection.insertOne({
          email,
          name,
        });
        user.id = insertedId.toString(); // Use the inserted ID as the user ID
      }
      return true; // Return true to proceed with the sign in
    },
    // include id in session & jwt
    async session({ session, token }) {
      if (session && token.sub) {
        // Check if session and token.sub are defined
        if (!session.user) {
          session.user = {}; // Initialize session.user if it's undefined
        }
        session.user.id = token.sub; // Include the user ID in the session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id; // Store the user ID in the JWT token
      }
      return token;
    },
  },
};

const nextauth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default nextauth;
