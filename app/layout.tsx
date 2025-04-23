import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Footer from './components/Footer'
import Link from 'next/link'
import GoogleAnalytics from './components/GoogleAnalytics'
import Script from 'next/script'
import Header from './components/Header'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://tetrisnews.com'),
  title: {
    default: 'TetrisNews - Intelligence Artificielle et Analyse de Données',
    template: '%s | TetrisNews'
  },
  description: 'Découvrez les dernières actualités sur l\'intelligence artificielle et l\'analyse de données. Solutions d\'analyse et d\'ingénierie des données pour transformer vos données en opportunités.',
  keywords: ['intelligence artificielle', 'analyse de données', 'IA', 'data science', 'machine learning', 'big data', 'tetrisnews'],
  authors: [{ name: 'TetrisNews' }],
  creator: 'TetrisNews',
  publisher: 'TetrisNews',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
      { url: '/apple-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.className}>
      <head>
        <Script
          src="https://app.secureprivacy.ai/script/67ff2bb34e35369830e53bf7.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background">
        <Header />
        <GoogleAnalytics />
        <main className="flex-grow pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
} 