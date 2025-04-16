import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Footer from './components/Footer'
import Link from 'next/link'
import GoogleAnalytics from './components/GoogleAnalytics'
import Script from 'next/script'

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
        <header className="bg-background shadow-sm sticky top-0 z-50 border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Navigation principale">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Image
                    src="https://i.ibb.co/mG0GPDX/tetrisnews-1.png"
                    alt="TetrisNews Logo - Retour à l'accueil"
                    width={150}
                    height={50}
                    className="h-12 w-auto"
                    priority
                  />
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-text hover:text-primary transition-colors duration-300" aria-label="Accueil">Accueil</a>
                <a href="/solutions" className="text-text hover:text-primary transition-colors duration-300" aria-label="Nos solutions">Solutions</a>
                <a href="/actualites" className="text-text hover:text-primary transition-colors duration-300" aria-label="Actualités">Actualité</a>
                <a href="/login" className="bg-primary text-white hover:bg-primary-dark font-medium py-2 px-4 rounded-lg transition-colors duration-300" aria-label="Se connecter">Connexion</a>
              </div>
              <button className="md:hidden text-primary" aria-label="Menu mobile">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </header>
        <GoogleAnalytics />
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
} 