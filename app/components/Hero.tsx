'use client';

import { useState, useCallback } from 'react';
import { FaPlay } from 'react-icons/fa';
import Link from 'next/link';

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoUrl = "https://www.youtube.com/embed/p-x9uyh4Zmk";

  const handleVideoPlay = useCallback(() => {
    setIsVideoPlaying(true);
  }, []);

  const handleVideoClose = useCallback(() => {
    setIsVideoPlaying(false);
  }, []);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsVideoPlaying(false);
    }
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 text-center text-text">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transformez vos données en{' '}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              opportunités
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-text/80">
            Solutions d'analyse et d'ingénierie des données pour automatiser vos processus et optimiser vos décisions métier
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={handleVideoPlay}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center hover:shadow-lg hover:scale-105 group"
              aria-label="Voir la vidéo de présentation TetrisNews"
            >
              <FaPlay className="mr-2 group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
              Voir la vidéo
            </button>
            
            <Link 
              href="/solutions"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center hover:shadow-lg hover:scale-105"
              aria-label="Découvrir nos solutions d'analyse de données"
            >
              Découvrir nos solutions
            </Link>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-sm text-text/70">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-text/70">Satisfaction client</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-text/70">Support disponible</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          onClick={handleBackdropClick}
        >
          <div className="relative w-full max-w-5xl mx-4 animate-in fade-in zoom-in duration-300">
            <h2 id="video-modal-title" className="sr-only">Vidéo de présentation TetrisNews</h2>
            <button
              onClick={handleVideoClose}
              className="absolute top-4 right-4 bg-white text-gray-800 rounded-full p-3 hover:bg-gray-100 transition-all duration-300 z-[101] shadow-lg hover:scale-110"
              aria-label="Fermer la vidéo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={`${videoUrl}?autoplay=1`}
                className="absolute top-0 left-0 w-full h-full"
                title="Vidéo de présentation TetrisNews - Solutions d'analyse de données"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}