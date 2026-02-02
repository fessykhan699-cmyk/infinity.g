'use client';
import React, { useEffect } from 'react';
import './globals.css';
import DynamicBackgroundVideo from '../components/DynamicBackgroundVideo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          document.documentElement.style.setProperty('--scroll-y', scrolled.toString());

          // Lens Focus Logic (Restored)
          const elements = document.querySelectorAll('.reactive-glass');
          const vh = window.innerHeight;
          const center = vh / 2;

          elements.forEach((el) => {
            const rect = (el as HTMLElement).getBoundingClientRect();
            const elCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elCenter - center);
            const threshold = vh * 0.1; 
            const falloff = vh * 0.5;
            
            let progress = 0;
            if (distance > threshold) {
              const rawProgress = (distance - threshold) / (falloff - threshold);
              progress = Math.pow(Math.max(0, Math.min(1, rawProgress)), 2.5);
            }
            
            (el as HTMLElement).style.setProperty('--scroll-p', progress.toFixed(4));
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    setTimeout(handleScroll, 200);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>♾️</text></svg>" />
      </head>
      <body className="antialiased bg-background-dark selection:bg-primary/40 selection:text-white">
        <DynamicBackgroundVideo />
        <Navbar />
        <div className="relative z-10">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}