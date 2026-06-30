import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import BackToTop from '@/components/back-to-top'
import CookieConsent from '@/components/cookie-consent'
import './globals.css'

const BASE_URL = 'https://zamtech.co.tz'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'ZamTech Automation Studio',
  alternateName: 'ZamTech',
  url: BASE_URL,
  logo: `${BASE_URL}/images/zamtech-logo.png`,
  image: `${BASE_URL}/images/hero-office.png`,
  description:
    'Professional ICT solutions for businesses in Tanzania — websites, mobile apps, ERP systems, database solutions, and digital transformation.',
  telephone: '+255796985138',
  email: 'info@zamtech.co.tz',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mbeya',
    addressRegion: 'Mbeya Region',
    addressCountry: 'TZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-8.9094',
    longitude: '33.4607',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '13:00' },
  ],
  priceRange: 'TZS 500,000 – TZS 12,000,000+',
  currenciesAccepted: 'TZS, USD',
  paymentAccepted: 'M-Pesa, Bank Transfer, Cash',
  areaServed: { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: '-8.9094', longitude: '33.4607' }, geoRadius: '800000' },
  sameAs: [
    'https://www.facebook.com/zamtech',
    'https://www.linkedin.com/company/zamtech',
    'https://twitter.com/zamtech',
  ],
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap', weight: ['400','500','600','700','800'] })

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ZamTech Automation Studio | ICT Solutions Mbeya, Tanzania',
    template: '%s | ZamTech Automation Studio',
  },
  description:
    'ZamTech Automation Studio — professional software development, mobile apps, business systems, ICT consultancy, and database solutions based in Mbeya, Tanzania.',
  keywords: [
    'ICT Tanzania', 'software development Tanzania', 'web development Mbeya',
    'business automation Tanzania', 'mobile apps Tanzania',
    'ERP Tanzania', 'POS system Tanzania', 'ZamTech', 'Michael Francoo',
    'ICT Mbeya', 'software company Tanzania',
  ],
  authors: [{ name: 'ZamTech Automation Studio', url: BASE_URL }],
  creator: 'ZamTech Automation Studio',
  publisher: 'ZamTech Automation Studio',
  openGraph: {
    type: 'website',
    locale: 'en_TZ',
    url: BASE_URL,
    siteName: 'ZamTech Automation Studio',
    title: 'ZamTech Automation Studio | ICT Solutions Mbeya, Tanzania',
    description:
      'Professional software development, mobile apps, ERP systems, and digital transformation for businesses across Tanzania.',
    images: [{ url: '/images/hero-office.png', width: 1200, height: 630, alt: 'ZamTech Automation Studio — Mbeya Tanzania' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zamtech',
    creator: '@zamtech',
    title: 'ZamTech Automation Studio | ICT Solutions Mbeya, Tanzania',
    description: 'Professional ICT solutions for businesses across Tanzania.',
    images: ['/images/hero-office.png'],
  },
  alternates: { canonical: BASE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
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
        <CookieConsent />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  )
}
