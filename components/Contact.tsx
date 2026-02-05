'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { dbService } from '../services/dbService';
import { generateProjectStrategy } from '../services/geminiService';
import { ScrollReveal } from './ScrollReveal';
import { MotionReveal, Magnetic } from './MotionComponents';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    projectDescription: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [aiStrategy, setAiStrategy] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setAiStrategy(null);

    try {
      let strategy = null;
      if (formData.industry && formData.projectDescription) {
        strategy = await generateProjectStrategy(formData.industry, formData.projectDescription);
        setAiStrategy(strategy);
      }

      await dbService.saveInquiry({
        ...formData,
        generatedStrategy: strategy || undefined
      });

      setIsSuccess(true);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-32 lg:py-48 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-24 items-center">
        <MotionReveal variant="slideLeft">
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-white mb-8 sm:mb-10 md:mb-12 leading-[0.9] tracking-tighter">
            Build <br/><span className="gradient-text">Extraordinary</span>
          </h2>
          <motion.div 
            className="space-y-8 sm:space-y-10 md:space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            <motion.div 
              className="flex gap-6 sm:gap-8 group widget-card precision-target"
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
              whileHover={{ x: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="w-14 h-14 sm:w-16 sm:h-16 min-w-[56px] rounded-[1.5rem] sm:rounded-[2rem] bg-white/5 flex items-center justify-center text-primary border border-white/10 light-field"
                whileHover={{ 
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  scale: 1.1,
                }}
                transition={{ duration: 0.5 }}
              >
                <span className="material-icons-outlined text-xl sm:text-2xl icon-bounce">mail</span>
              </motion.div>
              <div>
                <h4 className="text-white font-bold text-base sm:text-lg mb-1">Direct Communications</h4>
                <p className="text-slate-400 text-base sm:text-lg break-all">hello@infinitydigital.ae</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex gap-6 sm:gap-8 group widget-card precision-target"
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
              whileHover={{ x: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="w-14 h-14 sm:w-16 sm:h-16 min-w-[56px] rounded-[1.5rem] sm:rounded-[2rem] bg-white/5 flex items-center justify-center text-primary border border-white/10 light-field"
                whileHover={{ 
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  scale: 1.1,
                }}
                transition={{ duration: 0.5 }}
              >
                <span className="material-icons-outlined text-xl sm:text-2xl icon-bounce">pin_drop</span>
              </motion.div>
              <div>
                <h4 className="text-white font-bold text-base sm:text-lg mb-1">Dubai Digital Park</h4>
                <p className="text-slate-400 text-base sm:text-lg">Silicon Oasis HQ, UAE</p>
              </div>
            </motion.div>
          </motion.div>
        </MotionReveal>

        <MotionReveal variant="slideRight">
          <motion.div 
            className="glass-card widget-card touch-luminous rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[4rem] p-6 sm:p-8 md:p-12 lg:p-16 border-white/10 reactive-glass relative overflow-hidden"
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {isSuccess ? (
              <div className="text-center py-12 sm:py-16 md:py-20 space-y-6 sm:space-y-8 section-morph-enter">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mx-auto widget-card">
                  <span className="material-icons-outlined text-3xl sm:text-4xl icon-bounce">done_all</span>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Transmission Successful</h3>
                  <p className="text-slate-400 text-base sm:text-lg max-w-xs mx-auto">Your inquiry has been persisted to our enterprise secure vault.</p>
                </div>
                {aiStrategy && (
                  <div className="p-6 sm:p-8 bg-white/5 rounded-2xl sm:rounded-3xl text-left border border-white/10 max-h-40 sm:max-h-48 overflow-y-auto slow-reveal">
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-4">Strategic Preview</p>
                    <p className="text-xs text-slate-400 whitespace-pre-line font-light">{aiStrategy}</p>
                  </div>
                )}
                <button onClick={() => setIsSuccess(false)} className="magnetic-btn widget-card text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all min-h-[44px] px-6 py-3">New Inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 md:space-y-10">
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-3 sm:space-y-4">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Principal Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="input-glow search-morph w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-primary transition-all min-h-[44px]" />
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Secure Email</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="input-glow search-morph w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-primary transition-all min-h-[44px]" />
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Project Brief & Industry</label>
                  <textarea rows={4} required value={formData.projectDescription} onChange={(e) => setFormData({...formData, projectDescription: e.target.value})} className="input-glow search-morph w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-primary transition-all resize-none" placeholder="Scale, goals, and technical requirements..." />
                </div>
                <Magnetic strength={0.2}>
                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="touch-luminous widget-card w-full py-5 sm:py-6 md:py-7 min-h-[44px] rounded-2xl sm:rounded-3xl bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] disabled:opacity-20"
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: 'rgb(99, 102, 241)',
                      color: 'rgb(255, 255, 255)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {isSubmitting ? 'Establishing Secure Link...' : 'Submit to Registry'}
                  </motion.button>
                </Magnetic>
              </form>
            )}
          </motion.div>
        </MotionReveal>
      </div>
    </section>
  );
};

export default Contact;
