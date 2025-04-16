import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { revalidatePath } from 'next/cache';

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

async function getActualites() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/actualites`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch actualites');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching actualites:', error);
    return [];
  }
}

export default async function ActualitesPage() {
  const actualites = await getActualites();

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
                  <a
                    href={`/actualites/${actualite._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Lire la suite
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 