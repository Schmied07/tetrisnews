'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import YouTube from 'react-youtube';
import Link from 'next/link';
import AuthButton from './AuthButton';

interface Notification {
  _id: string;
  title: string;
  content: string;
  date: string;
  type: string;
}

interface Video {
  _id: string;
  Titre: string;
  Description: string;
  Catégorie: string;
  LienVideo: string;
  secteur: string;
  datePublication: string;
}

const LoadingSpinner = memo(() => (
  <div className="flex justify-center items-center min-h-[400px]" role="status" aria-label="Chargement en cours">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    <span className="sr-only">Chargement...</span>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

const ErrorMessage = memo(({ error }: { error: string }) => (
  <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg border border-red-200" role="alert">
    <p>{error}</p>
  </div>
));

ErrorMessage.displayName = 'ErrorMessage';

const TabButton = memo(({ 
  active, 
  onClick, 
  children, 
  ariaLabel 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
  ariaLabel: string;
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
      active
        ? 'bg-primary text-white shadow-md'
        : 'text-text hover:bg-background-light hover:text-primary'
    }`}
    aria-pressed={active}
    aria-label={ariaLabel}
  >
    {children}
  </button>
));

TabButton.displayName = 'TabButton';

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState<'youtube' | 'notifications'>('youtube');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [latestVideo, setLatestVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [notificationsRes, videoRes] = await Promise.all([
        fetch('/api/notifications', { cache: 'no-store' }),
        fetch('/api/videos', { cache: 'no-store' })
      ]);
      
      if (!notificationsRes.ok || !videoRes.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      
      const [notificationsData, videosData] = await Promise.all([
        notificationsRes.json(),
        videoRes.json()
      ]);
      
      // Trier les vidéos par date de publication (la plus récente en premier)
      const sortedVideos = Array.isArray(videosData) 
        ? videosData.sort((a: Video, b: Video) => 
            new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime()
          )
        : [];
      
      setNotifications(Array.isArray(notificationsData) ? notificationsData : []);
      setLatestVideo(sortedVideos[0] || null);
    } catch (err) {
      console.error('Erreur détaillée:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const youtubeOptions = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  const extractVideoId = useCallback((url: string | undefined | null): string | null => {
    if (!url) return null;
    
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    } catch (error) {
      console.error('Erreur lors de l\'extraction de l\'ID YouTube:', error);
      return null;
    }
  }, []);

  const formatDate = useCallback((dateString: string | undefined | null): string => {
    if (!dateString) return 'Date non disponible';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Erreur de formatage de date:', error);
      return 'Date non disponible';
    }
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <section className="py-16 lg:py-24 bg-background" aria-labelledby="news-section-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 id="news-section-title" className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Découvrez TetrisNews
          </h2>
          <p className="text-lg lg:text-xl text-text-light max-w-2xl mx-auto">
            Restez informé avec nos dernières vidéos et notifications sur l'intelligence artificielle et l'analyse de données
          </p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl bg-background-light p-1 shadow-sm border border-gray-200">
            <TabButton
              active={activeTab === 'youtube'}
              onClick={() => setActiveTab('youtube')}
              ariaLabel="Afficher les vidéos YouTube"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Vidéos
              </span>
            </TabButton>
            <TabButton
              active={activeTab === 'notifications'}
              onClick={() => setActiveTab('notifications')}
              ariaLabel="Afficher les notifications"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Notifications
              </span>
            </TabButton>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'youtube' ? (
            <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              {latestVideo ? (
                <>
                  {extractVideoId(latestVideo.LienVideo) && (
                    <div className="aspect-video">
                      <YouTube
                        videoId={extractVideoId(latestVideo.LienVideo) || ''}
                        opts={youtubeOptions}
                        className="w-full h-full"
                        title={`Vidéo: ${latestVideo.Titre}`}
                      />
                    </div>
                  )}
                  <div className="p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl font-semibold text-text mb-3">
                      {latestVideo.Titre}
                    </h3>
                    <p className="text-text-light mb-4 leading-relaxed">
                      {latestVideo.Description}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                        {latestVideo.secteur}
                      </span>
                      <span className="text-sm text-text-lighter">
                        Publié le {formatDate(latestVideo.datePublication)}
                      </span>
                    </div>
                    <div className="mt-4">
                      <Link 
                        href="/solutions-video" 
                        className="text-primary hover:text-primary-dark font-medium inline-flex items-center transition-colors duration-200"
                      >
                        Voir toutes les vidéos
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-text-light text-lg">Aucune vidéo disponible pour le moment</p>
                  <p className="text-sm text-text-lighter mt-2">Revenez bientôt pour découvrir nos nouveaux contenus !</p>
                </div>
              )}
            </article>
          ) : (
            <div className="space-y-6">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <article key={notification._id} className="bg-white rounded-xl shadow-lg p-6 lg:p-8 hover:shadow-xl transition-shadow duration-200 border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-primary-light rounded-xl flex-shrink-0 flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl lg:text-2xl font-semibold text-text mb-3">
                          {notification.title}
                        </h3>
                        <p className="text-text-light mb-3 leading-relaxed">
                          {notification.content}
                        </p>
                        <span className="text-sm text-text-lighter bg-gray-50 px-3 py-1 rounded-full">
                          {formatDate(notification.date)}
                        </span>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="p-8 text-center bg-white rounded-xl shadow-lg">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <p className="text-text-light text-lg">Aucune notification disponible</p>
                  <p className="text-sm text-text-lighter mt-2">Nous vous tiendrons informé des dernières actualités !</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}