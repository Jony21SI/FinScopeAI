import { cookies } from "next/headers";

export interface User {
  auth0Id: string;
  email?: string;
  name?: string;
  picture?: string;
}

export interface Session {
  user: User;
  accessToken: string;
  idToken: string;
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;
  const idToken = cookieStore.get("id_token")?.value;
  const userId = cookieStore.get("user_id")?.value;

  if (!accessToken || !idToken || !userId) {
    return null;
  }

  // Decode the ID token to get user info
  try {
    const payload = JSON.parse(
      Buffer.from(idToken.split(".")[1], "base64").toString()
    );

    return {
      user: {
        auth0Id: userId,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      },
      accessToken,
      idToken,
    };
  } catch (error) {
    console.error("Error decoding ID token:", error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}
