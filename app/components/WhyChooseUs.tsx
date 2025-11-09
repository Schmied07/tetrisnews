'use client';

import { FaShieldAlt, FaCode, FaHeadset, FaRocket, FaCheckCircle } from 'react-icons/fa';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <FaShieldAlt className="w-full h-full" />,
      title: 'Confidentialité garantie',
      description: 'Solutions installées localement pour vos données sensibles. Conformité RGPD totale.',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: <FaCode className="w-full h-full" />,
      title: 'Expertise technique',
      description: 'Développement sur-mesure adapté à vos besoins spécifiques avec les dernières technologies.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <FaHeadset className="w-full h-full" />,
      title: 'Support dédié',
      description: 'Accompagnement personnalisé de la conception au déploiement et au-delà.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: <FaRocket className="w-full h-full" />,
      title: 'Déploiement rapide',
      description: 'Mise en production efficace pour un ROI immédiat sur vos investissements.',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const benefits = [
    'Solutions évolutives qui grandissent avec votre entreprise',
    'Technologies open-source pour éviter la dépendance',
    'Formation de vos équipes incluse',
    'Documentation complète fournie',
    'Maintenance et mises à jour régulières',
    'Pricing transparent sans coûts cachés'
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #0066cc 1px, transparent 1px), linear-gradient(to bottom, #0066cc 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pourquoi choisir TetrisNews ?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une expertise reconnue au service de votre transformation digitale
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group text-center"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${reason.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <div className="w-10 h-10 text-white">
                    {reason.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ce que vous obtenez
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Notre engagement va au-delà du simple développement. Nous vous accompagnons dans la réussite de votre projet.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group"
                >
                  <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
