import { getAuth } from "firebase-admin/auth";

export async function issueCustomTokenForEmail(email: string) {
  const auth = getAuth();

  let user;
  try {
    user = await auth.getUserByEmail(email);
  } catch (e: any) {
    if (e.code === "auth/user-not-found") {
      user = await auth.createUser({ email });
    } else {
      throw e;
    }
  }

  const customToken = await auth.createCustomToken(user.uid);
  return { uid: user.uid, customToken };
}
