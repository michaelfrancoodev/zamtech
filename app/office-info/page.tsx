import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Calendar, MessageCircle, Navigation } from 'lucide-react'
import PageWrapper from '@/components/page-wrapper'

export const metadata: Metadata = {
  title: 'Office Location & Hours',
  description: 'Visit ZamTech Automation Studio in Mbeya, Tanzania. Office address, business hours, phone number, and directions.',
  alternates: { canonical: '/office-info' },
  openGraph: { title: 'Office Info | ZamTech Mbeya Tanzania', description: 'ZamTech office address, hours, and contact details in Mbeya, Tanzania.', url: '/office-info' },
}

const schedule = [
  { day: 'Monday', open: '8:00 AM', close: '6:00 PM', status: 'open' },
  { day: 'Tuesday', open: '8:00 AM', close: '6:00 PM', status: 'open' },
  { day: 'Wednesday', open: '8:00 AM', close: '6:00 PM', status: 'open' },
  { day: 'Thursday', open: '8:00 AM', close: '6:00 PM', status: 'open' },
  { day: 'Friday', open: '8:00 AM', close: '6:00 PM', status: 'open' },
  { day: 'Saturday', open: '9:00 AM', close: '2:00 PM', status: 'limited' },
  { day: 'Sunday', open: '—', close: '—', status: 'closed' },
]

const details = [
  { icon: MapPin, label: 'Physical Address', value: 'Mbeya, Tanzania' },
  { icon: Phone, label: 'Main Phone', value: '+255 796 985 138' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+255 796 985 138' },
  { icon: Mail, label: 'General Enquiries', value: 'info@zamtech.co.tz' },
  { icon: Mail, label: 'Technical Support', value: 'support@zamtech.co.tz' },
          { icon: Navigation, label: 'Nearest Landmark', value: 'Mbeya City Centre, Tanzania' },
]

function statusColor(status: string) {
  if (status === 'open') return 'text-green-600 bg-green-50'
  if (status === 'limited') return 'text-amber-600 bg-amber-50'
  return 'text-red-500 bg-red-50'
}

function statusLabel(status: string) {
  if (status === 'open') return 'Open'
  if (status === 'limited') return 'Limited'
  return 'Closed'
}

export default function OfficeInfoPage() {
  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.15em] mb-3">Our Location</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-balance mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}>Office Information</h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            We welcome clients at our office in Mbeya. Here you will find everything you need to plan your visit or reach out to us.
          </p>
        </div>
      </section>

      {/* Office Details + Hours */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Details</h2>
              <div className="bg-card border border-border rounded-xl divide-y divide-border">
                {details.map((d) => {
                  const Icon = d.icon
                  return (
                    <div key={d.label} className="flex items-start gap-4 p-5">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest mb-0.5">{d.label}</p>
                        <p className="text-foreground font-medium text-sm">{d.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 flex gap-3">
                <a
                  href="tel:+255796985138"
                  className="flex-1 bg-primary text-white font-semibold py-3 rounded-md text-sm text-center hover:bg-primary/90 transition-colors"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/255796985138"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-primary text-primary font-semibold py-3 rounded-md text-sm text-center hover:bg-primary hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Opening Hours
              </h2>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="bg-muted/50 px-5 py-3 flex justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <span>Day</span>
                  <span className="flex gap-16">
                    <span>Opens</span>
                    <span>Closes</span>
                    <span>Status</span>
                  </span>
                </div>
                {schedule.map((s) => (
                  <div
                    key={s.day}
                    className={`flex items-center justify-between px-5 py-4 border-t border-border ${s.status === 'closed' ? 'opacity-50' : ''}`}
                  >
                    <span className="text-foreground font-medium text-sm w-28">{s.day}</span>
                    <div className="flex gap-12 text-sm text-muted-foreground">
                      <span className="w-16 text-right">{s.open}</span>
                      <span className="w-16 text-right">{s.close}</span>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full w-16 text-center ${statusColor(s.status)}`}>
                        {statusLabel(s.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-primary/5 border border-primary/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground text-sm leading-relaxed">
                    <strong>Public Holidays:</strong> We may be closed on Tanzanian public holidays. Please call ahead or check our social media for announcements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Find Us on the Map</h2>
            <div className="rounded-2xl overflow-hidden border border-border h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63657.23611!2d33.4351!3d-8.9094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19cb21edb8d03853%3A0x8af4d8a8a6d6f7e2!2sMbeya!5e0!3m2!1sen!2stz!4v1700000000000!5m2!1sen!2stz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ZamTech Location on Map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Plan Your Visit</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We recommend scheduling an appointment before visiting so we can dedicate full attention to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/request-service"
              className="bg-primary text-white font-semibold px-7 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              Book a Consultation
            </Link>
            <Link
              href="/contact"
              className="border border-border text-foreground font-semibold px-7 py-3 rounded-md hover:bg-muted transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
