import nodemailer from 'nodemailer'

const OWNER_EMAIL = 'francoomichaeldev@gmail.com'
const FROM = 'ZamTech Website <noreply@zamtech.co.tz>'

function createTransport() {
  // Use SMTP env vars if provided, otherwise fall back to a no-op in dev
  if (!process.env.SMTP_HOST) return null
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function sendContactEmail(data: {
  fullName: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  const transport = createTransport()
  if (!transport) return
  await transport.sendMail({
    from: FROM,
    to: OWNER_EMAIL,
    replyTo: data.email,
    subject: `[Contact] ${data.subject} — from ${data.fullName}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      <p><strong>Subject:</strong> ${data.subject}</p>
      <hr />
      <p>${data.message.replace(/\n/g, '<br />')}</p>
    `,
  })
}

export async function sendServiceRequestEmail(data: {
  fullName: string
  email: string
  phone: string
  company?: string
  serviceType: string
  budgetRange?: string
  timeline?: string
  description: string
}) {
  const transport = createTransport()
  if (!transport) return
  await transport.sendMail({
    from: FROM,
    to: OWNER_EMAIL,
    replyTo: data.email,
    subject: `[Service Request] ${data.serviceType} — from ${data.fullName}`,
    html: `
      <h2>New Service Request</h2>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
      <p><strong>Service:</strong> ${data.serviceType}</p>
      ${data.budgetRange ? `<p><strong>Budget:</strong> ${data.budgetRange}</p>` : ''}
      ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
      <hr />
      <p>${data.description.replace(/\n/g, '<br />')}</p>
    `,
  })
}

export async function sendSupportTicketEmail(data: {
  fullName: string
  email: string
  issueCategory: string
  description: string
}) {
  const transport = createTransport()
  if (!transport) return
  await transport.sendMail({
    from: FROM,
    to: OWNER_EMAIL,
    replyTo: data.email,
    subject: `[Support] ${data.issueCategory} — from ${data.fullName}`,
    html: `
      <h2>New Support Ticket</h2>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Category:</strong> ${data.issueCategory}</p>
      <hr />
      <p>${data.description.replace(/\n/g, '<br />')}</p>
    `,
  })
}
