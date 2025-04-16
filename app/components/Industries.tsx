'use client';

import { FaIndustry, FaShoppingBag, FaPlane, FaShareAlt } from 'react-icons/fa';

export default function Industries() {
  const industries = [
    {
      icon: <FaIndustry className="w-12 h-12 text-primary mb-6" />,
      title: 'Industrie',
      description: 'Solutions pour l\'industrie manufacturière et la production.',
      link: '/industries/industrie'
    },
    {
      icon: <FaShoppingBag className="w-12 h-12 text-primary mb-6" />,
      title: 'Commerce',
      description: 'Outils pour le retail et la distribution.',
      link: '/industries/commerce'
    },
    {
      icon: <FaPlane className="w-12 h-12 text-primary mb-6" />,
      title: 'Organisateurs de voyage',
      description: 'Solutions pour la gestion et l\'optimisation des voyages.',
      link: '/industries/voyage'
    },
    {
      icon: <FaShareAlt className="w-12 h-12 text-primary mb-6" />,
      title: 'Automatisation réseaux sociaux',
      description: 'Gestion et automatisation de votre présence sur les réseaux sociaux.',
      link: '/industries/reseaux-sociaux'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text mb-4">Secteurs d'Activité</h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Des solutions adaptées à chaque secteur d'activité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="bg-background-light rounded-lg p-8 transition-colors duration-300 hover:bg-background">
              <div>{industry.icon}</div>
              <h3 className="text-xl font-semibold text-text mb-4">{industry.title}</h3>
              <p className="text-text-light">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 