import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with ZamTech Automation Studio in Mbeya, Tanzania. Send us a message, call, or WhatsApp us for a free consultation on your project.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact ZamTech | Mbeya Tanzania', description: 'Reach our team via form, phone, or WhatsApp for a free ICT consultation.', url: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
