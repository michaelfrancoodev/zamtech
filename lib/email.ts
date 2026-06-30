/**
 * ZamTech — Email & WhatsApp Notification Library
 *
 * Email:     SMTP (Gmail now) → swap to Resend later by changing env vars only
 * WhatsApp:  CallMeBot free API — admin receives WhatsApp message instantly
 *            Setup: https://www.callmebot.com/blog/free-api-whatsapp-messages/
 *            Steps: 1) Add +34 644 82 17 63 to contacts as "CallMeBot"
 *                   2) Send "I allow callmebot to send me messages" to that number
 *                   3) You'll get an API key back — put it in CALLMEBOT_API_KEY
 */

import nodemailer from 'nodemailer'

// ─── Config (all from env vars) ───────────────────────────────────────────────

const SITE_URL    = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zamtech.co.tz'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL          ?? 'francoomichaeldev@gmail.com'
const ADMIN_PHONE = process.env.ADMIN_WHATSAPP_PHONE  // e.g. 255796985138 (no + sign)
const WA_API_KEY  = process.env.CALLMEBOT_API_KEY     // from callmebot.com setup
const FROM_NAME   = process.env.EMAIL_FROM_NAME       ?? 'ZamTech Automation Studio'
const FROM_ADDR   = process.env.EMAIL_FROM_ADDRESS    ?? 'noreply@zamtech.co.tz'
const FROM        = `${FROM_NAME} <${FROM_ADDR}>`

// ─── SMTP Transport ───────────────────────────────────────────────────────────

function createTransport() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth:   { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
}

// ─── WhatsApp via CallMeBot ───────────────────────────────────────────────────

async function sendWhatsApp(message: string) {
  if (!ADMIN_PHONE || !WA_API_KEY) return
  try {
    const encoded = encodeURIComponent(message)
    const url = `https://api.callmebot.com/whatsapp.php?phone=${ADMIN_PHONE}&text=${encoded}&apikey=${WA_API_KEY}`
    await fetch(url)
  } catch {
    // Non-critical — never throw
  }
}

// ─── Shared HTML Email Shell ──────────────────────────────────────────────────

