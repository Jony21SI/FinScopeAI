import { getAccessTokenFromAuth0 } from "./get-access-token";

export async function callNestApi() {
  const token = await getAccessTokenFromAuth0();
  console.log("Access Token:", token);

  const res = await fetch("http://localhost:3000/protected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}
