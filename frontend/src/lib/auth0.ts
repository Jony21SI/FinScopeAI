// lib/auth0.ts

import { Auth0Client } from "@auth0/nextjs-auth0/server";

// Initialize the Auth0 client
export const auth0 = new Auth0Client({
  // The following environment variables need to be set in your .env.local file:
  // AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
  // AUTH0_BASE_URL='http://localhost:3000'
  // AUTH0_ISSUER_BASE_URL='https://your-domain.auth0.com'
  // AUTH0_CLIENT_ID='your-client-id'
  // AUTH0_CLIENT_SECRET='your-client-secret'
  // AUTH0_AUDIENCE='your-api-identifier'
  // AUTH0_SCOPE='openid profile email read:users'

  authorizationParameters: {
    scope: process.env.AUTH0_SCOPE || "openid profile email",
    audience: process.env.AUTH0_AUDIENCE,
  },
});
