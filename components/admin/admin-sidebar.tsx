'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, InboxIcon, Ticket, FileText, LogOut, ChevronLeft } from 'lucide-react'
import { signOut } from '@/lib/auth-client'

interface AdminSidebarProps {
  user: { name: string; email: string; image?: string | null }
}

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/service-requests', label: 'Service Requests', icon: FileText },
  { href: '/admin/messages', label: 'Messages', icon: InboxIcon },
  { href: '/admin/tickets', label: 'Support Tickets', icon: Ticket },
]

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/admin-login')
    router.refresh()
  }

  return (
    <aside className="w-64 shrink-0 bg-[#0a0d14] border-r border-white/[0.06] flex flex-col min-h-screen">
      {/* Brand */}
      <div className="p-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-extrabold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>ZT</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>ZamTech Admin</p>
            <p className="text-white/30 text-xs">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                active
                  ? 'bg-primary/15 text-primary'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
              }`}>
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-primary' : 'text-white/40 group-hover:text-white/60'}`} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Back to site */}
      <div className="px-4 pb-2">
        <Link href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all">
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to Website
        </Link>
      </div>

      {/* User + Sign Out */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
            <span className="text-primary font-bold text-xs">{user.name?.charAt(0).toUpperCase() ?? 'A'}</span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user.name}</p>
            <p className="text-white/30 text-[10px] truncate">{user.email}</p>
          </div>
        </div>
        <button onClick={handleSignOut}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
