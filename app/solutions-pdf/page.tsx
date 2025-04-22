'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useRouter, useSearchParams } from 'next/navigation';

interface Solution {
  _id: string;
  Titre: string;
  description: string;
  imageUrl: string;
  condition: string;
  type: string;
  datePublication: string | Date | null;
}

interface SubscriptionForm {
  email: string;
  name: string;
  youtubeUsername: string;
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

const SubscriptionModal = ({ 
  onClose, 
  onSubmit,
  selectedSolution
}: { 
  onClose: () => void; 
  onSubmit: (formData: SubscriptionForm) => Promise<void>;
  selectedSolution: Solution | null;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Vérifier si l'email est valide
      if (!email || !email.includes('@')) {
        throw new Error('Veuillez entrer une adresse email valide');
      }

      // Vérifier si le nom est rempli
      if (!name) {
        throw new Error('Veuillez entrer votre nom');
      }

      // URL de redirection exacte
      const redirectUri = 'https://tetrisnews.fr/api/auth/youtube/callback';
      console.log('Redirect URI:', redirectUri); // Pour le débogage

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'https://www.googleapis.com/auth/youtube.readonly',
        state: JSON.stringify({ 
          solutionId: selectedSolution?._id,
          email: email,
          name: name
        }),
        access_type: 'offline',
        prompt: 'consent'
      })}`;

      window.location.href = authUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-xl font-semibold text-primary mb-4">Vérification d'abonnement</h3>
        <p className="text-gray-600 mb-4">
          Pour accéder à cette solution, vous devez être abonné à notre chaîne YouTube.
          Entrez vos informations et cliquez sur le bouton ci-dessous pour vérifier votre abonnement.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="votre@email.com"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                'Vérification...'
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                  </svg>
                  Vérifier avec YouTube
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function SolutionsPdfContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [email, setEmail] = useState('');

  // Gérer les paramètres de redirection après l'authentification
  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    const solutionId = searchParams.get('solutionId');

    if (success === 'true' && solutionId) {
      const solution = solutions.find(s => s._id === solutionId);
      if (solution) {
        window.open(solution.imageUrl, '_blank');
      }
    } else if (error === 'not_subscribed') {
      setError('Vous n\'êtes pas abonné à notre chaîne YouTube');
    } else if (error === 'auth_failed') {
      setError('Une erreur est survenue lors de la vérification de l\'abonnement');
    }
  }, [searchParams, solutions]);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await fetch('/api/solutions-pdf');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des solutions');
        }
        const data = await response.json();
        setSolutions(data);
        setFilteredSolutions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  useEffect(() => {
    const filtered = solutions.filter(solution => 
      solution.Titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solution.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solution.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSolutions(filtered);
  }, [searchTerm, solutions]);

  const handleSubscriptionSubmit = async (formData: SubscriptionForm) => {
    try {
      const response = await fetch('/api/check-youtube-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          youtubeUsername: formData.youtubeUsername,
          email: formData.email,
          solutionId: selectedSolution?._id
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la vérification de l\'abonnement');
      }

      const data = await response.json();
      
      if (data.isSubscribed) {
        // Télécharger le PDF
        window.open(selectedSolution?.imageUrl, '_blank');
        setShowSubscriptionModal(false);
      } else {
        throw new Error('Vous n\'êtes pas abonné à notre chaîne YouTube');
      }
    } catch (err) {
      throw err;
    }
  };

  const renderActionButton = (solution: Solution) => {
    switch (solution.type) {
      case 'telechargement':
        return (
          <button 
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            onClick={() => window.open(solution.imageUrl, '_blank')}
          >
            Télécharger
          </button>
        );
      case 'contact':
        return (
          <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
            Nous contacter
          </button>
        );
      case 'abonnement':
        return (
          <button 
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            onClick={() => {
              setSelectedSolution(solution);
              setShowSubscriptionModal(true);
            }}
          >
            Recevoir le PDF
          </button>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Vérifier si l'email est valide
      if (!email || !email.includes('@')) {
        throw new Error('Veuillez entrer une adresse email valide');
      }

      // Rediriger vers l'authentification YouTube avec l'email en paramètre
      const state = JSON.stringify({ email });
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      const redirectUri = encodeURIComponent('https://tetrisnews.fr/api/auth/youtube/callback');
      const scope = encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly');
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;

      router.push(authUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text">Chargement des solutions...</p>
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
          <h1 className="text-4xl font-bold text-primary mb-4">Solutions PDF</h1>
          <p className="text-xl text-text-light max-w-3xl mx-auto mb-8">
            Découvrez nos solutions détaillées en format PDF
          </p>
          
          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une solution..."
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
          {filteredSolutions.map((solution) => (
            <div
              key={solution._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {solution.imageUrl && (
                <div className="relative h-48">
                  <Image
                    src={solution.imageUrl}
                    alt={solution.Titre}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text mb-2">{solution.Titre}</h3>
                <p className="text-text-light mb-4">{solution.description}</p>
                {solution.condition && (
                  <p className="text-sm text-text-lighter mb-4">
                    <span className="font-semibold">Condition :</span> {solution.condition}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-lighter">
                    {formatDate(solution.datePublication)}
                  </span>
                  {renderActionButton(solution)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSolutions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-light">Aucune solution ne correspond à votre recherche.</p>
          </div>
        )}
      </div>

      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onSubmit={handleSubscriptionSubmit}
          selectedSolution={selectedSolution}
        />
      )}
    </div>
  );
}

export default function SolutionsPdfPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SolutionsPdfContent />
    </Suspense>
  );
} 