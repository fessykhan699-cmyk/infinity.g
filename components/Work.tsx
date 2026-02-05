import React, { useEffect, useRef } from 'react';
import { CASE_STUDIES } from '../constants';
import { CaseStudy } from '../types';
import { ScrollReveal, AnimatedCounter } from './ScrollReveal';

const CaseStudyCard: React.FC<{ study: CaseStudy, index: number }> = ({ study, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animationDelay = `${index * 0.15}s`;
            entry.target.classList.add('card-animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={cardRef} className="reactive-glass group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] glass-card transition-all duration-700 opacity-0">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={study.image}
          alt={`Visual representation and showcase of the ${study.title} case study`}
          className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-110 md:group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent opacity-95"></div>
      </div>

      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mb-2 sm:mb-3 md:mb-4">
          <span className="px-2.5 sm:px-3 md:px-4 py-1 rounded-full bg-primary/30 text-[8px] md:text-[10px] font-black text-indigo-100 border border-primary/40 uppercase tracking-[0.2em]">{study.category}</span>
          <span className="px-2.5 sm:px-3 md:px-4 py-1 rounded-full bg-white/10 text-[8px] md:text-[10px] font-black text-slate-300 border border-white/20 uppercase tracking-[0.2em]">Blueprint</span>
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 lg:mb-4 leading-tight md:group-hover:text-primary transition-colors">{study.title}</h3>
        <p className="text-slate-100 text-sm md:text-base lg:text-lg mb-4 sm:mb-6 md:mb-8 lg:mb-10 line-clamp-2 font-light leading-relaxed drop-shadow-md">{study.description}</p>

        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 border-t border-white/20 pt-4 sm:pt-6 md:pt-8">
          {study.results.map((res, i) => (
            <div key={i}>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white flex items-center gap-1 tracking-tighter">
                <AnimatedCounter target={res.value} duration={1800} />
                {res.trend === 'up' && <span className="material-symbols-outlined text-green-400 text-xs sm:text-sm md:text-base">arrow_upward</span>}
                {res.trend === 'down' && <span className="material-symbols-outlined text-accent text-xs sm:text-sm md:text-base">arrow_downward</span>}
              </div>
              <div className="text-[8px] md:text-[9px] lg:text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] md:tracking-[0.3em] mt-1">{res.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CLIENTS = ['Hisense', 'GARMIN', 'aramco', 'Aster', 'Atlantis', 'Disney+'];

const Work: React.FC = () => {
  return (
    <section id="work" className="py-16 sm:py-20 md:py-32 lg:py-40 px-4 sm:px-6 max-w-7xl mx-auto">
      <ScrollReveal direction="blur-up" className="reactive-glass flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16 md:mb-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-4 sm:mb-6">
            Elite <span className="gradient-text">Showcase</span>
          </h2>
          <p className="text-slate-200 font-light text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
            Measurable business transformation delivered through high-end digital solutions.
            From luxury brand overhauls to core enterprise systems.
          </p>
        </div>
        <button className="magnetic-btn px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 min-h-[44px] rounded-full border border-slate-700 text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] text-slate-300 hover:text-white hover:border-white transition-all uppercase">
          View Selected Projects
        </button>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
        {CASE_STUDIES.map((study, idx) => (
          <CaseStudyCard key={study.id} study={study} index={idx} />
        ))}
      </div>

      {/* Trusted Clients — Infinite Marquee */}
      <div className="mt-16 sm:mt-20 md:mt-32 lg:mt-40 reactive-glass">
        <ScrollReveal direction="up">
          <p className="text-center text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-slate-500 mb-8 sm:mb-12 md:mb-20">Trusted by Visionary Organizations</p>
        </ScrollReveal>
        <div className="marquee-container py-4">
          <div className="marquee-track">
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-slate-400 tracking-tighter uppercase whitespace-nowrap hover:text-white transition-colors duration-500 cursor-default">{client}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
