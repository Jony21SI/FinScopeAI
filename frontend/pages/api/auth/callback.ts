import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is required" });
  }

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "authorization_code",
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          code: code,
          redirect_uri: "http://localhost:3000/api/auth/callback",
        }),
      }
    );

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error("Token exchange failed:", error);
      return res
        .status(400)
        .json({ error: "Failed to exchange authorization code" });
    }

    const tokens = await tokenResponse.json();

    // Get user info using the access token
    const userInfoResponse = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      console.error("Failed to get user info");
      return res.status(400).json({ error: "Failed to get user info" });
    }

    const userInfo = await userInfoResponse.json();

    // Send user data to backend
    const backendResponse = await fetch(
      "http://localhost:3001/users/auth0-callback",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth0Id: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          accessToken: tokens.access_token,
          idToken: tokens.id_token,
        }),
      }
    );

    if (!backendResponse.ok) {
      console.error("Failed to store user in backend");
      // Continue with redirect even if backend storage fails
    }

    // Store tokens in cookies (you might want to use a more secure method)
    res.setHeader("Set-Cookie", [
      `access_token=${tokens.access_token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${tokens.expires_in}`,
      `id_token=${tokens.id_token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${tokens.expires_in}`,
      `user_id=${userInfo.sub}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${tokens.expires_in}`,
    ]);

    // Redirect to dashboard
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Callback error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
