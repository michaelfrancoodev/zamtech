import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

interface PageWrapperProps {
  children: React.ReactNode
}

// Navbar is 64px (h-16). Offset inner pages to clear the fixed nav.
export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
