'use client';
import React, { useState, useEffect } from 'react';
import { generateProjectVisual } from '../services/geminiService';
import { dbService } from '../services/dbService';
import { ScrollReveal } from './ScrollReveal';

const STYLE_PRESETS = [
  { id: 'Cinematic', label: 'Cinematic', icon: 'movie_filter' },
  { id: 'Architectural', label: 'Architectural', icon: 'architecture' },
  { id: 'Blueprint', label: 'Blueprint', icon: 'architecture' },
  { id: 'Minimalist', label: 'Minimalist', icon: 'layers' },
  { id: 'Cyberpunk', label: 'Cyberpunk', icon: 'bolt' },
  { id: 'Sketch', label: 'Sketch', icon: 'draw' }
];

const Studio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<any>('16:9');
  const [isPro, setIsPro] = useState(false);
  const [imageSize, setImageSize] = useState<"1K" | "2K" | "4K">("1K");
  const [stylePreset, setStylePreset] = useState('Cinematic');
  const [useSearch, setUseSearch] = useState(false);
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<{ message: string, type: 'auth' | 'gen' | 'system' } | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const visuals = await dbService.getRecentVisuals();
      setHistory(visuals);
    } catch (err) {
      console.error("Gallery failed to load:", err);
    }
  };

  const handleProToggle = async () => {
    if (!isPro) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        setIsPro(true);
      } else {
        setIsPro(true);
      }
    } else {
      setIsPro(false);
    }
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt || loading) return;

    setLoading(true);
    setIsSaved(false);
    setError(null);
    try {
      const imageUrl = await generateProjectVisual(prompt, aspectRatio, isPro, imageSize, useSearch, stylePreset);
      setGeneratedImage(imageUrl);
    } catch (err: any) {
      if (err.message === "Requested entity was not found") {
        setError({ 
          message: "Pro Authentication Expired. Please re-authenticate your Neural Key.", 
          type: 'auth' 
        });
      } else {
        setError({ 
          message: err.message || "Synthesis failed. The neural link was interrupted by a generation error.", 
          type: 'gen' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToHistory = async () => {
    if (!generatedImage || isSaved || saving) return;
    setSaving(true);
    try {
      await dbService.saveVisual({ prompt, aspectRatio, imageData: generatedImage });
      setIsSaved(true);
      await loadHistory();
    } catch (err) {
      setError({ message: "Curation failed. MongoDB link unreachable.", type: 'system' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="studio" className="py-16 sm:py-20 md:py-32 lg:py-48 px-4 sm:px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] lg:max-w-[1000px] h-[400px] lg:h-[600px] bg-primary/10 rounded-full blur-[120px] lg:blur-[150px] pointer-events-none -z-10"></div>
      
      <ScrollReveal direction="up" className="text-center mb-16 sm:mb-20 md:mb-24">
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white mb-6 sm:mb-8">
          Infinity <span className="gradient-text">Studio</span>
        </h2>
        <p className="text-slate-200 text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed px-4">
          The ultimate digital forge for high-fidelity architectural assets and enterprise visuals.
        </p>
      </ScrollReveal>

      <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start mb-20 sm:mb-24 md:mb-32">
        {/* Advanced Controls Panel */}
        <ScrollReveal direction="left" className="lg:col-span-5 space-y-6 sm:space-y-8">
          <div className="glass-card p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] border-white/20 reactive-glass space-y-6 sm:space-y-8 md:space-y-10">
            {/* Model Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-1">Neural Core Selection</span>
                {isPro && <span className="text-[8px] font-black text-secondary uppercase tracking-widest animate-pulse">Enterprise Key Active</span>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsPro(false)}
                  className={`relative p-5 rounded-[2rem] border text-left transition-all duration-500 ${
                    !isPro ? 'bg-white/10 border-white/30 ring-1 ring-white/10' : 'bg-white/[0.05] border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`material-icons-outlined text-sm ${!isPro ? 'text-primary' : 'text-slate-400'}`}>bolt</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Flash</span>
                  </div>
                  <p className="text-[8px] text-slate-300 uppercase leading-relaxed font-bold tracking-tight">Efficient Synthesis • 1K Limit</p>
                </button>
                <button 
                  onClick={handleProToggle}
                  className={`relative p-5 rounded-[2rem] border text-left transition-all duration-500 ${
                    isPro ? 'bg-primary/20 border-primary/50 ring-1 ring-primary/30' : 'bg-white/[0.05] border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`material-icons-outlined text-sm ${isPro ? 'text-secondary' : 'text-slate-400'}`}>auto_awesome</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Pro</span>
                  </div>
                  <p className="text-[8px] text-slate-300 uppercase leading-relaxed font-bold tracking-tight">Ultra-Fidelity • 4K Assets</p>
                </button>
              </div>
            </div>

            {/* Quality & Grounding only for Pro */}
            {isPro && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-1">Target Resolution</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['1K', '2K', '4K'].map(size => (
                      <button 
                        key={size}
                        onClick={() => setImageSize(size as any)}
                        className={`py-3 rounded-xl border text-[9px] font-black tracking-widest transition-all ${
                          imageSize === size ? 'bg-secondary/30 border-secondary text-white' : 'bg-white/10 border-white/20 text-slate-400 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {size} Output
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white/10 rounded-3xl border border-white/20 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Web Grounding</span>
                    <span className="text-[8px] text-slate-300 uppercase">Contextual Accuracy</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setUseSearch(!useSearch)}
                    className={`w-12 h-6 rounded-full relative transition-all ${useSearch ? 'bg-secondary' : 'bg-white/20'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${useSearch ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            )}

            {/* Prompt Input */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-1">Visual Concept Brief</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision with technical precision..."
                className="w-full bg-white/10 border border-white/20 rounded-3xl px-8 py-6 text-white focus:outline-none focus:border-primary transition-all placeholder:text-slate-500 resize-none h-40 text-sm leading-relaxed"
                required
              />
            </div>

            {/* Style Presets Grid */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-1">Aesthetic Preset</label>
              <div className="grid grid-cols-3 gap-3">
                {STYLE_PRESETS.map(preset => (
                  <button 
                    key={preset.id}
                    onClick={() => setStylePreset(preset.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                      stylePreset === preset.id ? 'bg-white/20 border-white/40 text-white' : 'bg-white/[0.05] border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="material-icons-outlined text-lg">{preset.icon}</span>
                    <span className="text-[8px] font-black uppercase tracking-tighter">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="grid grid-cols-3 gap-4">
              {['16:9', '1:1', '9:16'].map(ratio => (
                <button 
                  key={ratio}
                  type="button"
                  onClick={() => setAspectRatio(ratio)}
                  className={`py-4 rounded-2xl border text-[10px] font-black tracking-widest transition-all ${
                    aspectRatio === ratio ? 'bg-white text-black' : 'bg-white/10 border-white/20 text-slate-400 hover:text-white'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            <button 
              onClick={(e) => handleGenerate(e)}
              disabled={loading || !prompt}
              className="w-full py-5 sm:py-6 md:py-7 min-h-[44px] rounded-2xl sm:rounded-3xl bg-primary text-white text-xs font-black uppercase tracking-[0.4em] hover:brightness-110 transition-all shadow-2xl active:scale-[0.98] disabled:opacity-20"
            >
              {loading ? 'Synthesizing Neural Layers...' : 'Forge Reality'}
            </button>
          </div>
        </ScrollReveal>

        {/* Display Panel */}
        <ScrollReveal direction="right" className="lg:col-span-7 h-full">
          <div className="glass-card rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[4rem] border-white/20 p-4 sm:p-5 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex flex-col reactive-glass overflow-hidden group">
            <div className="relative flex-grow rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3.2rem] overflow-hidden bg-white/[0.05] border border-white/10 flex items-center justify-center">
              {loading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background-dark/80 backdrop-blur-md">
                  <div className="w-32 sm:w-40 md:w-48 h-1 bg-white/20 rounded-full overflow-hidden mb-4 sm:mb-6">
                    <div className="h-full bg-primary animate-[shimmer_2s_infinite]" />
                  </div>
                  <p className="text-[10px] font-black text-white uppercase tracking-[0.6em] animate-pulse">Rendering Reality</p>
                </div>
              )}

              {error ? (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 text-center bg-background-dark/90 backdrop-blur-lg animate-in fade-in duration-500">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent mb-6 sm:mb-8">
                    <span className="material-icons-outlined text-3xl sm:text-4xl">{error.type === 'auth' ? 'key_off' : 'error_outline'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 uppercase tracking-wider">
                    {error.type === 'auth' ? 'Authentication Required' : 'Neural Interface Error'}
                  </h3>
                  <p className="text-slate-200 text-sm max-w-sm mb-6 sm:mb-10 leading-relaxed">
                    {error.message}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {error.type === 'auth' ? (
                       <button 
                        onClick={handleProToggle}
                        className="px-8 sm:px-10 py-3 sm:py-4 min-h-[44px] rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl hover:brightness-110"
                      >
                        Re-authenticate Pro
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleGenerate()}
                        className="px-8 sm:px-10 py-3 sm:py-4 min-h-[44px] rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-slate-200"
                      >
                        Retry Synthesis
                      </button>
                    )}
                    <button 
                      onClick={() => setError(null)}
                      className="px-8 sm:px-10 py-3 sm:py-4 min-h-[44px] rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ) : generatedImage ? (
                <>
                  <img 
                    src={generatedImage} 
                    alt={`AI-synthesized visual in ${stylePreset} style based on the project concept: ${prompt}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 transition-all px-4">
                    <button onClick={handleSaveToHistory} disabled={saving || isSaved} className="px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] rounded-full bg-secondary text-white text-[10px] font-black uppercase tracking-widest shadow-2xl hover:brightness-110 whitespace-nowrap">
                      {isSaved ? 'Archived' : 'Curate to Gallery'}
                    </button>
                    <button onClick={() => setGeneratedImage(null)} className="px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest">
                      Discard
                    </button>
                  </div>
                </>
              ) : !loading && (
                <div className="text-center p-12 sm:p-16 md:p-20 opacity-40">
                  <span className="material-icons-outlined text-6xl sm:text-7xl md:text-8xl mb-6 sm:mb-8">tempest</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Awaiting Brief</p>
                </div>
              )}
            </div>
            
            <div className="p-4 sm:p-5 md:p-6 flex justify-between items-center">
               <div className="flex gap-3 sm:gap-4">
                 <div className={`w-2 h-2 rounded-full ${isPro ? 'bg-secondary animate-pulse' : 'bg-primary'}`}></div>
                 <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">
                   {isPro ? `${stylePreset} Pro Core • ${imageSize}` : `${stylePreset} Flash Engine`}
                 </span>
               </div>
               {error && <span className="text-[8px] font-black text-accent uppercase tracking-widest">Error Intercepted</span>}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Persistent History Gallery */}
      {history.length > 0 && (
        <ScrollReveal direction="up" className="space-y-12 sm:space-y-16">
          <div className="flex items-center gap-6 sm:gap-8">
             <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-widest">Neural <span className="gradient-text">Gallery</span></h3>
             <div className="h-px flex-grow bg-white/10" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {history.map((item, i) => (
              <div key={i} className="glass-card rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-square reactive-glass group border-white/10">
                <img 
                  src={item.imageData} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={`Archived visual synthesis for prompt: ${item.prompt}`} 
                />
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-4 sm:p-6">
                  <p className="text-[8px] text-white font-black uppercase tracking-widest line-clamp-2 mb-2">{item.prompt}</p>
                  <button 
                    onClick={() => setGeneratedImage(item.imageData)}
                    className="w-full py-2 min-h-[36px] rounded-xl bg-white/20 text-[8px] font-bold uppercase text-white hover:bg-white/30"
                  >
                    View Original
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Fix: Use standard style tag with dangerouslySetInnerHTML to resolve TypeScript 'jsx' property error */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      ` }} />
    </section>
  );
};

export default Studio;