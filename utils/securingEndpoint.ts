import { NextApiResponse } from "next";
import { JWT } from "next-auth/jwt";

export function securingEndpoint(
  token: JWT | null,
  user_id: string | undefined,
  res: NextApiResponse
) {
  if (!token || !user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
