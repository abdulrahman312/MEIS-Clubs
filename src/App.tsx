import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown, X } from 'lucide-react';

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
  banners?: string[];
  details: ClubDetail[];
};

const CLUB_CATEGORIES: Record<string, Club[]> = {
  'Grades 1 to 3': [
    { 
      id: 1, title: 'LITTLE EXPLORERS', src: '/images/grades-1-3/placeholder.png', bg: '#9b59b6', 
      desc: 'Fun, engaging, and educational activities designed specially for our youngest learners to spark their curiosity and imagination.',
      details: [
        { title: 'Origin', content: 'Designed specifically for early learners to explore the world.' },
        { title: 'Abilities & Skills', content: 'Focus on fine motor skills, social interaction, and basic cognitive abilities.' },
        { title: 'Requirements', bullets: ['Eagerness to play and learn', 'Positive attitude'] }
      ]
    },
  ],
  'Girls (Grade 4 to 6)': [
    { 
      id: 1, title: 'ROBOTICS CLUB', src: '/images/girls-4-6/Art_design.png', bg: '#F4845F', 
      desc: 'Build, program, and innovate! Join us to explore the fascinating world of automation, coding, and engineering. Perfect for future inventors.',
      banners: ['/images/girls-4-6/Art_design.png', '/images/girls-4-6/hello.png'],
      details: [
        { title: 'Origin', content: 'Established with the goal of nurturing student talent and providing a creative outlet beyond the standard curriculum. A place where ideas flourish.' },
        { title: 'Abilities & Skills', content: 'Members develop critical thinking, teamwork, advanced technical proficiencies, and creative problem-solving techniques.' },
        { title: 'Personality', content: 'Innovative, dedicated, highly collaborative, and always eager to learn and experiment with new concepts.' },
        { title: 'Requirements', bullets: ['Attend weekly meetings', 'Participate in group projects', 'Maintain a positive attitude'] }
      ]
    },
    { 
      id: 2, title: 'ECO WARRIORS', src: '/images/girls-4-6/tech_coders.png', bg: '#6BBF7A', 
      desc: 'Dedicated to preserving our environment. We plant trees, run recycling campaigns, and learn about sustainable living to protect our planet.',
      banners: ['/images/girls-4-6/tech_coders.png'],
      details: [
        { title: 'Origin', content: 'Formed by students passionate about nature and making a real-world environmental impact.' },
        { title: 'Abilities & Skills', content: 'Learn ecological awareness, project planning, and community outreach strategies.' },
        { title: 'Personality', content: 'Driven, caring, proactive, and environmentally conscious.' },
        { title: 'Requirements', bullets: ['Participate in weekend activities', 'Contribute ideas', 'Help organize events'] }
      ]
    },
    { 
      id: 3, title: 'ART & DESIGN', src: '/images/girls-4-6/Art_design.png', bg: '#E882B4', 
      desc: 'Unleash your creativity! From traditional canvas painting to digital 3D modeling, express yourself in a supportive, colorful environment.',
      banners: ['/images/girls-4-6/hi.png', '/images/girls-4-6/Art_design.png', '/images/girls-4-6/hello.png'],
      details: [
        { title: 'Origin', content: 'Created to provide a dedicated space for creative expression and artistic skill development.' },
        { title: 'Abilities & Skills', content: 'Mastering color theory, composition, various mediums, and visual storytelling.' },
        { title: 'Personality', content: 'Expressive, imaginative, patient, and open to feedback.' },
        { title: 'Requirements', bullets: ['Bring basic art supplies', 'Participate in exhibitions', 'Respect peer artwork'] }
      ]
    },
    { 
      id: 4, title: 'TECH CODERS', src: '/images/girls-4-6/tech_coders.png', bg: '#6EB5FF', 
      desc: 'Dive deep into software development, web design, and app creation. No prior experience needed—just a passion for technology!',
      details: [
        { title: 'Origin', content: 'Initiated to bridge the gap in digital literacy and prepare students for the modern technological landscape.' },
        { title: 'Abilities & Skills', content: 'Coding proficiency, logical structuring, debugging, and systems thinking.' },
        { title: 'Personality', content: 'Detail-oriented, persistent, logical, and enthusiastic about tech.' },
        { title: 'Requirements', bullets: ['Access to a computer', 'Willingness to practice coding', 'Collaborative mindset'] }
      ]
    },
  ],
  'Girls (Grade 7 to 12)': [
    { 
      id: 1, title: 'ROBOTICS CLUB', src: '/images/girls-7-12/placeholder-mascot.png', bg: '#F4845F', 
      desc: 'Build, program, and innovate! Join us to explore the fascinating world of automation, coding, and engineering. Perfect for future inventors.',
      banners: ['/images/girls-7-12/placeholder-banner.jpg'],
      details: [
        { title: 'Origin', content: 'Established with the goal of nurturing student talent and providing a creative outlet beyond the standard curriculum. A place where ideas flourish.' },
        { title: 'Abilities & Skills', content: 'Members develop critical thinking, teamwork, advanced technical proficiencies, and creative problem-solving techniques.' },
        { title: 'Personality', content: 'Innovative, dedicated, highly collaborative, and always eager to learn and experiment with new concepts.' },
        { title: 'Requirements', bullets: ['Attend weekly meetings', 'Participate in group projects', 'Maintain a positive attitude'] }
      ]
    },
    { 
      id: 2, title: 'ECO WARRIORS', src: '/images/girls-7-12/placeholder-mascot.png', bg: '#6BBF7A', 
      desc: 'Dedicated to preserving our environment. We plant trees, run recycling campaigns, and learn about sustainable living to protect our planet.',
      banners: ['/images/girls-7-12/placeholder-banner.jpg', '/images/girls-7-12/placeholder-mascot.png'],
      details: [
        { title: 'Origin', content: 'Established with the goal of nurturing student talent and providing a creative outlet beyond the standard curriculum. A place where ideas flourish.' },
        { title: 'Abilities & Skills', content: 'Members develop critical thinking, teamwork, advanced technical proficiencies, and creative problem-solving techniques.' },
        { title: 'Personality', content: 'Innovative, dedicated, highly collaborative, and always eager to learn and experiment with new concepts.' },
        { title: 'Requirements', bullets: ['Attend weekly meetings', 'Participate in group projects', 'Maintain a positive attitude'] }
      ]
    },
    { 
      id: 3, title: 'ART & DESIGN', src: '/images/girls-7-12/placeholder-mascot.png', bg: '#E882B4', 
      desc: 'Unleash your creativity! From traditional canvas painting to digital 3D modeling, express yourself in a supportive, colorful environment.',
      details: [
        { title: 'Origin', content: 'Established with the goal of nurturing student talent and providing a creative outlet beyond the standard curriculum. A place where ideas flourish.' },
        { title: 'Abilities & Skills', content: 'Members develop critical thinking, teamwork, advanced technical proficiencies, and creative problem-solving techniques.' },
        { title: 'Personality', content: 'Innovative, dedicated, highly collaborative, and always eager to learn and experiment with new concepts.' },
        { title: 'Requirements', bullets: ['Attend weekly meetings', 'Participate in group projects', 'Maintain a positive attitude'] }
      ]
    },
    { 
      id: 4, title: 'TECH CODERS', src: '/images/girls-7-12/placeholder-mascot.png', bg: '#6EB5FF', 
      desc: 'Dive deep into software development, web design, and app creation. No prior experience needed—just a passion for technology!',
      details: [
        { title: 'Origin', content: 'Established with the goal of nurturing student talent and providing a creative outlet beyond the standard curriculum. A place where ideas flourish.' },
        { title: 'Abilities & Skills', content: 'Members develop critical thinking, teamwork, advanced technical proficiencies, and creative problem-solving techniques.' },
        { title: 'Personality', content: 'Innovative, dedicated, highly collaborative, and always eager to learn and experiment with new concepts.' },
        { title: 'Requirements', bullets: ['Attend weekly meetings', 'Participate in group projects', 'Maintain a positive attitude'] }
      ]
    },
  ],
  'Boys (Grade 4 to 6)': [
    {
  id: 1,
  title: 'Scouting Club',
  src: '/images/boys-4-6/scout_cn.png',
  bg: '#EA7655',
  desc: 'عالم من المغامرة والاعتماد على النفس يجمع بين المتعة واستكشاف الطبيعة وتطوير الذات.',
  banners: ['/images/boys-4-6/scout.jpg'],
  details: [
    { title: 'Skills Gained', bullets: ['الاعتماد على النفس', 'تحمل المسؤولية', 'التعامل مع البيئة', 'التخييم', 'استخدام الخرائط والبوصلة', 'العقد والربطات', 'الإسعافات الأولية'] },
    { title: 'Expected Outcome', bullets: ['تطور السلوك والشخصية', 'تحسن روح الجماعة', 'اكتساب مهارات عمل جادة', 'ارتفاع مستوى اللياقة والنشاط'] }
  ]
},
{
  id: 2,
  title: 'نادي مدار',
  src: '/images/boys-4-6/madar_cn.png',
  bg: '#48BB78',
  desc: 'تدريب الطلاب على الإلقاء والخطابة والتحدث بالفصحى.',
  banners: ['/images/boys-4-6/madar.jpeg'],
  details: [
    { title: 'Skills Gained', content: 'تدريب الطلاب على الإلقاء والخطابة والتحدث بالفصحى.' },
    { title: 'Expected Outcome', content: 'تعلم مهارات الإلقاء والتحدث بالفصحى.' }
  ]
},
{
  id: 3,
  title: 'Drama Club',
  src: '/images/boys-4-6/drama_cn.png',
  bg: '#E26D9B',
  desc: "This 15-class program introduces boys in Grades 4–6 to the fundamentals of drama—voice, movement, character, improvisation, and performance—through progressively challenging rounds. Each round builds directly on the skills of the round before it and ends with a hands-on activity that lets students apply what they've learned in a fun, low-pressure setting. The program culminates in a Final Showcase performed for parents and the school community.",
  
  details: [
    { title: 'Skills Gained', bullets: ['Voice projection and clear speech', 'Physical and facial expression of emotion', 'Character creation and embodiment', 'Emotional range and convincing delivery', 'Script reading with expression', 'Stage-blocking vocabulary and technique'] },
    { title: 'Expected Outcome', bullets: ['Comfort and confidence within the group', 'Cooperation during unscripted group activities', 'Ability to stay in character while adapting to the unexpected', 'Successful casting and selection of the final showcase play', 'Confident full performance of the play, in costume, with props and cues, for a live audience'] }
  ]
},
{
  id: 4,
  title: 'STEM CLUB',
  src: '/images/boys-4-6/stem_cn.png',
  bg: '#4D9EE0',
  desc: 'STEM Club – Where Ideas Come to Life! A fun, hands-on club where students build, code, create, and innovate through exciting projects. Give your child the opportunity to learn by doing! Our STEM Club for Grades 4–6 introduces students to exciting real-world projects.',
  banners: ['/images/boys-4-6/STEM.jpg'],
  details: [
    { title: 'Skills Gained', bullets: ['Creativity & Innovation', 'Tech & Engineering', 'Coding & Programming', 'Problem-Solving & Critical Thinking', 'Design & Building Skills', 'Teamwork & Collaboration', 'Communication & Project Skills', 'Confidence & Hands-on Learning'] },
    { title: 'Expected Outcome', content: 'Create, Code, Solve, and Innovate. Students will develop creativity, coding, problem-solving, teamwork, and hands-on STEM skills through exciting real-world projects.' }
  ]
},
{
  id: 5,
  title: 'Bildits STEAM Construction Workshop by SAMACO',
  src: '/images/boys-4-6/bildits_cn.png',
  bg: '#E5A038',
  desc: 'Real Construction Experience.',
  banners: ['/images/boys-4-6/smaco1.jpg', '/images/boys-4-6/samaco2.jpg'],
  details: [
    { title: 'Skills Gained', bullets: ['21st-century skills', 'Fine motor skills', 'Planning', 'Patience', 'Communication', 'Responsibility'] },
    { title: 'Expected Outcome', content: 'Students will be able to face challenges, solve problems, think critically, set up goals, and plan to achieve them.' }
  ]
},
{
  id: 6,
  title: 'Bio Voyage club',
  src: '/images/boys-4-6/bio_cn.png',
  bg: '#8C7AE6',
  desc: 'The dissection club provides students with particular experience in anatomy and developing scientific skills.',
  banners: ['/images/boys-4-6/Bio Voyage.jpg'],
  details: [
    { title: 'Skills Gained', bullets: ['Respect for living organisms', 'Leadership', 'Connecting theory with practice', 'Curiosity', 'Teamwork'] },
    { title: 'Expected Outcome', content: 'Prepare students for future careers.' }
  ]
},
{
  id: 7,
  title: "Tomorrow's Code Club",
  src: '/images/boys-4-6/tomorrow_cn.png',
  bg: '#319795',
  desc: 'An interactive STEM & Robotics club where students explore hands-on engineering, block-based coding, and physical computing. Through building real-world models and programming autonomous systems, students learn problem-solving, critical thinking, and the fundamentals of modern technology in a fun, collaborative environment.',
  banners: ['/images/boys-4-6/Tomorrow Code.png'],
  details: [
    { 
      title: 'Skills Gained', 
      bullets: [
        'Problem-Solving & Algorithmic Thinking', 
        'STEM & Mechanical Engineering Principles (Gears, Levers, & Motion)', 
        'Block-Based Coding & Logic Design', 
        'Teamwork, Collaboration, & Communication', 
        'Creative Thinking & Innovation'
      ] 
    },
    { 
      title: 'Expected Outcome', 
      bullets: [
        'Ability to design, build, and program functional robotic and mechanical models.', 
        'Strong understanding of basic programming concepts (loops, conditions, variables, and functions).', 
        'Enhanced logical reasoning and analytical skills to debug and troubleshoot technical challenges.', 
        'Completion of practical STEM projects ready for presentation and competition.'
      ] 
    }
  ]
}
  ],
  'Boys (Grade 7 to 12)': [
    { 
      id: 1, title: 'ROBOTICS CLUB', src: '/images/boys-7-12/placeholder-mascot.png', bg: '#F4845F', 
      desc: 'Build, program, and innovate! Join us to explore the fascinating world of automation, coding, and engineering. Perfect for future inventors.',
      details: [
        { title: 'Origin', content: 'Established with the goal of nurturing student talent and providing a creative outlet beyond the standard curriculum. A place where ideas flourish.' },
        { title: 'Abilities & Skills', content: 'Members develop critical thinking, teamwork, advanced technical proficiencies, and creative problem-solving techniques.' },
        { title: 'Personality', content: 'Innovative, dedicated, highly collaborative, and always eager to learn and experiment with new concepts.' },
        { title: 'Requirements', bullets: ['Attend weekly meetings', 'Participate in group projects', 'Maintain a positive attitude'] }
      ]
    },
    { 
      id: 2, title: 'ECO WARRIORS', src: '/images/boys-7-12/placeholder-mascot.png', bg: '#6BBF7A', 
      desc: 'Dedicated to preserving our environment. We plant trees, run recycling campaigns, and learn about sustainable living to protect our planet.',
      details: [
        { title: 'Origin', content: 'Established with the goal of nurturing student talent and providing a creative outlet beyond the standard curriculum. A place where ideas flourish.' },
        { title: 'Abilities & Skills', content: 'Members develop critical thinking, teamwork, advanced technical proficiencies, and creative problem-solving techniques.' },
        { title: 'Personality', content: 'Innovative, dedicated, highly collaborative, and always eager to learn and experiment with new concepts.' },
        { title: 'Requirements', bullets: ['Attend weekly meetings', 'Participate in group projects', 'Maintain a positive attitude'] }
      ]
    },
    { 
      id: 3, title: 'ART & DESIGN', src: '/images/boys-7-12/placeholder-mascot.png', bg: '#E882B4', 
      desc: 'Unleash your creativity! From traditional canvas painting to digital 3D modeling, express yourself in a supportive, colorful environment.',
      banners: ['/images/boys-7-12/placeholder-banner.jpg', '/images/boys-7-12/placeholder-mascot.png', '/images/boys-7-12/placeholder-banner.jpg'],
      details: [
        { title: 'Origin', content: 'Established with the goal of nurturing student talent and providing a creative outlet beyond the standard curriculum. A place where ideas flourish.' },
        { title: 'Abilities & Skills', content: 'Members develop critical thinking, teamwork, advanced technical proficiencies, and creative problem-solving techniques.' },
        { title: 'Personality', content: 'Innovative, dedicated, highly collaborative, and always eager to learn and experiment with new concepts.' },
        { title: 'Requirements', bullets: ['Attend weekly meetings', 'Participate in group projects', 'Maintain a positive attitude'] }
      ]
    },
    { 
      id: 4, title: 'TECH CODERS', src: '/images/boys-7-12/placeholder-mascot.png', bg: '#6EB5FF', 
      desc: 'Dive deep into software development, web design, and app creation. No prior experience needed—just a passion for technology!',
      details: [
        { title: 'Origin', content: 'Established with the goal of nurturing student talent and providing a creative outlet beyond the standard curriculum. A place where ideas flourish.' },
        { title: 'Abilities & Skills', content: 'Members develop critical thinking, teamwork, advanced technical proficiencies, and creative problem-solving techniques.' },
        { title: 'Personality', content: 'Innovative, dedicated, highly collaborative, and always eager to learn and experiment with new concepts.' },
        { title: 'Requirements', bullets: ['Attend weekly meetings', 'Participate in group projects', 'Maintain a positive attitude'] }
      ]
    },
  ],
};

