import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Actualités IA et Data Science | TetrisNews',
  description: 'Restez informé des dernières actualités sur l\'intelligence artificielle et l\'analyse de données. Articles, analyses et tendances du secteur.',
  keywords: ['actualités IA', 'news data science', 'tendances IA', 'analyse de données', 'intelligence artificielle', 'tetrisnews'],
  openGraph: {
    title: 'Actualités IA et Data Science | TetrisNews',
    description: 'Restez informé des dernières actualités sur l\'intelligence artificielle et l\'analyse de données.',
    url: 'https://tetrisnews.com/actualites',
    siteName: 'TetrisNews',
    images: [
      {
        url: 'https://i.ibb.co/mG0GPDX/tetrisnews-1.png',
        width: 1200,
        height: 630,
        alt: 'TetrisNews - Actualités IA et Data Science',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tetrisnews.com/actualites',
  },
  other: {
    'youtube:channel': 'https://www.youtube.com/@tetrisnews',
    'tiktok:creator': '@tetrisnews',
    'linkedin:company': 'tetrisnews',
  }
}

export default function ActualitesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
} 