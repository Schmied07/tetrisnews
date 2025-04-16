'use client';

import { useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Actualite {
  _id: string;
  Titre: string;
  resume: string;
  articleComplet: string;
  Catégorie: string;
  LienVideo?: string;
  secteur: string;
  datePublication: string | Date | null;
  imageUrl?: string;
  auteur?: string;
  tags?: string[];
}

export default function ActualitesPage() {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedActualite, setSelectedActualite] = useState<Actualite | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchActualites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/actualites');
      if (!response.ok) {
        throw new Error('Failed to fetch actualites');
      }
      
      const data = await response.json();
      
      if (!data) {
        throw new Error('No data received');
      }
      
      setActualites(data);
    } catch (err) {
      console.error('Error in fetchActualites:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des actualités');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActualites();
  }, [fetchActualites]);

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) {
      return 'Date non disponible';
    }
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return format(date, 'dd MMMM yyyy', { locale: fr });
    } catch (error) {
      console.error('Erreur de formatage de date:', error);
      return 'Date non disponible';
    }
  };

  const openModal = (actualite: Actualite) => {
    setSelectedActualite(actualite);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedActualite(null);
  }, []);

  // Gestion de la touche Échap
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedActualite) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [selectedActualite, closeModal]);

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
            onClick={fetchActualites}
            className="mt-4 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (actualites.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        <p>Aucune actualité disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Actualités</h1>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Découvrez les dernières actualités sur l'intelligence artificielle et l'analyse de données
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actualites.map((actualite) => (
            <div
              key={actualite._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {actualite.imageUrl && (
                <div className="relative h-48">
                  <img
                    src={actualite.imageUrl}
                    alt={actualite.Titre}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{actualite.Titre}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{actualite.resume}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {actualite.Catégorie}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {actualite.secteur}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{formatDate(actualite.datePublication)}</span>
                  <button
                    onClick={() => openModal(actualite)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Lire la suite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && selectedActualite && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">{selectedActualite.Titre}</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {selectedActualite.LienVideo && (
                  <div className="relative pb-[56.25%] mb-4">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={selectedActualite.LienVideo.replace('watch?v=', 'embed/')}
                      title={selectedActualite.Titre}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div className="prose max-w-none">
                  {selectedActualite.articleComplet.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {selectedActualite.Catégorie}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {selectedActualite.secteur}
                  </span>
                  {selectedActualite.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  <p>Publié le {formatDate(selectedActualite.datePublication)}</p>
                  {selectedActualite.auteur && <p>Par {selectedActualite.auteur}</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 