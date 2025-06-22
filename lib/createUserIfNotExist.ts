import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

type ClerkUser = {
  id: string;
  email: string;
  name?: string;
};

export async function createUserIfNotExists(clerkUser: ClerkUser) {
  const existing = await db.select().from(users).where(eq(users.id, clerkUser.id));

  if (existing.length === 0) {
    await db.insert(users).values({
      id: clerkUser.id,
      email: clerkUser.email,
      name: clerkUser.name ?? "",
    });
  }
}
