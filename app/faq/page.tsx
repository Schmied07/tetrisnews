'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Qui êtes-vous ?",
    answer: "Nous sommes une entreprise de services informatiques spécialisée dans la data et l'automatisation des processus métiers. Nous accompagnons les entreprises dans l'analyse de leurs données, la création de tableaux de bord, la mise en place d'ETL, d'entrepôts de données, ou encore l'automatisation de tâches avec des outils comme Power BI, Power Automate, etc."
  },
  {
    question: "Quels types d'entreprises accompagniez-vous ?",
    answer: "Nous collaborons avec des entreprises de toutes tailles et de tous les secteurs d'activité, en adaptant nos services aux spécificités de chaque métier."
  },
  {
    question: "Comment travaillez-vous avec vos clients ?",
    answer: "Trois modes d'intervention :\n\n• Mode projet : prise en charge complète de la mission.\n\n• Assistance technique : un de nos collaborateurs intervient directement chez le client.\n\n• Recrutement pour compte de tiers : nous identifions et recrutons des profils pour votre entreprise."
  },
  {
    question: "Quels services proposez-vous ?",
    answer: "Nos prestations couvrent notamment :\n\n• Création de tableaux de bord interactifs\n\n• Automatisation de tâches et de processus métier\n\n• Mise en place de solutions ETL et entrepôts de données\n\n• Intégration d'outils décisionnels adaptés à votre activité"
  },
  {
    question: "Quels profils recrutez-vous ?",
    answer: "Nous recrutons des profils experts en data et en automatisation, notamment :\n\n• Data Analysts\n\n• Data Engineers\n\n• Développeurs BI\n\n• Spécialistes Power BI, Power Automate, ETL...\n\nNous adaptons nos recrutements aux besoins spécifiques de chaque mission."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">💡 FAQ – Foire Aux Questions</h1>
          <p className="text-xl text-text-light">Trouvez les réponses à vos questions les plus fréquentes</p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-primary">
                    ❓ {item.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-text-light whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 