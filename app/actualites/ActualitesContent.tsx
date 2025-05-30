'use client';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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

function Modal({ isOpen, onClose, actualite }: { isOpen: boolean; onClose: () => void; actualite: Actualite | null }) {
  if (!isOpen || !actualite) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{actualite.Titre}</h2>
              {actualite.auteur && (
                <div className="mt-2 text-gray-600">
                  <span className="font-medium">Auteur :</span> {actualite.auteur}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {actualite.imageUrl && (
            <div className="mb-4">
              <img
                src={actualite.imageUrl}
                alt={actualite.Titre}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{actualite.articleComplet}</p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Tags :</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {actualite.Catégorie}
              </span>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                {actualite.secteur}
              </span>
              {actualite.tags && actualite.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <span>{formatDate(actualite.datePublication)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ActualitesContent({ initialActualites }: { initialActualites: Actualite[] }) {
  const [actualites, setActualites] = useState<Actualite[]>(initialActualites);
  const [selectedActualite, setSelectedActualite] = useState<Actualite | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const articleId = searchParams.get('article');
    if (articleId && actualites.length > 0) {
      const article = actualites.find(a => a._id === articleId);
      if (article) {
        setSelectedActualite(article);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, actualites]);

  const openModal = (actualite: Actualite) => {
    setSelectedActualite(actualite);
    setIsModalOpen(true);
    router.push(`/actualites?article=${actualite._id}`, { scroll: false });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedActualite(null);
    router.push('/actualites', { scroll: false });
  };

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
                {actualite.auteur && (
                  <div className="mb-2 text-gray-600">
                    <span className="font-medium">Auteur :</span> {actualite.auteur}
                  </div>
                )}
                <p className="text-gray-600 mb-4 line-clamp-3">{actualite.resume}</p>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {actualite.Catégorie}
                    </span>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      {actualite.secteur}
                    </span>
                    {actualite.tags && actualite.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div>
                    <span>{formatDate(actualite.datePublication)}</span>
                  </div>
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
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        actualite={selectedActualite}
      />
    </div>
  );
} 