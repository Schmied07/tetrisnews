'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function YouTubeCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifySubscription = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const { email, solutionId } = JSON.parse(state || '{}');

        if (!code || !email || !solutionId) {
          throw new Error('Paramètres manquants');
        }

        const response = await fetch('/api/auth/youtube/callback', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        if (!data.isSubscribed) {
          router.push('/solutions-pdf?error=not_subscribed');
        }
      } catch (err) {
        router.push('/solutions-pdf?error=auth_failed');
      }
    };

    verifySubscription();
  }, [router, searchParams]);

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