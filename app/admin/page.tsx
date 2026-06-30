import { getDashboardCounts, getServiceRequests, getContactMessages, getSupportTickets, getAdminUsers } from '@/app/actions/data'
import AdminOverview from '@/components/admin/admin-overview'

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams

  const [counts, serviceRequests, contactMessages, supportTickets, adminUsers] = await Promise.all([
    getDashboardCounts(),
    getServiceRequests(),
    getContactMessages(),
    getSupportTickets(),
    getAdminUsers(),
  ])

  return (
    <AdminOverview
      counts={counts}
      serviceRequests={serviceRequests}
      contactMessages={contactMessages}
      supportTickets={supportTickets}
      adminUsers={adminUsers}
      initialTab={tab}
    />
  )
}
