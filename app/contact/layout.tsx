import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | TetrisNews',
  description: 'Contactez l\'équipe TetrisNews pour vos projets d\'intelligence artificielle et d\'analyse de données. Nous sommes là pour vous accompagner.',
  keywords: ['contact tetrisnews', 'support IA', 'aide data science', 'projets IA', 'analyse de données', 'intelligence artificielle', 'tetrisnews'],
  openGraph: {
    title: 'Contact | TetrisNews',
    description: 'Contactez l\'équipe TetrisNews pour vos projets d\'intelligence artificielle et d\'analyse de données.',
    url: 'https://tetrisnews.com/contact',
    siteName: 'TetrisNews',
    images: [
      {
        url: 'https://i.ibb.co/mG0GPDX/tetrisnews-1.png',
        width: 1200,
        height: 630,
        alt: 'TetrisNews - Contact',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tetrisnews.com/contact',
  },
  other: {
    'youtube:channel': 'https://www.youtube.com/@tetrisnews',
    'tiktok:creator': '@tetrisnews',
    'linkedin:company': 'tetrisnews',
  }
}

export default function ContactLayout({
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