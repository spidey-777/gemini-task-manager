"use client";

import { callGimini } from "@/backend/action/callGemini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useActionState, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";
import { AddTaskTodb } from "@/lib/AddTask";
import { toast } from "react-toastify";

type TaskState = {
  tasks: string[];
  error?: string;
};

export default function GenerateTaskes() {

  const initialState: TaskState = { tasks: [] as string[] };
  const [formState, formAction] = useActionState(callGimini, initialState);
  const [tasksAdded, setTasksAdded] = useState(false);
    useEffect(() => {
  if (formState.tasks.length > 0) {
    setTasksAdded(false);
  }
}, [formState.tasks]);
  const [topic, setTopic] = useState("");
  const handleAddTask = async () => {
    if (!formState.tasks.length) {
      toast("Please generate tasks first.");
      return;
    }

    if (tasksAdded) {
      toast("Tasks already added.");
      return;
    }

    const tasksToAdd = formState.tasks.map((desc) => ({
      title: topic,
      description: desc,
    }));

    try {
      await AddTaskTodb(tasksToAdd);
      toast("Tasks added!");
      setTasksAdded(true); // prevent further adds
      setTopic("");

    } catch (err) {
      console.log("Failed to save tasks:", err);
    }

  };

  const { isSignedIn } = useUser();
  if (!isSignedIn) {
    return (
      <div className="mt-10 ml-10 flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Please sign in to continue</h1>
        <SignInButton mode="modal">
          <Button variant="outline" className="w-fit">
            Sign In
          </Button>
        </SignInButton>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-3xl mb-3">Ask what you want to learn</h1>
        <form action={formAction} className="flex gap-4">
          <Input
            name="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g. Learn Python)"
            className="h-10 w-120"
          />
          <Button
            type="submit"
            className="cursor-pointer transform transition-transform duration-200 hover:scale-105"
          >
            Submit
          </Button>
        </form>
        {formState?.error && (
          <div className="bg-red-500 mt-4 max-w-120 text-white">
            <h1 className="mx-2 my-2 ">{formState.error}</h1>
          </div>
        )}

        {formState.tasks.length > 0 && (
          <Card className="bg-gray-700 max-w-120">
            <CardHeader>
              <CardTitle>Generated Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-6 text-left">
                <ul className="list-disc mt-2 pl-4">
                  {formState.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <div className="inline-flex rounded-md shadow-xs">
                <Button
                  onClick={handleAddTask}
                  disabled={tasksAdded}
                  className={`px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-s-lg ${
                    tasksAdded
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  } dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
                >
                  {tasksAdded ? "Added" : "Add Task"}
                </Button>
                <Link href="/tasks">
                  <Button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    manage tasks
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
