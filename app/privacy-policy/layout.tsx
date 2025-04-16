import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité - TETRISNEWS',
  description: 'Découvrez comment nous protégeons vos données personnelles sur TETRISNEWS.',
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 