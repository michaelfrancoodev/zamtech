'use server'

import { db, ensureMigrations } from '@/lib/db'
import { serviceRequests, contactMessages, supportTickets, user as userTable } from '@/lib/db/schema'
import { auth } from '@/lib/auth'
import { eq, desc, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'
import {
  sendContactEmail,
  sendServiceRequestEmail,
  sendSupportTicketEmail,
  sendTrackingEmail,
} from '@/lib/email'

// ─── Public Actions (no auth required — website visitors) ───────────────────

export async function submitServiceRequest(data: {
  fullName: string
  email: string
  phone: string
  company?: string
  serviceType: string
  budgetRange?: string
  timeline?: string
  description: string
}): Promise<{ trackingToken: string }> {
  await ensureMigrations()
  const trackingToken = randomUUID()
  await db.insert(serviceRequests).values({
    trackingToken,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    company: data.company ?? null,
    serviceType: data.serviceType,
    budgetRange: data.budgetRange ?? null,
    timeline: data.timeline ?? null,
    description: data.description,
    status: 'new',
  })
  sendServiceRequestEmail(data).catch(() => {})
  sendTrackingEmail({
    to: data.email,
    name: data.fullName,
    token: trackingToken,
    type: 'service',
    subject: data.serviceType,
  }).catch(() => {})
  revalidatePath('/admin')
  return { trackingToken }
}

export async function submitContactMessage(data: {
  fullName: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  await db.insert(contactMessages).values({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone ?? null,
    subject: data.subject,
    message: data.message,
    status: 'unread',
  })
  // sendContactEmail internally sends both admin notification AND client acknowledgement
  sendContactEmail(data).catch(() => {})
  revalidatePath('/admin')
}

export async function submitSupportTicket(data: {
  fullName: string
  email: string
  phone?: string
  issueCategory: string
  priority: string
  subject: string
  description: string
}): Promise<{ trackingToken: string }> {
  await ensureMigrations()
  const trackingToken = randomUUID()
  await db.insert(supportTickets).values({
    trackingToken,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone ?? null,
    issueCategory: data.issueCategory,
    priority: data.priority,
    subject: data.subject,
    description: data.description,
    status: 'open',
  })
  sendSupportTicketEmail(data).catch(() => {})
  sendTrackingEmail({
    to: data.email,
    name: data.fullName,
    token: trackingToken,
    type: 'ticket',
    subject: data.subject,
  }).catch(() => {})
  revalidatePath('/admin')
  return { trackingToken }
}

// ─── Admin guard (for mutating actions only) ─────────────────────────────────

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}

// ─── Admin Read Actions (layout already guards /admin — no per-action auth) ──

export async function getServiceRequests() {
  return db.select().from(serviceRequests).orderBy(desc(serviceRequests.createdAt))
}

export async function getContactMessages() {
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt))
}

export async function getSupportTickets() {
  return db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt))
}

export async function getDashboardCounts() {
  const [srCounts, cmCounts, stCounts] = await Promise.all([
    db
      .select({
        total: sql<number>`count(*)::int`,
        newCount: sql<number>`count(*) filter (where status = 'new')::int`,
      })
      .from(serviceRequests),
    db
      .select({
        total: sql<number>`count(*)::int`,
        unread: sql<number>`count(*) filter (where status = 'unread')::int`,
      })
      .from(contactMessages),
    db
      .select({
        total: sql<number>`count(*)::int`,
        open: sql<number>`count(*) filter (where status = 'open')::int`,
      })
      .from(supportTickets),
  ])
  return {
    serviceRequests: { total: srCounts[0].total, new: srCounts[0].newCount },
    contactMessages: { total: cmCounts[0].total, unread: cmCounts[0].unread },
    supportTickets:  { total: stCounts[0].total, open: stCounts[0].open },
  }
}

// ─── Admin Mutating Actions (require session) ────────────────────────────────

export async function updateServiceRequestStatus(id: number, status: string, adminNotes?: string) {
  await requireAdmin()
  await db
    .update(serviceRequests)
    .set({ status, ...(adminNotes !== undefined ? { adminNotes } : {}), updatedAt: new Date() })
    .where(eq(serviceRequests.id, id))
  revalidatePath('/admin')
}

