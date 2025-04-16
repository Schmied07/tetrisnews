export default function Features() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Nos solutions clés
          </h2>
          <p className="text-xl text-text max-w-3xl mx-auto leading-relaxed">
            Des outils puissants pour optimiser vos processus métier
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white rounded-2xl p-10 shadow-lg transition-all duration-400 hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden border border-gray-100 group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-all duration-400 -translate-y-full group-hover:translate-y-0" />
            <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-8 transition-all duration-400 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary shadow-md">
              <svg className="w-7 h-7 text-primary transition-all duration-400 group-hover:text-white group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text mb-4 transition-colors duration-300 group-hover:text-primary">Analyse de données</h3>
            <p className="text-text-light text-lg leading-relaxed transition-colors duration-300">
              Transformez vos données en insights actionnables avec nos outils d'analyse avancés.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-lg transition-all duration-400 hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden border border-gray-100 group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-all duration-400 -translate-y-full group-hover:translate-y-0" />
            <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-8 transition-all duration-400 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary shadow-md">
              <svg className="w-7 h-7 text-primary transition-all duration-400 group-hover:text-white group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text mb-4 transition-colors duration-300 group-hover:text-primary">Automatisation</h3>
            <p className="text-text-light text-lg leading-relaxed transition-colors duration-300">
              Automatisez vos processus métier pour gagner en efficacité et réduire les erreurs.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-lg transition-all duration-400 hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden border border-gray-100 group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-all duration-400 -translate-y-full group-hover:translate-y-0" />
            <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-8 transition-all duration-400 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary shadow-md">
              <svg className="w-7 h-7 text-primary transition-all duration-400 group-hover:text-white group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text mb-4 transition-colors duration-300 group-hover:text-primary">Ingénierie des Données</h3>
            <p className="text-text-light text-lg leading-relaxed transition-colors duration-300">
              Conception et mise en place de pipelines de données robustes et évolutifs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 