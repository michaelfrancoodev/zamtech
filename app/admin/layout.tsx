import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import AdminSidebar from '@/components/admin/admin-sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    redirect('/admin-login')
  }

  return (
    <div className="min-h-screen bg-[#0f1117] flex">
      {/* Suspense required because AdminSidebar uses useSearchParams() */}
      <Suspense fallback={<div className="w-60 shrink-0 bg-[#070b14] border-r border-white/[0.06]" />}>
        <AdminSidebar user={session.user} />
      </Suspense>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
