import { memo } from 'react';
import Link from 'next/link';

const FeatureCard = memo(({ 
  icon, 
  title, 
  description, 
  href 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  href: string;
}) => (
  <Link href={href} className="group block">
    <article className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg transition-all duration-400 hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden border border-gray-100 h-full cursor-pointer">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-all duration-400 -translate-y-full group-hover:translate-y-0" />
      
      <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-6 transition-all duration-400 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary shadow-md">
        <div className="w-7 h-7 text-primary transition-all duration-400 group-hover:text-white group-hover:scale-110">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl lg:text-2xl font-bold text-text mb-4 transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>
      
      <p className="text-text-light text-base lg:text-lg leading-relaxed transition-colors duration-300 mb-4">
        {description}
      </p>
      
      <div className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
        En savoir plus
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </article>
  </Link>
));

FeatureCard.displayName = 'FeatureCard';

export default function Features() {
  const features = [
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Analyse de données',
      description: 'Transformez vos données brutes en insights actionnables avec nos outils d\'analyse avancés et nos tableaux de bord interactifs.',
      href: '/solutions#analyse-donnees'
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Automatisation',
      description: 'Automatisez vos processus métier répétitifs pour gagner en efficacité, réduire les erreurs et libérer du temps pour les tâches à valeur ajoutée.',
      href: '/solutions#automatisation'
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: 'Ingénierie des Données',
      description: 'Conception et mise en place de pipelines de données robustes, évolutifs et sécurisés pour supporter votre croissance.',
      href: '/solutions#ingenierie-donnees'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Nos solutions clés
          </h2>
          <p className="text-lg lg:text-xl text-text max-w-3xl mx-auto leading-relaxed">
            Des outils puissants et des services personnalisés pour optimiser vos processus métier et maximiser la valeur de vos données
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}