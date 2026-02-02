'use client';

import React, { useEffect, useRef, useState } from 'react';

const VIDEO_SOURCES = [
  "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-lines-in-the-air-40019-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-board-flowing-in-dark-blue-40017-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-an-abstract-landscape-of-lines-and-dots-40030-large.mp4"
];

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2078&auto=format&fit=crop";

const DynamicBackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoState, setVideoState] = useState<'loading' | 'ready' | 'error'>('loading');
  
  const [volume, setVolume] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Delay high-res load further on mobile to prioritize main content paint
      const isMobile = window.innerWidth < 768;
      setTimeout(() => setShouldLoad(true), isMobile ? 3000 : 1500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    const initializeSource = async () => {
      try {
        const response = await fetch('/api/video-url');
        if (response.ok) {
          const data = await response.json();
          setVideoUrl(data.url || VIDEO_SOURCES[0]);
        } else {
          setVideoUrl(VIDEO_SOURCES[0]);
        }
      } catch (err) {
        setVideoUrl(VIDEO_SOURCES[0]);
      }
    };

    initializeSource();
    const pollInterval = setInterval(initializeSource, 300000); 
    return () => clearInterval(pollInterval);
  }, [shouldLoad]);

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting && isPlaying) {
              videoRef.current.play().catch(() => {});
            } else if (!entry.isIntersecting) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(document.body);

    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause();
      } else if (!document.hidden && videoRef.current && isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  const handlePlaying = () => {
    setIsPlaying(true);
    setVideoState('ready');
  };

  const handleError = () => {
    const nextIndex = sourceIndex + 1;
    if (nextIndex < VIDEO_SOURCES.length) {
      setSourceIndex(nextIndex);
      setVideoUrl(VIDEO_SOURCES[nextIndex]);
      setIsPlaying(false);
    } else {
      setVideoUrl(null);
      setVideoState('error');
    }
  };

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMute = !isMuted;
    setIsMuted(newMute);
    videoRef.current.muted = newMute;
    if (!newMute && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 w-full h-[100dvh] z-[-1] overflow-hidden bg-[#050508] pointer-events-none select-none"
        aria-hidden="true"
      >
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-out ${
            isPlaying ? 'opacity-15' : 'opacity-50'
          }`} 
          style={{ 
            backgroundImage: `url('${FALLBACK_IMAGE}')`,
            filter: 'contrast(1.2) brightness(0.3) saturate(0.5)' 
          }} 
        />

        {shouldLoad && videoUrl && videoState !== 'error' && (
          <video
            key={videoUrl} 
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            crossOrigin="anonymous"
            onPlaying={handlePlaying}
            onError={handleError}
            className={`w-full h-full object-cover transition-opacity duration-[3000ms] ease-in-out ${
              isPlaying ? 'opacity-25' : 'opacity-0'
            }`}
            style={{ filter: 'contrast(1.3) brightness(0.25) saturate(0.2)' }}
            preload="auto"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,8,0.3)_60%,rgba(5,5,8,1)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508]" />
      </div>

      {/* BACKGROUND CONTROLS - Fixed position refined for mobile thumb zone */}
      {shouldLoad && videoState === 'ready' && (
        <div 
          className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[60] flex items-center group pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`glass-card flex items-center gap-3 px-3 md:px-4 py-3 rounded-full transition-all duration-700 ease-expo border-white/10 ${
            isHovered ? 'w-40 md:w-48 bg-white/10 opacity-100 backdrop-blur-lg' : 'w-10 md:w-12 bg-white/5 opacity-30 md:opacity-40 backdrop-blur-sm'
          } overflow-hidden`}>
            
            <button 
              onClick={togglePlayback}
              className="flex-shrink-0 w-4 h-4 md:w-6 md:h-6 flex items-center justify-center text-white hover:text-primary transition-colors"
              aria-label={isPlaying ? "Pause Motion" : "Play Motion"}
            >
              <span className="material-icons-outlined text-base md:text-lg">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <div className={`flex items-center gap-2 md:gap-3 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
              <button 
                onClick={toggleMute}
                className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-white hover:text-secondary transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                <span className="material-icons-outlined text-sm md:text-base">
                  {isMuted || volume === 0 ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'}
                </span>
              </button>

              <input 
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 md:w-20 h-0.5 bg-white/20 appearance-none rounded-full accent-primary cursor-pointer hover:bg-white/40 transition-all"
              />
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        }
        input[type='range']::-moz-range-thumb {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      ` }} />
    </>
  );
};

export default DynamicBackgroundVideo;