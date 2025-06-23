import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Clear authentication cookies
  res.setHeader("Set-Cookie", [
    "access_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
    "id_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
    "user_id=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
  ]);

  // Redirect to Auth0 logout
  const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const returnTo = "http://localhost:3000";

  const logoutUrl =
    `${auth0Domain}/v2/logout?` +
    `client_id=${clientId}&` +
    `returnTo=${encodeURIComponent(returnTo)}`;

  res.redirect(logoutUrl);
}
