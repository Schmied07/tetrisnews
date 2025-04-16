import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tetrisnews - Solutions d\'analyse et d\'ingénierie des données',
  description: 'Transformez vos données en opportunités. Solutions d\'analyse et d\'ingénierie des données pour automatiser vos processus et optimiser vos décisions.',
  keywords: 'analyse de données, ingénierie des données, automatisation, optimisation, solutions, Tetrisnews',
  openGraph: {
    title: 'Tetrisnews - Solutions d\'analyse et d\'ingénierie des données',
    description: 'Transformez vos données en opportunités. Solutions d\'analyse et d\'ingénierie des données pour automatiser vos processus et optimiser vos décisions.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Tetrisnews',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tetrisnews - Solutions d\'analyse et d\'ingénierie des données',
    description: 'Transformez vos données en opportunités. Solutions d\'analyse et d\'ingénierie des données pour automatiser vos processus et optimiser vos décisions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  alternates: {
    canonical: 'https://tetrisnews.com',
  },
}; 