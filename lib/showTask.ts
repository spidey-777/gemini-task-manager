import { db } from "@/db/drizzle"
import { tasks } from "@/db/schema"

export const showTask = async  ()=>{
    const tasksTOShow = await db.select().from(tasks);
    console.log(tasksTOShow)
    return tasksTOShow;

}