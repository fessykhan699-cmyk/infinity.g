/**
 * Framer Motion Animation Variants and Configuration
 * Premium cinematic animations for Infinity.g
 */

import { Variants, Transition } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════
// EASING FUNCTIONS - Premium, cinematic timing
// ═══════════════════════════════════════════════════════════════

export const easings = {
  // Smooth, natural easing
  smooth: [0.43, 0.13, 0.23, 0.96],
  // Elastic, bouncy feel
  elastic: [0.34, 1.56, 0.64, 1],
  // Exponential easing for dramatic reveals
  expo: [0.16, 1, 0.3, 1],
  // Cinematic slow-in
  cinematic: [0.83, 0, 0.17, 1],
  // Quick and snappy
  snappy: [0.25, 0.46, 0.45, 0.94],
} as const;

// ═══════════════════════════════════════════════════════════════
// TRANSITION PRESETS
// ═══════════════════════════════════════════════════════════════

export const transitions = {
  smooth: {
    duration: 0.6,
    ease: easings.smooth,
  },
  elastic: {
    duration: 0.8,
    ease: easings.elastic,
  },
  spring: {
    type: 'spring',
    damping: 20,
    stiffness: 100,
  },
  springBouncy: {
    type: 'spring',
    damping: 15,
    stiffness: 150,
  },
  springGentle: {
    type: 'spring',
    damping: 25,
    stiffness: 80,
  },
  cinematic: {
    duration: 1.2,
    ease: easings.cinematic,
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// FADE VARIANTS
// ═══════════════════════════════════════════════════════════════

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: transitions.smooth,
  },
};

export const fadeInUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.cinematic,
  },
};

export const fadeInDownVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -60,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.cinematic,
  },
};

// ═══════════════════════════════════════════════════════════════
// SLIDE VARIANTS
// ═══════════════════════════════════════════════════════════════

export const slideInLeftVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -80,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitions.cinematic,
  },
};

export const slideInRightVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 80,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitions.cinematic,
  },
};

// ═══════════════════════════════════════════════════════════════
// SCALE VARIANTS
// ═══════════════════════════════════════════════════════════════

export const scaleInVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: transitions.springGentle,
  },
};

export const scaleUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 1.2,
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: 'blur(0px)',
    transition: transitions.cinematic,
  },
};

// ═══════════════════════════════════════════════════════════════
// BLUR VARIANTS - Premium cinematic feel
// ═══════════════════════════════════════════════════════════════

export const blurInVariants: Variants = {
  hidden: { 
    opacity: 0,
    filter: 'blur(20px)',
    y: 40,
  },
  visible: { 
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 1,
      ease: easings.cinematic,
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// STAGGER CONTAINERS
// ═══════════════════════════════════════════════════════════════

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerFastContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerSlowContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// PARALLAX VARIANTS
// ═══════════════════════════════════════════════════════════════

export const parallaxVariants = {
  slow: {
    y: [0, -50],
  },
  medium: {
    y: [0, -100],
  },
  fast: {
    y: [0, -150],
  },
};

// ═══════════════════════════════════════════════════════════════
// MAGNETIC HOVER EFFECTS
// ═══════════════════════════════════════════════════════════════

export const magneticHoverVariants: Variants = {
  rest: { 
    scale: 1,
    transition: transitions.springGentle,
  },
  hover: { 
    scale: 1.05,
    transition: transitions.springBouncy,
  },
  tap: { 
    scale: 0.95,
    transition: transitions.snappy,
  },
};

export const magneticButtonVariants: Variants = {
  rest: { 
    scale: 1,
    boxShadow: '0 20px 60px -10px rgba(99, 102, 241, 0.3)',
  },
  hover: { 
    scale: 1.05,
    boxShadow: '0 30px 80px -10px rgba(99, 102, 241, 0.5)',
    transition: transitions.springBouncy,
  },
  tap: { 
    scale: 0.98,
    boxShadow: '0 10px 40px -10px rgba(99, 102, 241, 0.4)',
    transition: transitions.snappy,
  },
};

// ═══════════════════════════════════════════════════════════════
// CARD HOVER EFFECTS
// ═══════════════════════════════════════════════════════════════

export const cardHoverVariants: Variants = {
  rest: { 
    y: 0,
    scale: 1,
    boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
  },
  hover: { 
    y: -8,
    scale: 1.02,
    boxShadow: '0 30px 80px -10px rgba(99, 102, 241, 0.4)',
    transition: transitions.spring,
  },
};

// ═══════════════════════════════════════════════════════════════
// REVEAL ANIMATIONS - Cinematic section reveals
// ═══════════════════════════════════════════════════════════════

export const revealVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 100,
    scale: 0.95,
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: easings.cinematic,
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// VIEWPORT OPTIONS - Optimized for performance
// ═══════════════════════════════════════════════════════════════

export const viewportOptions = {
  once: true, // Only animate once for performance
  amount: 0.2, // Trigger when 20% is visible
  margin: '-50px', // Start animation slightly before element enters viewport
};

export const viewportOptionsPartial = {
  once: true,
  amount: 0.1,
  margin: '-100px',
};

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Create a staggered delay based on index
 */
export const getStaggerDelay = (index: number, baseDelay = 0.1): number => {
  return index * baseDelay;
};

/**
 * Create custom viewport options with specific amount
 */
export const createViewportOptions = (
  amount: number = 0.2,
  once: boolean = true,
  margin: string = '-50px'
) => ({
  once,
  amount,
  margin,
});
