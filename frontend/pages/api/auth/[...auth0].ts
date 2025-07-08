import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { auth0 } = req.query;

  // Handle array of auth0 parameters
  const auth0Action = Array.isArray(auth0) ? auth0[0] : auth0;

  if (auth0Action === "login") {
    const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const redirectUri = "http://localhost:3000/api/auth/callback";
    const scope = process.env.AUTH0_SCOPE || "openid profile email";

    // Get screen_hint from query parameters
    const screenHint = req.query.screen_hint;

    let authUrl =
    `${auth0Domain}/authorize?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `response_type=code&` +
    `state=${Math.random().toString(36).substring(7)}` +
    `&audience=${encodeURIComponent("https://api.finescopeai.com")}`;

    // Add screen_hint if provided
    if (screenHint) {
      authUrl += `&screen_hint=${encodeURIComponent(screenHint as string)}`;
    }

    res.redirect(authUrl);
  } else if (auth0Action === "logout") {
    const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const returnTo = "http://localhost:3000";

    const logoutUrl =
      `${auth0Domain}/v2/logout?` +
      `client_id=${clientId}&` +
      `returnTo=${encodeURIComponent(returnTo)}`;

    res.redirect(logoutUrl);
  } else {
    res
      .status(404)
      .json({ error: "Auth0 route not found", action: auth0Action });
  }
}
