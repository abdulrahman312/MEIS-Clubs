import React from 'react';
import { Star, Users, Target, Trophy } from 'lucide-react';

interface HomeFooterProps {
  showWave?: boolean;
}

export const HomeFooter: React.FC<HomeFooterProps> = ({ showWave = true }) => {
  return (
    <footer className="w-full relative mt-auto shrink-0 select-none z-20">
      {/* Top Wave Divider */}
      {showWave && (
        <div className="w-full overflow-hidden leading-none -mb-[1px]">
          <svg
            className="w-full h-7 sm:h-10 md:h-12 text-[#072e6b] fill-current block"
            viewBox="0 0 1200 48"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,20 C180,42 360,6 600,24 C840,42 1020,4 1200,20 L1200,48 L0,48 Z" />
          </svg>
        </div>
      )}

      {/* Main Footer Blue Container */}
      <div className="w-full bg-[#072e6b] text-white pt-3 sm:pt-4 pb-4 sm:pb-5 px-4 sm:px-8 relative overflow-hidden">
        {/* Subtle Botanical / Floral Line-Art Doodles in Left & Right Corners */}
        <div className="absolute left-1 bottom-1 sm:left-4 sm:bottom-2 pointer-events-none opacity-20 text-cyan-200">
          <svg width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Elegant stylized leaf branches */}
            <path d="M10,90 Q40,60 50,20" />
            <path d="M30,70 Q45,65 52,50 Q40,55 30,70 Z" />
            <path d="M22,78 Q10,70 12,55 Q20,65 22,78 Z" />
            <path d="M42,45 Q58,40 60,25 Q48,32 42,45 Z" />
            <path d="M36,56 Q25,48 28,34 Q36,44 36,56 Z" />
            <path d="M50,20 Q55,10 62,5 Q55,15 50,20 Z" />
          </svg>
        </div>

        <div className="absolute right-1 bottom-1 sm:right-4 sm:bottom-2 pointer-events-none opacity-20 text-cyan-200">
          <svg width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Mirror stylized leaf branch */}
            <path d="M90,90 Q60,60 50,20" />
            <path d="M70,70 Q55,65 48,50 Q60,55 70,70 Z" />
            <path d="M78,78 Q90,70 88,55 Q80,65 78,78 Z" />
            <path d="M58,45 Q42,40 40,25 Q52,32 58,45 Z" />
            <path d="M64,56 Q75,48 72,34 Q64,44 64,56 Z" />
            <path d="M50,20 Q45,10 38,5 Q45,15 50,20 Z" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center relative z-10">
          {/* Four Core Pillars: Explore, Make Friends, Develop Skills, Be Your Best */}
          <div className="grid grid-cols-4 gap-2 sm:gap-6 md:gap-8 w-full max-w-2xl py-2 sm:py-3 mb-2 sm:mb-3">
            {/* 1. Explore */}
            <div className="flex flex-col items-center justify-center text-center group cursor-default">
              <div className="p-1 sm:p-1.5 transition-transform duration-200 group-hover:scale-110">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white stroke-[1.8]" />
              </div>
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide mt-1 text-white/95 whitespace-nowrap">
                Explore
              </span>
            </div>

            {/* 2. Make Friends */}
            <div className="flex flex-col items-center justify-center text-center group cursor-default">
              <div className="p-1 sm:p-1.5 transition-transform duration-200 group-hover:scale-110">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white stroke-[1.8]" />
              </div>
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide mt-1 text-white/95 whitespace-nowrap">
                Make Friends
              </span>
            </div>

            {/* 3. Develop Skills */}
            <div className="flex flex-col items-center justify-center text-center group cursor-default">
              <div className="p-1 sm:p-1.5 transition-transform duration-200 group-hover:scale-110">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white stroke-[1.8]" />
              </div>
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide mt-1 text-white/95 whitespace-nowrap">
                Develop Skills
              </span>
            </div>

            {/* 4. Be Your Best */}
            <div className="flex flex-col items-center justify-center text-center group cursor-default">
              <div className="p-1 sm:p-1.5 transition-transform duration-200 group-hover:scale-110">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white stroke-[1.8]" />
              </div>
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide mt-1 text-white/95 whitespace-nowrap">
                Be Your Best
              </span>
            </div>
          </div>

          {/* Bottom Bar: MEIS logo on left, Copyright in center, Ataa logo on right */}
          <div className="flex items-center justify-between pt-2.5 sm:pt-3.5 border-t border-white/15 w-full gap-2 sm:gap-4">
            {/* Bottom Left: MEIS Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-white rounded-xl p-1 sm:p-1.5 shadow-sm flex items-center justify-center">
                <img 
                  src="/images/logo/meis_logo.png" 
                  alt="MEIS Logo" 
                  className="h-8 sm:h-10 md:h-11 w-auto object-contain" 
                />
              </div>
              <div className="hidden xs:flex flex-col text-left">
                <span className="font-bold text-xs sm:text-sm text-white leading-tight">MEIS</span>
                <span className="text-[10px] text-cyan-200/80 font-medium">AlMuruj</span>
              </div>
            </div>

            {/* Bottom Center: Copyright & School Info */}
            <div className="flex items-center justify-center text-center px-1 sm:px-2 flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs text-white/85 font-medium tracking-wider uppercase truncate">
                MEIS CLUBS <span className="mx-1 sm:mx-1.5 opacity-60">|</span> © 2026 All rights reserved
              </p>
            </div>

            {/* Bottom Right: Ataa Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden xs:flex flex-col text-right">
                <span className="font-bold text-xs sm:text-sm text-white leading-tight">ATAA</span>
                <span className="text-[10px] text-cyan-200/80 font-medium">Educational</span>
              </div>
              <div className="bg-white rounded-xl p-1 sm:p-1.5 shadow-sm flex items-center justify-center">
                <img 
                  src="/images/logo/ataa_logo.png" 
                  alt="Ataa Logo" 
                  className="h-8 sm:h-10 md:h-11 w-auto object-contain" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
