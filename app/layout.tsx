import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from './components/Footer'
import GoogleAnalytics from './components/GoogleAnalytics'
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/react"
import Navbar from './components/Navbar'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tetrisnews.com'),
  title: {
    default: 'TetrisNews - Intelligence Artificielle et Analyse de Données',
    template: '%s | TetrisNews'
  },
  description: 'Découvrez les dernières actualités sur l\'intelligence artificielle et l\'analyse de données. Solutions d\'analyse et d\'ingénierie des données pour transformer vos données en opportunités.',
  keywords: [
    'intelligence artificielle', 
    'analyse de données', 
    'IA', 
    'data science', 
    'machine learning', 
    'big data', 
    'tetrisnews',
    'automatisation',
    'business intelligence',
    'data engineering',
    'analytics',
    'solutions data'
  ],
  authors: [{ name: 'TetrisNews', url: 'https://tetrisnews.com' }],
  creator: 'TetrisNews',
  publisher: 'TetrisNews',
  applicationName: 'TetrisNews',
  classification: 'Business',
  category: 'Technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'votre-code-de-verification-google',
    yandex: 'votre-code-de-verification-yandex',
    yahoo: 'votre-code-de-verification-yahoo',
  },
  alternates: {
    canonical: 'https://tetrisnews.com',
    languages: {
      'fr-FR': 'https://tetrisnews.com',
    },
  },
  openGraph: {
    title: 'TetrisNews - Solutions d\'analyse et d\'ingénierie des données',
    description: 'Transformez vos données en opportunités avec nos solutions d\'analyse et d\'ingénierie des données.',
    url: 'https://tetrisnews.com',
    siteName: 'TetrisNews',
    images: [
      {
        url: 'https://i.ibb.co/mG0GPDX/tetrisnews-1.png',
        width: 1200,
        height: 630,
        alt: 'TetrisNews - Intelligence Artificielle et Analyse de Données',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TetrisNews - Solutions d\'analyse et d\'ingénierie des données',
    description: 'Transformez vos données en opportunités avec nos solutions d\'analyse et d\'ingénierie des données.',
    images: ['https://i.ibb.co/mG0GPDX/tetrisnews-1.png'],
    creator: '@tetrisnews',
    site: '@tetrisnews',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#0066cc',
      },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'msapplication-navbutton-color': '#0066cc',
    'msapplication-TileColor': '#0066cc',
    'theme-color': '#0066cc',
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TetrisNews',
  description: 'Solutions d\'analyse et d\'ingénierie des données pour transformer vos données en opportunités.',
  url: 'https://tetrisnews.com',
  logo: 'https://i.ibb.co/mG0GPDX/tetrisnews-1.png',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://tetrisnews.com/contact',
  },
  sameAs: [
    'https://www.youtube.com/@tetrisnews',
    'https://www.linkedin.com/company/tetrisnews',
    'https://www.tiktok.com/@tetrisnews'
  ],
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://tetrisnews.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} font-sans`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://tetrisnews.com" />
        <link rel="dns-prefetch" href="https://i.ibb.co" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          id="json-ld"
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://app.secureprivacy.ai/script/67ff2bb34e35369830e53bf7.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <GoogleAnalytics />
        <Navbar />
        <main role="main">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}