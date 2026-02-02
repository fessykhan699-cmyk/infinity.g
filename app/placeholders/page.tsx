'use client';

import React, { useState, useEffect } from 'react';
import { generateProjectVisual } from '../../services/geminiService';
import { ScrollReveal } from '../../components/ScrollReveal';

const THEMES = [
  "Futuristic enterprise dashboard with holographic 3D data visualizations, flowing particles, deep indigo and neon violet tones, cinematic lighting.",
  "Abstract representation of high-speed cloud computing infrastructure, glowing fiber optic paths, translucent glass panels, technical elegance.",
  "Elite mobile application interface showcase, floating over a dark liquid surface, high-end product photography style, soft rim lighting.",
  "Industrial AI automation hub, robotic arm silhouettes in a clean-room environment, blue volumetric light beams, sharp technical detail.",
  "Sustainable energy grid visualization, glowing wind turbine clusters connected by light threads, architectural sunset background.",
  "Cybersecurity neural network shield, intricate geometric patterns of light, obsidian-like surfaces, electric blue and charcoal palette.",
  "Financial intelligence graph, 3D golden and silver bars rising from a digital map, high contrast, luxury business aesthetic.",
  "Quantum processor core schematic, glowing crystalline structures, microscopic precision, deep space blue and teal lighting.",
  "Global logistics network map, pulsing nodes across a dark world map, satellite view, glowing transit lines, cinematic depth.",
  "Modern minimalist architecture with integrated digital displays, clean white concrete, glass reflections, soft morning daylight."
];

const STYLE_PRESETS = [
  { id: 'Cinematic', label: 'Cinematic', icon: 'movie_filter', description: 'Luxury Enterprise Aesthetic' },
  { id: 'Architectural', label: 'Architectural', icon: 'architecture', description: 'Clean Professional Lines' },
  { id: 'Blueprint', label: 'Blueprint', icon: 'schema', description: 'Engineering Precision' },
  { id: 'Minimalist', label: 'Minimalist', icon: 'layers', description: 'Pristine Tech Spaces' },
  { id: 'Cyberpunk', label: 'Cyberpunk', icon: 'bolt', description: 'Vibrant Neon Contrast' },
  { id: 'Dark Futuristic', label: 'Dark Future', icon: 'dark_mode', description: 'High-Contrast Sci-Fi' }
];

const RESOLUTIONS = [
  { id: '1K', label: '1K', desc: 'Standard' },
  { id: '2K', label: '2K', desc: 'High-Def' },
  { id: '4K', label: '4K', desc: 'Ultra-Def' }
];

