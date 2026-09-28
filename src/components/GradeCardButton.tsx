import React from 'react';
import { ChevronRight } from 'lucide-react';

export type GradeId =
  | 'grades-1-3'
  | 'girls-4-6'
  | 'girls-7-12'
  | 'boys-4-6'
  | 'boys-7-12';

export interface GradeCardConfig {
  id: GradeId;
  label: string; // The category name used in state
  title: string;
  subtitle: string;
  badgeBg: string;
  titleColor: string;
  subtitleColor: string;
  cardBg: string;
  borderColor: string;
  shadowColor: string;
  watermarkColor: string;
  iconType: GradeId;
  watermark: 'airplane' | 'star' | 'lightbulb' | 'gear' | 'chart';
}

export const GRADE_CARDS_DATA: GradeCardConfig[] = [
  {
    id: 'grades-1-3',
    label: 'Grades 1 to 3',
    title: 'GRADES 1 TO 3',
    subtitle: 'Discover, Play and Grow',
    badgeBg: '#7c3aed',
    titleColor: '#6d28d9',
    subtitleColor: '#533c66',
    cardBg: 'bg-gradient-to-r from-[#f3e8ff] via-[#f7f0ff] to-[#fdfcff]',
    borderColor: '#e2ccff',
    shadowColor: 'rgba(124, 58, 237, 0.08)',
    watermarkColor: '#9333ea',
    iconType: 'grades-1-3',
    watermark: 'airplane',
  },
  {
    id: 'girls-4-6',
    label: 'Girls (Grade 4 to 6)',
    title: 'GIRLS (GRADE 4 TO 6)',
    subtitle: 'Explore Your Interests and Shine',
    badgeBg: '#e11d48',
    titleColor: '#be123c',
    subtitleColor: '#783b49',
    cardBg: 'bg-gradient-to-r from-[#ffe4e6] via-[#fff1f2] to-[#fffbfc]',
    borderColor: '#fecdd3',
    shadowColor: 'rgba(225, 29, 72, 0.08)',
    watermarkColor: '#e11d48',
    iconType: 'girls-4-6',
    watermark: 'star',
  },
  {
    id: 'girls-7-12',
    label: 'Girls (Grade 7 to 12)',
    title: 'GIRLS (GRADE 7 TO 12)',
    subtitle: 'Lead, Create and Make an Impact',
    badgeBg: '#ea580c',
    titleColor: '#c2410c',
    subtitleColor: '#774c2e',
    cardBg: 'bg-gradient-to-r from-[#ffedd5] via-[#fff7ed] to-[#fffcf9]',
    borderColor: '#fed7aa',
    shadowColor: 'rgba(234, 88, 12, 0.08)',
    watermarkColor: '#ea580c',
    iconType: 'girls-7-12',
    watermark: 'lightbulb',
  },
  {
    id: 'boys-4-6',
    label: 'Boys (Grade 4 to 6)',
    title: 'BOYS (GRADE 4 TO 6)',
    subtitle: 'Play, Build and Explore',
    badgeBg: '#16a34a',
    titleColor: '#15803d',
    subtitleColor: '#385e42',
    cardBg: 'bg-gradient-to-r from-[#dcfce7] via-[#f0fdf4] to-[#fafffb]',
    borderColor: '#bbf7d0',
    shadowColor: 'rgba(22, 163, 74, 0.08)',
    watermarkColor: '#16a34a',
    iconType: 'boys-4-6',
    watermark: 'gear',
  },
  {
    id: 'boys-7-12',
    label: 'Boys (Grade 7 to 12)',
    title: 'BOYS (GRADE 7 TO 12)',
    subtitle: 'Challenge, Innovate and Lead',
    badgeBg: '#0284c7',
    titleColor: '#0369a1',
    subtitleColor: '#33536b',
    cardBg: 'bg-gradient-to-r from-[#e0f2fe] via-[#f0f9ff] to-[#fbfdff]',
    borderColor: '#bae6fd',
    shadowColor: 'rgba(2, 132, 199, 0.08)',
    watermarkColor: '#0284c7',
    iconType: 'boys-7-12',
    watermark: 'chart',
  },
];