function emailShell(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0A1628;border-radius:12px 12px 0 0;padding:28px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">ZamTech</p>
                  <p style="margin:3px 0 0;color:#00C8FF;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">Automation Studio</p>
                </td>
                <td align="right">
                  <span style="display:inline-block;background:#00C8FF1a;border:1px solid #00C8FF40;color:#00C8FF;font-size:11px;font-weight:700;padding:4px 10px;border-radius:6px;letter-spacing:0.5px;">
                    ${title}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 36px 28px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
            ${body}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f9fb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:18px 36px;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              &copy; ${new Date().getFullYear()} ZamTech Automation Studio &mdash; Mbeya, Tanzania<br />
              <a href="${SITE_URL}" style="color:#00C8FF;text-decoration:none;">${SITE_URL.replace('https://', '')}</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ─── Field row helper ─────────────────────────────────────────────────────────

function field(label: string, value: string | undefined | null) {
  if (!value) return ''
  return `<tr>
    <td style="padding:6px 0;color:#6b7280;font-size:13px;width:120px;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;color:#111827;font-size:13px;font-weight:500;vertical-align:top;">${value}</td>
  </tr>`
}

function table(rows: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="background:#f8f9fb;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;margin:16px 0;">${rows}</table>`
}

function badge(text: string, color = '#00C8FF') {
  return `<span style="display:inline-block;background:${color}1a;border:1px solid ${color}40;color:${color};
    font-size:11px;font-weight:700;padding:3px 10px;border-radius:100px;letter-spacing:0.5px;">${text}</span>`
}

function ctaButton(label: string, url: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto;">
    <tr><td style="border-radius:8px;background:#00C8FF;">
      <a href="${url}" style="display:inline-block;padding:13px 32px;color:#001a24;font-size:14px;font-weight:700;
        text-decoration:none;letter-spacing:0.2px;">${label}</a>
    </td></tr>
  </table>`
}

// ─── 1. Service Request ───────────────────────────────────────────────────────

export async function sendServiceRequestEmail(data: {
  fullName: string; email: string; phone: string; company?: string
  serviceType: string; budgetRange?: string; timeline?: string; description: string
}) {
  const transport = createTransport()

  // Admin notification email
  if (transport) {
    const body = `
      <h2 style="margin:0 0 4px;color:#0A1628;font-size:18px;">New Service Request</h2>
      <p style="margin:0 0 20px;color:#6b7280;font-size:14px;">A potential client has submitted a service request.</p>
      ${badge(data.serviceType, '#00C8FF')}
      ${table(
        field('Name', data.fullName) +
        field('Email', data.email) +
        field('Phone', data.phone) +
        field('Company', data.company) +
        field('Budget', data.budgetRange) +
        field('Timeline', data.timeline)
      )}
      <p style="color:#6b7280;font-size:13px;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Project Description</p>
      <div style="background:#f8f9fb;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;color:#374151;font-size:14px;line-height:1.7;">
        ${data.description.replace(/\n/g, '<br />')}
      </div>
      ${ctaButton('Open Admin Dashboard', `${SITE_URL}/admin?tab=service-requests`)}
    `
    await transport.sendMail({
      from: FROM, to: ADMIN_EMAIL, replyTo: data.email,
      subject: `[Service Request] ${data.serviceType} — ${data.fullName}`,
      html: emailShell('Service Request', body),
    }).catch(() => {})
  }

  // WhatsApp notification to admin
  await sendWhatsApp(
    `*New Service Request* — ZamTech\n\n` +
    `Service: ${data.serviceType}\n` +
    `Client: ${data.fullName}\n` +
    `Phone: ${data.phone}\n` +
    `Email: ${data.email}\n` +
    (data.budgetRange ? `Budget: ${data.budgetRange}\n` : '') +
    `\nView: ${SITE_URL}/admin?tab=service-requests`
  )
}

// ─── 2. Contact Message ───────────────────────────────────────────────────────

export async function sendContactEmail(data: {
  fullName: string; email: string; phone?: string; subject: string; message: string
}) {
  const transport = createTransport()

  if (transport) {
    const body = `
      <h2 style="margin:0 0 4px;color:#0A1628;font-size:18px;">New Contact Message</h2>
      <p style="margin:0 0 20px;color:#6b7280;font-size:14px;">Someone sent a message via the website contact form.</p>
      ${badge(data.subject, '#6366f1')}
      ${table(
        field('Name', data.fullName) +
        field('Email', data.email) +
        field('Phone', data.phone)
      )}
      <p style="color:#6b7280;font-size:13px;margin:16px 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
      <div style="background:#f8f9fb;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;color:#374151;font-size:14px;line-height:1.7;">
        ${data.message.replace(/\n/g, '<br />')}
      </div>
      ${ctaButton('Open Admin Dashboard', `${SITE_URL}/admin?tab=messages`)}
    `
    await transport.sendMail({
      from: FROM, to: ADMIN_EMAIL, replyTo: data.email,
      subject: `[Contact] ${data.subject} — ${data.fullName}`,
      html: emailShell('Contact Message', body),
    }).catch(() => {})
  }

  await sendWhatsApp(
    `*New Contact Message* — ZamTech\n\n` +
    `Subject: ${data.subject}\n` +
    `From: ${data.fullName}\n` +
    `Phone: ${data.phone ?? 'N/A'}\n` +
    `Email: ${data.email}\n` +
    `\nView: ${SITE_URL}/admin?tab=messages`
  )
}

// ─── 3. Support Ticket ────────────────────────────────────────────────────────

export async function sendSupportTicketEmail(data: {
  fullName: string; email: string; phone?: string
  issueCategory: string; description: string; priority?: string; subject?: string
}) {
  const transport = createTransport()

  if (transport) {
    const priorityColor = data.priority === 'urgent' ? '#ef4444' : data.priority === 'high' ? '#f97316' : '#00C8FF'
    const body = `
      <h2 style="margin:0 0 4px;color:#0A1628;font-size:18px;">New Support Ticket</h2>
      <p style="margin:0 0 16px;color:#6b7280;font-size:14px;">A client has opened a support ticket.</p>
      <div style="display:inline-flex;gap:8px;margin-bottom:20px;">
        ${badge(data.issueCategory, '#00C8FF')}
        ${data.priority ? badge(data.priority.toUpperCase(), priorityColor) : ''}
      </div>
      ${table(
        field('Name', data.fullName) +
        field('Email', data.email) +
        field('Phone', data.phone) +
        field('Subject', data.subject)
      )}
      <p style="color:#6b7280;font-size:13px;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Issue Description</p>
      <div style="background:#f8f9fb;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;color:#374151;font-size:14px;line-height:1.7;">
        ${data.description.replace(/\n/g, '<br />')}
      </div>
      ${ctaButton('Open Admin Dashboard', `${SITE_URL}/admin?tab=tickets`)}
    `
    await transport.sendMail({
      from: FROM, to: ADMIN_EMAIL, replyTo: data.email,
      subject: `[Support] ${data.issueCategory} — ${data.fullName}`,
      html: emailShell('Support Ticket', body),
    }).catch(() => {})
  }

  await sendWhatsApp(
    `*New Support Ticket* — ZamTech\n\n` +
    `Category: ${data.issueCategory}\n` +
    `Priority: ${data.priority ?? 'normal'}\n` +
    `From: ${data.fullName}\n` +
    `Phone: ${data.phone ?? 'N/A'}\n` +
    `Email: ${data.email}\n` +
    `\nView: ${SITE_URL}/admin?tab=tickets`
  )
}

// ─── 4. Tracking Confirmation (to client) ────────────────────────────────────

export async function sendTrackingEmail(data: {
  to: string; name: string; token: string
  type: 'service' | 'ticket'; subject: string
}) {
  const transport = createTransport()
  if (!transport) return

  const trackingUrl = `${SITE_URL}/track/${data.token}`
  const typeLabel   = data.type === 'service' ? 'Service Request' : 'Support Ticket'

  const body = `
    <h2 style="margin:0 0 8px;color:#0A1628;font-size:20px;">Hi ${data.name},</h2>
    <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
      Thank you for reaching out to ZamTech. We have received your
      <strong>${typeLabel}</strong> regarding <strong>${data.subject}</strong>.
      Our team will review it and contact you within <strong>24 hours</strong>.
    </p>
    <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.7;">
      You can track the status of your request at any time using the button below — no account needed.
    </p>
    ${ctaButton(`Track My ${typeLabel}`, trackingUrl)}
    <div style="background:#f8f9fb;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;margin:8px 0 24px;">
      <p style="margin:0 0 4px;color:#9ca3af;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;">Your Tracking Reference</p>
      <p style="margin:0;color:#0A1628;font-size:13px;font-family:'Courier New',monospace;word-break:break-all;">${data.token}</p>
    </div>
    <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;">
      Have an urgent question? Reply to this email or contact us directly on
      <a href="https://wa.me/${ADMIN_PHONE ?? '255796985138'}" style="color:#00C8FF;text-decoration:none;">WhatsApp</a>.
    </p>
  `

  await transport.sendMail({
    from: FROM, to: data.to,
    subject: `Your ZamTech ${typeLabel} has been received — Ref: ${data.token.slice(0, 8).toUpperCase()}`,
    html: emailShell(`${typeLabel} Received`, body),
  }).catch(() => {})
}
