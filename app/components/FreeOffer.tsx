'use client';

import { FaGift, FaRocket, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function FreeOffer() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-soft-light opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-soft-light opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6">
            <FaGift className="w-4 h-4" />
            <span>OFFRE SPÉCIALE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Programme d'accompagnement<br />pour petites entreprises
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Nous aidons les entreprises de moins de 10 personnes à digitaliser leur communication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: 'Email professionnel',
              description: 'Configuration d\'un email personnalisé pour votre entreprise'
            },
            {
              title: 'Agent IA intelligent',
              description: 'Automatisation de l\'envoi et du rangement de vos emails'
            },
            {
              title: '100% Gratuit',
              description: 'Accompagnement complet sans aucun frais'
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <FaCheckCircle className="w-8 h-8 text-white mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-blue-100">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold mb-6">
            ⚠️ Places limitées : 2 entreprises par jour
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inscription"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FaRocket className="w-5 h-5" />
              S'inscrire maintenant
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 