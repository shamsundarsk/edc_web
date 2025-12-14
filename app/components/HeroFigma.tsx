"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface HeroFigmaProps {
  className?: string;
}

export default function HeroFigma({ className }: HeroFigmaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add subtle parallax effect to circles on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      const circles = containerRef.current.querySelectorAll('[data-circle]');
      circles.forEach((circle, index) => {
        const element = circle as HTMLElement;
        const speed = (index + 1) * 0.5;
        element.style.transform = `translate(${xPercent * speed}px, ${yPercent * speed}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={cn("relative w-full h-screen bg-[#F9F6EE] overflow-hidden", className)}>
      {/* Container with max-width matching Figma artboard */}
      <div ref={containerRef} className="relative w-full h-full max-w-[1440px] mx-auto">
        {/* Decorative Circles - Exact positions from Figma */}
        <div className="absolute inset-0">
          {/* Circle 22 - Largest background circle */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '71.74%', 
              top: '34.28%', 
              width: '53.13%', 
              height: '74.71%',
              aspectRatio: '1',
              background: 'rgba(232, 220, 200, 0.25)',
              filter: 'blur(1px)'
            }} 
          />
          
          {/* Circle 20 - Large right circle */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '67.22%', 
              top: '30.37%', 
              width: '41.46%', 
              height: '58.20%',
              aspectRatio: '1',
              background: 'rgba(225, 210, 190, 0.3)',
              filter: 'blur(0.5px)'
            }} 
          />
          
          {/* Circle 19 - Upper center large */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '39.14%', 
              top: '12.99%', 
              width: '38.39%', 
              height: '53.99%',
              aspectRatio: '1',
              background: 'rgba(235, 225, 210, 0.35)'
            }} 
          />
          
          {/* Circle 18 - Center large */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '30.90%', 
              top: '35.94%', 
              width: '37.43%', 
              height: '52.63%',
              aspectRatio: '1',
              background: 'rgba(228, 215, 200, 0.35)'
            }} 
          />
          
          {/* Circle 17 - Upper right */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '58.02%', 
              top: '17.09%', 
              width: '33.08%', 
              height: '46.52%',
              aspectRatio: '1',
              background: 'rgba(240, 230, 215, 0.3)'
            }} 
          />
          
          {/* Circle 16 - Center right */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '46.11%', 
              top: '39.55%', 
              width: '32.78%', 
              height: '46.09%',
              aspectRatio: '1',
              background: 'rgba(232, 220, 200, 0.35)'
            }} 
          />
          
          {/* Circle 10 - Center */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '27.68%', 
              top: '42.68%', 
              width: '33.24%', 
              height: '46.74%',
              aspectRatio: '1',
              background: 'rgba(224, 212, 192, 0.4)'
            }} 
          />
          
          {/* Circle 8 - Large right background */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '67.25%', 
              top: '30.37%', 
              width: '41.42%', 
              height: '58.24%',
              aspectRatio: '1',
              background: 'rgba(232, 220, 200, 0.25)',
              filter: 'blur(1px)'
            }} 
          />
          
          {/* Circle 13 - Left side */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '19.38%', 
              top: '32.78%', 
              width: '23.89%', 
              height: '33.59%',
              aspectRatio: '1',
              background: 'rgba(229, 216, 196, 0.4)'
            }} 
          />
          
          {/* Circle 14 - Right center */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '59.24%', 
              top: '34.28%', 
              width: '20.07%', 
              height: '28.22%',
              aspectRatio: '1',
              background: 'rgba(235, 224, 208, 0.35)'
            }} 
          />
          
          {/* Circle 12 - Upper right small */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '76.13%', 
              top: '32.13%', 
              width: '18.60%', 
              height: '26.15%',
              aspectRatio: '1',
              background: 'rgba(243, 235, 224, 0.3)'
            }} 
          />
          
          {/* Circle 6 - Left side medium */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '15.35%', 
              top: '47.56%', 
              width: '16.88%', 
              height: '23.73%',
              aspectRatio: '1',
              background: 'rgba(221, 208, 188, 0.45)'
            }} 
          />
          
          {/* Circle 15 - Left lower */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '13.82%', 
              top: '43.00%', 
              width: '17.51%', 
              height: '24.63%',
              aspectRatio: '1',
              background: 'rgba(224, 208, 188, 0.4)'
            }} 
          />
          
          {/* Circle 3 - Upper center small */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '36.25%', 
              top: '32.33%', 
              width: '13.89%', 
              height: '19.53%',
              aspectRatio: '1',
              background: 'rgba(232, 220, 200, 0.45)'
            }} 
          />
          
          {/* Circle 7 - Center small */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '28.07%', 
              top: '54.20%', 
              width: '9.54%', 
              height: '13.41%',
              aspectRatio: '1',
              background: 'rgba(221, 208, 188, 0.5)'
            }} 
          />
          
          {/* Circle 5 - Upper left small */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '28.26%', 
              top: '43.75%', 
              width: '7.85%', 
              height: '11.04%',
              aspectRatio: '1',
              background: 'rgba(216, 200, 180, 0.55)'
            }} 
          />
          
          {/* Circle 11 - Center tiny */}
          <div 
            className="absolute rounded-full"
            style={{ 
              left: '49.10%', 
              top: '64.45%', 
              width: '4.44%', 
              height: '6.25%',
              aspectRatio: '1',
              background: 'rgba(229, 216, 196, 0.6)'
            }} 
          />
        </div>

        {/* Main Heading - Positioned as per Figma */}
        <div 
          className="absolute z-10"
          style={{
            left: '27.5%',
            top: '43.85%',
            width: '44.93%',
            transform: 'translateY(-50%)'
          }}
        >
          <h1 
            className="font-bold leading-[1.1] text-center"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
              color: '#2D2D2D',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-fraunces), serif'
            }}
          >
            Empowering Young Innovators & Entrepreneurs
          </h1>
        </div>
      </div>
    </div>
  );
}
