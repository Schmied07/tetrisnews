import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TetrisNews - Intelligence Artificielle et Analyse de Données',
    short_name: 'TetrisNews',
    description: 'Solutions d\'analyse et d\'ingénierie des données pour transformer vos données en opportunités.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0f8ff',
    theme_color: '#0066cc',
    orientation: 'portrait-primary',
    categories: ['business', 'education', 'productivity'],
    lang: 'fr',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}