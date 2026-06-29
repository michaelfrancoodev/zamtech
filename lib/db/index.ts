import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

export const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool, { schema })

// ─── Auto-migrate: add new columns without running drizzle-kit push ──────────
// Safe to call repeatedly — uses IF NOT EXISTS so it never fails on rerun.
let migrated = false
export async function ensureMigrations() {
  if (migrated) return
  try {
    await pool.query(`
      ALTER TABLE service_requests
        ADD COLUMN IF NOT EXISTS tracking_token TEXT UNIQUE;
      ALTER TABLE support_tickets
        ADD COLUMN IF NOT EXISTS tracking_token TEXT UNIQUE;
    `)
    migrated = true
  } catch {
    // Non-fatal — DB may already be up to date
  }
}
