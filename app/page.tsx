'use client';

import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import FreeOffer from './components/FreeOffer';
import Calendar from './components/Calendar';
import Industries from './components/Industries';
import NewsSection from './components/NewsSection';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log('Home component mounted');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-primary">Bienvenue sur TetrisNews</h1>
          </div>
          
          <div className="space-y-16">
            <Hero />
            <Features />
            <Industries />
            <NewsSection />
            <FreeOffer />
            <Calendar />
          </div>
        </div>
      </main>
    </div>
  );
} 