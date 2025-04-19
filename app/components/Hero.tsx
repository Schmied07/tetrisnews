'use client';

import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoUrl = "https://www.youtube.com/embed/p-x9uyh4Zmk";

  return (
    <section className="relative py-20 bg-gradient-to-b from-background to-background/80" aria-label="Section principale">
      <div className="relative z-10 text-center text-text px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Transformez vos données en opportunités
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Solutions d'analyse et d'ingénierie des données pour automatiser vos processus et optimiser vos décisions
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => setIsVideoPlaying(true)}
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 inline-flex items-center justify-center"
            aria-label="Voir la vidéo de présentation"
          >
            <FaPlay className="mr-2" aria-hidden="true" />
            Voir la vidéo
          </button>
        </div>
      </div>

      {isVideoPlaying && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsVideoPlaying(false);
            }
          }}
        >
          <div className="relative w-full max-w-4xl mx-4">
            <h2 id="video-modal-title" className="sr-only">Vidéo de présentation TetrisNews</h2>
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-4 right-4 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100 transition-colors duration-300 z-[101]"
              aria-label="Fermer la vidéo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={videoUrl}
                className="absolute top-0 left-0 w-full h-full"
                title="Vidéo de présentation TetrisNews"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 