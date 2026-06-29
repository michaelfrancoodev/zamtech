import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import BackToTop from '@/components/back-to-top'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap', weight: ['400','500','600','700','800'] })

export const metadata: Metadata = {
  title: 'ZamTech Automation Studio | ICT Solutions Mbeya, Tanzania',
  description:
    'ZamTech Automation Studio — professional software development, mobile apps, business systems, ICT consultancy, and database solutions based in Mbeya, Tanzania. Founded by Michael Francoo.',
  keywords: [
    'ICT Tanzania',
    'software development Tanzania',
    'web development Mbeya Tanzania',
    'business automation Tanzania',
    'mobile apps Tanzania',
    'ZamTech',
    'Michael Francoo',
  ],
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#00c8ff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${plusJakarta.variable} bg-background`}>
      <body className="font-sans antialiased">

        {children}
        <BackToTop />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
