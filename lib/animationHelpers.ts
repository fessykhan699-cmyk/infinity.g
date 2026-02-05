/**
 * Custom Animation Helpers for Infinity.g
 * Unique implementations for this project's premium aesthetic
 */

import { useEffect, useState, useRef } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

/**
 * Custom hook for scroll-based depth parallax effect
 * Creates layered depth based on scroll position
 */
export const useDepthParallax = (layerDepth: number = 1) => {
  const { scrollY } = useScroll();
  const movement = useTransform(
    scrollY,
    [0, 1000],
    [0, -100 * layerDepth]
  );
  
  return movement;
};

/**
 * Custom hook for mouse-follow effect with smoothing
 */
export const useMouseFollow = (smoothing: number = 0.15) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>();

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (targetRef.current.x - prev.x) * smoothing,
        y: prev.y + (targetRef.current.y - prev.y) * smoothing,
      }));
      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [smoothing]);

  return position;
};

/**
 * Calculate reveal progress for scroll-based animations
 */
export const calculateRevealProgress = (
  elementTop: number,
  elementHeight: number,
  viewportHeight: number,
  scrollPosition: number
): number => {
  const elementBottom = elementTop + elementHeight;
  const revealStart = elementTop - viewportHeight;
  const revealEnd = elementBottom;
  const progress = (scrollPosition - revealStart) / (revealEnd - revealStart);
  return Math.max(0, Math.min(1, progress));
};

/**
 * Custom easing functions for premium feel
 */
export const customEasing = {
  smoothEntry: [0.43, 0.13, 0.23, 0.96] as const,
  bounceExit: [0.34, 1.56, 0.64, 1] as const,
  cinematicReveal: [0.16, 1, 0.3, 1] as const,
  fluidMotion: [0.83, 0, 0.17, 1] as const,
};

/**
 * Generate stagger delay pattern
 */
export const createStaggerPattern = (
  index: number,
  baseDelay: number = 0.08,
  curve: 'linear' | 'ease' | 'bounce' = 'ease'
): number => {
  if (curve === 'linear') return index * baseDelay;
  if (curve === 'ease') return Math.pow(index * baseDelay, 0.8);
  return baseDelay * Math.sin(index * 0.5) + index * baseDelay;
};

/**
 * Animation configuration for different element types
 */
export const infinityAnimations = {
  heroEntry: {
    initial: { opacity: 0, y: 80, filter: 'blur(10px)' },
    animate: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.4, ease: customEasing.cinematicReveal }
    },
  },
  cardFloat: {
    rest: { y: 0, rotateX: 0, rotateY: 0 },
    hover: { 
      y: -12,
      rotateX: 5,
      rotateY: 5,
      transition: { type: 'spring', stiffness: 260, damping: 18 }
    },
  },
  buttonPulse: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.06,
      transition: { 
        type: 'spring',
        stiffness: 380,
        damping: 14,
        mass: 0.8
      }
    },
    tap: { scale: 0.96 },
  },
  textReveal: {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: custom * 0.06,
        duration: 0.9,
        ease: customEasing.cinematicReveal,
      },
    }),
  },
};

/**
 * Viewport configuration optimized for performance
 */
export const viewportConfig = {
  standard: { once: true, amount: 0.25, margin: '-80px' },
  eager: { once: true, amount: 0.15, margin: '-120px' },
  lazy: { once: true, amount: 0.35, margin: '-40px' },
};
