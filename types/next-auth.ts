//  Extend the default session
//  TypeScript declaration merging

import "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in session.user types to include the id property
   */
  interface User {
    id?: string;
  }

  /**
   * Adds the extended User type to the session
   */
  interface Session {
    user?: User;
  }
}
