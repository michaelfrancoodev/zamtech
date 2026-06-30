import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request a Service',
  description: 'Start your project with ZamTech. Fill in our service request form and get a detailed proposal within 24 hours — free consultation, no obligation.',
  alternates: { canonical: '/request-service' },
  openGraph: { title: 'Request a Service | ZamTech Tanzania', description: 'Submit your project details and receive a free quote within 24 hours.', url: '/request-service' },
}

export default function RequestServiceLayout({ children }: { children: React.ReactNode }) {
  return children
}
