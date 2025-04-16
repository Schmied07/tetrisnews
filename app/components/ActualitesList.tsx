import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Article {
  _id: string;
  Titre: string;
  resume: string;
  articleComplet: string;
  Catégorie: string;
  secteur: string;
  datePublication: string | null;
  imageUrl?: string;
  auteur?: string;
  tags?: string[];
}

const ActualitesList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/actualites');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des articles');
        }
        const data = await response.json();
        console.log('Articles reçus:', data);
        setArticles(data);
      } catch (err) {
        console.error('Erreur détaillée:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return 'Date non disponible';
    }
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMMM yyyy', { locale: fr });
    } catch (error) {
      console.error('Erreur de formatage de date:', error);
      return 'Date non disponible';
    }
  };

  const openModal = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
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

  if (articles.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        <p>Aucun article disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <motion.div
            key={article._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => openModal(article)}
          >
            {article.imageUrl && (
              <div className="relative h-48">
                <img
                  src={article.imageUrl}
                  alt={article.Titre}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-primary font-semibold">{article.Catégorie}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{formatDate(article.datePublication)}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.Titre}</h3>
              <p className="text-gray-600 mb-4">{article.resume}</p>
              <div className="flex flex-wrap gap-2">
                {article.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedArticle.Titre}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-primary font-semibold">{selectedArticle.Catégorie}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{formatDate(selectedArticle.datePublication)}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{selectedArticle.auteur}</span>
              </div>
              {selectedArticle.imageUrl && (
                <div className="relative h-64 mb-6">
                  <img
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.Titre}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="prose max-w-none">
                {selectedArticle.articleComplet.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {selectedArticle.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActualitesList; 