import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

if (process.env.DATABASE_URL) {
  const client = postgres(process.env.DATABASE_URL, { prepare: false });
  _db = drizzle(client, { schema });
} else {
  _db = new Proxy({} as any, {
    get() {
      return () => {
        throw new Error('Database client not configured (DATABASE_URL missing)');
      };
    }
  });
}

export const db = _db!;

export type Database = typeof db;
