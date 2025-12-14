"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface HeroFigmaNewProps {
  className?: string;
}

export default function HeroFigmaNew({ className }: HeroFigmaNewProps) {
  const [isExploreHovered, setIsExploreHovered] = useState(false);

  return (
    <div className={cn("bg-[#FCF5EE] w-full h-screen flex items-center justify-center overflow-hidden", className)}>
      {/* Responsive container that scales the entire hero section */}
      <div className="relative w-full max-w-[1440px] h-full">
        {/* Inner container with exact Figma positioning */}
        <div className="absolute inset-0 scale-[0.35] sm:scale-50 md:scale-75 lg:scale-90 xl:scale-100 origin-center">
          <div className="relative w-[1440px] h-[1000px]">
            
            {/* Main Heading - Positioned within sticker composition center */}
            <div className="absolute left-[50%] top-[45%] transform -translate-x-1/2 -translate-y-1/2 z-20 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#EE6983] tracking-tight leading-tight px-4 sm:px-0">
                Empowering Young<br />Innovators & Entrepreneurs
              </h1>
            </div>

 {/* Action Buttons - Spaced apart to show stickers clearly */}
            <div className="absolute left-1/2 bottom-[20%] transform -translate-x-1/2 z-30">
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-24 md:gap-32 lg:gap-48 justify-center items-center">
                <a 
                  href="#contact" 
                  className={cn(
                    "px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 font-bold text-sm sm:text-base md:text-lg rounded-full transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl border-2 font-rundeck",
                    isExploreHovered 
                      ? "bg-[#FCF5EE] text-[#850E35] border-[#850E35]" 
                      : "bg-[#850E35] text-[#EE6983] border-transparent hover:bg-[#850E35]/90"
                  )}
                >
                  Get Started
                </a>
                <Link 
                  href="/events" 
                  className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 bg-[#FCF5EE] border-2 border-[#850E35] text-[#850E35] font-bold text-sm sm:text-base md:text-lg rounded-full hover:bg-[#850E35] hover:text-[#EE6983] transition-all transform hover:scale-105 shadow-lg font-rundeck"
                  onMouseEnter={() => setIsExploreHovered(true)}
                  onMouseLeave={() => setIsExploreHovered(false)}
                >
                  Explore Events
                </Link>
              </div>
            </div>

            {/* Sticker Images - Exact positions from Figma */}
            
            {/* Image 3 - Center bottom */}
            <div className="absolute left-[594px] top-[559.51px] w-[326.691px] h-[326.691px]">
              <Image 
                alt="" 
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                src="/stickers/3.png" 
                width={327}
                height={327}
              />
            </div>

            {/* Image 4 - Left middle */}
            <div className="absolute left-[340.01px] top-[364.51px] w-[131px] h-[131px]">
              <Image 
                alt="" 
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                src="/stickers/4.png" 
                width={131}
                height={131}
              />
            </div>

            {/* Image 6 - Left middle-bottom */}
            <div className="absolute left-[114.01px] top-[402.51px] w-[283px] h-[283px]">
              <Image 
                alt="" 
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                src="/stickers/6.png" 
                width={283}
                height={283}
              />
            </div>

            {/* Image 7 - Left bottom */}
            <div className="absolute left-[310.22px] top-[498px] w-[125.561px] h-[125.561px]">
              <Image 
                alt="" 
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                src="/stickers/7.png" 
                width={126}
                height={126}
              />
            </div>

            {/* Image 8 - Right side (with rotation) */}
            <div className="absolute flex items-center justify-center left-[929.93px] top-[271.69px] w-[546.552px] h-[546.552px]">
              <div className="flex-none rotate-[0.383deg]">
                <div className="relative w-[542.935px] h-[542.935px]">
                  <Image 
                    alt="" 
                    className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                    src="/stickers/8.png" 
                    width={543}
                    height={543}
                  />
                </div>
              </div>
            </div>

            {/* Image 10 - Left center */}
            <div className="absolute left-[263.67px] top-[393.49px] w-[449.927px] h-[449.927px]">
              <Image 
                alt="" 
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                src="/stickers/10.png" 
                width={450}
                height={450}
              />
            </div>

            {/* Image 11 - Center bottom small */}
            <div className="absolute left-[705px] top-[623.51px] w-[67px] h-[67px]">
              <Image 
                alt="" 
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                src="/stickers/11.png" 
                width={67}
                height={67}
              />
            </div>

            {/* Image 12 - Right top (with rotation) */}
            <div className="absolute flex items-center justify-center left-[1133.43px] top-[265.99px] w-[237.511px] h-[237.511px]">
              <div className="flex-none rotate-[359.918deg]">
                <div className="relative w-[237.171px] h-[237.171px]">
                  <Image 
                    alt="" 
                    className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                    src="/stickers/12.png" 
                    width={237}
                    height={237}
                  />
                </div>
              </div>
            </div>

            {/* Image 17 - Left upper */}
            <div className="absolute left-[107.55px] top-[304.66px] w-[224.077px] h-[224.077px]">
              <Image 
                alt="" 
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                src="/stickers/17.png" 
                width={224}
                height={224}
              />
            </div>

            {/* Image 13 - Left top (with rotation) */}
            <div className="absolute flex items-center justify-center left-[232.29px] top-[176.22px] w-[314.333px] h-[314.333px]">
              <div className="flex-none rotate-[359.591deg]">
                <div className="relative w-[312.114px] h-[312.114px]">
                  <Image 
                    alt="" 
                    className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                    src="/stickers/13.png" 
                    width={312}
                    height={312}
                  />
                </div>
              </div>
            </div>

            {/* Image 15 - Right upper */}
            <div className="absolute left-[895.01px] top-[252.51px] w-[337px] h-[336px]">
              <Image 
                alt="" 
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                src="/stickers/15.png" 
                width={337}
                height={336}
              />
            </div>

            {/* Image 18 - Right center */}
            <div className="absolute left-[652.01px] top-[320.51px] w-[583px] h-[518px]">
              <Image 
                alt="" 
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                src="/stickers/18.png" 
                width={583}
                height={518}
              />
            </div>

            {/* Image 19 - Right top (with rotation and skew) */}
            <div className="absolute flex items-center justify-center left-[790.63px] top-[116.97px] w-[496.762px] h-[442.063px]">
              <div className="flex-none rotate-[358.853deg]" style={{ transform: 'rotate(-1.147deg) skewX(-3.275deg)' }}>
                <div className="relative w-[480.753px] h-[432.737px]">
                  <Image 
                    alt="" 
                    className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                    src="/stickers/19.png" 
                    width={481}
                    height={433}
                  />
                </div>
              </div>
            </div>

            {/* Image 20 - Center (with skew) */}
            <div className="absolute flex items-center justify-center left-[376.79px] top-[284.63px] w-[658.531px] h-[582.539px]">
              <div className="flex-none" style={{ transform: 'skewX(-0.181deg)' }}>
                <div className="relative w-[656.69px] h-[582.542px]">
                  <Image 
                    alt="" 
                    className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                    src="/stickers/20.png" 
                    width={657}
                    height={583}
                  />
                </div>
              </div>
            </div>

            {/* Image 21 - Top center (with rotation and skew) */}
            <div className="absolute flex items-center justify-center left-[498.38px] top-[43px] w-[639.931px] h-[566.419px]">
              <div className="flex-none" style={{ transform: 'rotate(-0.384deg) skewX(-1.111deg)' }}>
                <div className="relative w-[632.805px] h-[562.223px]">
                  <Image 
                    alt="" 
                    className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                    src="/stickers/21.png" 
                    width={633}
                    height={562}
                  />
                </div>
              </div>
            </div>

            {/* Untitled - Bottom left decorative */}
            <div className="absolute left-[-231px] top-[504px] w-[702px] h-[702px]">
              <Image 
                alt="" 
                className="block max-w-none w-full h-full object-cover" 
                src="/stickers/Untitled.png" 
                width={702}
                height={702}
              />
            </div>

            {/* Image 22 - Bottom right decorative */}
            <div className="absolute left-[765px] top-[430px] w-[959px] h-[648px]">
              <Image 
                alt="" 
                className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                src="/stickers/22.png" 
                width={959}
                height={648}
              />
            </div>

            {/* Image 2 - Upper center (with rotation) */}
            <div className="absolute flex items-center justify-center left-[496.56px] top-[217.36px] w-[208.007px] h-[208.007px]">
              <div className="flex-none rotate-[0.957deg]">
                <div className="relative w-[204.618px] h-[204.618px]">
                  <Image 
                    alt="" 
                    className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" 
                    src="/stickers/2.png" 
                    width={205}
                    height={205}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}