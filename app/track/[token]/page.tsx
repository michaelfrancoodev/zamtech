import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getRequestByToken } from '@/app/actions/data'
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  Calendar,
  Wrench,
  Ticket,
  MessageSquare,
} from 'lucide-react'

/* ─── Status config ──────────────────────────────────────────────────────── */

const SERVICE_STATUS: Record<string, { label: string; color: string; bg: string; border: string; Icon: typeof CheckCircle2; step: number }> = {
  new:         { label: 'Received',    color: 'text-sky-400',    bg: 'bg-sky-400/10',    border: 'border-sky-400/20',    Icon: Clock,         step: 1 },
  reviewing:   { label: 'Reviewing',   color: 'text-amber-400',  bg: 'bg-amber-400/10',  border: 'border-amber-400/20',  Icon: Loader2,       step: 2 },
  in_progress: { label: 'In Progress', color: 'text-blue-400',   bg: 'bg-blue-400/10',   border: 'border-blue-400/20',   Icon: Wrench,        step: 3 },
  completed:   { label: 'Completed',   color: 'text-emerald-400',bg: 'bg-emerald-400/10',border: 'border-emerald-400/20',Icon: CheckCircle2,  step: 4 },
  rejected:    { label: 'Declined',    color: 'text-red-400',    bg: 'bg-red-400/10',    border: 'border-red-400/20',    Icon: XCircle,       step: 0 },
}

const TICKET_STATUS: Record<string, { label: string; color: string; bg: string; border: string; Icon: typeof CheckCircle2; step: number }> = {
  open:        { label: 'Open',        color: 'text-sky-400',    bg: 'bg-sky-400/10',    border: 'border-sky-400/20',    Icon: Clock,         step: 1 },
  in_progress: { label: 'In Progress', color: 'text-amber-400',  bg: 'bg-amber-400/10',  border: 'border-amber-400/20',  Icon: Loader2,       step: 2 },
  resolved:    { label: 'Resolved',    color: 'text-emerald-400',bg: 'bg-emerald-400/10',border: 'border-emerald-400/20',Icon: CheckCircle2,  step: 3 },
  closed:      { label: 'Closed',      color: 'text-white/40',   bg: 'bg-white/5',       border: 'border-white/10',      Icon: XCircle,       step: 0 },
}

const SERVICE_STEPS = ['Received', 'Reviewing', 'In Progress', 'Completed']
const TICKET_STEPS  = ['Open', 'In Progress', 'Resolved']

