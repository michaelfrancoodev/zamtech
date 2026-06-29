'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, InboxIcon, Ticket, FileText,
  LogOut, ChevronLeft, Globe,
} from 'lucide-react'
import { signOut } from '@/lib/auth-client'

interface AdminSidebarProps {
  user: { name: string; email: string; image?: string | null }
}

const navItems = [
  { href: '/admin',                  label: 'Overview',        icon: LayoutDashboard, exact: true },
  { href: '/admin/service-requests', label: 'Service Requests',icon: FileText },
  { href: '/admin/messages',         label: 'Messages',        icon: InboxIcon },
  { href: '/admin/tickets',          label: 'Support Tickets', icon: Ticket },
]

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()
  const router   = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/admin-login')
    router.refresh()
  }

  return (
    <aside className="w-60 shrink-0 bg-[#070b14] border-r border-white/[0.06] flex flex-col min-h-screen">

      {/* ── Brand ── */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 shrink-0">
            <Image
              src="/images/zamtech-logo.png"
              alt=""
              fill
              className="object-contain mix-blend-screen"
              sizes="36px"
            />
          </div>
          <div className="leading-none min-w-0">
            <p className="text-white font-extrabold text-[15px] leading-none" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
              ZamTech
            </p>
            <p className="text-white/30 text-[9px] font-semibold uppercase tracking-[0.18em] mt-[4px]">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Admin navigation">
        <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.18em] px-3 mb-3">
          Navigation
        </p>
        {navItems.map((item) => {
          const Icon   = item.icon
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                active
                  ? 'bg-[#00C8FF]/12 text-[#00C8FF]'
                  : 'text-white/45 hover:text-white/80 hover:bg-white/[0.05]'
              }`}
            >
              {/* Active left bar */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#00C8FF] rounded-r-full" />
              )}
              <Icon
                className={`w-[17px] h-[17px] shrink-0 transition-colors ${
                  active ? 'text-[#00C8FF]' : 'text-white/35 group-hover:text-white/60'
                }`}
              />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* ── Back to website ── */}
      <div className="px-3 pb-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs text-white/25 hover:text-white/60 hover:bg-white/[0.04] transition-all group"
        >
          <Globe className="w-3.5 h-3.5 group-hover:text-[#00C8FF] transition-colors" />
          Back to Website
        </Link>
      </div>

      {/* ── User + Sign Out ── */}
      <div className="p-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] mb-2">
          <div className="w-7 h-7 bg-[#00C8FF]/20 rounded-full flex items-center justify-center shrink-0">
            <span className="text-[#00C8FF] font-bold text-xs">
              {user.name?.charAt(0).toUpperCase() ?? 'A'}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-semibold truncate leading-none">{user.name}</p>
            <p className="text-white/30 text-[10px] truncate mt-0.5">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-xs text-white/35 hover:text-red-400 hover:bg-red-500/[0.08] transition-all group"
        >
          <LogOut className="w-3.5 h-3.5 group-hover:text-red-400 transition-colors" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
