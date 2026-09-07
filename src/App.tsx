import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';

const globalStyles = `
@keyframes colorCycle {
  0%, 100% { color: #dd0922; }
  25% { color: #ec881b; }
  50% { color: #73ba11; }
  75% { color: #19aca4; }
}
@keyframes borderColorCycle {
  0%, 100% { border-color: #dd0922; }
  25% { border-color: #ec881b; }
  50% { border-color: #73ba11; }
  75% { border-color: #19aca4; }
}
@keyframes bgGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-text-color {
  animation: colorCycle 8s infinite linear;
}
.animate-border-color {
  animation: borderColorCycle 8s infinite linear;
}
.animate-bg-gradient {
  background: linear-gradient(-45deg, #fbe7e9, #fdecdb, #eaf4dd, #dff2f1);
  background-size: 400% 400%;
  animation: bgGradient 15s ease infinite;
}
`;

const Footer = () => (
  <footer className="w-full bg-white border-t-8 animate-border-color py-3 px-4 sm:px-8 flex justify-between items-center z-50 mt-auto shrink-0">
    <div className="flex items-center gap-3">
      <img src="https://i.ibb.co/6cLqW0J6/meis-logo.png" alt="meis logo" className="h-10 sm:h-12 w-auto object-contain" />
      <div className="flex flex-col">
        <span className="font-bold text-[#1c448d] text-sm sm:text-base">MEIS CLUBS</span>
        <span className="text-[10px] sm:text-xs text-gray-400 font-medium">© 2026 All rights reserved</span>
      </div>
    </div>
    <img src="https://i.ibb.co/60j7zv2f/ataa-preview.png" alt="ataa preview" className="h-10 sm:h-12 w-auto object-contain" />
  </footer>
);

type ClubDetail = {
  title: string;
  content?: string;
  bullets?: string[];
};

type Club = {
  id: number;
  title: string;
  src: string;
  bg: string;
  desc: string;
  banner: string;
  details: ClubDetail[];
};

const DEFAULT_DETAILS: ClubDetail[] = [
  {
    title: 'Origin',
    content: 'Established with the goal of nurturing student talent and providing a creative outlet beyond the standard curriculum. A place where ideas flourish.'
  },
  {
    title: 'Abilities & Skills',
    content: 'Members develop critical thinking, teamwork, advanced technical proficiencies, and creative problem-solving techniques.'
  },
  {
    title: 'Personality',
    content: 'Innovative, dedicated, highly collaborative, and always eager to learn and experiment with new concepts.'
  },
  {
    title: 'Requirements',
    bullets: [
      'Attend weekly meetings',
      'Participate in group projects',
      'Maintain a positive attitude'
    ]
  }
];

const DEFAULT_DETAILS1: ClubDetail[] = [
  {
    title: 'Hola',
    content: 'Established with the goal of nurturing student talent and providing a creative outlet beyond the standard curriculum. A place where ideas flourish.'
  },
  {
    title: 'Abilities & Skills',
    content: 'Members develop critical thinking, teamwork, advanced technical proficiencies, and creative problem-solving techniques.'
  },
  {
    title: 'Personality',
    content: 'Innovative, dedicated, highly collaborative, and always eager to learn and experiment with new concepts.'
  },
  {
    title: 'Requirements',
    bullets: [
      'Attend weekly meetings',
      'Participate in group projects',
      'Maintain a positive attitude'
    ]
  }
];




