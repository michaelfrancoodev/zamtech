import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* ── Image optimization ── */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    minimumCacheTTL: 86400,
  },

  /* ── Security & performance headers ── */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control',   value: 'on' },
          { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        // Long-lived cache for static assets
        source: '/(.*)\\.(png|jpg|jpeg|gif|ico|svg|webp|avif|woff|woff2|ttf|otf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  /* ── Redirects ── */
  async redirects() {
    return [
      { source: '/home',    destination: '/',         permanent: true },
      { source: '/service', destination: '/services', permanent: true },
    ]
  },
}

export default nextConfig
