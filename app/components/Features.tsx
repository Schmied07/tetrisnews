'use client';

import { FaChartLine, FaCog, FaRobot, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

export default function Features() {
  const services = [
    {
      icon: <FaChartLine className="w-full h-full" />,
      title: 'Data Analyst',
      description: 'Exploitez tout le potentiel de vos données avec des analyses approfondies et des visualisations percutantes. Transformez vos chiffres en décisions stratégiques.',
      features: [
        'Analyse prédictive avancée',
        'Tableaux de bord interactifs',
        'KPIs personnalisés',
        'Reporting automatisé'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FaCog className="w-full h-full" />,
      title: 'Automatisation des processus',
      description: 'Éliminez les tâches répétitives et optimisez vos workflows métier. Gagnez en productivité et réduisez les erreurs humaines.',
      features: [
        'Workflows automatisés',
        'Intégration multi-systèmes',
        'Traitement intelligent',
        'Monitoring en temps réel'
      ],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: <FaRobot className="w-full h-full" />,
      title: 'Agents IA sur sites web',
      description: 'Intégrez des agents intelligents pour améliorer l\'expérience utilisateur et automatiser les interactions. Support client nouvelle génération.',
      features: [
        'Chatbots intelligents',
        'Support multilingue',
        'Apprentissage continu',
        'Intégration transparente'
      ],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066cc' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Nos Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des prestations sur-mesure pour répondre à vos enjeux métier
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <div className="w-8 h-8 text-white">
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features list */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`}></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300`}
                >
                  En savoir plus
                  <FaArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-full blur-2xl transform translate-x-16 -translate-y-16`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Discutons de votre projet
            <FaArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}