// Custom Face SVGs drawn in white line/fill style for badges
const KidsDuoIcon: React.FC = () => (
  <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 sm:w-9 sm:h-9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Left Child */}
    <circle cx="13" cy="19" r="7.5" fill="none" />
    <path d="M7 16 C9 12 17 12 19 16" fill="white" fillOpacity="0.4" />
    <circle cx="11" cy="18.5" r="0.8" fill="white" />
    <circle cx="15" cy="18.5" r="0.8" fill="white" />
    <path d="M11.5 22 Q13 24 14.5 22" stroke="white" strokeWidth="1.6" />
    
    {/* Right Child */}
    <circle cx="23" cy="18" r="7.5" fill="none" />
    <path d="M17 15 C19 11 27 11 29 15" fill="white" fillOpacity="0.4" />
    <circle cx="21" cy="17.5" r="0.8" fill="white" />
    <circle cx="25" cy="17.5" r="0.8" fill="white" />
    <path d="M21.5 21 Q23 23 24.5 21" stroke="white" strokeWidth="1.6" />
  </svg>
);

const GirlJuniorIcon: React.FC = () => (
  <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 sm:w-9 sm:h-9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Hair buns/pigtails */}
    <circle cx="8" cy="13" r="3.5" fill="white" fillOpacity="0.8" stroke="white" />
    <circle cx="28" cy="13" r="3.5" fill="white" fillOpacity="0.8" stroke="white" />
    {/* Head */}
    <circle cx="18" cy="19" r="8.5" />
    {/* Hair bangs */}
    <path d="M10 17 Q18 11 26 17" fill="white" fillOpacity="0.3" />
    <path d="M12 17 Q18 14 24 17" />
    {/* Face */}
    <circle cx="15" cy="19" r="1" fill="white" />
    <circle cx="21" cy="19" r="1" fill="white" />
    <path d="M15.5 23 Q18 25.5 20.5 23" stroke="white" strokeWidth="1.7" />
  </svg>
);

const GirlSeniorIcon: React.FC = () => (
  <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 sm:w-9 sm:h-9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Flowing Hair */}
    <path d="M10 24 C8 17 11 10 18 10 C25 10 28 17 26 24" fill="white" fillOpacity="0.3" stroke="white" />
    {/* Face */}
    <path d="M12 18 C12 24 15 27 18 27 C21 27 24 24 24 18 C24 13 21 11 18 11 C15 11 12 13 12 18 Z" />
    <circle cx="15.5" cy="18" r="1" fill="white" />
    <circle cx="20.5" cy="18" r="1" fill="white" />
    <path d="M16 22 Q18 24 20 22" stroke="white" strokeWidth="1.7" />
  </svg>
);

const BoyJuniorIcon: React.FC = () => (
  <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 sm:w-9 sm:h-9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Short Hair */}
    <path d="M10 16 C9 11 14 9 18 9 C22 9 27 11 26 16" fill="white" fillOpacity="0.4" stroke="white" />
    {/* Face */}
    <circle cx="18" cy="19" r="8.5" />
    <circle cx="15" cy="18.5" r="1" fill="white" />
    <circle cx="21" cy="18.5" r="1" fill="white" />
    <path d="M15 22.5 Q18 25.5 21 22.5" stroke="white" strokeWidth="1.8" />
  </svg>
);

const BoySeniorIcon: React.FC = () => (
  <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 sm:w-9 sm:h-9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Stylish sweep hair */}
    <path d="M9 16 C9 9 17 8 20 8 C25 8 28 12 27 17" fill="white" fillOpacity="0.4" stroke="white" />
    {/* Face */}
    <path d="M11 18 C11 24 14.5 27 18 27 C21.5 27 25 24 25 18 C25 13 22 10.5 18 10.5 C14 10.5 11 13 11 18 Z" />
    {/* Collar */}
    <path d="M15 29 L18 27 L21 29" stroke="white" strokeWidth="1.5" />
    <circle cx="15.5" cy="18" r="1" fill="white" />
    <circle cx="20.5" cy="18" r="1" fill="white" />
    <path d="M15.5 22.5 Q18 24.5 20.5 22.5" stroke="white" strokeWidth="1.8" />
  </svg>
);

