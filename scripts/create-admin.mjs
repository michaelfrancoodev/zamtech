/**
 * ZamTech Automation Studio — Create Admin Account
 * Run: node scripts/create-admin.mjs
 *
 * Creates the first admin user via Better Auth's API.
 * Requires DATABASE_URL and BETTER_AUTH_SECRET in .env.local
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { readFileSync } from 'fs'

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const BASE_URL = process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'

const ADMIN = {
  name: 'Michael Francoo',
  email: 'francoomichaeldev@gmail.com',
  password: 'ZamTech@2025!',   // Change this after first login
}

async function createAdmin() {
  console.log(`\nCreating admin account at ${BASE_URL} ...`)
  console.log(`Email   : ${ADMIN.email}`)
  console.log(`Password: ${ADMIN.password}`)
  console.log(`Name    : ${ADMIN.name}\n`)

  try {
    const res = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: ADMIN.name,
        email: ADMIN.email,
        password: ADMIN.password,
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (res.ok) {
      console.log('Admin account created successfully!')
      console.log('Login at: /admin-login')
      console.log('\nIMPORTANT: Change your password after first login.')
    } else if (res.status === 422 || data?.code === 'USER_ALREADY_EXISTS') {
      console.log('Admin account already exists. You can log in directly.')
    } else {
      console.error('Error creating admin:', data)
      console.error('\nMake sure:')
      console.error('  1. pnpm dev is running (http://localhost:3000)')
      console.error('  2. DATABASE_URL is set in .env.local')
      console.error('  3. You ran pnpm db:push first')
    }
  } catch (err) {
    console.error('\nCould not connect to server.')
    console.error('Make sure pnpm dev is running first, then re-run this script.')
    console.error('Details:', err.message)
  }
}

createAdmin()