export default function PlaceholdersPage() {
  const [images, setImages] = useState<{url: string, prompt: string, loading: boolean}[]>(
    THEMES.map(t => ({ url: '', prompt: t, loading: false }))
  );
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string>('Cinematic');
  const [resolution, setResolution] = useState<"1K" | "2K" | "4K">('1K');
  const [isPro, setIsPro] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      if (resolution !== '1K') setResolution('1K');
    }
  };

  const generateSingle = async (index: number, style?: string) => {
    if (images[index].loading) return;
    
    setError(null);
    const newImages = [...images];
    newImages[index].loading = true;
    setImages(newImages);

    try {
      const activeStyle = style || selectedStyle;
      const url = await generateProjectVisual(
        THEMES[index], 
        "16:9", 
        isPro, // User defined Pro state
        resolution, // User defined resolution
        false, 
        activeStyle
      );
      
      setImages(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], url, loading: false };
        return updated;
      });
    } catch (err: any) {
      console.error(`Generation error for item ${index}:`, err);
      setImages(prev => {
        const updated = [...prev];
        updated[index].loading = false;
        return updated;
      });
      
      if (err.message === "KEY_RESET_REQUIRED") {
        setError("Pro Authentication Expired. Please re-authenticate your Neural Key.");
        setIsPro(false);
      } else {
        setError("One or more synthesis requests were interrupted. Please check your neural link.");
      }
    }
  };

  const generateAll = async () => {
    if (isGeneratingAll) return;
    setIsGeneratingAll(true);
    setError(null);

    const tasks = THEMES.map(async (_, i) => {
      await new Promise(resolve => setTimeout(resolve, i * 300));
      return generateSingle(i);
    });

    await Promise.all(tasks);
    setIsGeneratingAll(false);
  };

  const clearGallery = () => {
    setImages(THEMES.map(t => ({ url: '', prompt: t, loading: false })));
    setError(null);
  };

  return (
    <div className="min-h-screen pt-32 pb-40 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <ScrollReveal direction="down" className="text-center mb-24">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 bg-primary/10 text-[10px] font-black tracking-[0.4em] uppercase text-indigo-300 mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Neural Asset Repository
        </div>
        <h1 className="text-6xl md:text-[8rem] font-display font-bold text-white mb-8 leading-[0.8] tracking-tighter">
          Asset <span className="gradient-text">Studio</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-2xl font-light max-w-2xl mx-auto mb-16 leading-relaxed">
          Propagate high-fidelity, enterprise-grade visuals for your digital blueprints. Select an aesthetic core to align the neural engine.
        </p>

        {/* Synthesis Configuration Suite */}
        <div className="max-w-5xl mx-auto mb-20 space-y-12">
          {/* Aesthetic Presets */}
          <div className="space-y-6">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] text-center">Neural Aesthetic Selection</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {STYLE_PRESETS.map(style => (
                <button 
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border transition-all duration-700 relative group overflow-hidden ${
                    selectedStyle === style.id 
                    ? 'bg-primary/15 border-primary/50 shadow-[0_30px_60px_-15px_rgba(99,102,241,0.3)] ring-1 ring-primary/20 scale-105' 
                    : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10 hover:bg-white/[0.04] grayscale hover:grayscale-0'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedStyle === style.id ? 'bg-primary/20 text-white' : 'bg-white/5 text-slate-600 group-hover:text-slate-400'}`}>
                    <span className="material-icons-outlined text-2xl">{style.icon}</span>
                  </div>
                  <div className="text-center">
                    <span className={`text-[9px] font-black uppercase tracking-widest block mb-1 ${selectedStyle === style.id ? 'text-white' : 'text-slate-600'}`}>
                      {style.label}
                    </span>
                    <span className="text-[7px] text-slate-600 uppercase font-bold tracking-tighter hidden sm:block">
                      {style.description}
                    </span>
                  </div>
                  {selectedStyle === style.id && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Core & Resolution Configuration */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 pt-6 border-t border-white/5">
            <div className="space-y-4 text-center md:text-left">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Neural Core</div>
              <button 
                onClick={handleProToggle}
                className={`group flex items-center gap-4 px-8 py-5 rounded-full border transition-all duration-500 ${
                  isPro ? 'bg-secondary/20 border-secondary/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : 'bg-white/5 border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPro ? 'bg-secondary/30 text-white' : 'bg-white/10 text-slate-500'}`}>
                  <span className={`material-icons-outlined ${isPro ? 'animate-pulse' : ''}`}>auto_awesome</span>
                </div>
                <div className="text-left pr-4">
                  <div className={`text-[10px] font-black uppercase tracking-widest ${isPro ? 'text-white' : 'text-slate-400'}`}>
                    {isPro ? 'Pro Engine Active' : 'Flash Core (Standard)'}
                  </div>
                  <div className="text-[8px] text-slate-500 uppercase tracking-tighter font-bold">
                    {isPro ? 'Ultra-Fidelity Synthesis' : 'Efficient Draft Engine'}
                  </div>
                </div>
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] text-center md:text-left">Target Fidelity</div>
              <div className="flex gap-4 p-2 rounded-full bg-white/5 border border-white/10">
                {RESOLUTIONS.map((res) => (
                  <button
                    key={res.id}
                    disabled={res.id !== '1K' && !isPro}
                    onClick={() => setResolution(res.id as any)}
                    className={`relative px-8 py-3 rounded-full transition-all duration-500 overflow-hidden ${
                      resolution === res.id 
                        ? 'bg-white text-black shadow-2xl' 
                        : 'text-slate-400 hover:text-white disabled:opacity-20 disabled:grayscale'
                    }`}
                  >
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest">{res.label}</span>
                      <span className="text-[7px] uppercase font-bold tracking-tighter opacity-60">{res.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
              {!isPro && (
                <div className="text-[7px] text-primary font-black uppercase tracking-widest text-center animate-pulse">
                  Activate Pro Core for 2K & 4K Output
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={generateAll}
            disabled={isGeneratingAll}
            className={`group relative px-12 py-7 rounded-full text-white text-[10px] font-black uppercase tracking-[0.4em] overflow-hidden transition-all shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 ${
              isPro ? 'bg-secondary shadow-secondary/20' : 'bg-primary shadow-primary/20'
            }`}
          >
            <span className="relative z-10 flex items-center gap-3">
              {isGeneratingAll ? (
                <>
                  <div className="animate-spin h-3 w-3 border-2 border-white/20 border-t-white rounded-full"></div>
                  Synthesizing Collection...
                </>
              ) : (
                <>
                  <span className="material-icons-outlined text-sm">auto_awesome</span>
                  Synthesize Collection ({resolution})
                </>
              )}
            </span>
            <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
              isPro ? 'from-cyan-400 to-secondary' : 'from-indigo-400 to-primary'
            }`}></div>
          </button>

          <button 
            onClick={clearGallery}
            className="px-10 py-7 rounded-full border border-white/10 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] hover:text-white hover:border-white transition-all backdrop-blur-xl"
          >
            Reset Forge
          </button>
        </div>

        {error && (
          <div className="mt-12 text-accent text-[9px] font-black uppercase tracking-widest animate-pulse max-w-sm mx-auto">
            Neural link error: {error}
          </div>
        )}
      </ScrollReveal>

      {/* Assets Grid */}
      <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
        {images.map((img, i) => (
          <ScrollReveal key={i} direction="up" delay={i * 80}>
            <div className="glass-card rounded-[4rem] overflow-hidden border-white/10 aspect-video relative group reactive-glass bg-[#08080c]">
              {/* Progress Overlay */}
              {img.loading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background-dark/90 backdrop-blur-3xl animate-in fade-in duration-500">
                   <div className="relative w-40 h-1 bg-white/5 rounded-full overflow-hidden mb-8">
                    <div 
                      className={`absolute inset-0 animate-[shimmer_2s_infinite] ${isPro ? 'bg-gradient-to-r from-secondary via-white to-secondary' : 'bg-gradient-to-r from-primary via-secondary to-primary'}`} 
                      style={{ backgroundSize: '200% 100%' }}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-[9px] font-black text-white uppercase tracking-[0.6em] animate-pulse">Neural Forge {i+1}</span>
                    <span className="text-[7px] text-slate-500 uppercase tracking-widest">
                      {isPro ? `Reconstructing Layers at ${resolution}` : 'Constructing Layered Geometry'}
                    </span>
                  </div>
                </div>
              )}
              
              {img.url ? (
                <>
                  <img 
                    src={img.url} 
                    alt={`Synthesized asset: ${selectedStyle} theme for concept: ${img.prompt}`} 
                    className="w-full h-full object-cover transition-all duration-[1.5s] ease-expo group-hover:scale-110 group-hover:brightness-110" 
                  />
                  {/* Hover Interaction Layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-12">
                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-expo">
                      <p className="text-[9px] text-primary font-black uppercase tracking-[0.5em] mb-4">Synthesis Data</p>
                      <h3 className="text-white text-lg font-display font-medium leading-relaxed line-clamp-2 mb-8 pr-12">
                        {img.prompt.split(',')[0]}
                      </h3>
                      <div className="flex gap-4">
                        <a 
                          href={img.url} 
                          download={`infinity-asset-${i+1}.png`}
                          className="px-8 py-4 rounded-full bg-white text-black text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center gap-3 shadow-2xl"
                        >
                          Extract Asset <span className="material-icons-outlined text-sm">download</span>
                        </a>
                        <button 
                          onClick={() => generateSingle(i)}
                          className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
                          title="Regenerate"
                        >
                          <span className="material-icons-outlined text-lg">refresh</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Badge */}
                  <div className="absolute top-10 left-10 transition-opacity group-hover:opacity-0">
                    <div className={`px-5 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-[8px] font-black uppercase tracking-[0.3em] flex items-center gap-3 ${isPro ? 'text-secondary' : 'text-slate-400'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isPro ? 'bg-secondary' : 'bg-primary'}`}></div>
                      CORE_{i+1} • {selectedStyle} • {resolution}
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-16 text-center group-hover:bg-white/[0.04] transition-colors">
                  <div className="space-y-8 opacity-40 group-hover:opacity-100 transition-opacity">
                    <div className="w-20 h-20 rounded-full border border-slate-800 flex items-center justify-center mx-auto text-slate-700 group-hover:text-primary group-hover:border-primary/30 transition-all duration-700">
                      <span className="material-icons-outlined text-4xl group-hover:rotate-45 transition-transform duration-1000">
                        hub
                      </span>
                    </div>
                    <div className="space-y-4">
                      <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em] leading-relaxed max-w-[240px] mx-auto group-hover:text-slate-400 transition-colors">
                        Awaiting Synthesis Blueprint: <span className="text-slate-800 group-hover:text-white transition-colors">{img.prompt.split(',')[0]}</span>
                      </p>
                      <button 
                        onClick={() => generateSingle(i)}
                        className="text-[9px] font-black text-primary uppercase tracking-[0.4em] hover:text-secondary transition-colors inline-flex items-center gap-2"
                      >
                        Initialize Core <span className="material-icons-outlined text-xs">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* CSS For Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      ` }} />
    </div>
  );
}
