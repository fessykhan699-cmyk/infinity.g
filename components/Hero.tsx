'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal, SplitText } from './ScrollReveal';
import { MotionReveal, Magnetic, Parallax } from './MotionComponents';
import { staggerContainerVariants, fadeInUpVariants } from '../lib/motion';

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
      {/* Floating Particles with Motion */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              y: [-100, -window.innerHeight],
            }}
            transition={{
              duration: 12 + Math.random() * 18,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: 'linear',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }}
          />
        ))}
      </div>

      {/* Morphing gradient blobs with parallax */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <Parallax speed={0.3}>
          <motion.div 
            className="morph-blob w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 top-[10%] left-[10%]"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </Parallax>
        <Parallax speed={0.5}>
          <motion.div 
            className="morph-blob w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-secondary/5 top-[50%] right-[5%]"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </Parallax>
        <Parallax speed={0.2}>
          <motion.div 
            className="morph-blob w-[250px] md:w-[350px] h-[250px] md:h-[350px] bg-purple-500/5 bottom-[10%] left-[30%]"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 60, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </Parallax>
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

            <MotionReveal variant="fadeUp" delay={1.5} className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 pt-4 md:pt-8">
              <Magnetic strength={0.3}>
                <motion.a 
                  href="#contact" 
                  className="relative group px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 min-h-[44px] flex items-center justify-center rounded-full bg-primary text-white font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase overflow-hidden text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                    Initiate Project 
                    <motion.span 
                      className="material-icons-outlined text-sm"
                      whileHover={{ x: 8 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      arrow_forward
                    </motion.span>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-primary"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <motion.a 
                  href="#work" 
                  className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 min-h-[44px] flex items-center justify-center rounded-full border border-white/20 text-white font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase backdrop-blur-md group text-center"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  View Showcase 
                  <motion.span 
                    className="material-icons-outlined text-xs ml-2 opacity-70"
                    whileHover={{ opacity: 1 }}
                  >
                    visibility
                  </motion.span>
                </motion.a>
              </Magnetic>
            </MotionReveal>
          </div>

          <ScrollReveal direction="scale" delay={1000} className="relative hidden lg:flex justify-end">
            <div
              className="relative w-full max-w-md glass-card motion-popout light-field p-1 rounded-[3rem] lg:rounded-[4rem] shadow-2xl transition-transform duration-500 ease-out border-white/10 reactive-glass parallax-layer"
              style={{ '--speed': '0.1' } as React.CSSProperties}
            >
               <div className="p-12 lg:p-16 space-y-10 lg:space-y-12">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 trinity-system">
                      <div className="w-4 h-4 rounded-full bg-red-500/40 trinity-core"></div>
                      <div className="w-4 h-4 rounded-full bg-yellow-500/40 trinity-core"></div>
                      <div className="w-4 h-4 rounded-full bg-green-500/40 trinity-core"></div>
                    </div>
                    <div className="h-1.5 w-32 skeleton-load rounded-full"></div>
                  </div>

                   <div className="space-y-6">
                      <div className="h-2 skeleton-load rounded-full w-3/4"></div>
                      <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[2.5rem] border border-white/10 flex items-center justify-center relative group overflow-hidden widget-card">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.3)_0%,transparent_75%)] group-hover:scale-150 transition-transform duration-700"></div>
                        <span className="material-symbols-outlined text-7xl text-primary/80 feature-showcase">auto_awesome</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                    <div className="h-16 skeleton-load rounded-2xl border border-white/10 widget-card"></div>
                    <div className="h-16 skeleton-load rounded-2xl border border-white/10 widget-card"></div>
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
