'use client';
import React from 'react';
import { ScrollReveal } from './ScrollReveal';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-center px-6 pt-24 pb-12 overflow-hidden bg-transparent">
      {/* Background Depth Accent - Very slow parallax */}
      <div 
        className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none z-0 parallax-layer" 
        style={{ '--speed': '0.02' } as React.CSSProperties}
      />
      
      <ScrollReveal direction="fade-slow" className="max-w-7xl mx-auto w-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-10 md:space-y-12">
            <ScrollReveal direction="down" delay={200}>
              <div className="inline-flex items-center gap-3 px-4 md:px-5 py-2 rounded-full border border-primary/30 bg-primary/20 text-[9px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-indigo-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Precision Engineering Core
              </div>
            </ScrollReveal>
            
            <div className="space-y-4 md:space-y-6">
              <ScrollReveal direction="up" delay={400}>
                <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-display font-bold leading-[0.85] md:leading-[0.82] tracking-tighter text-white select-none">
                  {/* Word: Infinite */}
                  <div className="text-parallax-wrapper">
                    <div 
                      className="parallax-layer will-change-transform" 
                      style={{ '--speed': '0.04' } as React.CSSProperties}
                    >
                      Infinite
                    </div>
                    <div 
                      className="text-parallax-ghost text-primary hidden md:block" 
                      style={{ '--speed': '0.1' } as React.CSSProperties}
                    >
                      Infinite
                    </div>
                  </div>

                  {/* Word: Mastery */}
                  <div className="text-parallax-wrapper mt-2 md:mt-4">
                    <div 
                      className="parallax-layer will-change-transform" 
                      style={{ '--speed': '0.08' } as React.CSSProperties}
                    >
                      <span className="gradient-text">Mastery</span>
                    </div>
                    <div 
                      className="text-parallax-ghost text-secondary hidden md:block" 
                      style={{ '--speed': '0.15' } as React.CSSProperties}
                    >
                      Mastery
                    </div>
                  </div>
                </h1>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={600}>
                <p className="text-slate-200 leading-relaxed text-lg md:text-2xl lg:text-3xl font-light max-w-2xl drop-shadow-sm">
                  Elite digital craftsmanship for visionary enterprises. 
                  We turn complexity into cinematic clarity.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={800} className="flex flex-col sm:flex-row gap-4 md:gap-8 pt-4 md:pt-8">
              <a href="#contact" className="relative group px-10 md:px-12 py-5 md:py-6 rounded-full bg-primary text-white font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_60px_-10px_rgba(99,102,241,0.5)] text-center">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Initiate Project <span className="material-icons-outlined text-sm group-hover:translate-x-3 transition-transform">arrow_forward</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </a>
              <a href="#work" className="px-10 md:px-12 py-5 md:py-6 rounded-full border border-white/20 text-white font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase hover:bg-white/10 transition-all backdrop-blur-xl group text-center">
                View Showcase <span className="material-icons-outlined text-xs ml-2 opacity-70 group-hover:opacity-100 transition-opacity">visibility</span>
              </a>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="scale" delay={1000} className="relative hidden lg:flex justify-end">
            <div 
              className="relative w-full max-w-md glass-card p-1 rounded-[4rem] shadow-2xl transition-transform duration-500 ease-out border-white/10 reactive-glass parallax-layer" 
              style={{ '--speed': '0.1' } as React.CSSProperties}
            >
               <div className="p-16 space-y-12">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <div className="w-4 h-4 rounded-full bg-red-500/40"></div>
                      <div className="w-4 h-4 rounded-full bg-yellow-500/40"></div>
                      <div className="w-4 h-4 rounded-full bg-green-500/40"></div>
                    </div>
                    <div className="h-1.5 w-32 bg-white/10 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-8">
                     <div className="h-2.5 bg-white/20 rounded-full w-3/4 animate-pulse"></div>
                     <div className="h-56 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[3rem] border border-white/10 flex items-center justify-center relative group overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.3)_0%,transparent_75%)] group-hover:scale-150 transition-transform duration-1000"></div>
                        <span className="material-symbols-outlined text-8xl text-primary/80 animate-bounce">auto_awesome</span>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="h-20 bg-white/10 rounded-3xl border border-white/10"></div>
                    <div className="h-20 bg-white/10 rounded-3xl border border-white/10"></div>
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