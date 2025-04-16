'use client';

import { FaArrowRight, FaCalendarAlt, FaHeadset } from 'react-icons/fa';

export default function CTA() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl mb-12">
            Découvrez comment nos solutions peuvent vous aider à atteindre vos objectifs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/20 transition-colors duration-300">
              <FaCalendarAlt className="w-12 h-12 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Planifier une démo</h3>
              <p className="mb-6">
                Réservez une démonstration personnalisée avec nos experts
              </p>
              <button className="bg-white text-primary hover:bg-background-light font-semibold py-3 px-8 rounded-lg transition-colors duration-300 inline-flex items-center mx-auto">
                Planifier
                <FaArrowRight className="ml-2" />
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/20 transition-colors duration-300">
              <FaHeadset className="w-12 h-12 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Contactez-nous</h3>
              <p className="mb-6">
                Notre équipe est à votre disposition pour répondre à vos questions
              </p>
              <button className="bg-white text-primary hover:bg-background-light font-semibold py-3 px-8 rounded-lg transition-colors duration-300 inline-flex items-center mx-auto">
                Nous contacter
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 