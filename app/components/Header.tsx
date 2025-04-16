'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import AuthButton from './AuthButton'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fermer le menu lors du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">TetrisNews</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/solutions" className="text-text hover:text-primary transition-colors duration-300">
              Solutions
            </Link>
            <Link href="/actualites" className="text-text hover:text-primary transition-colors duration-300">
              Actualités
            </Link>
            <div className="flex items-center space-x-4">
              <AuthButton />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6 text-text"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-[500px] opacity-100 visible' 
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <nav className="py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link 
                href="/solutions" 
                className="text-text hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                href="/actualites" 
                className="text-text hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Actualités
              </Link>
              <div className="flex items-center space-x-4">
                <AuthButton />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
} 