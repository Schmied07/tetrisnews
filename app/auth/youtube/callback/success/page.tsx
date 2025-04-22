'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function YouTubeSuccessContent() {
  const searchParams = useSearchParams();
  const isSubscribed = searchParams.get('subscribed') === 'true';
  const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@votre_chaîne'; // Remplacez par votre URL de chaîne

  if (!isSubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md px-4">
          <div className="text-red-500 text-6xl mb-6">❌</div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Abonnement non vérifié
          </h1>
          <p className="text-gray-600 mb-6">
            Vous n'êtes pas abonné à notre chaîne YouTube. Veuillez vous abonner pour recevoir le PDF.
          </p>
          <Link 
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            S'abonner à notre chaîne YouTube
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        <div className="text-green-500 text-6xl mb-6">✓</div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Abonnement vérifié avec succès !
        </h1>
        <p className="text-gray-600">
          Votre email a été enregistré. Le PDF vous sera envoyé dans quelques minutes.
        </p>
      </div>
    </div>
  );
}

export default function YouTubeSuccess() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <YouTubeSuccessContent />
    </Suspense>
  );
} 