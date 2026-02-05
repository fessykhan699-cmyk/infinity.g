'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import Hero from './components/Hero';
import Work from './components/Work';
import Advisor from './components/Advisor';
import Studio from './components/Studio';
import Contact from './components/Contact';
import AdminVideoUploader from './components/AdminVideoUploader';
import { ScrollReveal, AnimatedCounter } from './components/ScrollReveal';
import { MotionReveal, StaggerContainer, Magnetic } from './components/MotionComponents';
import { SERVICES } from './constants';

const MAX_DISTANCE_FACTOR = 0.4;
const DISTANCE_OFFSET = 100;
const PROGRESS_EXPONENT = 2;
const RESIZE_DEBOUNCE_MS = 150;
const MUTATION_DEBOUNCE_MS = 120;
const TILT_SENSITIVITY = 30;

// ─── Preloader ──────────────────────────────────────────────
const Preloader: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${loaded ? 'loaded' : ''}`}>
      <div className="preloader-logo">
        <span className="material-icons-outlined text-3xl text-white relative z-10">all_inclusive</span>
      </div>
      <div className="preloader-bar">
        <div className="preloader-bar-fill" />
      </div>
      <div className="preloader-text">Loading Experience</div>
    </div>
  );
};

// ─── Magnetic Cursor ────────────────────────────────────────
const MagneticCursor: React.FC = () => {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
      if (!active) setActive(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .magnetic-btn, .glass-card');
      setHovering(!!isInteractive);
    };

    const handleLeave = () => {
      setActive(false);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [active]);

  return (
    <>
      <div className={`cursor-glow ${active ? 'active' : ''}`} />
      <div className={`cursor-dot ${active ? 'active' : ''} ${hovering ? 'hovering' : ''}`} />
      <div className={`cursor-ring ${active ? 'active' : ''} ${hovering ? 'hovering' : ''}`} />
    </>
  );
};

// ─── Scroll Progress Bar ────────────────────────────────────
const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number | null = null;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      raf = null;
    };

    const handleScroll = () => {
      if (raf === null) {
        raf = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})`, width: '100%' }}
    />
  );
};

