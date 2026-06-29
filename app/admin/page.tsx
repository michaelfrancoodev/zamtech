import { getDashboardCounts, getServiceRequests, getContactMessages, getSupportTickets } from '@/app/actions/data'
import AdminOverview from '@/components/admin/admin-overview'

export default async function AdminDashboardPage() {
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
    />
  )
}
