//  ensures that GET and POST requests sent to this endpoint (api/auth/[...nextauth]) will be handled by the next-auth library

import NextAuth from "next-auth/next";
import { options } from "./auth/[...nextauth]";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
