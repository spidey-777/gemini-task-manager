"use server";
import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";



type TaskData = {
  title: string;
  description: string;
};

export const AddTaskTodb = async (taskList:TaskData[])=>{
      const { userId } = await auth(); 
  if (!userId) throw new Error("User not authenticated");
  if (taskList.length === 0) throw new Error("Please provide tasks.");
  const values = taskList.map(task => ({
    userId,             
    title: task.title,
    description: task.description,
  }));
  try {
    await db.insert(tasks).values(values);
    console.log("Tasks inserted successfully!");
  } catch (error) {
    console.dir("Error inserting tasks:", error);
    throw error;
  }
}