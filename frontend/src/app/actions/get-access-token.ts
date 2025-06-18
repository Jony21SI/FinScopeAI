"use server";

import { auth0 } from "../../lib/auth0";

export async function getAccessTokenFromAuth0() {
  try {
    const session = await auth0.getSession();
    // The access token is nested inside tokenSet
    return session?.tokenSet?.accessToken || session?.accessToken;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
}
