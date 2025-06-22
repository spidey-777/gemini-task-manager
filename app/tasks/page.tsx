import { Button } from "@/components/ui/button";
import { showTask } from "@/lib/showTask";
import Link from "next/link";
import React from "react";
import SingleTask from "./singleTask";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

async function TaskPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="p-10 space-y-4">
        <h1 className="text-xl">Please sign in first to view your tasks</h1>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </div>
    );
  }

  const tasks = await showTask(userId); // pass userId explicitly

  if (tasks.length === 0) {
    return (
      <div className="p-10">
        <h1 className="text-2xl mb-4">No tasks found. Please generate tasks.</h1>
        <Link href="/generate">
          <Button>Generate Tasks</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-10 space-y-4">
      {tasks.map((task) => (
        <SingleTask key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskPage;
