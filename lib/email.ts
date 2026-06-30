/**
 * ZamTech — Email & WhatsApp Notification Library
 *
 * DRIVERS (set EMAIL_DRIVER env var):
 *   smtp   — Gmail or any SMTP server (default for local/staging)
 *   resend — Resend.com (recommended for production)
 *
 * FROM ADDRESSES (role-based, like GitHub / Vercel):
 *   notification@zamtech.co.tz  — service requests, new activity
 *   support@zamtech.co.tz       — support tickets
 *   noreply@zamtech.co.tz       — system / tracking confirmations
 *   welcome@zamtech.co.tz       — (reserved for onboarding)
 *
 * WHATSAPP:
 *   Admin  — CallMeBot free API (instant push to your personal WhatsApp)
 *   Client — WhatsApp deep link in confirmation email (no API needed)
 *
 * SETUP CALLMEBOT (one-time, free):
 *   1. Add +34 644 82 17 63 to contacts as "CallMeBot"
 *   2. Send "I allow callmebot to send me messages" on WhatsApp to that number
 *   3. You receive an apikey back — put it in CALLMEBOT_API_KEY
 *   4. Set ADMIN_WHATSAPP_PHONE=255796985138 (no + sign)
 */

import nodemailer from 'nodemailer'

// ─── Env config ───────────────────────────────────────────────────────────────

