'use client'

import { useState, useTransition } from 'react'
import { formatDistanceToNow } from 'date-fns'
import {
  FileText, InboxIcon, Ticket, TrendingUp, CheckCircle, Clock, AlertCircle,
  Eye, Trash2, MessageSquare, Loader2, X, ChevronDown, ChevronUp,
} from 'lucide-react'
import {
  updateServiceRequestStatus, deleteServiceRequest,
  updateContactMessageStatus, deleteContactMessage,
  updateSupportTicketStatus, deleteSupportTicket,
} from '@/app/actions/data'

type ServiceRequest = {
  id: number; fullName: string; email: string; phone: string; company: string | null
  serviceType: string; budgetRange: string | null; timeline: string | null
  description: string; status: string; adminNotes: string | null
  createdAt: Date; updatedAt: Date
}
type ContactMessage = {
  id: number; fullName: string; email: string; phone: string | null
  subject: string; message: string; status: string; adminReply: string | null
  createdAt: Date; updatedAt: Date
}
type SupportTicket = {
  id: number; fullName: string; email: string; phone: string | null
  issueCategory: string; priority: string; subject: string; description: string
  status: string; adminResponse: string | null; createdAt: Date; updatedAt: Date
}
type Counts = {
  serviceRequests: { total: number; new: number }
  contactMessages: { total: number; unread: number }
  supportTickets: { total: number; open: number }
}

interface Props {
  counts: Counts
  serviceRequests: ServiceRequest[]
  contactMessages: ContactMessage[]
  supportTickets: SupportTicket[]
}

// Status badge
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    'in-progress': 'bg-violet-500/15 text-violet-400 border-violet-500/20',
    completed: 'bg-green-500/15 text-green-400 border-green-500/20',
    rejected: 'bg-red-500/15 text-red-400 border-red-500/20',
    unread: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    read: 'bg-white/5 text-white/40 border-white/10',
    replied: 'bg-green-500/15 text-green-400 border-green-500/20',
    open: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    resolved: 'bg-green-500/15 text-green-400 border-green-500/20',
    closed: 'bg-white/5 text-white/40 border-white/10',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${map[status] ?? 'bg-white/5 text-white/40 border-white/10'}`}>
      {status}
    </span>
  )
}

// Priority badge
function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    urgent: 'bg-red-500/15 text-red-400',
    high: 'bg-orange-500/15 text-orange-400',
    normal: 'bg-sky-500/15 text-sky-400',
    low: 'bg-white/5 text-white/30',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${map[priority] ?? 'bg-white/5 text-white/30'}`}>
      {priority}
    </span>
  )
}

type Tab = 'overview' | 'service-requests' | 'messages' | 'tickets'

