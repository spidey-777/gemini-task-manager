"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(API_KEY);

interface TaskState {
  tasks: string[];
  error?: string;
}

export async function callGimini(
  _prevState: TaskState,
  formData: FormData
): Promise<TaskState> {
  const topic = formData.get("topic")?.toString();
  if (!topic) return { tasks: [], error: "No topic provided" };

  const prompt = `Generate a list of 5 concise, actionable tasks to learn about ${topic}. Return only the tasks, no numbering or formatting.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const tasks = text
      .split("\n")
      .map((task) => task.trim())
      .filter(Boolean);

    return { tasks };
  } catch (error) {
    console.error(error);
    return { tasks: [], error: "Something went wrong." };
  }
}