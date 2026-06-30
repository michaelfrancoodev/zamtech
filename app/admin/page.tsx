import { getDashboardCounts, getServiceRequests, getContactMessages, getSupportTickets } from '@/app/actions/data'
import AdminOverview from '@/components/admin/admin-overview'

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams

  const [counts, serviceRequests, contactMessages, supportTickets] = await Promise.all([
    getDashboardCounts(),
    getServiceRequests(),
    getContactMessages(),
    getSupportTickets(),
  ])

  return (
    <AdminOverview
      counts={counts}
      serviceRequests={serviceRequests}
      contactMessages={contactMessages}
      supportTickets={supportTickets}
      initialTab={tab}
    />
  )
}
