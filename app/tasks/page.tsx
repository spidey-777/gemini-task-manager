import { Button } from "@/components/ui/button";
import { showTask } from "@/lib/showTask";
import Link from "next/link";
import React from "react";
import SingleTask from "./singleTask";

async function TaskPage() {
  const tasks = await showTask();

  if (tasks.length === 0) {
    return (
      <div className="p-10">
        <h1 className="text-2xl mb-4">Please generate tasks</h1>
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
