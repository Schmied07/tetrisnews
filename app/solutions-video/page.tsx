'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
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
        <div className="relative pt-[56.25%]">
          <iframe
            src={video.videoUrl.replace('watch?v=', 'embed/')}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
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
                <img
                  src={`https://img.youtube.com/vi/${video.videoUrl.split('v=')[1]}/maxresdefault.jpg`}
                  alt={video.Titre}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
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