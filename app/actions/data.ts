'use server'

import { db } from '@/lib/db'
import { serviceRequests, contactMessages, supportTickets } from '@/lib/db/schema'
import { auth } from '@/lib/auth'
import { eq, desc, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import {
  sendContactEmail,
  sendServiceRequestEmail,
  sendSupportTicketEmail,
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
}) {
  await db.insert(serviceRequests).values({
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
  // Forward to owner email (non-blocking, no throw on failure)
  sendServiceRequestEmail(data).catch(() => {})
  revalidatePath('/admin')
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
}) {
  await db.insert(supportTickets).values({
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
  revalidatePath('/admin')
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
