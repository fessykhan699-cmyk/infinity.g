'use client';
import React, { useState, useEffect } from 'react';
import { ScrollReveal, SplitText } from './ScrollReveal';

const TYPING_PHRASES = [
  'cinematic clarity.',
  'scalable systems.',
  'pixel-perfect craft.',
  'enterprise power.',
];

const Hero: React.FC = () => {
  const [typingText, setTypingText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setTypingText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 60);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setTypingText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 30);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((phraseIndex + 1) % TYPING_PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-12 overflow-hidden bg-transparent">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              '--duration': `${12 + Math.random() * 18}s`,
              '--drift': `${(Math.random() - 0.5) * 100}px`,
              '--max-opacity': `${0.2 + Math.random() * 0.4}`,
              animationDelay: `${Math.random() * 15}s`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Morphing gradient blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="morph-blob w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 top-[10%] left-[10%]" />
        <div className="morph-blob w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-secondary/5 top-[50%] right-[5%]" />
        <div className="morph-blob w-[250px] md:w-[350px] h-[250px] md:h-[350px] bg-purple-500/5 bottom-[10%] left-[30%]" />
      </div>

      {/* Background Depth Accent */}
      <div
        className="absolute top-1/4 left-1/4 w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[60px] sm:blur-[100px] md:blur-[120px] pointer-events-none z-0 parallax-layer"
        style={{ '--speed': '0.02' } as React.CSSProperties}
      />

      <ScrollReveal direction="fade-slow" className="max-w-7xl mx-auto w-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-10 md:space-y-12">
            <ScrollReveal direction="down" delay={200}>
              <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/20 text-[9px] sm:text-[10px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-indigo-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Precision Engineering Core
              </div>
            </ScrollReveal>

            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-[0.9] sm:leading-[0.85] tracking-tighter text-white select-none">
                  {/* Word: Infinite - character split animation */}
                  <div className="text-parallax-wrapper">
                    <div
                      className="parallax-layer will-change-transform"
                      style={{ '--speed': '0.04' } as React.CSSProperties}
                    >
                      <SplitText text="Infinite" delay={600} staggerMs={40} />
                    </div>
                    <div
                      className="text-parallax-ghost text-primary hidden md:block"
                      style={{ '--speed': '0.1' } as React.CSSProperties}
                    >
                      Infinite
                    </div>
                  </div>

                  {/* Word: Mastery - character split animation with gradient */}
                  <div className="text-parallax-wrapper mt-1 sm:mt-2 md:mt-4">
                    <div
                      className="parallax-layer will-change-transform"
                      style={{ '--speed': '0.08' } as React.CSSProperties}
                    >
                      <SplitText text="Mastery" delay={900} staggerMs={50} charClassName="gradient-text" />
                    </div>
                    <div
                      className="text-parallax-ghost text-secondary hidden md:block"
                      style={{ '--speed': '0.15' } as React.CSSProperties}
                    >
                      Mastery
                    </div>
                  </div>
                </h1>
              </div>

              <ScrollReveal direction="blur-up" delay={1200}>
                <p className="text-slate-200 leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-2xl drop-shadow-sm">
                  Elite digital craftsmanship for visionary enterprises.{' '}
                  <br className="hidden sm:block" />
                  We turn complexity into{' '}
                  <span className="text-white font-medium">{typingText}</span>
                  <span className="typing-cursor" />
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={1500} className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 pt-4 md:pt-8">
              <a href="#contact" className="magnetic-btn relative group px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 min-h-[44px] flex items-center justify-center rounded-full bg-primary text-white font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_60px_-10px_rgba(99,102,241,0.5)] text-center">
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  Initiate Project <span className="material-icons-outlined text-sm group-hover:translate-x-3 transition-transform">arrow_forward</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </a>
              <a href="#work" className="magnetic-btn px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 min-h-[44px] flex items-center justify-center rounded-full border border-white/20 text-white font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase hover:bg-white/10 transition-all backdrop-blur-md group text-center">
                View Showcase <span className="material-icons-outlined text-xs ml-2 opacity-70 group-hover:opacity-100 transition-opacity">visibility</span>
              </a>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="scale" delay={1000} className="relative hidden lg:flex justify-end">
            <div
              className="relative w-full max-w-md glass-card p-1 rounded-[3rem] lg:rounded-[4rem] shadow-2xl transition-transform duration-500 ease-out border-white/10 reactive-glass parallax-layer"
              style={{ '--speed': '0.1' } as React.CSSProperties}
            >
               <div className="p-12 lg:p-16 space-y-10 lg:space-y-12">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <div className="w-4 h-4 rounded-full bg-red-500/40"></div>
                      <div className="w-4 h-4 rounded-full bg-yellow-500/40"></div>
                      <div className="w-4 h-4 rounded-full bg-green-500/40"></div>
                    </div>
                    <div className="h-1.5 w-32 bg-white/10 rounded-full"></div>
                  </div>

                   <div className="space-y-6">
                      <div className="h-2 bg-white/20 rounded-full w-3/4 animate-pulse"></div>
                      <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[2.5rem] border border-white/10 flex items-center justify-center relative group overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.3)_0%,transparent_75%)] group-hover:scale-150 transition-transform duration-700"></div>
                        <span className="material-symbols-outlined text-7xl text-primary/80 animate-bounce">auto_awesome</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                    <div className="h-16 bg-white/10 rounded-2xl border border-white/10"></div>
                    <div className="h-16 bg-white/10 rounded-2xl border border-white/10"></div>
                  </div>
               </div>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-60 hidden md:block">
        <span className="material-icons-outlined text-white text-4xl">expand_more</span>
      </div>
    </section>
  );
};

export default Hero;
