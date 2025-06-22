"use server"
import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteTask = async (taskId: string) => {
  try {
   
  await db.delete(tasks).where(eq(tasks.id, taskId));
  console.log('User deleted!')
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;

  }
};