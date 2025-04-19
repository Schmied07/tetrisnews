'use client';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState, useEffect, Suspense } from 'react';
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

async function getActualites(): Promise<Actualite[]> {
  try {
    // Utiliser une URL relative
    const apiUrl = '/api/actualites';

    console.log('Fetching data from:', apiUrl); // Pour le débogage
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch actualites: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Received data:', data); // Pour le débogage
    return data as Actualite[];
  } catch (error) {
    console.error('Error fetching actualites:', error);
    return [];
  }
}

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
                  <span className="font-medium">Par </span>
                  <span className="font-semibold text-primary">{actualite.auteur}</span>
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
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          )}
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{actualite.articleComplet}</p>
          </div>
          <div className="mt-4">
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
          <div className="mt-4 text-sm text-gray-500">
            {formatDate(actualite.datePublication)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ActualitesPage() {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [selectedActualite, setSelectedActualite] = useState<Actualite | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getActualites().then(setActualites);
  }, []);

  if (actualites.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        <p>Aucune actualité disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ActualitesContent 
        actualites={actualites}
        selectedActualite={selectedActualite}
        setSelectedActualite={setSelectedActualite}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        router={router}
      />
    </Suspense>
  );
}

function ActualitesContent({ 
  actualites, 
  selectedActualite, 
  setSelectedActualite, 
  isModalOpen, 
  setIsModalOpen,
  router 
}: { 
  actualites: Actualite[];
  selectedActualite: Actualite | null;
  setSelectedActualite: (actualite: Actualite | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  router: any;
}) {
  const searchParams = useSearchParams();

  // Gérer l'ouverture du modal basé sur l'URL
  useEffect(() => {
    const articleId = searchParams.get('article');
    if (articleId && actualites.length > 0) {
      const article = actualites.find(a => a._id === articleId);
      if (article) {
        setSelectedActualite(article);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, actualites, setSelectedActualite, setIsModalOpen]);

  const openModal = (actualite: Actualite) => {
    setSelectedActualite(actualite);
    setIsModalOpen(true);
    // Mettre à jour l'URL avec l'ID de l'article
    router.push(`/actualites?article=${actualite._id}`, { scroll: false });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedActualite(null);
    // Retirer l'ID de l'article de l'URL
    router.push('/actualites', { scroll: false });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Actualités</h1>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Découvrez les dernières actualités technologiques et innovations du secteur
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actualites.map((actualite) => (
            <div
              key={actualite._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {actualite.imageUrl && (
                <div className="relative h-64">
                  <img
                    src={actualite.imageUrl}
                    alt={actualite.Titre}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{actualite.Titre}</h3>
                {actualite.auteur && (
                  <div className="mb-2 text-gray-600">
                    <span className="font-medium">Par </span>
                    <span className="font-semibold text-primary">{actualite.auteur}</span>
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