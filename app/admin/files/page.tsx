'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { File, Trash2, Upload } from 'lucide-react';

interface FileItem {
  name: string;
  created_at: string;
  id: string;
}

interface Document {
  name: string;
  condition: string;
  nom_pdf: string;
  type: string;
}

export default function AdminFiles() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [document, setDocument] = useState<Document>({
    name: '',
    condition: '',
    nom_pdf: '',
    type: ''
  });
  const [existingConditions, setExistingConditions] = useState<string[]>([]);
  const [existingTypes, setExistingTypes] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showTypeSuggestions, setShowTypeSuggestions] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient({
    supabaseUrl: 'https://pzmpqgslkmdyoovwcrts.supabase.co',
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    options: {
      global: {
        headers: {
          'x-region': 'eu-central-1'
        }
      }
    }
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Début de la vérification de l\'authentification...');
        
        // Vérifier la session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log('Session:', session);

        if (sessionError) {
          console.error('Erreur lors de la récupération de la session:', sessionError);
          router.push('/auth/login');
          return;
        }

        if (!session) {
          console.log('Pas de session, redirection vers /auth/login');
          router.push('/auth/login');
          return;
        }

        console.log('Session trouvée, utilisateur:', session.user);

        // Vérifier si l'utilisateur est admin
        console.log('Vérification du rôle admin pour l\'utilisateur:', session.user.id);
        
        // D'abord, récupérer le rôle admin
        const { data: adminRole, error: roleError } = await supabase
          .from('roles')
          .select('id')
          .eq('name', 'admin')
          .single();

        console.log('Rôle admin:', adminRole);

        if (roleError) {
          console.error('Erreur lors de la récupération du rôle admin:', roleError);
          return;
        }

        if (!adminRole) {
          console.error('Rôle admin non trouvé');
          return;
        }

        // Ensuite, vérifier si l'utilisateur a ce rôle
        const { data: userRole, error: userRoleError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('role_id', adminRole.id)
          .single();

        console.log('Rôle utilisateur:', userRole);

        if (userRoleError) {
          console.error('Erreur lors de la vérification du rôle utilisateur:', userRoleError);
          return;
        }

        if (!userRole) {
          console.log('Utilisateur n\'est pas admin');
          router.push('/');
          return;
        }

        console.log('Utilisateur est admin, chargement des fichiers...');
        await Promise.all([
          fetchFiles(),
          fetchExistingConditions(),
          fetchExistingTypes()
        ]);
        
      } catch (error) {
        console.error('Erreur lors de la vérification:', error);
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router, supabase]);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .storage
        .from('solutionpdf')
        .list();

      if (error) throw error;

      setFiles(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des fichiers:', error);
      setError('Erreur lors de la récupération des fichiers');
    } finally {
      setLoading(false);
    }
  };

  const fetchExistingConditions = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('condition')
        .not('condition', 'is', null)
        .not('condition', 'eq', '');

      if (error) throw error;

      // Filtrer les doublons et trier par fréquence d'utilisation
      const conditions = data
        .map(item => item.condition)
        .filter((condition): condition is string => condition !== null && condition !== '');
      
      const uniqueConditions = Array.from(new Set(conditions));
      setExistingConditions(uniqueConditions);
    } catch (error) {
      console.error('Erreur lors de la récupération des conditions:', error);
    }
  };

  const fetchExistingTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('type')
        .not('type', 'is', null)
        .not('type', 'eq', '');

      if (error) throw error;

      const types = data
        .map(item => item.type)
        .filter((type): type is string => type !== null && type !== '');
      
      const uniqueTypes = Array.from(new Set(types));
      setExistingTypes(uniqueTypes);
    } catch (error) {
      console.error('Erreur lors de la récupération des types:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
      setError('Seuls les fichiers PDF sont autorisés');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Le fichier ne doit pas dépasser 10MB');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Vérifier l'authentification et le rôle admin
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError || !session) {
        throw new Error('Vous devez être connecté pour uploader un fichier');
      }

      // Vérifier si l'utilisateur est admin
      const { data: userRoles, error: userError } = await supabase
        .from('user_roles')
        .select(`
          role:roles!inner (
            name
          )
        `)
        .eq('user_id', session.user.id)
        .eq('roles.name', 'admin')
        .single();

      if (userError || !userRoles) {
        throw new Error('Seuls les administrateurs peuvent uploader des fichiers');
      }

      // Vérifier si le nom_pdf existe déjà dans la table documents
      const { data: existingDocuments, error: documentsError } = await supabase
        .from('documents')
        .select('nom_pdf')
        .eq('nom_pdf', document.nom_pdf || file.name);

      if (documentsError) throw documentsError;

      if (existingDocuments && existingDocuments.length > 0) {
        setError('Un document avec ce nom existe déjà');
        return;
      }

      // Enregistrer d'abord les métadonnées dans la table documents
      const { error: insertError } = await supabase
        .from('documents')
        .insert({
          nom_pdf: document.nom_pdf || file.name,
          condition: document.condition,
          type: document.type,
          created_at: new Date().toISOString()
        });

      if (insertError) {
        if (insertError.code === '42501') {
          throw new Error('Erreur de permissions. Vous n\'avez pas les droits nécessaires.');
        }
        console.error('Erreur lors de l\'insertion dans la base de données:', insertError);
        throw insertError;
      }

      // Upload du fichier avec le nom personnalisé
      const fileName = document.nom_pdf || file.name;
      const { error: uploadError } = await supabase
        .storage
        .from('solutionpdf')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        // Si l'upload échoue, supprimer l'entrée de la base de données
        await supabase
          .from('documents')
          .delete()
          .eq('nom_pdf', fileName);
          
        console.error('Erreur détaillée:', uploadError);
        throw uploadError;
      }

      await fetchFiles();
      setDocument({ name: '', condition: '', nom_pdf: '', type: '' });
    } catch (error: any) {
      console.error('Erreur lors de l\'upload:', error);
      setError(error.message || 'Erreur lors de l\'upload du fichier');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) return;

    try {
      const { error } = await supabase
        .storage
        .from('solutionpdf')
        .remove([fileName]);

      if (error) throw error;

      await fetchFiles();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setError('Erreur lors de la suppression du fichier');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Gestion des fichiers PDF</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="mb-8">
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition d'utilisation
            </label>
            <textarea
              value={document.condition}
              onChange={(e) => setDocument({ ...document, condition: e.target.value })}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              rows={3}
              placeholder="Entrez les conditions d'utilisation du document"
            />
            {showSuggestions && existingConditions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {existingConditions.map((condition, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setDocument({ ...document, condition });
                      setShowSuggestions(false);
                    }}
                  >
                    {condition}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de document
            </label>
            <input
              type="text"
              value={document.type}
              onChange={(e) => setDocument({ ...document, type: e.target.value })}
              onFocus={() => setShowTypeSuggestions(true)}
              onBlur={() => setTimeout(() => setShowTypeSuggestions(false), 200)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Entrez le type de document (optionnel)"
            />
            {showTypeSuggestions && existingTypes.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {existingTypes.map((type, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setDocument({ ...document, type });
                      setShowTypeSuggestions(false);
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du PDF
            </label>
            <input
              type="text"
              value={document.nom_pdf}
              onChange={(e) => setDocument({ ...document, nom_pdf: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Entrez le nom du PDF (optionnel)"
            />
          </div>
          <label className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-dark transition-colors">
            <Upload className="w-5 h-5" />
            <span>{uploading ? 'Upload en cours...' : 'Uploader un PDF'}</span>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du fichier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de création</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <File className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-900">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(file.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleDelete(file.name)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 