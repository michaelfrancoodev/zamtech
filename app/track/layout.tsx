import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Track Your Request',
  description: 'Enter your tracking reference to check the live status of your service request or support ticket with ZamTech Automation Studio.',
  alternates: { canonical: '/track' },
  robots: { index: false, follow: false },
}

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children
}