// Watermark Outline Icons matching the poster
const WatermarkIcon: React.FC<{ type: GradeCardConfig['watermark']; color: string }> = ({ type, color }) => {
  if (type === 'airplane') {
    return (
      <svg
        className="w-10 h-10 sm:w-12 sm:h-12 -rotate-12 transition-transform group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: 0.65 }}
      >
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" />
      </svg>
    );
  }
  if (type === 'star') {
    return (
      <svg
        className="w-10 h-10 sm:w-12 sm:h-12 rotate-6 transition-transform group-hover:rotate-12 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: 0.65 }}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }
  if (type === 'lightbulb') {
    return (
      <svg
        className="w-10 h-10 sm:w-12 sm:h-12 transition-transform group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: 0.65 }}
      >
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
        <line x1="12" y1="2" x2="12" y2="0.5" />
        <line x1="4.9" y1="4.9" x2="3.8" y2="3.8" />
        <line x1="19.1" y1="4.9" x2="20.2" y2="3.8" />
      </svg>
    );
  }
  if (type === 'gear') {
    return (
      <svg
        className="w-10 h-10 sm:w-12 sm:h-12 transition-transform group-hover:rotate-45"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: 0.65 }}
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
  }
  return (
    <svg
      className="w-10 h-10 sm:w-12 sm:h-12 transition-transform group-hover:scale-110"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.65 }}
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <polyline points="3 8 9 2 15 8 21 2" />
      <polyline points="17 2 21 2 21 6" />
    </svg>
  );
};

export const GradeCardButton: React.FC<{
  config: GradeCardConfig;
  onClick: () => void;
}> = ({ config, onClick }) => {
  const renderIcon = () => {
    switch (config.iconType) {
      case 'grades-1-3':
        return <KidsDuoIcon />;
      case 'girls-4-6':
        return <GirlJuniorIcon />;
      case 'girls-7-12':
        return <GirlSeniorIcon />;
      case 'boys-4-6':
        return <BoyJuniorIcon />;
      case 'boys-7-12':
        return <BoySeniorIcon />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`group relative w-full ${config.cardBg} border rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 md:p-3.5 flex items-center justify-between text-left transition-all duration-200 hover:scale-[1.015] hover:shadow-md active:scale-[0.99] cursor-pointer overflow-hidden`}
      style={{
        borderColor: config.borderColor,
        boxShadow: `0 4px 14px ${config.shadowColor}`,
      }}
      aria-label={`${config.title} - ${config.subtitle}`}
    >
      {/* Left Icon Badge & Text Lockup */}
      <div className="flex items-center gap-3 sm:gap-4 z-10 min-w-0 pr-2">
        {/* Rounded Badge with custom face vector */}
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl sm:rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105"
          style={{ backgroundColor: config.badgeBg }}
        >
          {renderIcon()}
        </div>

        {/* Grade title and subtitle */}
        <div className="flex flex-col min-w-0">
          <span
            className="font-extrabold text-sm sm:text-base md:text-lg tracking-wide uppercase leading-tight truncate"
            style={{ color: config.titleColor }}
          >
            {config.title}
          </span>
          <span
            className="font-semibold text-[11px] sm:text-xs md:text-sm leading-snug mt-0.5"
            style={{ color: config.subtitleColor }}
          >
            {config.subtitle}
          </span>
        </div>
      </div>

      {/* Right Section: Watermark & Arrow Button */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0 z-10">
        {/* Subtle Watermark Outline Doodled Icon */}
        <div className="hidden xs:block shrink-0">
          <WatermarkIcon type={config.watermark} color={config.watermarkColor} />
        </div>

        {/* Circular Chevron Arrow Button */}
        <div
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:scale-105"
          style={{ backgroundColor: config.badgeBg }}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.8]" />
        </div>
      </div>
    </button>
  );
};