export async function deleteServiceRequest(id: number) {
  await requireAdmin()
  await db.delete(serviceRequests).where(eq(serviceRequests.id, id))
  revalidatePath('/admin')
}

export async function updateContactMessageStatus(id: number, status: string, adminReply?: string) {
  await requireAdmin()
  await db
    .update(contactMessages)
    .set({ status, ...(adminReply !== undefined ? { adminReply } : {}), updatedAt: new Date() })
    .where(eq(contactMessages.id, id))
  revalidatePath('/admin')
}

export async function deleteContactMessage(id: number) {
  await requireAdmin()
  await db.delete(contactMessages).where(eq(contactMessages.id, id))
  revalidatePath('/admin')
}

export async function updateSupportTicketStatus(id: number, status: string, adminResponse?: string) {
  await requireAdmin()
  await db
    .update(supportTickets)
    .set({ status, ...(adminResponse !== undefined ? { adminResponse } : {}), updatedAt: new Date() })
    .where(eq(supportTickets.id, id))
  revalidatePath('/admin')
}

export async function deleteSupportTicket(id: number) {
  await requireAdmin()
  await db.delete(supportTickets).where(eq(supportTickets.id, id))
  revalidatePath('/admin')
}

// ─── Admin: User management ───────────────────────────────────────────────────

export async function getAdminUsers() {
  await requireAdmin()
  return db
    .select({
      id: userTable.id,
      name: userTable.name,
      email: userTable.email,
      createdAt: userTable.createdAt,
    })
    .from(userTable)
    .orderBy(desc(userTable.createdAt))
}

export async function createAdminUser(data: { name: string; email: string; password: string }) {
  await requireAdmin()
  await auth.api.signUpEmail({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  })
  revalidatePath('/admin')
}

export async function deleteAdminUser(targetId: string) {
  const me = await requireAdmin()
  if (me.id === targetId) throw new Error('You cannot delete your own account')
  await db.delete(userTable).where(eq(userTable.id, targetId))
  revalidatePath('/admin')
}

// ─── Public: Tracking page (no auth) ─────────────────────────────────────────

export type TrackingResult =
  | { found: false }
  | {
      found: true
      type: 'service'
      data: {
        fullName: string
        email: string
        serviceType: string
        description: string
        status: string
        adminNotes: string | null
        createdAt: Date
        updatedAt: Date
      }
    }
  | {
      found: true
      type: 'ticket'
      data: {
        fullName: string
        email: string
        subject: string
        issueCategory: string
        priority: string
        description: string
        status: string
        adminResponse: string | null
        createdAt: Date
        updatedAt: Date
      }
    }

export async function getRequestByToken(token: string): Promise<TrackingResult> {
  if (!token || token.length < 10) return { found: false }

  // Ensure columns exist first, then query
  await ensureMigrations()

  try {
    const { pool: pgPool } = await import('@/lib/db')

    const srRes = await pgPool.query(
      `SELECT full_name, email, service_type, description, status, admin_notes, "createdAt", "updatedAt"
       FROM service_requests WHERE tracking_token = $1 LIMIT 1`,
      [token]
    )
    if (srRes.rows.length > 0) {
      const r = srRes.rows[0]
      return {
        found: true,
        type: 'service',
        data: {
          fullName:    r.full_name,
          email:       r.email,
          serviceType: r.service_type,
          description: r.description,
          status:      r.status,
          adminNotes:  r.admin_notes ?? null,
          createdAt:   new Date(r.createdAt),
          updatedAt:   new Date(r.updatedAt),
        },
      }
    }

    const stRes = await pgPool.query(
      `SELECT full_name, email, subject, issue_category, priority, description, status, admin_response, "createdAt", "updatedAt"
       FROM support_tickets WHERE tracking_token = $1 LIMIT 1`,
      [token]
    )
    if (stRes.rows.length > 0) {
      const r = stRes.rows[0]
      return {
        found: true,
        type: 'ticket',
        data: {
          fullName:      r.full_name,
          email:         r.email,
          subject:       r.subject,
          issueCategory: r.issue_category,
          priority:      r.priority,
          description:   r.description,
          status:        r.status,
          adminResponse: r.admin_response ?? null,
          createdAt:     new Date(r.createdAt),
          updatedAt:     new Date(r.updatedAt),
        },
      }
    }
  } catch {
    return { found: false }
  }

  return { found: false }
}
