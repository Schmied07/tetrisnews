'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilEntreprise() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomEntreprise: '',
    secteurActivite: '',
    tailleEntreprise: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
    description: '',
    typeProjet: '',
    budget: '',
    delai: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique de sauvegarde
    console.log('Données du formulaire:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-primary mb-8">Créer votre profil Entreprise</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations entreprise */}
            <div>
              <label htmlFor="nomEntreprise" className="block text-sm font-medium text-gray-700">Nom de l'entreprise</label>
              <input
                type="text"
                id="nomEntreprise"
                name="nomEntreprise"
                value={formData.nomEntreprise}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="secteurActivite" className="block text-sm font-medium text-gray-700">Secteur d'activité</label>
                <input
                  type="text"
                  id="secteurActivite"
                  name="secteurActivite"
                  value={formData.secteurActivite}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="tailleEntreprise" className="block text-sm font-medium text-gray-700">Taille de l'entreprise</label>
                <select
                  id="tailleEntreprise"
                  name="tailleEntreprise"
                  value={formData.tailleEntreprise}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                >
                  <option value="">Sélectionnez la taille</option>
                  <option value="1-10">1-10 employés</option>
                  <option value="11-50">11-50 employés</option>
                  <option value="51-200">51-200 employés</option>
                  <option value="201-500">201-500 employés</option>
                  <option value="500+">500+ employés</option>
                </select>
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Adresse */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Adresse</label>
                <input
                  type="text"
                  id="adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="ville" className="block text-sm font-medium text-gray-700">Ville</label>
                <input
                  type="text"
                  id="ville"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="codePostal" className="block text-sm font-medium text-gray-700">Code postal</label>
                <input
                  type="text"
                  id="codePostal"
                  name="codePostal"
                  value={formData.codePostal}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description de l'entreprise</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="Décrivez votre entreprise, ses activités et ses valeurs"
                required
              />
            </div>

            {/* Projet */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="typeProjet" className="block text-sm font-medium text-gray-700">Type de projet recherché</label>
                <select
                  id="typeProjet"
                  name="typeProjet"
                  value={formData.typeProjet}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                >
                  <option value="">Sélectionnez le type</option>
                  <option value="developpement">Développement</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="consulting">Consulting</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget estimé (€)</label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="delai" className="block text-sm font-medium text-gray-700">Délai souhaité</label>
                <select
                  id="delai"
                  name="delai"
                  value={formData.delai}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                >
                  <option value="">Sélectionnez le délai</option>
                  <option value="urgent">Urgent (1-2 semaines)</option>
                  <option value="court">Court terme (1 mois)</option>
                  <option value="moyen">Moyen terme (2-3 mois)</option>
                  <option value="long">Long terme (3+ mois)</option>
                </select>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Créer mon profil
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 