type ViewState = 'home' | 'club-view';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('Girls (Grade 4 to 6)');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  const [showRegistration, setShowRegistration] = useState(false);
  const [fullBannerOpen, setFullBannerOpen] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (fullBannerOpen) {
        setFullBannerOpen(false);
      } else if (showRegistration) {
        setShowRegistration(false);
      } else if (currentView !== 'home') {
        setCurrentView('home');
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView, fullBannerOpen, showRegistration]);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setBannerIndex(0);
  }, [activeIndex, selectedCategory]);

  const activeCategoryClubs = CLUB_CATEGORIES[selectedCategory] || CLUB_CATEGORIES['Girls (Grade 4 to 6)'];
  const activeClub = activeCategoryClubs[activeIndex];

  const openRegistration = () => {
    setShowRegistration(true);
    window.history.pushState({ view: 'registration' }, '', '#registration');
  };

  const closeRegistration = () => {
    if (window.history.state?.view === 'registration') {
      window.history.back();
    } else {
      setShowRegistration(false);
    }
  };

  const openFullBanner = () => {
    setFullBannerOpen(true);
    window.history.pushState({ view: 'full-banner' }, '', '#banner');
  };

  const closeFullBanner = () => {
    if (window.history.state?.view === 'full-banner') {
      window.history.back();
    } else {
      setFullBannerOpen(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveIndex(0);
    setCurrentView('club-view');
    window.history.pushState({ view: 'club-view' }, '', '#club');
  };

  const goHome = () => {
    if (window.history.state?.view === 'club-view') {
      window.history.back();
    } else {
      setCurrentView('home');
    }
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
        <header className="w-full px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between z-10 shrink-0">
          <img src="https://i.ibb.co/6cLqW0J6/meis-logo.png" alt="meis" className="h-10 sm:h-16 w-auto flex-shrink-0 drop-shadow-sm" />
          <div className="flex flex-col items-end justify-center ml-4">
             <span className="font-bold text-[#1c448d] tracking-tight text-[10px] sm:text-[14px] md:text-base whitespace-nowrap">Middle East International School - AlMuruj</span>
             <span className="font-bold text-[#1c448d] tracking-tight text-[10px] sm:text-[14px] md:text-base whitespace-nowrap" dir="rtl">مدرسة الشرق الأوسط العالمية - المروج</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-start sm:justify-center relative z-10 min-h-0">
          <div className="flex flex-col items-center mb-6 sm:mb-12 mt-4 sm:mt-0 shrink-0">
            <img src="https://i.ibb.co/mV2NWp4v/Clubs.png" alt="Clubs" className="h-20 sm:h-32 md:h-40 mb-2 sm:mb-4 object-contain" />
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-widest drop-shadow-sm animate-text-color uppercase">MEIS CLUBS</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 w-full max-w-3xl flex-1 sm:flex-none overflow-y-auto sm:overflow-visible pb-4 sm:pb-0 hide-scrollbar">
            {[
              { id: 'grades-1-3', label: 'Grades 1 to 3', color: '#9b59b6' },
              { id: 'girls-4-6', label: 'Girls (Grade 4 to 6)', color: '#dd0922' },
              { id: 'girls-7-12', label: 'Girls (Grade 7 to 12)', color: '#ec881b' },
              { id: 'boys-4-6', label: 'Boys (Grade 4 to 6)', color: '#73ba11' },
              { id: 'boys-7-12', label: 'Boys (Grade 7 to 12)', color: '#19aca4' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleCategorySelect(btn.label)}
                className="font-display text-lg sm:text-xl md:text-2xl py-4 sm:py-8 px-4 rounded-2xl sm:rounded-3xl border-[3px] sm:border-4 bg-white/60 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:bg-white active:scale-[0.98] uppercase tracking-wide flex items-center justify-center text-center shadow-sm hover:shadow-md min-h-[60px]"
                style={{ borderColor: btn.color, color: btn.color }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-4 pb-6 w-full max-w-3xl flex justify-center shrink-0">
            <button 
              onClick={openRegistration}
              className="px-8 py-3 bg-[#1c448d] hover:bg-[#14336c] text-white rounded-full font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Registration Details
            </button>
          </div>
        </main>

        <Footer />

        {/* Registration Modal */}
        {showRegistration && (
          <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-4 sm:p-6 border-b flex justify-between items-center bg-gray-50 shrink-0">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c448d] uppercase tracking-wider">Registration Details</h2>
                <button 
                  onClick={closeRegistration} 
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="space-y-6 text-gray-700">
                  <p className="font-medium text-lg">Welcome to MEIS Clubs Registration!</p>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-900 mb-2">Registration Period</h3>
                    <p>Opens: September 15th, 2026</p>
                    <p>Closes: September 30th, 2026</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Instructions:</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Ensure you select the appropriate club for your grade level.</li>
                      <li>Spaces are limited and assigned on a first-come, first-served basis.</li>
                      <li>Each student can register for a maximum of two clubs.</li>
                      <li>Parental consent forms must be submitted physically to the homeroom teacher.</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-500 italic mt-6">
                    * This is dummy data for now. Full registration links and detailed instructions will be added shortly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
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
        <div className="absolute top-0 left-0 w-full p-4 sm:p-10 z-50 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={goHome}
              className="p-2 sm:p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex flex-nowrap items-center whitespace-nowrap overflow-hidden gap-2 sm:gap-3">
              <img src="https://i.ibb.co/6cLqW0J6/meis-logo.png" alt="meis" className="h-8 sm:h-12 w-auto hidden sm:block object-contain" />
              <div className="leading-tight text-white hidden sm:block">
                <p className="text-[12px] sm:text-[14px] font-bold tracking-tight">Middle East International School - AlMuruj</p>
                <p className="text-[10px] sm:text-[12px] opacity-90 text-left" dir="rtl">مدرسة الشرق الأوسط العالمية - المروج</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <div className="bg-white/20 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-[12px] font-bold uppercase tracking-widest border border-white/30 text-white truncate max-w-[150px] sm:max-w-none">
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
        <div className="absolute bottom-6 sm:bottom-12 left-0 w-full px-4 sm:px-12 z-50 flex items-end justify-between pointer-events-none">
          {/* Left Side: Navigation Arrows & Swipe Text */}
          <div className="flex flex-col items-center sm:items-start gap-3 pointer-events-auto">
            <div className="sm:hidden text-white text-[10px] font-bold tracking-[0.2em] uppercase animate-pulse">
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
          <div className="flex flex-col items-end gap-4 sm:gap-6 pointer-events-auto">
            <div className="hidden sm:flex gap-1 mb-2">
              {activeCategoryClubs.map((_, idx) => (
                 <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-12 bg-white' : 'w-1.5 bg-white/30'}`}></div>
              ))}
            </div>
            <button 
              onClick={scrollToDetails}
              className="group flex items-center gap-2 sm:gap-3 bg-white text-black px-4 py-3 sm:px-8 sm:py-4 rounded-2xl font-display text-base sm:text-2xl uppercase tracking-wide hover:scale-105 transition-transform shadow-xl whitespace-nowrap"
            >
              <span>Discover It</span>
              <ArrowDown className="w-4 h-4 sm:w-6 sm:h-6 stroke-[3px] group-hover:translate-y-1 transition-transform shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* Part B: Details Section */}
      <div id="details-section" className="w-full bg-white text-gray-800 py-12 sm:py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 mb-12 sm:mb-16">
            <div>
              <h2 
                className="font-display text-4xl sm:text-7xl mb-4 sm:mb-6 uppercase tracking-wide leading-none"
                style={{ color: activeClub.bg, transition: 'color 650ms ease' }}
              >
                {activeClub.title}
              </h2>
              <p className="text-lg sm:text-2xl text-gray-600 leading-relaxed font-medium">
                {activeClub.desc}
              </p>
            </div>
            
            <div className="space-y-6 sm:space-y-8 pt-2">
              {activeClub.details.map((detail, idx) => (
                <div key={idx}>
                  <h3 
                    className="font-bold text-lg sm:text-xl uppercase tracking-wider mb-2"
                    style={{ color: activeClub.bg, transition: 'color 650ms ease' }}
                  >
                    {detail.title}
                  </h3>
                  {detail.content && (
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">
                      {detail.content}
                    </p>
                  )}
                  {detail.bullets && detail.bullets.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 space-y-1 sm:space-y-2 mt-2 text-sm sm:text-base">
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

          {activeClub.banners && activeClub.banners.length > 0 && (
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4">
                {activeClub.banners.length > 1 && (
                  <button 
                    onClick={() => setBannerIndex(prev => (prev - 1 + activeClub.banners!.length) % activeClub.banners!.length)}
                    className="p-1 sm:p-2 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                    style={{ color: activeClub.bg }}
                  >
                    <ArrowLeft className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2} />
                  </button>
                )}
                <button 
                  onClick={openFullBanner}
                  className="px-8 py-3 sm:px-10 sm:py-4 rounded-full text-white font-display uppercase tracking-widest text-sm sm:text-lg shadow-xl transform transition-transform hover:scale-105 active:scale-95 focus:outline-none"
                  style={{ backgroundColor: activeClub.bg, transition: 'background-color 650ms ease' }}
                >
                  View Full Image
                </button>
                {activeClub.banners.length > 1 && (
                  <button 
                    onClick={() => setBannerIndex(prev => (prev + 1) % activeClub.banners!.length)}
                    className="p-1 sm:p-2 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                    style={{ color: activeClub.bg }}
                  >
                    <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2} />
                  </button>
                )}
              </div>
              
              <div className="w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex justify-center bg-gray-50 relative group">
                <img 
                  key={bannerIndex}
                  src={activeClub.banners[bannerIndex]} 
                  alt={`${activeClub.title} Banner ${bannerIndex + 1}`}
                  className="w-full max-w-3xl h-auto object-contain transition-opacity duration-300 animate-in fade-in"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Full Banner Modal */}
      {fullBannerOpen && activeClub.banners && activeClub.banners.length > 0 && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute top-0 w-full p-4 flex justify-end z-[210]">
            <button 
              onClick={closeFullBanner}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>
          <div className="w-full h-full p-4 sm:p-12 flex items-center justify-center relative">
            {activeClub.banners.length > 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setBannerIndex(prev => (prev - 1 + activeClub.banners!.length) % activeClub.banners!.length);
                }}
                className="absolute left-2 sm:left-8 p-3 sm:p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95 z-[210]"
              >
                <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}
            
            <img 
              key={bannerIndex}
              src={activeClub.banners[bannerIndex]} 
              alt={`Full Banner View ${bannerIndex + 1}`} 
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl select-none transition-opacity duration-300 animate-in fade-in"
            />
            
            {activeClub.banners.length > 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setBannerIndex(prev => (prev + 1) % activeClub.banners!.length);
                }}
                className="absolute right-2 sm:right-8 p-3 sm:p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95 z-[210]"
              >
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}