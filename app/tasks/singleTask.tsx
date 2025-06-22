"use client";
import React, { useState } from "react";
import { tasks } from "@/db/schema";
import { InferModel } from "drizzle-orm";
import { Input } from "@/components/ui/input";
import { toggleCompleted } from "@/lib/checkComplated";
import { Button } from "@/components/ui/button";
import { deleteTask } from "@/lib/deleteTask";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type TaskData = InferModel<typeof tasks>;

function SingleTask({ task }: { task: TaskData }) {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted ?? false);
    const router = useRouter()
  const handleCheckboxChange = async () => {
    const newValue = !isCompleted;
    setIsCompleted(newValue);
    await toggleCompleted(task.id, newValue);
  };
  const handleDelete = async ()=>{
    await deleteTask(task.id);
    console.log('task deleted');
     router.refresh(); 
  }

  return (
   <div className="border rounded-xl p-4 shadow-md bg-white dark:bg-gray-800 mx-auto max-w-xl transition hover:shadow-lg">
  <div className="flex justify-between items-start gap-4">
    <div className="flex-1">
      <h2 className="font-semibold text-xl text-gray-800 dark:text-white">{task.title}</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
    </div>

    <div className="flex flex-col items-center gap-3">
      <Input
        type="checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
        className="w-5 h-5 cursor-pointer accent-emerald-600"
      />
      <Button
        onClick={handleDelete}
        size="icon"
        variant="ghost"
        className="text-red-500 hover:text-red-700 cursor-pointer"
        title="Delete Task"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  </div>
</div>
  );
}

export default SingleTask;
