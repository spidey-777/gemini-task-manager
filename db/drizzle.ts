// db/drizzle.ts
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({ path: '.env' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
export const db = drizzle(pool);
