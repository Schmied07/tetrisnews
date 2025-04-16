'use client';

import { useState, useEffect } from 'react';
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

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState<'youtube' | 'notifications'>('youtube');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [latestVideo, setLatestVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [notificationsRes, videoRes] = await Promise.all([
          fetch('/api/notifications'),
          fetch('/api/videos')
        ]);
        
        if (!notificationsRes.ok || !videoRes.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        
        const notificationsData = await notificationsRes.json();
        const videosData = await videoRes.json();
        
        // Trier les vidéos par date de publication (la plus récente en premier)
        const sortedVideos = Array.isArray(videosData) 
          ? videosData.sort((a: Video, b: Video) => 
              new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime()
            )
          : [];
        
        setNotifications(notificationsData);
        // Prendre la première vidéo (la plus récente) ou null si aucune vidéo
        setLatestVideo(sortedVideos[0] || null);
      } catch (err) {
        console.error('Erreur détaillée:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const youtubeOptions = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const extractVideoId = (url: string | undefined | null): string | null => {
    if (!url) return null;
    
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    } catch (error) {
      console.error('Erreur lors de l\'extraction de l\'ID YouTube:', error);
      return null;
    }
  };

  const formatDate = (dateString: string | undefined | null): string => {
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
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Découvrez TetrisNews</h2>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            Restez informé avec nos dernières vidéos et notifications
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-background-light p-1">
            <button
              onClick={() => setActiveTab('youtube')}
              className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'youtube'
                  ? 'bg-primary text-white'
                  : 'text-text hover:bg-background'
              }`}
            >
              Vidéos
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'notifications'
                  ? 'bg-primary text-white'
                  : 'text-text hover:bg-background'
              }`}
            >
              Notifications
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'youtube' ? (
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              {latestVideo ? (
                <>
                  {extractVideoId(latestVideo.LienVideo) && (
                    <YouTube
                      videoId={extractVideoId(latestVideo.LienVideo) || ''}
                      opts={youtubeOptions}
                      className="w-full aspect-video"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-text mb-2">{latestVideo.Titre}</h3>
                    <p className="text-text-light mb-2">{latestVideo.Description}</p>
                    <div className="flex gap-2">
                      <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                        {latestVideo.secteur}
                      </span>
                      <span className="text-sm text-text-lighter">
                        Publié le {formatDate(latestVideo.datePublication)}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-text-light">Aucune vidéo disponible</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification._id} className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-primary-light rounded-lg flex-shrink-0 flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-text mb-2">{notification.title}</h3>
                        <p className="text-text-light mb-2">{notification.content}</p>
                        <span className="text-sm text-text-lighter">{formatDate(notification.date)}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-text-light">Aucune notification disponible</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 