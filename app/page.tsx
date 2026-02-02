'use client';
import React, { useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import Work from '../components/Work';
import Advisor from '../components/Advisor';
import Studio from '../components/Studio';
import Contact from '../components/Contact';
import AdminVideoUploader from '../components/AdminVideoUploader';
import { ScrollReveal } from '../components/ScrollReveal';
import { SERVICES } from '../constants';

const TILT_SENSITIVITY = 35;

const ServicesSection = () => {
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // Disable tilt on non-pointer devices via CSS media query logic or simple check
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (mouseY - centerY) / TILT_SENSITIVITY; 
    const rotateY = (centerX - mouseX) / TILT_SENSITIVITY; 
    
    card.style.setProperty('--mouse-x', `${mouseX}px`);
    card.style.setProperty('--mouse-y', `${mouseY}px`);
    card.style.setProperty('--tilt-x', `${-rotateX}deg`);
    card.style.setProperty('--tilt-y', `${-rotateY}deg`);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.style.setProperty('--tilt-x', `0deg`);
    card.style.setProperty('--tilt-y', `0deg`);
  };

  return (
    <section id="services" className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
      <ScrollReveal direction="up" className="mb-20 md:mb-24 reactive-glass">
        <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 md:mb-8">
          Elite <span className="gradient-text">Offerings</span>
        </h2>
        <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
          Visionary design and world-class engineering deployed as discrete, high-impact enterprise solutions.
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-14">
        {SERVICES.map((service, serviceIndex) => {
          const titleParts = service.title.split(' — ');
          const gigLabel = titleParts[0];
          const serviceName = titleParts[1];
          const nameWords = serviceName.split(' ');
          const firstPart = nameWords.slice(0, -1).join(' ');
          const lastWord = nameWords[nameWords.length - 1];

          return (
            <ScrollReveal key={serviceIndex} direction="up" delay={serviceIndex * 80}>
              <div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="reactive-glass glass-card group p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] flex flex-col h-full cursor-default transition-all duration-700 ease-out"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Interactive Spotlight Layers */}
                <div className="spotlight"></div>
                
                <div className="relative z-10 flex flex-col h-full transition-all duration-700 ease-out md:group-hover:translate-z-[50px] md:group-hover:-translate-y-4 md:group-hover:scale-[1.01]">
                  <div className="flex justify-between items-start mb-10 md:mb-12">
                    <div className={`w-12 md:w-14 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full transition-all md:group-hover:w-28 duration-700 opacity-80 md:group-hover:opacity-100`}></div>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-slate-400 md:group-hover:text-primary transition-colors duration-500">{gigLabel}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-4xl font-display font-light text-white mb-6 md:mb-8 leading-[1.1] transition-all duration-500 md:group-hover:text-white md:group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                     {firstPart} <br/><span className="font-bold md:group-hover:gradient-text transition-all duration-500 block mt-1">{lastWord}</span>
                  </h3>
                  
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-10 md:mb-12 font-light flex-grow transition-colors duration-500 md:group-hover:text-white">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto">
                    <a href="#contact" className="inline-flex items-center gap-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-slate-400 md:group-hover:text-white transition-all duration-500">
                      Inquire Now
                      <span className="material-icons-outlined text-sm md:group-hover:translate-x-4 transition-all text-primary md:group-hover:scale-125 md:group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">east</span>
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

const CapabilitiesSection = () => {
  return (
    <section id="capabilities" className="py-24 md:py-48 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
          <ScrollReveal direction="left" className="w-full lg:w-1/2 space-y-12 md:space-y-16 reactive-glass">
            <h2 className="text-5xl md:text-8xl font-display font-bold text-white leading-[1] tracking-tighter">
              Design that <br/><span className="gradient-text">Commands</span> Influence
            </h2>
            <p className="text-slate-200 font-light leading-relaxed text-xl md:text-2xl max-w-xl">
              Operating at the nexus of high-end engineering and luxury brand aesthetic. 
              We treat your digital presence as a physical masterpiece.
            </p>
            
            <ScrollReveal stagger direction="up" className="flex gap-12 md:gap-24 pt-8 border-t border-white/10">
              <div className="space-y-2 md:space-y-4">
                <div className="text-5xl md:text-7xl font-bold text-white tracking-tighter">15+</div>
                <div className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-slate-400 font-black">Strategic Partners</div>
              </div>
              <div className="space-y-2 md:space-y-4">
                <div className="text-5xl md:text-7xl font-bold text-white tracking-tighter">100%</div>
                <div className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-slate-400 font-black">Success Rate</div>
              </div>
            </ScrollReveal>
          </ScrollReveal>
          
          <ScrollReveal direction="right" className="w-full lg:w-1/2 flex justify-center reactive-glass">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[32rem] md:h-[32rem] glass-card rounded-full flex items-center justify-center p-12 md:p-20 relative group transition-all duration-1000">
               <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] md:blur-[100px] opacity-0 group-hover:opacity-60 transition-opacity duration-1000"></div>
               <div className="absolute inset-6 md:inset-8 border border-white/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
               <div className="absolute inset-12 md:inset-16 border border-white/10 rounded-full animate-[spin_35s_linear_infinite_reverse]"></div>
               <div className="text-center z-10 transition-transform duration-700 md:group-hover:scale-110">
                 <span className="material-symbols-outlined text-6xl md:text-9xl text-primary/80 animate-pulse block mb-6 md:mb-10 transition-transform md:group-hover:scale-125 duration-1000">deployed_code</span>
                 <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-[0.5em] md:tracking-[0.6em] mb-2 md:mb-4">Visionary</h4>
                 <p className="text-[9px] md:text-[11px] text-slate-400 uppercase tracking-widest font-black">Architectural Core</p>
               </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default function Page() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <CapabilitiesSection />
      <ServicesSection />
      <Work />
      <Advisor />
      <Studio />
      <Contact />
      <AdminVideoUploader />
    </div>
  );
}