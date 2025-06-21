"use client";

import { callGimini } from "@/backend/action/callGemini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useActionState } from "react";

export default function GenerateTaskes() {
  const initialState = { tasks: [] as string[] };
  const [formState, formAction] = useActionState(callGimini, initialState);


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-3xl mb-3">What can I help you with?</h1>
        <form action={formAction} className="flex gap-4">
          <Input
            name="topic"
            placeholder="Enter a topic (e.g. Learn Python)"
            className="h-10"
          />
          <Button type="submit">Submit</Button>
        </form>

        {formState.tasks.length > 0 && (
          <div className="mt-6 text-left">
            <h2 className="text-xl font-semibold">Generated Tasks:</h2>
            <ul className="list-disc mt-2 pl-4">
              {formState.tasks.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

