import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guides PDF d\'Automatisation | TetrisNews',
  description: 'Accédez à nos guides PDF détaillés pour créer vos solutions d\'automatisation. Des instructions pas à pas, des exemples concrets et des ressources pratiques pour reproduire nos solutions.',
  keywords: ['guides automatisation', 'tutoriels PDF', 'instructions détaillées', 'exemples concrets', 'automatisation', 'intelligence artificielle', 'tetrisnews'],
  openGraph: {
    title: 'Guides PDF d\'Automatisation | TetrisNews',
    description: 'Accédez à nos guides PDF détaillés pour créer vos solutions d\'automatisation.',
    url: 'https://tetrisnews.com/solutions-pdf',
    siteName: 'TetrisNews',
    images: [
      {
        url: 'https://i.ibb.co/mG0GPDX/tetrisnews-1.png',
        width: 1200,
        height: 630,
        alt: 'TetrisNews - Guides PDF d\'Automatisation',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tetrisnews.com/solutions-pdf',
  },
  other: {
    'youtube:channel': 'https://www.youtube.com/@tetrisnews',
    'tiktok:creator': '@tetrisnews',
    'linkedin:company': 'tetrisnews',
  }
}

export default function SolutionsPdfLayout({
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