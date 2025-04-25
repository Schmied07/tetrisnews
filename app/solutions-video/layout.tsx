import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tutoriels Vidéo d\'Automatisation | TetrisNews',
  description: 'Apprenez à créer vos propres solutions d\'automatisation avec nos tutoriels vidéo détaillés. Des démonstrations pas à pas pour maîtriser l\'intelligence artificielle et l\'analyse de données.',
  keywords: ['tutoriels automatisation', 'démonstrations IA', 'apprentissage data science', 'tutoriels vidéo', 'automatisation', 'intelligence artificielle', 'tetrisnews'],
  openGraph: {
    title: 'Tutoriels Vidéo d\'Automatisation | TetrisNews',
    description: 'Apprenez à créer vos propres solutions d\'automatisation avec nos tutoriels vidéo détaillés.',
    url: 'https://tetrisnews.com/solutions-video',
    siteName: 'TetrisNews',
    images: [
      {
        url: 'https://i.ibb.co/mG0GPDX/tetrisnews-1.png',
        width: 1200,
        height: 630,
        alt: 'TetrisNews - Tutoriels Vidéo d\'Automatisation',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tetrisnews.com/solutions-video',
  },
  other: {
    'youtube:channel': 'https://www.youtube.com/@tetrisnews',
    'tiktok:creator': '@tetrisnews',
    'linkedin:company': 'tetrisnews',
  }
}

export default function SolutionsVideoLayout({
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