const SITE_URL      = process.env.NEXT_PUBLIC_SITE_URL   ?? 'https://zamtech.co.tz'
const SITE_DOMAIN   = SITE_URL.replace(/^https?:\/\//, '') // zamtech.co.tz
const ADMIN_EMAIL   = process.env.ADMIN_EMAIL             // set in Vercel env vars — no fallback shown to users
const DRIVER        = process.env.EMAIL_DRIVER            ?? 'smtp'   // 'smtp' | 'resend'
const RESEND_KEY    = process.env.RESEND_API_KEY
const ADMIN_PHONE   = process.env.ADMIN_WHATSAPP_PHONE    // e.g. 255796985138
const WA_API_KEY    = process.env.CALLMEBOT_API_KEY

// Role-based from addresses — exactly like GitHub / Vercel
const FROM_ADDRESSES = {
  notification: `ZamTech Automation Studio <notification@${SITE_DOMAIN}>`,
  support:      `ZamTech Support <support@${SITE_DOMAIN}>`,
  noreply:      `ZamTech Automation Studio <noreply@${SITE_DOMAIN}>`,
}

// ─── Transport factory ────────────────────────────────────────────────────────

function createTransport() {
  if (DRIVER === 'resend' && RESEND_KEY) {
    // Resend SMTP bridge — same nodemailer API, just different host/auth
    return nodemailer.createTransport({
      host:   'smtp.resend.com',
      port:   465,
      secure: true,
      auth: { user: 'resend', pass: RESEND_KEY },
    })
  }
  // SMTP (Gmail, custom, etc.)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth:   { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  }
  return null
}

// ─── WhatsApp to admin via CallMeBot ─────────────────────────────────────────

async function notifyAdminWhatsApp(message: string) {
  if (!ADMIN_PHONE || !WA_API_KEY) return
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${ADMIN_PHONE}&text=${encodeURIComponent(message)}&apikey=${WA_API_KEY}`
    await fetch(url, { method: 'GET' })
  } catch { /* non-critical */ }
}

// ─── Shared HTML shell ────────────────────────────────────────────────────────

function shell(badge: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:40px 16px;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

  <!-- Header -->
  <tr>
    <td style="background:#0A1628;border-radius:12px 12px 0 0;padding:26px 36px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td>
          <p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.5px;">ZamTech</p>
          <p style="margin:3px 0 0;color:#00C8FF;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Automation Studio</p>
        </td>
        <td align="right">
          <span style="display:inline-block;background:#00C8FF1a;border:1px solid #00C8FF40;color:#00C8FF;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;letter-spacing:0.5px;">${badge}</span>
        </td>
      </tr></table>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="background:#fff;padding:36px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
      ${body}
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#f8f9fb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:18px 36px;text-align:center;">
      <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.8;">
        &copy; ${new Date().getFullYear()} ZamTech Automation Studio &mdash; Mbeya, Tanzania<br/>
        <a href="${SITE_URL}" style="color:#00C8FF;text-decoration:none;">${SITE_DOMAIN}</a>
        &nbsp;&bull;&nbsp;
        <a href="https://wa.me/${ADMIN_PHONE ?? '255796985138'}" style="color:#00C8FF;text-decoration:none;">WhatsApp Support</a>
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

// ─── HTML helpers ─────────────────────────────────────────────────────────────

function row(label: string, value: string | null | undefined) {
  if (!value) return ''
  return `<tr>
    <td style="padding:6px 0;color:#6b7280;font-size:13px;width:110px;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;">${value}</td>
  </tr>`
}
function infoTable(rows: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="background:#f8f9fb;border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;margin:16px 0 20px;">${rows}</table>`
}
function tag(text: string, color = '#00C8FF') {
  return `<span style="display:inline-block;background:${color}18;border:1px solid ${color}35;color:${color};font-size:11px;font-weight:700;padding:3px 11px;border-radius:100px;letter-spacing:0.4px;margin-right:6px;">${text}</span>`
}
function cta(label: string, url: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto 8px;">
    <tr><td style="border-radius:8px;background:#00C8FF;">
      <a href="${url}" style="display:inline-block;padding:13px 32px;color:#001a24;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.2px;">${label}</a>
    </td></tr>
  </table>`
}
function textBox(content: string) {
  return `<div style="background:#f8f9fb;border:1px solid #e5e7eb;border-left:3px solid #00C8FF;border-radius:0 8px 8px 0;padding:14px 18px;color:#374151;font-size:14px;line-height:1.7;margin:8px 0 20px;">
    ${content.replace(/\n/g, '<br/>')}
  </div>`
}
function refBox(token: string) {
  return `<div style="background:#f0f9ff;border:1px solid #00C8FF30;border-radius:8px;padding:14px 20px;margin:16px 0;">
    <p style="margin:0 0 4px;color:#9ca3af;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Tracking Reference</p>
    <p style="margin:0;color:#0A1628;font-size:13px;font-family:'Courier New',monospace;word-break:break-all;font-weight:700;">${token}</p>
  </div>`
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. SERVICE REQUEST
//    FROM: notification@zamtech.co.tz  (like "GitHub <noreply@github.com>")
//    Admin  gets: details + CTA to dashboard + WhatsApp push
//    Client gets: confirmation + tracking link + WhatsApp number
// ═══════════════════════════════════════════════════════════════════════════════

export async function sendServiceRequestEmail(data: {
  fullName: string; email: string; phone: string; company?: string
  serviceType: string; budgetRange?: string; timeline?: string; description: string
  trackingToken?: string
}) {
  const transport = createTransport()

  // ── Admin email ──
  if (transport && ADMIN_EMAIL) {
    await transport.sendMail({
      from:    FROM_ADDRESSES.notification,
      to:      ADMIN_EMAIL,
      replyTo: `${data.fullName} <${data.email}>`,
      subject: `[Service Request] ${data.serviceType} — ${data.fullName}`,
      html: shell('Service Request', `
        <h2 style="margin:0 0 4px;color:#0A1628;font-size:18px;font-weight:800;">New Service Request</h2>
        <p style="margin:0 0 18px;color:#6b7280;font-size:14px;">A potential client submitted a service request via zamtech.co.tz</p>
        <div style="margin-bottom:18px;">${tag(data.serviceType)}</div>
        ${infoTable(
          row('Name',     data.fullName) +
          row('Email',    data.email) +
          row('Phone',    data.phone) +
          row('Company',  data.company) +
          row('Budget',   data.budgetRange) +
          row('Timeline', data.timeline)
        )}
        <p style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;margin:0 0 6px;">Project Description</p>
        ${textBox(data.description)}
        ${cta('Open Admin Dashboard →', `${SITE_URL}/admin?tab=service-requests`)}
      `),
    }).catch(() => {})
  }

  // ── Admin WhatsApp ──
  await notifyAdminWhatsApp(
    `*New Service Request* — ZamTech\n\n` +
    `Service: ${data.serviceType}\n` +
    `Client: ${data.fullName}\n` +
    `Phone: +${data.phone.replace(/^\+/, '')}\n` +
    `Email: ${data.email}\n` +
    (data.budgetRange ? `Budget: ${data.budgetRange}\n` : '') +
    `\nDashboard: ${SITE_URL}/admin?tab=service-requests`
  )
}

// ─── Client confirmation (sent separately from submitServiceRequest action) ───

export async function sendClientServiceConfirmation(data: {
  to: string; name: string; token: string; serviceType: string
}) {
  const transport = createTransport()
  if (!transport) return
  const trackUrl = `${SITE_URL}/track/${data.token}`
  await transport.sendMail({
    from:    FROM_ADDRESSES.noreply,
    to:      `${data.name} <${data.to}>`,
    subject: `We received your request — Ref: ${data.token.slice(0,8).toUpperCase()} | ZamTech`,
    html: shell('Request Received', `
      <h2 style="margin:0 0 8px;color:#0A1628;font-size:20px;font-weight:800;">Hi ${data.name},</h2>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.8;">
        Thank you for choosing <strong>ZamTech Automation Studio</strong>. We have received your
        service request for <strong>${data.serviceType}</strong>.
      </p>
      <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.8;">
        Our team will review your request and contact you within <strong>24 hours</strong>
        to discuss the details and provide a proposal.
      </p>
      ${cta('Track My Request Status', trackUrl)}
      ${refBox(data.token)}
      <p style="margin:16px 0 0;color:#9ca3af;font-size:13px;line-height:1.7;">
        Have an urgent question? You can reply directly to this email or reach us on
        <a href="https://wa.me/${ADMIN_PHONE ?? '255796985138'}" style="color:#00C8FF;text-decoration:none;font-weight:600;">WhatsApp</a>
        and we will respond promptly.
      </p>
    `),
  }).catch(() => {})
}


// ═══════════════════════════════════════════════════════════════════════════════
// 2. CONTACT MESSAGE
//    FROM: notification@zamtech.co.tz
//    Admin  gets: message details + WhatsApp push
//    Client gets: acknowledgement email ("We'll respond within 24 hrs")
// ═══════════════════════════════════════════════════════════════════════════════

export async function sendContactEmail(data: {
  fullName: string; email: string; phone?: string; subject: string; message: string
}) {
  const transport = createTransport()

  // ── Admin email ──
  if (transport && ADMIN_EMAIL) {
    await transport.sendMail({
      from:    FROM_ADDRESSES.notification,
      to:      ADMIN_EMAIL,
      replyTo: `${data.fullName} <${data.email}>`,
      subject: `[Contact] ${data.subject} — ${data.fullName}`,
      html: shell('Contact Message', `
        <h2 style="margin:0 0 4px;color:#0A1628;font-size:18px;font-weight:800;">New Contact Message</h2>
        <p style="margin:0 0 18px;color:#6b7280;font-size:14px;">Received via the website contact form.</p>
        <div style="margin-bottom:18px;">${tag(data.subject, '#6366f1')}</div>
        ${infoTable(
          row('Name',  data.fullName) +
          row('Email', data.email) +
          row('Phone', data.phone)
        )}
        <p style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;margin:0 0 6px;">Message</p>
        ${textBox(data.message)}
        ${cta('Open Admin Dashboard →', `${SITE_URL}/admin?tab=messages`)}
      `),
    }).catch(() => {})
  }

  // ── Client acknowledgement ──
  if (transport) {
    await transport.sendMail({
      from:    FROM_ADDRESSES.noreply,
      to:      `${data.fullName} <${data.email}>`,
      subject: `We received your message | ZamTech Automation Studio`,
      html: shell('Message Received', `
        <h2 style="margin:0 0 8px;color:#0A1628;font-size:20px;font-weight:800;">Hi ${data.fullName},</h2>
        <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.8;">
          Thank you for contacting <strong>ZamTech Automation Studio</strong>.
          We have received your message regarding <strong>${data.subject}</strong>.
        </p>
        <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.8;">
          A member of our team will get back to you within <strong>24 hours</strong>.
          If you need a faster response, feel free to reach us directly on WhatsApp.
        </p>
        ${cta('Chat With Us on WhatsApp', `https://wa.me/${ADMIN_PHONE ?? '255796985138'}`)}
        <p style="margin:20px 0 0;color:#9ca3af;font-size:12px;line-height:1.7;text-align:center;">
          This is an automated acknowledgement. Please do not reply to this email —
          a team member will contact you from our main address.
        </p>
      `),
    }).catch(() => {})
  }

  // ── Admin WhatsApp ──
  await notifyAdminWhatsApp(
    `*New Contact Message* — ZamTech\n\n` +
    `Subject: ${data.subject}\n` +
    `From: ${data.fullName}\n` +
    `Phone: ${data.phone ?? 'N/A'}\n` +
    `Email: ${data.email}\n` +
    `\nDashboard: ${SITE_URL}/admin?tab=messages`
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// 3. SUPPORT TICKET
//    FROM: support@zamtech.co.tz
//    Admin  gets: ticket details + priority badge + WhatsApp push
//    Client gets: confirmation + tracking link
// ═══════════════════════════════════════════════════════════════════════════════

export async function sendSupportTicketEmail(data: {
  fullName: string; email: string; phone?: string
  issueCategory: string; description: string; priority?: string; subject?: string
  trackingToken?: string
}) {
  const transport = createTransport()
  const priorityColor = data.priority === 'urgent' ? '#ef4444' : data.priority === 'high' ? '#f97316' : '#00C8FF'

  // ── Admin email ──
  if (transport && ADMIN_EMAIL) {
    await transport.sendMail({
      from:    FROM_ADDRESSES.support,
      to:      ADMIN_EMAIL,
      replyTo: `${data.fullName} <${data.email}>`,
      subject: `[Support] ${data.subject ?? data.issueCategory} — ${data.fullName}`,
      html: shell('Support Ticket', `
        <h2 style="margin:0 0 4px;color:#0A1628;font-size:18px;font-weight:800;">New Support Ticket</h2>
        <p style="margin:0 0 18px;color:#6b7280;font-size:14px;">A client has opened a support ticket.</p>
        <div style="margin-bottom:18px;">
          ${tag(data.issueCategory)}
          ${data.priority ? tag(data.priority.toUpperCase(), priorityColor) : ''}
        </div>
        ${infoTable(
          row('Name',    data.fullName) +
          row('Email',   data.email) +
          row('Phone',   data.phone) +
          row('Subject', data.subject)
        )}
        <p style="color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;margin:0 0 6px;">Issue Description</p>
        ${textBox(data.description)}
        ${cta('Open Admin Dashboard →', `${SITE_URL}/admin?tab=tickets`)}
      `),
    }).catch(() => {})
  }

  // ── Admin WhatsApp ──
  const urgentPrefix = data.priority === 'urgent' ? '⚠️ URGENT — ' : ''
  await notifyAdminWhatsApp(
    `${urgentPrefix}*New Support Ticket* — ZamTech\n\n` +
    `Category: ${data.issueCategory}\n` +
    `Priority: ${(data.priority ?? 'normal').toUpperCase()}\n` +
    `From: ${data.fullName}\n` +
    `Phone: ${data.phone ?? 'N/A'}\n` +
    `Email: ${data.email}\n` +
    `\nDashboard: ${SITE_URL}/admin?tab=tickets`
  )
}

// ─── Client ticket confirmation ───────────────────────────────────────────────

export async function sendClientTicketConfirmation(data: {
  to: string; name: string; token: string; subject: string; priority?: string
}) {
  const transport = createTransport()
  if (!transport) return
  const trackUrl = `${SITE_URL}/track/${data.token}`
  const isUrgent = data.priority === 'urgent' || data.priority === 'high'
  await transport.sendMail({
    from:    FROM_ADDRESSES.support,
    to:      `${data.name} <${data.to}>`,
    subject: `Support ticket received — Ref: ${data.token.slice(0,8).toUpperCase()} | ZamTech`,
    html: shell('Ticket Received', `
      <h2 style="margin:0 0 8px;color:#0A1628;font-size:20px;font-weight:800;">Hi ${data.name},</h2>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.8;">
        We have received your support ticket regarding <strong>${data.subject}</strong>.
        ${isUrgent
          ? 'Your ticket is marked as <strong>high priority</strong> and our team has been notified immediately.'
          : 'Our support team will review and respond within <strong>24 hours</strong>.'
        }
      </p>
      ${cta('Track Ticket Status', trackUrl)}
      ${refBox(data.token)}
      <p style="margin:16px 0 0;color:#9ca3af;font-size:13px;line-height:1.7;">
        For urgent assistance, contact us directly on
        <a href="https://wa.me/${ADMIN_PHONE ?? '255796985138'}" style="color:#00C8FF;text-decoration:none;font-weight:600;">WhatsApp</a>.
        You can also reply to this email and it will reach our support team.
      </p>
    `),
  }).catch(() => {})
}


// ═══════════════════════════════════════════════════════════════════════════════
// Legacy export — kept for backward compat (called from submitServiceRequest
// and submitSupportTicket in data.ts via sendTrackingEmail). Route to the
// correct new function based on type.
// ═══════════════════════════════════════════════════════════════════════════════

export async function sendTrackingEmail(data: {
  to: string; name: string; token: string
  type: 'service' | 'ticket'; subject: string; priority?: string
}) {
  if (data.type === 'service') {
    return sendClientServiceConfirmation({
      to: data.to, name: data.name, token: data.token, serviceType: data.subject,
    })
  }
  return sendClientTicketConfirmation({
    to: data.to, name: data.name, token: data.token, subject: data.subject, priority: data.priority,
  })
}