// ─── Services Section ───────────────────────────────────────
const ServicesSection = () => {
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
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
    <section id="services" className="py-24 md:py-48 px-4 max-w-6xl mx-auto">
      <MotionReveal variant="fadeUp" className="mb-20 md:mb-24">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tighter">
          Elite <span className="gradient-text">Offerings</span>
        </h2>
        <p className="text-slate-400 text-base md:text-lg lg:text-xl font-light max-w-3xl leading-relaxed">
          Visionary design and world-class engineering deployed as discrete, high-impact enterprise solutions.
        </p>
      </MotionReveal>

      <motion.div 
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {SERVICES.map((service, serviceIndex) => {
          const titleParts = service.title.split(' — ');
          const gigLabel = titleParts[0];
          const serviceName = titleParts[1];
          const nameWords = serviceName.split(' ');
          const firstPart = nameWords.slice(0, -1).join(' ');
          const lastWord = nameWords[nameWords.length - 1];

          return (
            <motion.div
              key={serviceIndex}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            >
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="reactive-glass glass-card widget-card group p-7 md:p-9 rounded-[2.5rem] flex flex-col h-full cursor-default touch-luminous"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ 
                  y: -8,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
              >
                <div className="spotlight"></div>

                <div className="relative z-10 flex flex-col h-full transition-all duration-500 ease-out group-hover:translate-z-[50px] group-hover:-translate-y-4">
                  <div className="flex justify-between items-start mb-10">
                    <motion.div 
                      className={`h-1.5 bg-gradient-to-r ${service.gradient} rounded-full opacity-60 group-hover:opacity-100`}
                      initial={{ width: 48 }}
                      whileHover={{ width: 96 }}
                      transition={{ duration: 0.7 }}
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 group-hover:text-primary transition-colors duration-500">{gigLabel}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-light text-white mb-6 leading-[1.1] transition-all duration-500 group-hover:text-white">
                     {firstPart} <br/><span className="font-bold group-hover:gradient-text block mt-1">{lastWord}</span>
                  </h3>

                  <p className="text-slate-500 text-base leading-relaxed mb-10 font-light flex-grow transition-colors duration-500 group-hover:text-slate-300">
                    {service.description}
                  </p>

                  <div className="mt-auto">
                    <a href="#contact" className="inline-flex items-center gap-6 py-3 min-h-[44px] text-[10px] font-black uppercase tracking-[0.6em] text-slate-500 group-hover:text-white transition-all duration-500 precision-target">
                      Inquire
                      <motion.span 
                        className="material-icons-outlined text-lg text-primary"
                        whileHover={{ x: 24, scale: 1.25 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        east
                      </motion.span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

// ─── Capabilities Section with Animated Counters ────────────
const CapabilitiesSection = () => (
  <section id="capabilities" className="py-24 md:py-48 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <MotionReveal variant="slideLeft" className="w-full lg:w-1/2 space-y-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-[1.05] tracking-tighter">
            Architectural <br/><span className="gradient-text">Mastery</span>
          </h2>
          <p className="text-slate-400 font-light leading-relaxed text-base md:text-lg lg:text-xl max-w-xl">
            Treating every digital project as a bespoke piece of physical art.
          </p>
          <motion.div 
            className="flex gap-12 pt-8 border-t border-white/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                <AnimatedCounter target="15+" duration={2000} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.5em] text-slate-600 font-black mt-2">Active Partners</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                <AnimatedCounter target="100%" duration={2500} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.5em] text-slate-600 font-black mt-2">Retention</div>
            </div>
          </motion.div>
        </MotionReveal>

        <MotionReveal variant="slideRight" className="w-full lg:w-1/2 flex justify-center">
          <motion.div 
            className="w-72 h-72 sm:w-[26rem] sm:h-[26rem] glass-card widget-card rounded-full flex items-center justify-center p-12 relative group light-field avatar-3d"
            whileHover={{ 
              scale: 1.05,
              rotate: 5,
              transition: { type: 'spring', stiffness: 300, damping: 20 }
            }}
          >
             <motion.div 
               className="absolute inset-0 bg-primary/20 rounded-full blur-[60px]"
               initial={{ opacity: 0 }}
               whileHover={{ opacity: 0.7 }}
               transition={{ duration: 0.7 }}
             />
             <div className="absolute inset-8 border border-white/5 rounded-full trinity-core"></div>
             <div className="absolute inset-16 border border-white/5 rounded-full trinity-core"></div>
             <motion.div 
               className="text-center z-10"
               whileHover={{ scale: 1.05 }}
               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
             >
               <motion.span 
                 className="material-symbols-outlined text-7xl text-primary mb-6 block feature-showcase"
                 animate={{ 
                   opacity: [0.6, 1, 0.6],
                 }}
                 transition={{
                   duration: 2,
                   repeat: Infinity,
                   ease: 'easeInOut',
                 }}
               >
                 token
               </motion.span>
               <h4 className="text-3xl font-bold text-white uppercase tracking-[0.6em] mb-3">Core</h4>
               <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black">Strategic Center</p>
             </motion.div>
          </motion.div>
        </MotionReveal>
      </div>
    </div>
  </section>
);

// ─── Main App ───────────────────────────────────────────────
const App: React.FC = () => {
  useEffect(() => {
    let animationFrame: number | null = null;
    let mutationFrame: number | null = null;
    let mutationTimeout: ReturnType<typeof window.setTimeout> | null = null;
    let resizeTimeout: ReturnType<typeof window.setTimeout> | null = null;
    let initFrame: number | null = null;
    let elements: HTMLElement[] = [];
    let viewportHeight = window.innerHeight;
    let center = viewportHeight / 2;
    let maxDist = viewportHeight * MAX_DISTANCE_FACTOR;
    const queryElements = () => Array.from(document.querySelectorAll<HTMLElement>('.reactive-glass'));

    const updateViewport = () => {
      viewportHeight = window.innerHeight;
      center = viewportHeight / 2;
      maxDist = viewportHeight * MAX_DISTANCE_FACTOR;
    };

    const updateElements = (force = false) => {
      const currentElements = queryElements();
      const hasDisconnected = elements.some((element) => !element.isConnected);
      if (force || elements.length === 0 || currentElements.length !== elements.length || hasDisconnected) {
        elements = currentElements;
      }
      elements = elements.filter((element) => element.isConnected);
    };

    const updateScroll = () => {
      const scrolled = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', scrolled.toString());
      updateElements();
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - center);
        const progress = Math.pow(Math.max(0, Math.min(1, (distance - DISTANCE_OFFSET) / maxDist)), PROGRESS_EXPONENT);
        element.style.setProperty('--scroll-p', progress.toFixed(4));
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

    const handleResize = () => {
      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(() => {
        resizeTimeout = null;
        updateViewport();
        handleScroll();
      }, RESIZE_DEBOUNCE_MS);
    };

    const observer = new MutationObserver(() => {
      if (mutationTimeout !== null) {
        window.clearTimeout(mutationTimeout);
      }
      mutationTimeout = window.setTimeout(() => {
        mutationTimeout = null;
        if (mutationFrame !== null) {
          return;
        }
        mutationFrame = window.requestAnimationFrame(() => {
          mutationFrame = null;
          updateElements(true);
          updateScroll();
        });
      }, MUTATION_DEBOUNCE_MS);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    initFrame = window.requestAnimationFrame(() => {
      updateViewport();
      const observerTarget = document.querySelector('main') ?? document.documentElement;
      observer.observe(observerTarget, { childList: true, subtree: true });
      updateScroll();
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      if (initFrame !== null) {
        window.cancelAnimationFrame(initFrame);
      }
      if (mutationFrame !== null) {
        window.cancelAnimationFrame(mutationFrame);
      }
      if (mutationTimeout !== null) {
        window.clearTimeout(mutationTimeout);
      }
      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, []);

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <MagneticCursor />
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
    </>
  );
};

export default App;
