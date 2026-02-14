
import { jwtVerify } from "jose";

export default async function getMyToken() {
  const encryptedToken = {
    value: "login"
  };

  if (!encryptedToken?.value) {
    throw new Error("No token found");
  }

  if (!process.env.AUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET not defined in env");
  }
  const secretKey = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

  try {
  
    const { payload } = await jwtVerify(encryptedToken.value, secretKey);

    
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
