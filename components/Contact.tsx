'use client';
import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { generateProjectStrategy } from '../services/geminiService';
import { ScrollReveal } from './ScrollReveal';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-48 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <ScrollReveal direction="left">
          <h2 className="text-6xl md:text-9xl font-display font-bold text-white mb-12 leading-[0.9] tracking-tighter">
            Build <br/><span className="gradient-text">Extraordinary</span>
          </h2>
          <div className="space-y-12">
            <div className="flex gap-8 group">
              <div className="w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center text-primary border border-white/10 group-hover:bg-primary/20 transition-all duration-500">
                <span className="material-icons-outlined text-2xl">mail</span>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Direct Communications</h4>
                <p className="text-slate-400 text-lg">hello@infinitydigital.ae</p>
              </div>
            </div>
            <div className="flex gap-8 group">
              <div className="w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center text-primary border border-white/10 group-hover:bg-primary/20 transition-all duration-500">
                <span className="material-icons-outlined text-2xl">pin_drop</span>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Dubai Digital Park</h4>
                <p className="text-slate-400 text-lg">Silicon Oasis HQ, UAE</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <div className="glass-card rounded-[4rem] p-10 md:p-16 border-white/10 reactive-glass relative overflow-hidden">
            {isSuccess ? (
              <div className="text-center py-20 space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mx-auto">
                  <span className="material-icons-outlined text-4xl">done_all</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">Transmission Successful</h3>
                  <p className="text-slate-400 text-lg max-w-xs mx-auto">Your inquiry has been persisted to our enterprise secure vault.</p>
                </div>
                {aiStrategy && (
                  <div className="p-8 bg-white/5 rounded-3xl text-left border border-white/10 max-h-48 overflow-y-auto">
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-4">Strategic Preview</p>
                    <p className="text-xs text-slate-400 whitespace-pre-line font-light">{aiStrategy}</p>
                  </div>
                )}
                <button onClick={() => setIsSuccess(false)} className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all">New Inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Principal Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Secure Email</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary transition-all" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Project Brief & Industry</label>
                  <textarea rows={4} required value={formData.projectDescription} onChange={(e) => setFormData({...formData, projectDescription: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary transition-all resize-none" placeholder="Scale, goals, and technical requirements..." />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-7 rounded-3xl bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] hover:bg-primary hover:text-white transition-all active:scale-[0.98] disabled:opacity-20">
                  {isSubmitting ? 'Establishing Secure Link...' : 'Submit to Registry'}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;