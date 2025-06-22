import { auth } from "@clerk/nextjs/server";

/**
 * Returns the signed-in user's ID or null if not signed in
 */
export async function getUserId() {
  const { userId } = await auth();
  return userId ?? null;
}