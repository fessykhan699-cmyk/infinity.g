import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from './MotionComponents';
import { infinityAnimations } from '../lib/animationHelpers';

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
    <motion.nav 
      className={`fixed w-full z-50 glass-nav top-0 left-0 border-b border-white/5 backdrop-blur-sm ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center transition-all duration-400 ${scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4'}`}>
        <motion.a 
          href="/" 
          className="flex items-center gap-2 sm:gap-3 group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        >
          <motion.div 
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 flex items-center justify-center overflow-hidden relative shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            whileHover={{ 
              boxShadow: '0 0 30px rgba(6,182,212,0.5)',
              borderColor: 'rgba(99,102,241,0.5)'
            }}
            transition={{ duration: 0.4 }}
          >
            <span className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-40 group-hover:opacity-70 transition-opacity"></span>
            <div className="neural-logo-bg"></div>
            <motion.span 
              className="material-icons-outlined text-xl sm:text-2xl text-white relative z-10 neural-logo-icon"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              all_inclusive
            </motion.span>
          </motion.div>
          <span className="font-display font-bold text-base sm:text-lg hidden sm:block tracking-widest text-white group-hover:text-primary transition-colors duration-500">INFINITY</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {['Services', 'Our Work', 'Asset Library'].map((item, idx) => (
            <motion.a
              key={item}
              href={idx === 2 ? '/placeholders' : `/#${item.toLowerCase().replace(' ', '')}`}
              className="nav-link precision-target text-xs font-bold uppercase tracking-[0.2em] text-slate-400 group flex items-center gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              whileHover={{ color: '#ffffff', x: 5 }}
            >
              {item}
              <motion.span 
                className="material-icons-outlined text-xs icon-bounce"
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                arrow_forward
              </motion.span>
            </motion.a>
          ))}
          <Magnetic strength={0.25}>
            <motion.a 
              href="/#contact" 
              className="touch-luminous widget-card px-5 py-3 min-h-[44px] flex items-center justify-center rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-widest shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
              {...infinityAnimations.buttonPulse}
            >
              Get Started
            </motion.a>
          </Magnetic>
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
    </motion.nav>
  );
};

export default Navbar;
