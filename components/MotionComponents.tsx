'use client';
import React, { ReactNode } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import {
  fadeInUpVariants,
  fadeInDownVariants,
  slideInLeftVariants,
  slideInRightVariants,
  scaleInVariants,
  blurInVariants,
  revealVariants,
  viewportOptions,
  getStaggerDelay,
} from '../lib/motion';

interface MotionRevealProps {
  children: ReactNode;
  variant?: 'fadeUp' | 'fadeDown' | 'slideLeft' | 'slideRight' | 'scale' | 'blur' | 'reveal';
  delay?: number;
  className?: string;
  once?: boolean;
}

/**
 * MotionReveal - Enhanced scroll-triggered animation component
 * Uses Framer Motion for smooth, cinematic reveals
 */
export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  className = '',
  once = true,
}) => {
  const variantMap: Record<string, Variants> = {
    fadeUp: fadeInUpVariants,
    fadeDown: fadeInDownVariants,
    slideLeft: slideInLeftVariants,
    slideRight: slideInRightVariants,
    scale: scaleInVariants,
    blur: blurInVariants,
    reveal: revealVariants,
  };

  const selectedVariant = variantMap[variant] || fadeInUpVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOptions, once }}
      variants={selectedVariant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

/**
 * StaggerContainer - Staggers child animations for cinematic effect
 */
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
};

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Parallax - Scroll-based parallax effect for depth
 */
export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  className = '',
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Magnetic - Creates magnetic hover effect on elements
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.3,
  className = '',
}) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ScaleOnHoverProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

/**
 * ScaleOnHover - Smooth scale effect on hover
 */
export const ScaleOnHover: React.FC<ScaleOnHoverProps> = ({
  children,
  scale = 1.05,
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
