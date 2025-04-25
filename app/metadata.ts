import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TetrisNews - Intelligence Artificielle et Analyse de Données',
  description: 'Découvrez les dernières actualités sur l\'intelligence artificielle et l\'analyse de données. Solutions d\'analyse et d\'ingénierie des données pour transformer vos données en opportunités.',
  keywords: ['intelligence artificielle', 'analyse de données', 'IA', 'data science', 'machine learning', 'big data', 'tetrisnews'],
  openGraph: {
    title: 'TetrisNews - Intelligence Artificielle et Analyse de Données',
    description: 'Solutions d\'analyse et d\'ingénierie des données pour transformer vos données en opportunités.',
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
  alternates: {
    canonical: 'https://tetrisnews.com',
  },
  other: {
    'youtube:channel': 'https://www.youtube.com/@tetrisnews',
    'tiktok:creator': '@tetrisnews',
    'linkedin:company': 'tetrisnews',
  }
} 