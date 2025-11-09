'use client';

import { useState, useCallback } from 'react';
import { FaPlay, FaRocket, FaShieldAlt, FaCog } from 'react-icons/fa';
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
    <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <FaShieldAlt className="w-4 h-4" />
            <span>Solutions d'excellence en Data & IA</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight animate-fade-in-up text-gray-900">
            Transformez vos <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">données</span><br />
            en <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">avantage concurrentiel</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Expert en analyse de données, automatisation intelligente et agents IA.<br/>
            Des solutions sur-mesure pour optimiser vos processus métier.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animation-delay-400">
            <Link 
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FaRocket className="w-5 h-5" />
                Démarrer un projet
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <button
              onClick={handleVideoPlay}
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <FaPlay className="mr-2 group-hover:scale-110 transition-transform duration-200" />
              Voir notre expertise
            </button>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-600">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100">
              <div className="flex items-center justify-center gap-3 mb-2">
                <FaCog className="w-6 h-6 text-blue-600" />
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">3</div>
              </div>
              <div className="text-sm text-gray-600 font-medium">Services spécialisés</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100">
              <div className="flex items-center justify-center gap-3 mb-2">
                <FaShieldAlt className="w-6 h-6 text-blue-600" />
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">3</div>
              </div>
              <div className="text-sm text-gray-600 font-medium">Applications métier</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100">
              <div className="flex items-center justify-center gap-3 mb-2">
                <FaRocket className="w-6 h-6 text-blue-600" />
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">100%</div>
              </div>
              <div className="text-sm text-gray-600 font-medium">Solutions sur-mesure</div>
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
          onClick={handleBackdropClick}
        >
          <div className="relative w-full max-w-5xl mx-4 animate-in fade-in zoom-in duration-300">
            <button
              onClick={handleVideoClose}
              className="absolute -top-12 right-0 bg-white text-gray-800 rounded-full p-3 hover:bg-gray-100 transition-all duration-300 z-[101] shadow-lg hover:scale-110"
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
                title="Vidéo de présentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}