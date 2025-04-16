'use client';

import { useEffect } from 'react';

export default function Calendar() {
  useEffect(() => {
    // Chargement du script Calendly
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text mb-4">Prenez rendez-vous</h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Discutons de vos besoins en analyse et ingénierie des données
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/tetrisnews/30min?hide_gdpr_banner=1" 
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </div>
    </section>
  );
} 