function fmtDate(d: Date) {
  return new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

/* ─── Progress bar ───────────────────────────────────────────────────────── */
function ProgressBar({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  if (currentStep === 0) return null
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const stepNum = i + 1
        const done    = stepNum < currentStep
        const active  = stepNum === currentStep
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all
                ${done   ? 'bg-[#00C8FF] border-[#00C8FF] text-[#001a24]' : ''}
                ${active ? 'bg-[#00C8FF]/15 border-[#00C8FF] text-[#00C8FF]' : ''}
                ${!done && !active ? 'bg-white/5 border-white/10 text-white/25' : ''}
              `}>
                {done ? <CheckCircle2 size={13} /> : stepNum}
              </div>
              <span className={`text-[10px] font-medium whitespace-nowrap
                ${active ? 'text-[#00C8FF]' : done ? 'text-white/60' : 'text-white/20'}
              `}>{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-[2px] flex-1 mx-1 mb-4 rounded-full transition-all
                ${done ? 'bg-[#00C8FF]' : 'bg-white/8'}
              `} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default async function TrackingPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const result = await getRequestByToken(token)

  if (!result.found) {
    return (
      <main className="min-h-screen bg-[#070f1e] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={28} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Tracking link not found
          </h1>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            This link may have expired or the reference is incorrect. Check your email for the correct tracking link.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00C8FF] text-[#001a24] text-sm font-bold hover:bg-[#00b8eb] transition-colors"
          >
            <ArrowLeft size={15} />
            Back to ZamTech
          </Link>
        </div>
      </main>
    )
  }

  const isService = result.type === 'service'
  const statusMap = isService ? SERVICE_STATUS : TICKET_STATUS
  const steps     = isService ? SERVICE_STEPS  : TICKET_STEPS
  const status    = statusMap[result.data.status] ?? statusMap[isService ? 'new' : 'open']
  const StatusIcon = status.Icon

  return (
    <main className="min-h-screen bg-[#070f1e] font-sans">
      {/* Top bar */}
      <div className="border-b border-white/[0.06] bg-[#0A1628]">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
            <ArrowLeft size={14} />
            ZamTech
          </Link>
          <span className="text-white/20 text-xs font-mono">{token.slice(0, 8)}…</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 space-y-5">
        {/* Header card */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl ${status.bg} ${status.border} border flex items-center justify-center shrink-0`}>
              {isService
                ? <Wrench size={22} className={status.color} />
                : <Ticket size={22} className={status.color} />
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${status.bg} ${status.border} border ${status.color}`}>
                  <StatusIcon size={11} />
                  {status.label}
                </span>
                <span className="text-white/20 text-xs">
                  {isService ? 'Service Request' : 'Support Ticket'}
                </span>
              </div>
              <h1 className="text-lg font-extrabold text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                {isService ? result.data.serviceType : result.data.subject}
              </h1>
              <p className="text-white/35 text-sm mt-0.5">
                Submitted by <span className="text-white/60">{result.data.fullName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Progress steps */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-5">Progress</p>
          <ProgressBar steps={steps} currentStep={status.step} />
          {status.step === 0 && (
            <p className="text-red-400/70 text-sm mt-4 text-center">
              This request has been {isService ? 'declined' : 'closed'}.
            </p>
          )}
        </div>

        {/* Details */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 space-y-4">
          <p className="text-white/30 text-xs font-semibold uppercase tracking-wider">Details</p>

          {isService && (
            <Row label="Service Type" value={result.data.serviceType} />
          )}
          {!isService && (
            <>
              <Row label="Category" value={(result.data as { issueCategory: string }).issueCategory} />
              <Row label="Priority" value={(result.data as { priority: string }).priority} highlight />
            </>
          )}

          <div>
            <p className="text-white/30 text-[11px] font-medium mb-1.5">Description</p>
            <p className="text-white/70 text-sm leading-relaxed bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
              {result.data.description}
            </p>
          </div>

          <div className="flex gap-4 flex-wrap pt-1">
            <div className="flex items-center gap-1.5 text-white/25 text-xs">
              <Calendar size={11} />
              Submitted {fmtDate(result.data.createdAt)}
            </div>
            {result.data.updatedAt.getTime() !== result.data.createdAt.getTime() && (
              <div className="flex items-center gap-1.5 text-white/25 text-xs">
                <Clock size={11} />
                Updated {fmtDate(result.data.updatedAt)}
              </div>
            )}
          </div>
        </div>

        {/* Admin notes / response */}
        {(isService
          ? (result.data as { adminNotes: string | null }).adminNotes
          : (result.data as { adminResponse: string | null }).adminResponse
        ) && (
          <div className="bg-[#00C8FF]/[0.05] border border-[#00C8FF]/[0.15] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-[#00C8FF]" />
              <p className="text-[#00C8FF] text-xs font-bold uppercase tracking-wider">Message from ZamTech</p>
            </div>
            <p className="text-white/75 text-sm leading-relaxed">
              {isService
                ? (result.data as { adminNotes: string | null }).adminNotes
                : (result.data as { adminResponse: string | null }).adminResponse
              }
            </p>
          </div>
        )}

        {/* Need help */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-white/60 text-sm font-semibold">Need help?</p>
            <p className="text-white/30 text-xs mt-0.5">Our team is available Mon–Sat, 8am–6pm EAT</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-white/70 text-sm font-semibold hover:bg-white/5 hover:text-white transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}

/* Helper row */
function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-white/30 text-[11px] font-medium shrink-0">{label}</p>
      <p className={`text-sm font-semibold truncate ${highlight ? 'text-amber-400' : 'text-white/70'}`}>{value}</p>
    </div>
  )
}
