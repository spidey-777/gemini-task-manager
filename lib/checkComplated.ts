'use server'
import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export const toggleCompleted = async (taskId: string, currentStatus: boolean) => {
  try {
    await db
      .update(tasks)
      .set({ isCompleted: currentStatus })
      .where(eq(tasks.id, taskId));
    console.log("Task updated successfully");
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
};