const CLUB_CATEGORIES: Record<string, Club[]> = {
  'Girls (Grade 1 to 6)': [
    { 
      id: 1, title: 'ROBOTICS CLUBB', src: '/images/girls-1-6/Art_design.png', bg: '#F4845F', 
      desc: 'Build, program, and innovate! Join us to explore the fascinating world of automation, coding, and engineering. Perfect for future inventors.',
      banner: '/images/girls-1-6/hello.png',
      details: DEFAULT_DETAILS
    },
    { 
      id: 2, title: 'ECO WARRIORS', src: '/images/girls-1-6/tech_coders.png', bg: '#6BBF7A', 
      desc: 'Dedicated to preserving our environment. We plant trees, run recycling campaigns, and learn about sustainable living to protect our planet.',
      banner: '/images/girls-1-6/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
    { 
      id: 3, title: 'ART & DESIGN', src: '/images/girls-1-6/Art_design.png', bg: '#E882B4', 
      desc: 'Unleash your creativity! From traditional canvas painting to digital 3D modeling, express yourself in a supportive, colorful environment.',
      banner: '/images/girls-1-6/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
    { 
      id: 4, title: 'TECH CODERS', src: '/images/girls-1-6/tech_coders.png', bg: '#6EB5FF', 
      desc: 'Dive deep into software development, web design, and app creation. No prior experience needed—just a passion for technology!',
      banner: '/images/girls-1-6/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
        { 
      id: 5, title: 'ART & DESIGN Hola', src: '/images/girls-1-6/Art_design.png', bg: '#E882B4', 
      desc: 'Unleash your creativity! From traditional canvas painting to digital 3D modeling, express yourself in a supportive, colorful environment.',
      banner: '/images/girls-1-6/placeholder-banner.jpg',
      details: DEFAULT_DETAILS1
    },
  
  ],
  'Girls (Grade 7 to 12)': [
    { 
      id: 1, title: 'ROBOTICS CLUB', src: '/images/girls-7-12/placeholder-mascot.png', bg: '#F4845F', 
      desc: 'Build, program, and innovate! Join us to explore the fascinating world of automation, coding, and engineering. Perfect for future inventors.',
      banner: '/images/girls-7-12/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
    { 
      id: 2, title: 'ECO WARRIORS', src: '/images/girls-7-12/placeholder-mascot.png', bg: '#6BBF7A', 
      desc: 'Dedicated to preserving our environment. We plant trees, run recycling campaigns, and learn about sustainable living to protect our planet.',
      banner: '/images/girls-7-12/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
    { 
      id: 3, title: 'ART & DESIGN', src: '/images/girls-7-12/placeholder-mascot.png', bg: '#E882B4', 
      desc: 'Unleash your creativity! From traditional canvas painting to digital 3D modeling, express yourself in a supportive, colorful environment.',
      banner: '/images/girls-7-12/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
    { 
      id: 4, title: 'TECH CODERS', src: '/images/girls-7-12/placeholder-mascot.png', bg: '#6EB5FF', 
      desc: 'Dive deep into software development, web design, and app creation. No prior experience needed—just a passion for technology!',
      banner: '/images/girls-7-12/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
  ],
  'Boys (Grade 4 to 6)': [
    { 
      id: 1, title: 'ROBOTICS CLUB', src: '/images/boys-4-6/placeholder-mascot.png', bg: '#F4845F', 
      desc: 'Build, program, and innovate! Join us to explore the fascinating world of automation, coding, and engineering. Perfect for future inventors.',
      banner: '/images/boys-4-6/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
    { 
      id: 2, title: 'ECO WARRIORS', src: '/images/boys-4-6/placeholder-mascot.png', bg: '#6BBF7A', 
      desc: 'Dedicated to preserving our environment. We plant trees, run recycling campaigns, and learn about sustainable living to protect our planet.',
      banner: '/images/boys-4-6/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
    { 
      id: 3, title: 'ART & DESIGN', src: '/images/boys-4-6/placeholder-mascot.png', bg: '#E882B4', 
      desc: 'Unleash your creativity! From traditional canvas painting to digital 3D modeling, express yourself in a supportive, colorful environment.',
      banner: '/images/boys-4-6/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
    { 
      id: 4, title: 'TECH CODERS', src: '/images/boys-4-6/placeholder-mascot.png', bg: '#6EB5FF', 
      desc: 'Dive deep into software development, web design, and app creation. No prior experience needed—just a passion for technology!',
      banner: '/images/boys-4-6/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
  ],
  'Boys (Grade 7 to 12)': [
    { 
      id: 1, title: 'ROBOTICS CLUB', src: '/images/boys-7-12/placeholder-mascot.png', bg: '#F4845F', 
      desc: 'Build, program, and innovate! Join us to explore the fascinating world of automation, coding, and engineering. Perfect for future inventors.',
      banner: '/images/boys-7-12/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
    { 
      id: 2, title: 'ECO WARRIORS', src: '/images/boys-7-12/placeholder-mascot.png', bg: '#6BBF7A', 
      desc: 'Dedicated to preserving our environment. We plant trees, run recycling campaigns, and learn about sustainable living to protect our planet.',
      banner: '/images/boys-7-12/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
    { 
      id: 3, title: 'ART & DESIGN', src: '/images/boys-7-12/placeholder-mascot.png', bg: '#E882B4', 
      desc: 'Unleash your creativity! From traditional canvas painting to digital 3D modeling, express yourself in a supportive, colorful environment.',
      banner: '/images/boys-7-12/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
    { 
      id: 4, title: 'TECH CODERS', src: '/images/boys-7-12/placeholder-mascot.png', bg: '#6EB5FF', 
      desc: 'Dive deep into software development, web design, and app creation. No prior experience needed—just a passion for technology!',
      banner: '/images/boys-7-12/placeholder-banner.jpg',
      details: DEFAULT_DETAILS
    },
  ],
};

type ViewState = 'home' | 'club-view';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('Girls (Grade 1 to 6)');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeCategoryClubs = CLUB_CATEGORIES[selectedCategory] || CLUB_CATEGORIES['Girls (Grade 1 to 6)'];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveIndex(0);
    setCurrentView('club-view');
  };

  const nextClub = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % activeCategoryClubs.length);
    setTimeout(() => setIsAnimating(false), 650);
  };

  const prevClub = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + activeCategoryClubs.length) % activeCategoryClubs.length);
    setTimeout(() => setIsAnimating(false), 650);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) {
        nextClub();
      } else if (distance < -50) {
        prevClub();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const scrollToDetails = () => {
    const detailsEl = document.getElementById('details-section');
    if (detailsEl) {
      detailsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'home') {
    return (
      <div className="h-[100dvh] w-full flex flex-col relative overflow-hidden animate-bg-gradient">
        <style>{globalStyles}</style>
        {/* Header */}
        <header className="w-full px-4 sm:px-8 py-4 flex items-center justify-between z-10 shrink-0">
          <img src="https://i.ibb.co/6cLqW0J6/meis-logo.png" alt="meis" className="h-12 sm:h-16 w-auto flex-shrink-0 drop-shadow-sm" />
          <div className="flex flex-col items-end justify-center ml-4">
             <span className="font-bold text-[#1c448d] tracking-tight text-[10px] sm:text-[14px] md:text-base whitespace-nowrap">Middle East International School - AlMuruj</span>
             <span className="font-bold text-[#1c448d] tracking-tight text-[10px] sm:text-[14px] md:text-base whitespace-nowrap" dir="rtl">مدرسة الشرق الأوسط العالمية - المروج</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center relative z-10 overflow-y-auto">
          <div className="flex flex-col items-center mb-10 sm:mb-16">
            <img src="https://i.ibb.co/mV2NWp4v/Clubs.png" alt="Clubs" className="h-28 sm:h-40 md:h-48 mb-2 sm:mb-4 object-contain" />
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-widest drop-shadow-sm animate-text-color uppercase">MEIS CLUBS</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl pb-8">
            {[
              { id: 'girls-1-6', label: 'Girls (Grade 1 to 6)', color: '#dd0922' },
              { id: 'girls-7-12', label: 'Girls (Grade 7 to 12)', color: '#ec881b' },
              { id: 'boys-4-6', label: 'Boys (Grade 4 to 6)', color: '#73ba11' },
              { id: 'boys-7-12', label: 'Boys (Grade 7 to 12)', color: '#19aca4' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleCategorySelect(btn.label)}
                className="font-display text-xl sm:text-2xl md:text-3xl py-6 sm:py-10 px-4 rounded-3xl border-4 bg-white/60 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:bg-white active:scale-[0.98] uppercase tracking-wide flex items-center justify-center text-center shadow-sm hover:shadow-md"
                style={{ borderColor: btn.color, color: btn.color }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Carousel Helper Functions
  const getCarouselStyle = (index: number) => {
    const total = activeCategoryClubs.length;
    const diff = (index - activeIndex + total) % total;

    if (diff === 0) {
      // Center
      return {
        transform: `translate(-50%, -50%) scale(${isMobile ? 1.3 : 1.6})`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        top: '55%',
      };
    } else if (diff === 1) {
      // Right
      return {
        transform: `translate(-50%, -50%) scale(${isMobile ? 0.6 : 0.7})`,
        filter: 'blur(4px)',
        opacity: 0.35,
        zIndex: 10,
        left: isMobile ? '80%' : '75%',
        top: '55%',
      };
    } else if (diff === total - 1) {
      // Left
      return {
        transform: `translate(-50%, -50%) scale(${isMobile ? 0.6 : 0.7})`,
        filter: 'blur(4px)',
        opacity: 0.35,
        zIndex: 10,
        left: isMobile ? '20%' : '25%',
        top: '55%',
      };
    } else {
      // Back
      return {
        transform: `translate(-50%, -50%) scale(0.5)`,
        filter: 'blur(6px)',
        opacity: 0.1,
        zIndex: 5,
        left: '50%',
        top: '55%',
      };
    }
  };

  const activeClub = activeCategoryClubs[activeIndex];

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* 100vh Hero Carousel Section */}
      <div 
        className="relative w-full h-[100dvh] overflow-hidden"
        style={{ 
          backgroundColor: activeClub.bg,
          transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Grain overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 z-50"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
          }}
        ></div>

        {/* Header (Top Left) */}
        <div className="absolute top-0 left-0 w-full p-6 sm:p-10 z-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentView('home')}
              className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex flex-nowrap items-center whitespace-nowrap overflow-hidden gap-3">
              <img src="https://i.ibb.co/6cLqW0J6/meis-logo.png" alt="meis" className="h-12 w-auto hidden sm:block object-contain" />
              <div className="leading-tight text-white hidden sm:block">
                <p className="text-[14px] font-bold tracking-tight">Middle East International School - AlMuruj</p>
                <p className="text-[12px] opacity-90 text-left" dir="rtl">مدرسة الشرق الأوسط العالمية - المروج</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/20 px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest border border-white/30 text-white">
              {selectedCategory}
            </div>
          </div>
        </div>

        {/* Giant ghost text */}
        <div 
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-[2]"
          style={{ top: '15%' }}
        >
          <h1 
            className="whitespace-nowrap font-display text-white uppercase opacity-60 tracking-[0.05em] sm:tracking-[0.1em]"
            style={{ fontSize: 'clamp(60px, 14vw, 200px)', lineHeight: 1 }}
          >
            MEIS CLUBS
          </h1>
        </div>

        {/* Carousel Container */}
        <div 
          className="absolute inset-0 z-20"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {activeCategoryClubs.map((club, index) => {
            const style = getCarouselStyle(index);
            return (
              <div
                key={club.id}
                className="absolute transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[650ms]"
                style={{
                  ...style,
                  width: isMobile ? '85vw' : '400px',
                  maxWidth: '450px',
                  height: isMobile ? '50vh' : '65vh',
                }}
              >
                <img 
                  src={club.src} 
                  alt={club.title}
                  className="w-full h-full object-contain object-center drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-6 sm:bottom-12 left-0 w-full px-6 sm:px-12 z-50 flex items-end justify-between pointer-events-none">
          {/* Left Side: Navigation Arrows & Swipe Text */}
          <div className="flex flex-col items-center sm:items-start gap-3 pointer-events-auto">
            <div className="sm:hidden text-white text-[12px] font-bold tracking-[0.2em] uppercase animate-pulse">
              SWIPE
            </div>
            <div className="flex gap-2 sm:gap-4">
              <button 
                onClick={prevClub}
                className="p-3 sm:p-4 rounded-xl bg-white/20 hover:bg-white/40 transition-all border border-white/20 text-white backdrop-blur-md hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
              </button>
              <button 
                onClick={nextClub}
                className="p-3 sm:p-4 rounded-xl bg-white/20 hover:bg-white/40 transition-all border border-white/20 text-white backdrop-blur-md hover:scale-105 active:scale-95"
              >
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Right Side: Discover It Button & Indicators */}
          <div className="flex flex-col items-end gap-6 pointer-events-auto">
            <div className="hidden sm:flex gap-1 mb-2">
              {activeCategoryClubs.map((_, idx) => (
                 <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-12 bg-white' : 'w-1.5 bg-white/30'}`}></div>
              ))}
            </div>
            <button 
              onClick={scrollToDetails}
              className="group flex items-center gap-2 sm:gap-3 bg-white text-black px-5 py-3 sm:px-8 sm:py-4 rounded-2xl font-display text-lg sm:text-2xl uppercase tracking-wide hover:scale-105 transition-transform shadow-xl whitespace-nowrap"
            >
              <span>Discover It</span>
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3px] group-hover:translate-y-1 transition-transform shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* Part B: Details Section */}
      <div id="details-section" className="w-full bg-white text-gray-800 py-16 sm:py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16">
            <div>
              <h2 
                className="font-display text-5xl sm:text-7xl mb-6 uppercase tracking-wide leading-none"
                style={{ color: activeClub.bg, transition: 'color 650ms ease' }}
              >
                {activeClub.title}
              </h2>
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed font-medium">
                {activeClub.desc}
              </p>
            </div>
            
            <div className="space-y-8 pt-2">
              {activeClub.details.map((detail, idx) => (
                <div key={idx}>
                  <h3 
                    className="font-bold text-xl uppercase tracking-wider mb-2"
                    style={{ color: activeClub.bg, transition: 'color 650ms ease' }}
                  >
                    {detail.title}
                  </h3>
                  {detail.content && (
                    <p className="text-gray-600 mb-2">
                      {detail.content}
                    </p>
                  )}
                  {detail.bullets && detail.bullets.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                      {detail.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full rounded-3xl overflow-hidden shadow-2xl mb-8 border border-gray-100">
            <img 
              src={activeClub.banner} 
              alt={`${activeClub.title} Banner`}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
            />
          </div>

          <div className="flex justify-center">
            <a 
              href={activeClub.banner}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 rounded-full text-white font-display uppercase tracking-widest text-xl shadow-xl transform transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: activeClub.bg, transition: 'background-color 650ms ease' }}
            >
              View Full Image
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

