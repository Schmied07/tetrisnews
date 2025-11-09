'use client';

import { FaShoppingCart, FaBuilding, FaPlane, FaShareAlt, FaChartBar, FaDatabase } from 'react-icons/fa';

export default function Industries() {
  const useCases = [
    {
      icon: <FaShoppingCart className="w-full h-full" />,
      title: 'Retail & E-commerce',
      description: 'Automatisation de la gestion des factures, analyse des performances fournisseurs, et optimisation des stocks.',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: <FaBuilding className="w-full h-full" />,
      title: 'Entreprises & PME',
      description: 'Gestion documentaire intelligente, vérification de contrats, et automatisation des processus administratifs.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <FaPlane className="w-full h-full" />,
      title: 'Agences de voyage',
      description: 'Republication automatique de contenus, gestion multi-canaux, et archivage de documents clients.',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: <FaShareAlt className="w-full h-full" />,
      title: 'Marketing Digital',
      description: 'Automatisation réseaux sociaux, extraction de données, et gestion de contenu multi-plateformes.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: <FaChartBar className="w-full h-full" />,
      title: 'Finance & Comptabilité',
      description: 'Extraction automatique de données financières, génération de KPIs, et conformité documentaire.',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      icon: <FaDatabase className="w-full h-full" />,
      title: 'Services B2B',
      description: 'Centralisation des données, analyses avancées, et automatisation des workflows métier.',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            CAS D'USAGE
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Secteurs d'activité
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions adaptées à vos enjeux métier, quel que soit votre secteur
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${useCase.gradient} rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                  <div className="w-7 h-7 text-white">
                    {useCase.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {useCase.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <div className={`w-full h-full bg-gradient-to-br ${useCase.gradient} rounded-full blur-2xl`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 text-lg">
            Votre secteur n'est pas listé ? Nous créons des solutions sur-mesure.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Discutons de votre projet
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 