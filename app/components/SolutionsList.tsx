'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';

interface Video {
  id: string;
  Titre: string;
  Description: string;
  Catégorie: string;
  LienVideo: string;
  secteur: string;
}

// Composant pour afficher une seule vidéo
const VideoCard = ({ video, onClick }: { video: Video; onClick: () => void }) => {
  const videoId = useMemo(() => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = video.LienVideo.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }, [video.LienVideo]);

  const thumbnailUrl = useMemo(() => 
    videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '',
    [videoId]
  );

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={onClick}
      itemScope
      itemType="http://schema.org/VideoObject"
    >
      <div className="relative aspect-w-16 aspect-h-9">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`Miniature de la vidéo : ${video.Titre}`}
            className="w-full h-full object-cover"
            loading="lazy"
            width={1280}
            height={720}
            itemProp="thumbnailUrl"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Miniature non disponible</span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2" itemProp="name">{video.Titre}</h3>
        <p className="text-gray-600 mb-4" itemProp="description">{video.Description}</p>
        <div className="flex gap-2">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
            {video.secteur}
          </span>
        </div>
        <meta itemProp="url" content={video.LienVideo} />
        <meta itemProp="uploadDate" content={new Date().toISOString()} />
      </div>
    </div>
  );
};

// Composant pour afficher une catégorie de vidéos
const CategorySection = ({ category, videos, onVideoSelect }: { 
  category: string; 
  videos: Video[]; 
  onVideoSelect: (video: Video) => void;
}) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-primary">{category}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map((video) => (
        <VideoCard 
          key={video.id} 
          video={video} 
          onClick={() => onVideoSelect(video)} 
        />
      ))}
    </div>
  </div>
);

// Composant pour la modal de vidéo
const VideoModal = ({ video, onClose }: { video: Video; onClose: () => void }) => {
  const videoId = useMemo(() => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = video.LienVideo.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }, [video.LienVideo]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100 transition-colors duration-300 z-[101]"
          aria-label="Fermer la vidéo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={video.Titre}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default function SolutionsList() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const closeModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/videos');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      
      const data = await response.json();
      
      if (!data) {
        throw new Error('No data received');
      }
      
      const sortedVideos = data.sort((a: Video, b: Video) => 
        a.Catégorie.localeCompare(b.Catégorie)
      );
      
      setVideos(sortedVideos);
    } catch (err) {
      console.error('Error in fetchVideos:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des solutions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Gestion de la touche Échap
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedVideo) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [selectedVideo, closeModal]);

  // Grouper les vidéos par catégorie avec useMemo
  const videosByCategory = useMemo(() => 
    videos.reduce((acc, video) => {
      if (!acc[video.Catégorie]) {
        acc[video.Catégorie] = [];
      }
      acc[video.Catégorie].push(video);
      return acc;
    }, {} as Record<string, Video[]>),
    [videos]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg max-w-md text-center">
          <p className="text-red-500 font-medium">{error}</p>
          <button 
            onClick={fetchVideos}
            className="mt-4 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Nos Réalisations</h1>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Transformez vos données en opportunités. Solutions d'analyse et d'ingénierie des données pour automatiser vos processus et optimiser vos décisions.
          </p>
        </div>

        {Object.keys(videosByCategory).length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">Aucune vidéo n'a été trouvée</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(videosByCategory).map(([category, categoryVideos]) => (
              <CategorySection
                key={category}
                category={category}
                videos={categoryVideos}
                onVideoSelect={setSelectedVideo}
              />
            ))}
          </div>
        )}

        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
} 