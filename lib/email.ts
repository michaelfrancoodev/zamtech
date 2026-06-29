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

export async function sendTrackingEmail(data: {
  to: string
  name: string
  token: string
  type: 'service' | 'ticket'
  subject: string
}) {
  const transport = createTransport()
  if (!transport) return

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zamtech.co.tz'
  const trackingUrl = `${siteUrl}/track/${data.token}`
  const typeLabel = data.type === 'service' ? 'Service Request' : 'Support Ticket'

  await transport.sendMail({
    from: FROM,
    to: data.to,
    subject: `Your ZamTech ${typeLabel} has been received — Track it here`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8" /></head>
      <body style="font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0;">
        <div style="max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
          <!-- Header -->
          <div style="background: #0A1628; padding: 32px 40px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">ZamTech</h1>
            <p style="color: #00C8FF; margin: 4px 0 0; font-size: 13px;">Automation &amp; IT Solutions</p>
          </div>
          <!-- Body -->
          <div style="padding: 36px 40px;">
            <h2 style="color: #0A1628; font-size: 18px; margin: 0 0 8px;">Hi ${data.name},</h2>
            <p style="color: #444; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
              We have received your <strong>${typeLabel}</strong> regarding <strong>${data.subject}</strong>.
              Our team will review it and get back to you shortly.
            </p>
            <p style="color: #444; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
              You can track the status of your request at any time using the link below — no account needed.
            </p>
            <!-- CTA Button -->
            <div style="text-align: center; margin: 0 0 32px;">
              <a href="${trackingUrl}"
                style="display: inline-block; background: #00C8FF; color: #001a24; font-size: 15px; font-weight: 700;
                       text-decoration: none; padding: 14px 36px; border-radius: 8px; letter-spacing: 0.3px;">
                Track My ${typeLabel}
              </a>
            </div>
            <!-- Token info -->
            <div style="background: #f8f9fb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 20px; margin: 0 0 28px;">
              <p style="color: #888; font-size: 11px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Your Tracking Reference</p>
              <p style="color: #0A1628; font-size: 13px; font-family: monospace; margin: 0; word-break: break-all;">${data.token}</p>
            </div>
            <p style="color: #888; font-size: 13px; line-height: 1.6; margin: 0;">
              If you have any urgent questions, reply to this email or contact us on WhatsApp.
            </p>
          </div>
          <!-- Footer -->
          <div style="background: #f8f9fb; border-top: 1px solid #e5e7eb; padding: 20px 40px;">
            <p style="color: #aaa; font-size: 12px; margin: 0; text-align: center;">
              &copy; ${new Date().getFullYear()} ZamTech Automation Studio &mdash; Tanzania
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}
