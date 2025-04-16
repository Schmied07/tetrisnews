'use client';

import { ArrowRight } from 'lucide-react';

export default function FreeOffer() {
  return (
    <section className="py-20 bg-gradient-to-b from-background-dark to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-accent/10 rounded-2xl p-8 md:p-12 border border-accent/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
              Offre Spéciale pour les Petites Entreprises
            </h2>
            <p className="text-lg text-text-light mb-8">
              Nous aidons les entreprises de moins de 10 personnes dans leur processus d'acquisition d'un mail personnalisé, 
              de créer un agent IA permettant d'envoyer et de ranger les mails reçus. Tout cela gratuitement.
            </p>
            <div className="bg-background/50 rounded-xl p-4 mb-8">
              <p className="text-text-light font-medium">
                ⚠️ Nous pouvons uniquement aider maximum 2 personnes par jour
              </p>
            </div>
            <a
              href="/inscription"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-background rounded-xl font-semibold hover:bg-accent/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              S'inscrire maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 