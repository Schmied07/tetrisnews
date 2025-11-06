'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Video {
  _id: string;
  Titre: string;
  Description: string;
  Catégorie: string;
  LienVideo: string;
  secteur: string;
  datePublication: string;
}

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copyNotification, setCopyNotification] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/solutions-video/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Vidéo non trouvée');
        }
        
        const data = await response.json();
        setVideo(data);
      } catch (err) {
        console.error('Erreur lors de la récupération de la vidéo:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [params.id]);

  const copyLink = async () => {
    try {
      const pageUrl = `https://tetrisnews.fr/solutions-video/${params.id}`;
      await navigator.clipboard.writeText(pageUrl);
      setCopyNotification(true);
      setTimeout(() => setCopyNotification(false), 3000);
    } catch (err) {
      console.error('Erreur lors de la copie du lien:', err);
    }
  };

  const openVideo = () => {
    if (video?.LienVideo) {
      window.open(video.LienVideo, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text">Chargement de la vidéo...</p>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text mb-2">Vidéo non trouvée</h1>
          <p className="text-text-light mb-6">{error || 'Cette vidéo n\'existe pas ou a été supprimée.'}</p>
          <button
            onClick={() => router.push('/solutions-video')}
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Retour aux vidéos
          </button>
        </div>
      </div>
    );
  }

  const isLinkedInVideo = video.LienVideo?.includes('linkedin.com');
  const isYouTubeVideo = video.LienVideo?.includes('youtube.com') || video.LienVideo?.includes('youtu.be');

  return (
    <div className="min-h-screen py-24 bg-background">
      {/* Notification de copie */}
      {copyNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Lien copié !
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bouton retour */}
        <button
          onClick={() => router.push('/solutions-video')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux vidéos
        </button>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Section vidéo */}
          <div className="relative">
            {isYouTubeVideo ? (
              <div className="relative pt-[56.25%]">
                <iframe
                  src={video.LienVideo.replace('watch?v=', 'embed/')}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : isLinkedInVideo ? (
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
                <div className="text-center px-8">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <p className="text-white text-lg mb-6">Cette vidéo est hébergée sur LinkedIn</p>
                  <button
                    onClick={openVideo}
                    className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Voir sur LinkedIn
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 py-20">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Format de vidéo non supporté</p>
                </div>
              </div>
            )}
          </div>

          {/* Contenu */}
          <div className="p-8">
            {/* Titre et badges */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-text mb-4">{video.Titre}</h1>
              <div className="flex flex-wrap gap-3">
                {video.secteur && (
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
                    {video.secteur}
                  </span>
                )}
                {video.Catégorie && (
                  <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full">
                    {video.Catégorie}
                  </span>
                )}
                {video.datePublication && (
                  <span className="inline-block bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full">
                    📅 {video.datePublication}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {video.Description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-text mb-3">Description</h2>
                <p className="text-text-light leading-relaxed whitespace-pre-line">{video.Description}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copier le lien
              </button>
              
              {video.LienVideo && (
                <button
                  onClick={openVideo}
                  className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Voir la vidéo originale
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
