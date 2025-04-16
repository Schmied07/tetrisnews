import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions d\'utilisation - TETRISNEWS',
  description: 'Découvrez les conditions d\'utilisation de notre site TETRISNEWS.',
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 