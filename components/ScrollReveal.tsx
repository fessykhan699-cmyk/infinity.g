'use client';
import React, { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade-slow' | 'blur-up' | 'clip-up' | 'scale';
  delay?: number;
  className?: string;
  threshold?: number;
  stagger?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  threshold = 0.1,
  stagger = false
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (ref.current) ref.current.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      data-reveal={direction}
      className={`${stagger ? 'stagger-parent' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

// Split text into individually animated characters
interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  staggerMs?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  charClassName = '',
  delay = 0,
  staggerMs = 30
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const chars = ref.current?.querySelectorAll('.split-text-char');
          chars?.forEach((char, i) => {
            setTimeout(() => {
              char.classList.add('is-visible');
            }, delay + i * staggerMs);
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, staggerMs]);

  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="split-word">
            {word.split('').map((char, ci) => (
              <span key={ci} className={`split-text-char ${charClassName}`}>
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && <span className="split-text-char is-visible">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

// Animated counter that counts up when scrolled into view
interface AnimatedCounterProps {
  target: string;
  className?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  className = '',
  duration = 2000
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  const animateValue = () => {
    const numericMatch = target.match(/^([\d.]+)/);
    if (!numericMatch || !ref.current) {
      if (ref.current) ref.current.textContent = target;
      return;
    }

    const numericPart = parseFloat(numericMatch[1]);
    const suffix = target.slice(numericMatch[1].length);
    const isDecimal = numericMatch[1].includes('.');
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const currentValue = eased * numericPart;

      if (ref.current) {
        if (isDecimal) {
          ref.current.textContent = currentValue.toFixed(1) + suffix;
        } else {
          ref.current.textContent = Math.floor(currentValue) + suffix;
        }
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else if (ref.current) {
        ref.current.textContent = target;
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <span ref={ref} className={`counter-value ${className}`}>
      0
    </span>
  );
};
