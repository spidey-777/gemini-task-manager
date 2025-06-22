
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { db } from '../db/drizzle';
import path from 'path';

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: path.join(__dirname, '../migrations'), 
    });
    console.log(' Migrations applied successfully');
  } catch (err) {
    console.error(' Migration failed:', err);
    process.exit(1);
  }
}

main();
