'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Video {
  _id: string;
  Titre: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  datePublication: string;
  secteur: string;
  Catégorie: string;
}

const formatDate = (dateString: string | Date | null) => {
  if (!dateString) return 'Date non disponible';
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return format(date, 'dd MMMM yyyy', { locale: fr });
  } catch (error) {
    console.error('Erreur de formatage de date:', error);
    return 'Date non disponible';
  }
};

const VideoModal = ({ video, onClose }: { video: Video | null; onClose: () => void }) => {
  if (!video) return null;

  const isLinkedInVideo = video.videoUrl.includes('linkedin.com');
  const isYouTubeVideo = video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be');

  const openLinkedInVideo = () => {
    window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-4xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {isYouTubeVideo ? (
          <div className="relative pt-[56.25%]">
            <iframe
              src={video.videoUrl.replace('watch?v=', 'embed/')}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : isLinkedInVideo ? (
          <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{video.Titre}</h3>
              <p className="text-gray-600 mb-6">{video.description}</p>
              <p className="text-sm text-gray-500 mb-6">
                Cette vidéo est hébergée sur LinkedIn. Cliquez sur le bouton ci-dessous pour la visualiser.
              </p>
              <button
                onClick={openLinkedInVideo}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Voir sur LinkedIn
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{video.Titre}</h3>
            <p className="text-gray-600 mb-4">{video.description}</p>
            <p className="text-sm text-red-500">Format de vidéo non supporté</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function SolutionsPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log('Début de la récupération des vidéos');
        const response = await fetch('/api/solutions-video');
        console.log('Réponse reçue:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Erreur détaillée:', errorData);
          throw new Error(`Erreur ${response.status}: ${errorData.error || 'Erreur lors de la récupération des vidéos'}`);
        }
        
        const data = await response.json();
        console.log('Données reçues:', data);
        
        if (!Array.isArray(data)) {
          console.error('Les données reçues ne sont pas un tableau:', data);
          throw new Error('Format de données invalide');
        }
        
        setVideos(data);
        setFilteredVideos(data);
      } catch (err) {
        console.error('Erreur complète:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const filtered = videos.filter(video => 
      video.Titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (video.Catégorie && video.Catégorie.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (video.secteur && video.secteur.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredVideos(filtered);
  }, [searchTerm, videos]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text">Chargement des vidéos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Erreur: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Solutions Vidéo</h1>
          <p className="text-xl text-text-light max-w-3xl mx-auto mb-8">
            Découvrez nos solutions en vidéo
          </p>
          
          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une vidéo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="absolute right-3 top-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div 
                className="relative pt-[56.25%] cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {video.videoUrl.includes('linkedin.com') ? (
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-white mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <p className="text-white text-sm font-medium">Vidéo LinkedIn</p>
                    </div>
                  </div>
                ) : video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be') ? (
                  <img
                    src={`https://img.youtube.com/vi/${video.videoUrl.split('v=')[1]?.split('&')[0] || video.videoUrl.split('youtu.be/')[1]?.split('?')[0]}/maxresdefault.jpg`}
                    alt={video.Titre}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500 text-sm">Vidéo</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text mb-2">{video.Titre}</h3>
                {video.secteur && (
                  <div className="mb-2">
                    <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                      {video.secteur}
                    </span>
                  </div>
                )}
                {video.description && (
                  <p className="text-text-light mb-4">{video.description}</p>
                )}
                <div className="flex gap-2 mb-4">
                  {video.Catégorie && (
                    <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                      {video.Catégorie}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-lighter">
                    {video.datePublication}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-light">Aucune vidéo ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
} 