'use client';
import React, { useState } from 'react';
import { generateProjectStrategy } from '../services/geminiService';
import { ScrollReveal } from './ScrollReveal';

const Advisor: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [goals, setGoals] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry || !goals) return;
    
    setLoading(true);
    try {
      const strategy = await generateProjectStrategy(industry, goals);
      setResult(strategy);
    } catch (err) {
      console.error("Strategy synthesis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 md:py-48 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 blur-[150px] -z-10" />
      <div className="max-w-5xl mx-auto">
        <div className="reactive-glass glass-card rounded-[4rem] p-10 md:p-20 border-white/20 shadow-[0_100px_100px_-50px_rgba(0,0,0,0.8)]">
          <div className="text-center mb-16">
            <ScrollReveal direction="down">
              <div className="inline-flex items-center gap-3 mb-6 px-6 py-2 rounded-full border border-primary/30 bg-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black text-indigo-100 tracking-[0.4em] uppercase">Executive Intelligence</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6">
                Instant <span className="gradient-text">Architectural Roadmap</span>
              </h2>
              <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl mx-auto">
                Synthesize a tailored transformation strategy using world-class enterprise LLMs.
              </p>
            </ScrollReveal>
          </div>

          {!result ? (
            <form onSubmit={handleGenerate} className="space-y-8 max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Market Sector</label>
                  <input 
                    type="text" 
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Luxury Hospitality"
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-primary transition-all placeholder:text-slate-500"
                    required
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Key Scaling Goals</label>
                  <input 
                    type="text" 
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="e.g. Cross-border Logistics"
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-primary transition-all placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-7 rounded-3xl bg-gradient-to-r from-primary to-secondary text-white font-black text-[10px] tracking-[0.5em] uppercase hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-30"
              >
                {loading ? 'Processing Strategic Data...' : 'Generate Roadmap'}
              </button>
            </form>
          ) : (
            <ScrollReveal direction="up" className="animate-in fade-in zoom-in duration-700">
              <div className="bg-white/10 border border-white/20 rounded-[3rem] p-10 md:p-16 mb-12 backdrop-blur-xl">
                <div className="prose prose-invert max-w-none">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                      <span className="material-icons-outlined">verified</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1">Generated Strategic Roadmap</h4>
                      <p className="text-[9px] text-slate-300 uppercase tracking-widest">Enterprise Class Analysis</p>
                    </div>
                  </div>
                  <div className="text-white whitespace-pre-line leading-relaxed text-lg font-light selection:bg-primary/30 drop-shadow-sm">
                    {result}
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6">
                <button 
                  onClick={() => setResult(null)}
                  className="px-12 py-5 rounded-full border border-slate-600 text-[10px] font-black text-slate-200 hover:text-white hover:border-white transition-all uppercase tracking-widest"
                >
                  Reset Analysis
                </button>
                <a href="#contact" className="px-12 py-5 rounded-full bg-white text-black text-[10px] font-black hover:bg-primary hover:text-white transition-all uppercase tracking-widest flex items-center gap-3">
                  Deploy Strategy <span className="material-icons-outlined text-sm">east</span>
                </a>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default Advisor;