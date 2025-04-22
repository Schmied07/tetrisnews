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
  title: 'TetrisNews - Intelligence Artificielle et Analyse de Données',
  description: 'Découvrez les dernières actualités sur l\'intelligence artificielle et l\'analyse de données.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'TetrisNews - Solutions d\'analyse et d\'ingénierie des données',
    description: 'Transformez vos données en opportunités avec nos solutions d\'analyse et d\'ingénierie des données.',
    url: 'https://tetrisnews.fr',
    siteName: 'TetrisNews',
    images: [
      {
        url: 'https://i.ibb.co/mG0GPDX/tetrisnews-1.png',
        width: 1200,
        height: 630,
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
  },
  icons: {
    icon: 'https://i.ibb.co/mG0GPDX/tetrisnews-1.png',
    shortcut: 'https://i.ibb.co/mG0GPDX/tetrisnews-1.png',
    apple: 'https://i.ibb.co/mG0GPDX/tetrisnews-1.png',
  },
  manifest: '/site.webmanifest',
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