import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 glass-nav top-0 left-0 border-b border-white/5 backdrop-blur-sm ${scrolled ? 'scrolled' : ''}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center transition-all duration-400 ${scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4'}`}>
        <a href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 flex items-center justify-center overflow-hidden relative shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-shadow duration-500">
            <span className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-40 group-hover:opacity-70 transition-opacity"></span>
            <div className="neural-logo-bg"></div>
            <span className="material-icons-outlined text-xl sm:text-2xl text-white relative z-10 neural-logo-icon">all_inclusive</span>
          </div>
          <span className="font-display font-bold text-base sm:text-lg hidden sm:block tracking-widest text-white group-hover:text-primary transition-colors duration-500">INFINITY</span>
        </a>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <a href="/#services" className="nav-link precision-target text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
            Services
            <span className="material-icons-outlined text-xs opacity-0 group-hover:opacity-100 icon-bounce transition-opacity">arrow_forward</span>
          </a>
          <a href="/#work" className="nav-link precision-target text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
            Our Work
            <span className="material-icons-outlined text-xs opacity-0 group-hover:opacity-100 icon-bounce transition-opacity">arrow_forward</span>
          </a>
          <a href="/placeholders" className="nav-link precision-target text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
            Asset Library
            <span className="material-icons-outlined text-xs opacity-0 group-hover:opacity-100 icon-bounce transition-opacity">arrow_forward</span>
          </a>
          <a href="/#contact" className="magnetic-btn touch-luminous widget-card px-5 py-3 min-h-[44px] flex items-center justify-center rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)]">Get Started</a>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <a href="mailto:hello@infinitydigital.ae" className="w-11 h-11 min-h-[44px] rounded-full border border-slate-700 flex items-center justify-center hover:bg-white/5 hover:border-primary/50 transition-all duration-300">
            <span className="material-icons-outlined text-slate-300 text-lg">mail</span>
          </a>
          <button
            onClick={toggleMenu}
            className="md:hidden w-11 h-11 min-h-[44px] rounded-full border border-slate-700 flex items-center justify-center hover:bg-white/5 transition-colors relative"
            aria-label="Toggle Menu"
          >
            <span className="material-icons-outlined text-slate-300">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background-dark/95 border-b border-white/5 py-8 px-6 dropdown-fluid backdrop-blur-md">
          <div className="flex flex-col gap-6 max-w-7xl mx-auto stagger-children is-visible">
            <a href="/" onClick={closeMenu} className="text-2xl sm:text-3xl font-display font-light hover:text-primary transition-colors flex items-center justify-between group min-h-[44px] precision-target">
              Home <span className="material-icons-outlined opacity-0 group-hover:opacity-100 transition-opacity icon-bounce">east</span>
            </a>
            <a href="/#services" onClick={closeMenu} className="text-2xl sm:text-3xl font-display font-light hover:text-primary transition-colors flex items-center justify-between group min-h-[44px] precision-target">
              Services <span className="material-icons-outlined opacity-0 group-hover:opacity-100 transition-opacity icon-bounce">east</span>
            </a>
            <a href="/#work" onClick={closeMenu} className="text-2xl sm:text-3xl font-display font-light hover:text-primary transition-colors flex items-center justify-between group min-h-[44px] precision-target">
              Showcase <span className="material-icons-outlined opacity-0 group-hover:opacity-100 transition-opacity icon-bounce">east</span>
            </a>
            <a href="/placeholders" onClick={closeMenu} className="text-2xl sm:text-3xl font-display font-light hover:text-primary transition-colors flex items-center justify-between group min-h-[44px] precision-target">
              Asset Library <span className="material-icons-outlined opacity-0 group-hover:opacity-100 transition-opacity icon-bounce">east</span>
            </a>
            <a href="/#contact" onClick={closeMenu} className="text-2xl sm:text-3xl font-display font-light hover:text-primary transition-colors flex items-center justify-between group min-h-[44px] precision-target">
              Contact <span className="material-icons-outlined opacity-0 group-hover:opacity-100 transition-opacity icon-bounce">east</span>
            </a>

            <div className="pt-6 border-t border-white/5">
               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Dubai HQ</p>
               <p className="text-slate-300 text-sm">Silicon Oasis, Dubai Digital Park, UAE</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
