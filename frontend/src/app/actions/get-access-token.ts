import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client();

export async function getAccessTokenFromAuth0() {
  const session = await auth0.getSession();
  return session?.accessToken;
}
