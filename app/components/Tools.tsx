'use client';

import Image from 'next/image';
import { FaDatabase, FaReact, FaCss3 } from 'react-icons/fa';

export default function Tools() {
  const tools = [
    {
      name: 'Supabase',
      description: 'Base de données et authentification',
      icon: <FaDatabase className="w-6 h-6" />
    },
    {
      name: 'Next.js',
      description: 'Framework React',
      icon: <FaReact className="w-6 h-6" />
    },
    {
      name: 'Tailwind CSS',
      description: 'Framework CSS',
      icon: <FaCss3 className="w-6 h-6" />
    },
    {
      name: 'Databricks',
      logo: 'https://imgs.search.brave.com/e6kQrQzxHrTQO3vFh3b6liEHEskPijbz1R0ClUyKqXo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb21w/YW5pZXNsb2dvLmNv/bS9pbWcvb3JpZy9k/YXRhYnJpY2tzLWM0/MGVhZjQ0LnBuZz90/PTE3MjAyNDQ0OTQ',
      description: 'Plateforme d\'analyse de données et d\'IA',
      isExternal: true
    },
    {
      name: 'SQL Server',
      logo: 'https://imgs.search.brave.com/aCEPCMOHRahihQw3eDuJ46fHagaqu7NXhIIFzeUayIk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9icmFu/ZHNsb2dvcy5jb20v/d3AtY29udGVudC91/cGxvYWRzL2ltYWdl/cy9taWNyb3NvZnQt/c3FsLXNlcnZlci1s/b2dvLnBuZw',
      description: 'Base de données relationnelle',
      isExternal: true
    },
    {
      name: 'n8n',
      logo: 'https://imgs.search.brave.com/8z4DTosJgDkgRGmYm9gZ3XRV2eKehrdRd7zobhDso6o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sZXN3/aXphcmRzLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNC8w/Mi9uOG4tbG9nby5w/bmc',
      description: 'Automatisation des workflows',
      isExternal: true
    },
    {
      name: 'Microsoft Power Platform',
      logo: 'https://imgs.search.brave.com/_twy81ftr9dSyiqiXoDa1dJIVDzPUdIL4JD3m-3qj_c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzVl/NGEwYzExZmRkNzkw/MWEyZTM2NGJlOC8x/NjMwNzI4MzQ1NjQ0/LTNTU1ZWWFYzSk9R/Q1RHVk5ZNkVUL01v/ZGVyblBvd2VyUGxh/dGZvcm1fTm9DbGlw/cHkucG5n',
      description: 'Solutions low-code et automatisation',
      isExternal: true
    },
    {
      name: 'Apache Airflow',
      logo: 'https://imgs.search.brave.com/AmE4ybPorT9NmVU-ibpe0Okrw5EkFfrgL2o2yKH4EOo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY2hhaW5ndWFy/ZC5kZXYvbG9nb3Mv/YWlyZmxvdy5zdmc',
      description: 'Orchestration de workflows de données',
      isExternal: true
    },
    {
      name: 'Azure Data Factory',
      logo: 'https://imgs.search.brave.com/d6_Rnnwak-2ahmk9k9CTkx8UgsJ1lCJDPC38YN4ON5o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL2F6dXJl/LWRhdGEtZmFjdG9y/eTI1MzkuanBn',
      description: 'Intégration et transformation de données',
      isExternal: true
    },
    {
      name: 'Slack',
      logo: 'https://imgs.search.brave.com/XGLEOm2hNfI3EfdAqb_9z0Yyt_ZCimhtr89egN4Q3a4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG40/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbG9nb3MtYW5k/LWJyYW5kcy81MTIv/MzA2X1NsYWNrX2xv/Z28tNTEyLnBuZw',
      description: 'Communication et collaboration'
    },
    {
      name: 'Jira',
      logo: 'https://imgs.search.brave.com/E3Mm4OUtlSurlmgvkYrpqSl2Aw1ISOR3Cz6y-bp6U2k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGVwdGlkaWdpdGFs/LmZyL2xvZ2ljaWVs/cy93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8xMi9sb2dvLWpp/cmEuanBn',
      description: 'Gestion de projet agile'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text mb-4">Nos Outils</h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Une suite complète d'outils pour répondre à tous vos besoins en analyse et ingénierie des données
          </p>
          <p className="text-lg text-text-light mt-4">
            Et bien d'autres solutions pour vous accompagner dans vos projets
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-background-light rounded-xl shadow-card p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 border border-border hover:border-accent flex flex-col items-center justify-between"
            >
              <div className="w-24 h-24 relative mb-4 flex items-center justify-center">
                <Image
                  src={tool.logo}
                  alt={`Logo ${tool.name}`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-text mb-2">{tool.name}</h3>
                <p className="text-text-light text-sm">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 