'use client';

import { FaFileInvoice, FaTelegram, FaFileAlt, FaLock, FaCloud, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

export default function Applications() {
  const applications = [
    {
      name: 'SmartSupplier',
      tagline: 'Analyse intelligente de factures',
      description: 'Générez automatiquement vos KPIs à partir de vos factures. Solution installée localement pour une confidentialité maximale de vos données financières.',
      icon: <FaFileInvoice className="w-full h-full" />,
      deploymentType: 'local',
      features: [
        'Extraction automatique des données',
        'Génération de KPIs personnalisés',
        'Tableaux de bord analytiques',
        'Données 100% confidentielles'
      ],
      gradient: 'from-emerald-500 to-teal-600',
      benefits: ['Installation locale', 'Sécurité maximale', 'Conformité RGPD'],
      link: 'https://smartsupplier.tetrisnews.fr'
    },
    {
      name: 'Telescrap',
      tagline: 'Automatisation multi-canaux',
      description: 'Exploitez et republier automatiquement vos contenus Telegram sur tous vos canaux (sites web, Instagram, X, LinkedIn). Archivage et extraction de commentaires inclus.',
      icon: <FaTelegram className="w-full h-full" />,
      deploymentType: 'api',
      features: [
        'Republication automatique',
        'Multi-plateformes (Instagram, X, LinkedIn)',
        'Archivage de documents',
        'Extraction de commentaires'
      ],
      gradient: 'from-blue-500 to-cyan-600',
      benefits: ['API flexible', 'Paiement par tokens', 'Intégration facile'],
      link: 'https://telescrap.tetrisnews.fr'
    },
    {
      name: 'DocExtract',
      tagline: 'Extraction intelligente de documents',
      description: 'Extrayez et analysez les informations de vos images et PDF. IA locale pour converser avec vos documents, détection automatique des champs manquants. Idéal pour la vérification de contrats.',
      icon: <FaFileAlt className="w-full h-full" />,
      deploymentType: 'local',
      features: [
        'Extraction PDF et images',
        'Classification automatique',
        'Agent IA conversationnel local',
        'Détection de champs manquants'
      ],
      gradient: 'from-violet-500 to-purple-600',
      benefits: ['IA 100% locale', 'Données privées', 'Conformité totale'],
      link: '/contact'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            NOS APPLICATIONS MÉTIER
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Solutions prêtes à l'emploi
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Applications spécialisées pour le retail et la gestion de données
          </p>
        </div>

        {/* Applications grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {applications.map((app, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
            >
              {/* Header with gradient */}
              <div className={`relative h-48 bg-gradient-to-br ${app.gradient} p-8 flex items-center justify-center overflow-hidden`}>
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                  }}></div>
                </div>
                
                {/* Icon */}
                <div className="relative w-24 h-24 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {app.icon}
                </div>

                {/* Deployment badge */}
                <div className="absolute top-4 right-4">
                  {app.deploymentType === 'local' ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 shadow-lg">
                      <FaLock className="w-3 h-3 text-green-600" />
                      <span>Installation locale</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 shadow-lg">
                      <FaCloud className="w-3 h-3 text-blue-600" />
                      <span>API Cloud</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{app.name}</h3>
                <p className="text-sm text-blue-600 font-semibold mb-4">{app.tagline}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{app.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {app.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <FaCheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 bg-gradient-to-r ${app.gradient} bg-clip-text text-transparent`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Benefits badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {app.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${app.gradient} text-white`}
                    >
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                {app.link.startsWith('http') ? (
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${app.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300`}
                  >
                    Accéder à l'application
                    <FaArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                ) : (
                  <Link
                    href={app.link}
                    className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${app.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300`}
                  >
                    Demander une démo
                    <FaArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                )}
              </div>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${app.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Bottom info card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Besoin d'une solution personnalisée ?</h3>
              <p className="text-gray-600">
                Nous développons également des applications sur-mesure adaptées à vos besoins spécifiques.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              Contactez-nous
              <FaArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
