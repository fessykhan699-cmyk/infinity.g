import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed w-full z-50 glass-nav top-0 left-0 border-b border-white/5 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center overflow-hidden relative shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-shadow duration-500">
            <span className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-40 group-hover:opacity-70 transition-opacity"></span>
            <div className="neural-logo-bg"></div>
            <span className="material-icons-outlined text-2xl text-white relative z-10 neural-logo-icon">all_inclusive</span>
          </div>
          <span className="font-display font-bold text-lg hidden sm:block tracking-widest text-white group-hover:text-primary transition-colors duration-500">INFINITY</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="/#services" className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Services</a>
          <a href="/#work" className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Our Work</a>
          <a href="/placeholders" className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Asset Library</a>
          <a href="/#contact" className="px-6 py-3 min-h-[44px] rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-[0_8px_24px_rgba(255,255,255,0.08)]">Get Started</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="mailto:hello@infinitydigital.ae" className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white/5 transition-colors">
            <span className="material-icons-outlined text-slate-300 text-lg">mail</span>
          </a>
          <button 
            onClick={toggleMenu}
            className="md:hidden w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white/5 transition-colors relative"
            aria-label="Toggle Menu"
          >
            <span className="material-icons-outlined text-slate-300">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background-dark/95 border-b border-white/5 py-10 px-8 animate-in slide-in-from-top duration-700 backdrop-blur-lg">
          <div className="flex flex-col gap-6 max-w-6xl mx-auto">
            <a href="/" onClick={closeMenu} className="text-2xl font-display font-light hover:text-primary transition-colors flex items-center justify-between group">
              Home <span className="material-icons-outlined opacity-0 group-hover:opacity-100 transition-opacity">east</span>
            </a>
            <a href="/#services" onClick={closeMenu} className="text-2xl font-display font-light hover:text-primary transition-colors flex items-center justify-between group">
              Services <span className="material-icons-outlined opacity-0 group-hover:opacity-100 transition-opacity">east</span>
            </a>
            <a href="/#work" onClick={closeMenu} className="text-2xl font-display font-light hover:text-primary transition-colors flex items-center justify-between group">
              Showcase <span className="material-icons-outlined opacity-0 group-hover:opacity-100 transition-opacity">east</span>
            </a>
            <a href="/placeholders" onClick={closeMenu} className="text-2xl font-display font-light hover:text-primary transition-colors flex items-center justify-between group">
              Asset Library <span className="material-icons-outlined opacity-0 group-hover:opacity-100 transition-opacity">east</span>
            </a>
            <a href="/#contact" onClick={closeMenu} className="text-2xl font-display font-light hover:text-primary transition-colors flex items-center justify-between group">
              Contact <span className="material-icons-outlined opacity-0 group-hover:opacity-100 transition-opacity">east</span>
            </a>
            
            <div className="pt-8 border-t border-white/5">
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
