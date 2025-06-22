import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export const showTask = async (userId: string) => {
  const tasksToShow = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, userId));

  return tasksToShow;
};