export default function AdminOverview({ counts, serviceRequests, contactMessages, supportTickets }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [isPending, startTransition] = useTransition()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [replyTarget, setReplyTarget] = useState<{ type: string; id: number } | null>(null)

  const totalNew = counts.serviceRequests.new + counts.contactMessages.unread + counts.supportTickets.open

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'service-requests', label: 'Service Requests', count: counts.serviceRequests.new },
    { key: 'messages', label: 'Messages', count: counts.contactMessages.unread },
    { key: 'tickets', label: 'Tickets', count: counts.supportTickets.open },
  ]

  function fmtDate(d: Date) {
    try { return formatDistanceToNow(new Date(d), { addSuffix: true }) } catch { return '—' }
  }

  // ─ Actions ─────────────────────────────────────────────────────────────────
  const handleSRStatus = (id: number, status: string) => {
    startTransition(() => updateServiceRequestStatus(id, status))
  }
  const handleSRDelete = (id: number) => {
    if (!confirm('Delete this service request?')) return
    startTransition(() => deleteServiceRequest(id))
  }
  const handleCMStatus = (id: number, status: string, reply?: string) => {
    startTransition(() => updateContactMessageStatus(id, status, reply))
  }
  const handleCMDelete = (id: number) => {
    if (!confirm('Delete this message?')) return
    startTransition(() => deleteContactMessage(id))
  }
  const handleSTStatus = (id: number, status: string, response?: string) => {
    startTransition(() => updateSupportTicketStatus(id, status, response))
  }
  const handleSTDelete = (id: number) => {
    if (!confirm('Delete this ticket?')) return
    startTransition(() => deleteSupportTicket(id))
  }

  const submitReply = () => {
    if (!replyTarget || !replyText.trim()) return
    const { type, id } = replyTarget
    if (type === 'message') handleCMStatus(id, 'replied', replyText)
    if (type === 'ticket') handleSTStatus(id, 'resolved', replyText)
    setReplyTarget(null)
    setReplyText('')
  }

  // ─ Stats ───────────────────────────────────────────────────────────────────
  const stats = [
    { label: 'Service Requests', icon: FileText, total: counts.serviceRequests.total, badge: `${counts.serviceRequests.new} new`, badgeColor: 'text-blue-400' },
    { label: 'Contact Messages', icon: InboxIcon, total: counts.contactMessages.total, badge: `${counts.contactMessages.unread} unread`, badgeColor: 'text-amber-400' },
    { label: 'Support Tickets', icon: Ticket, total: counts.supportTickets.total, badge: `${counts.supportTickets.open} open`, badgeColor: 'text-orange-400' },
    { label: 'Items Need Attention', icon: AlertCircle, total: totalNew, badge: 'action required', badgeColor: 'text-red-400' },
  ]

  // ─ Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-[#0f1117]/80 backdrop-blur border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-extrabold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            {activeTab === 'overview' ? 'Dashboard Overview' :
              activeTab === 'service-requests' ? 'Service Requests' :
                activeTab === 'messages' ? 'Contact Messages' : 'Support Tickets'}
          </h1>
          <p className="text-white/30 text-xs mt-0.5">ZamTech Automation Studio</p>
        </div>
        {isPending && (
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
          </div>
        )}
      </header>

      {/* Tabs */}
      <div className="sticky top-[65px] z-10 bg-[#0f1117]/80 backdrop-blur border-b border-white/[0.06] px-6 flex gap-1">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === t.key
                ? 'border-primary text-primary'
                : 'border-transparent text-white/40 hover:text-white/70'
            }`}>
            {t.label}
            {t.count !== undefined && t.count > 0 && (
              <span className="bg-primary/20 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        {/* ─── OVERVIEW TAB ─────────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <>
            {/* Stats cards */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/10 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5 text-primary" size={18} />
                      </div>
                      <TrendingUp className="w-4 h-4 text-white/20" />
                    </div>
                    <p className="text-3xl font-extrabold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{s.total}</p>
                    <p className="text-white/40 text-xs">{s.label}</p>
                    <p className={`text-xs font-semibold mt-1 ${s.badgeColor}`}>{s.badge}</p>
                  </div>
                )
              })}
            </div>

            {/* Recent activity — 3 columns */}
            <div className="grid lg:grid-cols-3 gap-5">
              {/* Recent service requests */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <h2 className="text-sm font-bold text-white">Service Requests</h2>
                  </div>
                  <button onClick={() => setActiveTab('service-requests')} className="text-xs text-white/30 hover:text-primary transition-colors">View all</button>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {serviceRequests.slice(0, 5).map((sr) => (
                    <div key={sr.id} className="px-5 py-3.5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-white text-xs font-semibold truncate">{sr.fullName}</p>
                        <StatusBadge status={sr.status} />
                      </div>
                      <p className="text-white/40 text-[11px] truncate">{sr.serviceType}</p>
                      <p className="text-white/20 text-[10px] mt-0.5">{fmtDate(sr.createdAt)}</p>
                    </div>
                  ))}
                  {serviceRequests.length === 0 && (
                    <p className="px-5 py-6 text-white/20 text-xs text-center">No requests yet</p>
                  )}
                </div>
              </div>

              {/* Recent messages */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <InboxIcon className="w-4 h-4 text-primary" />
                    <h2 className="text-sm font-bold text-white">Messages</h2>
                  </div>
                  <button onClick={() => setActiveTab('messages')} className="text-xs text-white/30 hover:text-primary transition-colors">View all</button>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {contactMessages.slice(0, 5).map((cm) => (
                    <div key={cm.id} className="px-5 py-3.5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-white text-xs font-semibold truncate">{cm.fullName}</p>
                        <StatusBadge status={cm.status} />
                      </div>
                      <p className="text-white/40 text-[11px] truncate">{cm.subject}</p>
                      <p className="text-white/20 text-[10px] mt-0.5">{fmtDate(cm.createdAt)}</p>
                    </div>
                  ))}
                  {contactMessages.length === 0 && (
                    <p className="px-5 py-6 text-white/20 text-xs text-center">No messages yet</p>
                  )}
                </div>
              </div>

              {/* Recent tickets */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-primary" />
                    <h2 className="text-sm font-bold text-white">Support Tickets</h2>
                  </div>
                  <button onClick={() => setActiveTab('tickets')} className="text-xs text-white/30 hover:text-primary transition-colors">View all</button>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {supportTickets.slice(0, 5).map((st) => (
                    <div key={st.id} className="px-5 py-3.5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-white text-xs font-semibold truncate">{st.fullName}</p>
                        <PriorityBadge priority={st.priority} />
                      </div>
                      <p className="text-white/40 text-[11px] truncate">{st.subject}</p>
                      <p className="text-white/20 text-[10px] mt-0.5">{fmtDate(st.createdAt)}</p>
                    </div>
                  ))}
                  {supportTickets.length === 0 && (
                    <p className="px-5 py-6 text-white/20 text-xs text-center">No tickets yet</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ─── SERVICE REQUESTS TAB ─────────────────────────────────────────── */}
        {activeTab === 'service-requests' && (
          <div className="space-y-3">
            {serviceRequests.length === 0 && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-12 text-center">
                <FileText className="w-8 h-8 text-white/20 mx-auto mb-3" />
                <p className="text-white/30 text-sm">No service requests yet</p>
              </div>
            )}
            {serviceRequests.map((sr) => {
              const key = `sr-${sr.id}`
              const open = expandedId === key
              return (
                <div key={sr.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/10 transition-colors">
                  <div className="flex items-start justify-between gap-4 p-5 cursor-pointer" onClick={() => setExpandedId(open ? null : key)}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <p className="text-white font-semibold text-sm">{sr.fullName}</p>
                        <StatusBadge status={sr.status} />
                        {sr.company && <span className="text-white/30 text-xs">{sr.company}</span>}
                      </div>
                      <p className="text-primary/80 text-xs font-medium">{sr.serviceType}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-white/40 text-xs">{sr.email}</p>
                        <p className="text-white/40 text-xs">{sr.phone}</p>
                        {sr.budgetRange && <p className="text-white/30 text-xs">{sr.budgetRange}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-white/20 text-[10px]">{fmtDate(sr.createdAt)}</span>
                      {open ? <ChevronUp className="w-4 h-4 text-white/20" /> : <ChevronDown className="w-4 h-4 text-white/20" />}
                    </div>
                  </div>
                  {open && (
                    <div className="px-5 pb-5 border-t border-white/[0.06] pt-4 space-y-4">
                      <div>
                        <p className="text-white/30 text-xs font-semibold uppercase tracking-wide mb-1.5">Description</p>
                        <p className="text-white/60 text-sm leading-relaxed">{sr.description}</p>
                      </div>
                      {sr.timeline && (
                        <div>
                          <p className="text-white/30 text-xs font-semibold uppercase tracking-wide mb-1.5">Timeline</p>
                          <p className="text-white/60 text-sm">{sr.timeline}</p>
                        </div>
                      )}
                      {sr.adminNotes && (
                        <div>
                          <p className="text-white/30 text-xs font-semibold uppercase tracking-wide mb-1.5">Admin Notes</p>
                          <p className="text-amber-400/80 text-sm">{sr.adminNotes}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-2 pt-2 flex-wrap">
                        <span className="text-white/30 text-xs">Update status:</span>
                        {['new', 'pending', 'in-progress', 'completed', 'rejected'].map((s) => (
                          <button key={s} onClick={() => handleSRStatus(sr.id, s)} disabled={sr.status === s || isPending}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 ${
                              sr.status === s ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                            }`}>
                            {s}
                          </button>
                        ))}
                        <button onClick={() => handleSRDelete(sr.id)} disabled={isPending}
                          className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* ─── MESSAGES TAB ─────────────────────────────────────────────────── */}
        {activeTab === 'messages' && (
          <div className="space-y-3">
            {contactMessages.length === 0 && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-12 text-center">
                <InboxIcon className="w-8 h-8 text-white/20 mx-auto mb-3" />
                <p className="text-white/30 text-sm">No messages yet</p>
              </div>
            )}
            {contactMessages.map((cm) => {
              const key = `cm-${cm.id}`
              const open = expandedId === key
              return (
                <div key={cm.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/10 transition-colors">
                  <div className="flex items-start justify-between gap-4 p-5 cursor-pointer" onClick={() => {
                    setExpandedId(open ? null : key)
                    if (!open && cm.status === 'unread') handleCMStatus(cm.id, 'read')
                  }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <p className="text-white font-semibold text-sm">{cm.fullName}</p>
                        <StatusBadge status={cm.status} />
                      </div>
                      <p className="text-primary/80 text-xs font-medium">{cm.subject}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-white/40 text-xs">{cm.email}</p>
                        {cm.phone && <p className="text-white/40 text-xs">{cm.phone}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-white/20 text-[10px]">{fmtDate(cm.createdAt)}</span>
                      {open ? <ChevronUp className="w-4 h-4 text-white/20" /> : <ChevronDown className="w-4 h-4 text-white/20" />}
                    </div>
                  </div>
                  {open && (
                    <div className="px-5 pb-5 border-t border-white/[0.06] pt-4 space-y-4">
                      <div>
                        <p className="text-white/30 text-xs font-semibold uppercase tracking-wide mb-1.5">Message</p>
                        <p className="text-white/60 text-sm leading-relaxed">{cm.message}</p>
                      </div>
                      {cm.adminReply && (
                        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                          <p className="text-white/30 text-xs font-semibold uppercase tracking-wide mb-1">Your Reply</p>
                          <p className="text-green-400/80 text-sm">{cm.adminReply}</p>
                        </div>
                      )}
                      {/* Reply box */}
                      {replyTarget?.type === 'message' && replyTarget.id === cm.id ? (
                        <div className="space-y-2">
                          <textarea rows={3} value={replyText} onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your reply..."
                            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:border-primary/50" />
                          <div className="flex gap-2">
                            <button onClick={submitReply} disabled={isPending || !replyText.trim()}
                              className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50">
                              <CheckCircle className="w-3.5 h-3.5" /> Send Reply
                            </button>
                            <button onClick={() => { setReplyTarget(null); setReplyText('') }}
                              className="flex items-center gap-2 px-3 py-2 bg-white/5 text-white/40 text-xs rounded-lg hover:bg-white/10 transition-colors">
                              <X className="w-3.5 h-3.5" /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 pt-2 flex-wrap">
                          <button onClick={() => { setReplyTarget({ type: 'message', id: cm.id }); setReplyText('') }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-lg hover:bg-primary/20 transition-colors">
                            <MessageSquare className="w-3 h-3" /> Reply
                          </button>
                          {['unread', 'read', 'replied'].map((s) => (
                            <button key={s} onClick={() => handleCMStatus(cm.id, s)} disabled={cm.status === s || isPending}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 ${
                                cm.status === s ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                              }`}>
                              Mark {s}
                            </button>
                          ))}
                          <button onClick={() => handleCMDelete(cm.id)} disabled={isPending}
                            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* ─── TICKETS TAB ──────────────────────────────────────────────────── */}
        {activeTab === 'tickets' && (
          <div className="space-y-3">
            {supportTickets.length === 0 && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-12 text-center">
                <Ticket className="w-8 h-8 text-white/20 mx-auto mb-3" />
                <p className="text-white/30 text-sm">No support tickets yet</p>
              </div>
            )}
            {supportTickets.map((st) => {
              const key = `st-${st.id}`
              const open = expandedId === key
              return (
                <div key={st.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/10 transition-colors">
                  <div className="flex items-start justify-between gap-4 p-5 cursor-pointer" onClick={() => setExpandedId(open ? null : key)}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <p className="text-white font-semibold text-sm">{st.fullName}</p>
                        <StatusBadge status={st.status} />
                        <PriorityBadge priority={st.priority} />
                      </div>
                      <p className="text-primary/80 text-xs font-medium">{st.subject}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-white/40 text-xs">{st.email}</p>
                        <p className="text-white/30 text-xs">{st.issueCategory}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-white/20 text-[10px]">{fmtDate(st.createdAt)}</span>
                      {open ? <ChevronUp className="w-4 h-4 text-white/20" /> : <ChevronDown className="w-4 h-4 text-white/20" />}
                    </div>
                  </div>
                  {open && (
                    <div className="px-5 pb-5 border-t border-white/[0.06] pt-4 space-y-4">
                      <div>
                        <p className="text-white/30 text-xs font-semibold uppercase tracking-wide mb-1.5">Description</p>
                        <p className="text-white/60 text-sm leading-relaxed">{st.description}</p>
                      </div>
                      {st.adminResponse && (
                        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                          <p className="text-white/30 text-xs font-semibold uppercase tracking-wide mb-1">Admin Response</p>
                          <p className="text-green-400/80 text-sm">{st.adminResponse}</p>
                        </div>
                      )}
                      {replyTarget?.type === 'ticket' && replyTarget.id === st.id ? (
                        <div className="space-y-2">
                          <textarea rows={3} value={replyText} onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your response..."
                            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:border-primary/50" />
                          <div className="flex gap-2">
                            <button onClick={submitReply} disabled={isPending || !replyText.trim()}
                              className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50">
                              <CheckCircle className="w-3.5 h-3.5" /> Resolve & Respond
                            </button>
                            <button onClick={() => { setReplyTarget(null); setReplyText('') }}
                              className="flex items-center gap-2 px-3 py-2 bg-white/5 text-white/40 text-xs rounded-lg hover:bg-white/10 transition-colors">
                              <X className="w-3.5 h-3.5" /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 pt-2 flex-wrap">
                          <button onClick={() => { setReplyTarget({ type: 'ticket', id: st.id }); setReplyText('') }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-lg hover:bg-primary/20 transition-colors">
                            <MessageSquare className="w-3 h-3" /> Respond
                          </button>
                          {['open', 'in-progress', 'resolved', 'closed'].map((s) => (
                            <button key={s} onClick={() => handleSTStatus(st.id, s)} disabled={st.status === s || isPending}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 ${
                                st.status === s ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                              }`}>
                              {s}
                            </button>
                          ))}
                          <button onClick={() => handleSTDelete(st.id)} disabled={isPending}
                            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
