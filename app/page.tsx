'use client';

import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Applications from './components/Applications';
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
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <Features />
        <Applications />
        <Industries />
        <NewsSection />
        <FreeOffer />
        <Calendar />
      </main>
    </div>
  );
} 