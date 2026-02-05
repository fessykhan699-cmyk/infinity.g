import React from 'react';
import { ScrollReveal } from './ScrollReveal';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 sm:py-16 px-4 sm:px-6 border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
          <ScrollReveal direction="up" delay={0} className="sm:col-span-2">
            <a href="#" className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 flex items-center justify-center overflow-hidden relative shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all">
                <span className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-40 group-hover:opacity-70 transition-opacity"></span>
                <div className="neural-logo-bg"></div>
                <span className="material-icons-outlined text-xl sm:text-2xl text-white relative z-10 neural-logo-icon">all_inclusive</span>
              </div>
              <span className="font-display font-bold text-lg sm:text-xl tracking-widest text-white group-hover:text-primary transition-colors">INFINITY</span>
            </a>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-4 sm:mb-6 font-light text-sm sm:text-base">
              We empower brands with exceptional digital experiences that drive growth, engagement, and conversion through cutting-edge technology and human-centric design.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {['facebook', 'instagram', 'linkedin', 'twitter'].map(social => (
                <a key={social} href="#" className="social-icon w-10 h-10 sm:w-11 sm:h-11 min-h-[44px] rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary">
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base">Explore</h4>
            <ul className="space-y-3 sm:space-y-4 text-sm text-slate-400">
              <li><a href="#home" className="footer-link">Home</a></li>
              <li><a href="#services" className="footer-link">Services</a></li>
              <li><a href="#work" className="footer-link">Case Studies</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
            </ul>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base">Services</h4>
            <ul className="space-y-3 sm:space-y-4 text-sm text-slate-400">
              <li><a href="#" className="footer-link">UI/UX Design</a></li>
              <li><a href="#" className="footer-link">Web Development</a></li>
              <li><a href="#" className="footer-link">E-commerce</a></li>
              <li><a href="#" className="footer-link">AI Solutions</a></li>
            </ul>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={300}>
          <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            <p className="text-center sm:text-left">&copy; 2024 Infinity Digital Enterprise. UAE. All rights reserved.</p>
            <div className="flex gap-6 sm:gap-8">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
