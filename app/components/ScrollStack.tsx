'use client';

import React, { ReactNode, useEffect, useRef, useCallback, useState } from 'react';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  baseScale?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  baseScale = 0.85
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const [mounted, setMounted] = useState(false);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || !mounted) return;

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const stackPositionPx = (parseFloat(stackPosition) / 100) * containerHeight;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardOffsetsRef.current[i];
      if (!cardTop) return;
      
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const progress = Math.max(0, Math.min(1, (scrollTop - triggerStart) / 500));
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - progress * (1 - targetScale);

      let translateY = 0;
      if (scrollTop >= triggerStart) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    });
  }, [itemScale, itemStackDistance, stackPosition, baseScale, mounted]);

  useEffect(() => {
    setMounted(true);
    
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
      if (cards.length === 0) return;
      
      cardsRef.current = cards;

      const calculateOffsets = () => {
        cardOffsetsRef.current = cards.map(card => {
          const rect = card.getBoundingClientRect();
          return rect.top + window.scrollY;
        });
      };

      calculateOffsets();

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          card.style.marginBottom = `${itemDistance}px`;
        }
        card.style.transformOrigin = 'top center';
        card.style.willChange = 'transform';
      });

      // Initial update
      updateCardTransforms();
    }, 100);

    const handleScroll = () => {
      updateCardTransforms();
    };

    const handleResize = () => {
      const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
      cardsRef.current = cards;
      cardOffsetsRef.current = cards.map(card => {
        const rect = card.getBoundingClientRect();
        return rect.top + window.scrollY;
      });
      updateCardTransforms();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [itemDistance, updateCardTransforms]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
