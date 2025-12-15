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
    <div className={cn("bg-[#FCF5EE] w-full h-screen flex items-center justify-center overflow-hidden relative", className)}>
      
      {/* Mobile-First Responsive Layout */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        
        {/* Mobile Stickers - Simplified and visible */}
        <div className="absolute inset-0 md:hidden">
          {/* Key stickers for mobile - larger and better positioned */}
          <div className="absolute top-[15%] left-[10%] w-20 h-20 opacity-80">
            <Image src="/stickers/3.png" alt="" width={80} height={80} className="w-full h-full object-contain" />
          </div>
          <div className="absolute top-[25%] right-[15%] w-16 h-16 opacity-70">
            <Image src="/stickers/4.png" alt="" width={64} height={64} className="w-full h-full object-contain" />
          </div>
          <div className="absolute bottom-[30%] left-[5%] w-24 h-24 opacity-75">
            <Image src="/stickers/6.png" alt="" width={96} height={96} className="w-full h-full object-contain" />
          </div>
          <div className="absolute bottom-[25%] right-[10%] w-18 h-18 opacity-80">
            <Image src="/stickers/7.png" alt="" width={72} height={72} className="w-full h-full object-contain" />
          </div>
          <div className="absolute top-[35%] left-[25%] w-14 h-14 opacity-60">
            <Image src="/stickers/11.png" alt="" width={56} height={56} className="w-full h-full object-contain" />
          </div>
          <div className="absolute bottom-[40%] right-[25%] w-20 h-20 opacity-70">
            <Image src="/stickers/12.png" alt="" width={80} height={80} className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Tablet Stickers - More detailed */}
        <div className="absolute inset-0 hidden md:block lg:hidden">
          <div className="absolute top-[12%] left-[8%] w-28 h-28 opacity-80">
            <Image src="/stickers/3.png" alt="" width={112} height={112} className="w-full h-full object-contain" />
          </div>
          <div className="absolute top-[20%] right-[12%] w-24 h-24 opacity-75">
            <Image src="/stickers/8.png" alt="" width={96} height={96} className="w-full h-full object-contain" />
          </div>
          <div className="absolute bottom-[25%] left-[10%] w-32 h-32 opacity-85">
            <Image src="/stickers/10.png" alt="" width={128} height={128} className="w-full h-full object-contain" />
          </div>
          <div className="absolute bottom-[30%] right-[15%] w-26 h-26 opacity-80">
            <Image src="/stickers/15.png" alt="" width={104} height={104} className="w-full h-full object-contain" />
          </div>
          <div className="absolute top-[30%] left-[20%] w-20 h-20 opacity-70">
            <Image src="/stickers/17.png" alt="" width={80} height={80} className="w-full h-full object-contain" />
          </div>
          <div className="absolute top-[25%] right-[25%] w-22 h-22 opacity-75">
            <Image src="/stickers/18.png" alt="" width={88} height={88} className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Desktop - Full Figma Layout */}
        <div className="absolute inset-0 hidden lg:block">
          <div className="relative w-full h-full max-w-[1440px] mx-auto">
            <div className="absolute inset-0 scale-75 xl:scale-90 2xl:scale-100 origin-center">
              <div className="relative w-[1440px] h-[1000px]">
                
                {/* All original stickers for desktop */}
                <div className="absolute left-[594px] top-[559.51px] w-[326.691px] h-[326.691px]">
                  <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/3.png" width={327} height={327} />
                </div>
                <div className="absolute left-[340.01px] top-[364.51px] w-[131px] h-[131px]">
                  <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/4.png" width={131} height={131} />
                </div>
                <div className="absolute left-[114.01px] top-[402.51px] w-[283px] h-[283px]">
                  <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/6.png" width={283} height={283} />
                </div>
                <div className="absolute left-[310.22px] top-[498px] w-[125.561px] h-[125.561px]">
                  <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/7.png" width={126} height={126} />
                </div>
                <div className="absolute flex items-center justify-center left-[929.93px] top-[271.69px] w-[546.552px] h-[546.552px]">
                  <div className="flex-none rotate-[0.383deg]">
                    <div className="relative w-[542.935px] h-[542.935px]">
                      <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/8.png" width={543} height={543} />
                    </div>
                  </div>
                </div>
                <div className="absolute left-[263.67px] top-[393.49px] w-[449.927px] h-[449.927px]">
                  <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/10.png" width={450} height={450} />
                </div>
                <div className="absolute left-[705px] top-[623.51px] w-[67px] h-[67px]">
                  <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/11.png" width={67} height={67} />
                </div>
                <div className="absolute flex items-center justify-center left-[1133.43px] top-[265.99px] w-[237.511px] h-[237.511px]">
                  <div className="flex-none rotate-[359.918deg]">
                    <div className="relative w-[237.171px] h-[237.171px]">
                      <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/12.png" width={237} height={237} />
                    </div>
                  </div>
                </div>
                <div className="absolute left-[107.55px] top-[304.66px] w-[224.077px] h-[224.077px]">
                  <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/17.png" width={224} height={224} />
                </div>
                <div className="absolute flex items-center justify-center left-[232.29px] top-[176.22px] w-[314.333px] h-[314.333px]">
                  <div className="flex-none rotate-[359.591deg]">
                    <div className="relative w-[312.114px] h-[312.114px]">
                      <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/13.png" width={312} height={312} />
                    </div>
                  </div>
                </div>
                <div className="absolute left-[895.01px] top-[252.51px] w-[337px] h-[336px]">
                  <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/15.png" width={337} height={336} />
                </div>
                <div className="absolute left-[652.01px] top-[320.51px] w-[583px] h-[518px]">
                  <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/18.png" width={583} height={518} />
                </div>
                <div className="absolute flex items-center justify-center left-[790.63px] top-[116.97px] w-[496.762px] h-[442.063px]">
                  <div className="flex-none rotate-[358.853deg]" style={{ transform: 'rotate(-1.147deg) skewX(-3.275deg)' }}>
                    <div className="relative w-[480.753px] h-[432.737px]">
                      <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/19.png" width={481} height={433} />
                    </div>
                  </div>
                </div>
                <div className="absolute flex items-center justify-center left-[376.79px] top-[284.63px] w-[658.531px] h-[582.539px]">
                  <div className="flex-none" style={{ transform: 'skewX(-0.181deg)' }}>
                    <div className="relative w-[656.69px] h-[582.542px]">
                      <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/20.png" width={657} height={583} />
                    </div>
                  </div>
                </div>
                <div className="absolute flex items-center justify-center left-[498.38px] top-[43px] w-[639.931px] h-[566.419px]">
                  <div className="flex-none" style={{ transform: 'rotate(-0.384deg) skewX(-1.111deg)' }}>
                    <div className="relative w-[632.805px] h-[562.223px]">
                      <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/21.png" width={633} height={562} />
                    </div>
                  </div>
                </div>
                <div className="absolute left-[-231px] top-[504px] w-[702px] h-[702px]">
                  <Image alt="" className="block max-w-none w-full h-full object-cover" src="/stickers/Untitled.png" width={702} height={702} />
                </div>
                <div className="absolute left-[765px] top-[430px] w-[959px] h-[648px]">
                  <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/22.png" width={959} height={648} />
                </div>
                <div className="absolute flex items-center justify-center left-[496.56px] top-[217.36px] w-[208.007px] h-[208.007px]">
                  <div className="flex-none rotate-[0.957deg]">
                    <div className="relative w-[204.618px] h-[204.618px]">
                      <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full" src="/stickers/2.png" width={205} height={205} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Always visible and properly sized */}
        <div className="relative z-20 text-center max-w-4xl mx-auto">
          {/* Main Heading - Smaller responsive typography */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#EE6983] tracking-tight leading-tight mb-8 sm:mb-12 md:mb-16 px-4">
            Empowering Young<br />Innovators & Entrepreneurs
          </h1>

          {/* Action Buttons - Better mobile spacing */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center px-4">
            <a 
              href="#contact" 
              className={cn(
                "w-full sm:w-auto px-8 py-4 md:px-10 md:py-4 font-bold text-base md:text-lg rounded-full transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl border-2 font-rundeck text-center",
                isExploreHovered 
                  ? "bg-[#FCF5EE] text-[#850E35] border-[#850E35]" 
                  : "bg-[#850E35] text-[#EE6983] border-transparent hover:bg-[#850E35]/90"
              )}
            >
              Get Started
            </a>
            <Link 
              href="/events" 
              className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-4 bg-[#FCF5EE] border-2 border-[#850E35] text-[#850E35] font-bold text-base md:text-lg rounded-full hover:bg-[#850E35] hover:text-[#EE6983] transition-all transform hover:scale-105 shadow-lg font-rundeck text-center"
              onMouseEnter={() => setIsExploreHovered(true)}
              onMouseLeave={() => setIsExploreHovered(false)}
            >
              Explore Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

