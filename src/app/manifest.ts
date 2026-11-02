import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ReflowPDF',
    short_name: 'ReflowPDF',
    description: 'Notion-style responsive PDF reader',
    start_url: '/',
    id: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#191919',
    theme_color: '#191919',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
