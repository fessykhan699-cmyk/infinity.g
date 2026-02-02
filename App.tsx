'use client';
import React, { useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Hero from './components/Hero';
import Work from './components/Work';
import Advisor from './components/Advisor';
import Studio from './components/Studio';
import Contact from './components/Contact';
import AdminVideoUploader from './components/AdminVideoUploader';
import { ScrollReveal } from './components/ScrollReveal';
import { SERVICES } from './constants';

const ServicesSection = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30; 
    const rotateY = (centerX - x) / 30; 
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--tilt-x', `${-rotateX}deg`);
    card.style.setProperty('--tilt-y', `${-rotateY}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--tilt-x', `0deg`);
    card.style.setProperty('--tilt-y', `0deg`);
  };

  return (
    <section id="services" className="py-24 md:py-48 px-4 max-w-6xl mx-auto">
      <ScrollReveal direction="up" className="mb-20 md:mb-24">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tighter">
          Elite <span className="gradient-text">Offerings</span>
        </h2>
        <p className="text-slate-400 text-base md:text-lg lg:text-xl font-light max-w-3xl leading-relaxed">
          Visionary design and world-class engineering deployed as discrete, high-impact enterprise solutions.
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {SERVICES.map((service, i) => {
          const titleParts = service.title.split(' — ');
          const gigLabel = titleParts[0];
          const serviceName = titleParts[1];
          const nameWords = serviceName.split(' ');
          const firstPart = nameWords.slice(0, -1).join(' ');
          const lastWord = nameWords[nameWords.length - 1];

          return (
            <ScrollReveal key={i} direction="up" delay={i * 100}>
              <div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="reactive-glass glass-card group p-7 md:p-9 rounded-[2.5rem] flex flex-col h-full cursor-default transition-all duration-700 ease-out"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="spotlight"></div>
                
                <div className="relative z-10 flex flex-col h-full transition-all duration-500 ease-out group-hover:translate-z-[50px] group-hover:-translate-y-4">
                  <div className="flex justify-between items-start mb-10">
                    <div className={`w-12 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full transition-all group-hover:w-24 duration-700 opacity-60 group-hover:opacity-100`}></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 group-hover:text-primary transition-colors duration-500">{gigLabel}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-display font-light text-white mb-6 leading-[1.1] transition-all duration-500 group-hover:text-white">
                     {firstPart} <br/><span className="font-bold group-hover:gradient-text block mt-1">{lastWord}</span>
                  </h3>
                  
                  <p className="text-slate-500 text-base leading-relaxed mb-10 font-light flex-grow transition-colors duration-500 group-hover:text-slate-300">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto">
                    <a href="#contact" className="inline-flex items-center gap-6 py-3 min-h-[44px] text-[10px] font-black uppercase tracking-[0.6em] text-slate-500 group-hover:text-white transition-all duration-500">
                      Inquire
                      <span className="material-icons-outlined text-lg group-hover:translate-x-6 transition-transform text-primary group-hover:scale-125">east</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};

const CapabilitiesSection = () => (
  <section id="capabilities" className="py-24 md:py-48 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <ScrollReveal direction="left" className="w-full lg:w-1/2 space-y-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-[1.05] tracking-tighter">
            Architectural <br/><span className="gradient-text">Mastery</span>
          </h2>
          <p className="text-slate-400 font-light leading-relaxed text-base md:text-lg lg:text-xl max-w-xl">
            Treating every digital project as a bespoke piece of physical art.
          </p>
          <div className="flex gap-12 pt-8 border-t border-white/5">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tighter">15+</div>
              <div className="text-[10px] uppercase tracking-[0.5em] text-slate-600 font-black mt-2">Active Partners</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tighter">100%</div>
              <div className="text-[10px] uppercase tracking-[0.5em] text-slate-600 font-black mt-2">Retention</div>
            </div>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right" className="w-full lg:w-1/2 flex justify-center">
          <div className="w-72 h-72 sm:w-[26rem] sm:h-[26rem] glass-card rounded-full flex items-center justify-center p-12 relative group transition-all duration-700">
             <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-70 transition-opacity duration-700"></div>
             <div className="absolute inset-8 border border-white/5 rounded-full animate-[spin_80s_linear_infinite]"></div>
             <div className="absolute inset-16 border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
             <div className="text-center z-10 transition-transform duration-700 group-hover:scale-105">
               <span className="material-symbols-outlined text-7xl text-primary animate-pulse mb-6 block">token</span>
               <h4 className="text-3xl font-bold text-white uppercase tracking-[0.6em] mb-3">Core</h4>
               <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black">Strategic Center</p>
             </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  useEffect(() => {
    let animationFrame: number | null = null;
    let elements: HTMLElement[] = [];

    const updateElements = () => {
      if (elements.length === 0) {
        elements = Array.from(document.querySelectorAll<HTMLElement>('.reactive-glass'));
      }
    };

    const updateScroll = () => {
      const scrolled = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', scrolled.toString());
      updateElements();
      const center = window.innerHeight / 2;
      const maxDist = window.innerHeight * 0.4;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - center);
        const progress = Math.pow(Math.max(0, Math.min(1, (dist - 100) / maxDist)), 2);
        el.style.setProperty('--scroll-p', progress.toFixed(4));
      });
    };

    const handleScroll = () => {
      if (animationFrame !== null) {
        return;
      }
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        updateScroll();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    updateScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <MainLayout>
      <Hero />
      <CapabilitiesSection />
      <ServicesSection />
      <Work />
      <Advisor />
      <Studio />
      <Contact />
      <AdminVideoUploader />
    </MainLayout>
  );
};

export default App;
