import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Building2,
  Users,
  Calendar,
  Clock,
  AlertCircle,
  Sparkles,
  Palette,
  Recycle,
  UtensilsCrossed,
  FlaskConical,
  Scissors,
  Activity,
  Sprout,
  HeartPulse,
  Drama as DramaIcon,
  Atom,
  KeyRound,
  Compass,
  Bot,
  Crown,
  Boxes,
  Cpu,
  User,
  CheckCircle2,
  Layers,
  ClipboardList
} from 'lucide-react';

interface RegistrationPageProps {
  onBack: () => void;
  onSelectCategory?: (category: string) => void;
  onOpenRegistrationForm?: () => void;
}

// Club icon mapping with matching visual color accents
export const getClubIcon = (clubName: string) => {
  const name = clubName.toLowerCase();
  if (name.includes('art & craft') || name === 'art') return <Palette className="w-5 h-5 text-rose-500" />;
  if (name.includes('recycled')) return <Recycle className="w-5 h-5 text-emerald-600" />;
  if (name.includes('cooking')) return <UtensilsCrossed className="w-5 h-5 text-amber-500" />;
  if (name.includes('chemist') || name.includes('kitchen')) return <FlaskConical className="w-5 h-5 text-teal-500" />;
  if (name.includes('crochet')) return <Scissors className="w-5 h-5 text-purple-500" />;
  if (name.includes('sport') || name.includes('zumba')) return <Activity className="w-5 h-5 text-emerald-500" />;
  if (name.includes('garden')) return <Sprout className="w-5 h-5 text-lime-600" />;
  if (name.includes('bio') || name.includes('anatomy')) return <HeartPulse className="w-5 h-5 text-red-500" />;
  if (name.includes('drama')) return <DramaIcon className="w-5 h-5 text-amber-600" />;
  if (name.includes('stem') || name.includes('nutty')) return <Atom className="w-5 h-5 text-blue-600" />;
  if (name.includes('escape')) return <KeyRound className="w-5 h-5 text-amber-700" />;
  if (name.includes('scout')) return <Compass className="w-5 h-5 text-emerald-700" />;
  if (name.includes('artificial') || name.includes('ai') || name.includes('genai')) return <Bot className="w-5 h-5 text-cyan-600" />;
  if (name.includes('chess')) return <Crown className="w-5 h-5 text-indigo-600" />;
  if (name.includes('robotics')) return <Cpu className="w-5 h-5 text-blue-500" />;
  if (name.includes('build')) return <Boxes className="w-5 h-5 text-orange-500" />;
  return <Sparkles className="w-5 h-5 text-primary" />;
};

interface GradeSectionData {
  id: string;
  title: string;
  gender: 'girls' | 'boys';
  gradeBand: string;
  themeColor: string;
  secondaryColor: string;
  categoryKey: string; // Key in existing App category mapper
  packages: {
    name: string;
    badgeLabel?: string;
    clubs: string[];
  }[];
  externalClubs: string[];
  externalRuleNote: string;
}

const GRADE_SECTIONS: GradeSectionData[] = [
  {
    id: 'girls-1-3',
    title: 'Girls — Grades 1 to 3',
    gender: 'girls',
    gradeBand: 'Grades 1–3',
    themeColor: '#be185d',
    secondaryColor: '#fdf2f8',
    categoryKey: 'Grades 1 to 3',
    packages: [
      {
        name: 'Tulip',
        badgeLabel: 'Curated Package',
        clubs: ['Art & Craft', 'Cooking', 'Sport', 'STEM']
      }
    ],
    externalClubs: ['Build It', 'Robotics'],
    externalRuleNote: 'Choose Package Tulip, OR one external club above.'
  },
  {
    id: 'girls-4-6',
    title: 'Girls — Grades 4 to 6',
    gender: 'girls',
    gradeBand: 'Grades 4–6',
    themeColor: '#c026d3',
    secondaryColor: '#fae8ff',
    categoryKey: 'Girls (Grade 4 to 6)',
    packages: [
      {
        name: 'Lily',
        badgeLabel: 'Package 1',
        clubs: ['Recycled Art', 'Cooking', 'Sport', 'Gardening']
      },
      {
        name: 'Daffodil',
        badgeLabel: 'Package 2',
        clubs: ['Art & Craft', 'Chemist Kitchen', 'Sport', 'Crochet']
      }
    ],
    externalClubs: ['Chess', 'Build It', 'STEM / Robotics'],
    externalRuleNote: 'Choose ONE Package (Lily or Daffodil), OR ONE external club instead.'
  },
  {
    id: 'girls-7-12',
    title: 'Girls — Grades 7 to 12',
    gender: 'girls',
    gradeBand: 'Grades 7–12',
    themeColor: '#9333ea',
    secondaryColor: '#faf5ff',
    categoryKey: 'Girls (Grade 7 to 12)',
    packages: [
      {
        name: 'Rose',
        badgeLabel: 'Package 1',
        clubs: ['Art & Craft', 'Sport / Zumba', 'Crochet', 'Cooking']
      },
      {
        name: 'Jasmine',
        badgeLabel: 'Package 2',
        clubs: ['Recycled Art', 'Sport / Zumba', 'Crochet', 'Cooking']
      }
    ],
    externalClubs: ['Chess', 'Build It', 'Scout', 'Robotics'],
    externalRuleNote: 'Choose ONE Package (Rose or Jasmine), OR ONE external club instead.'
  },
  {
    id: 'boys-1-3',
    title: 'Boys — Grades 1 to 3',
    gender: 'boys',
    gradeBand: 'Grades 1–3',
    themeColor: '#0284c7',
    secondaryColor: '#f0f9ff',
    categoryKey: 'Grades 1 to 3',
    packages: [
      {
        name: 'Ranger',
        badgeLabel: 'Curated Package',
        clubs: ['Art & Craft', 'Cooking', 'Sport', 'STEM']
      }
    ],
    externalClubs: ['Build It', 'Robotics'],
    externalRuleNote: 'Choose Package Ranger, OR one external club above.'
  },
  {
    id: 'boys-4-6',
    title: 'Boys — Grades 4 to 6',
    gender: 'boys',
    gradeBand: 'Grades 4–6',
    themeColor: '#0f766e',
    secondaryColor: '#f0fdfa',
    categoryKey: 'Boys (Grade 4 to 6)',
    packages: [
      {
        name: 'Titan',
        badgeLabel: 'Package 1',
        clubs: ['Sport/Scout', 'BIO VOYAGE', 'Drama - English', 'STEM – Nutty Science']
      },
      {
        name: 'Atlas',
        badgeLabel: 'Package 2',
        clubs: ['Sport/Scout', 'BIO VOYAGE', 'Drama - Arabic', 'STEM – Nutty Science']
      }
    ],
    externalClubs: ['Chess', 'Robotics', 'Build It'],
    externalRuleNote: 'Choose ONE Package (Titan or Atlas), OR ONE external club instead.'
  },
  {
    id: 'boys-7-12',
    title: 'Boys — Grades 7 to 12',
    gender: 'boys',
    gradeBand: 'Grades 7–12',
    themeColor: '#1e40af',
    secondaryColor: '#eff6ff',
    categoryKey: 'Boys (Grade 7 to 12)',
    packages: [
      {
        name: 'Falcon',
        badgeLabel: 'Curated Package',
        clubs: ['BIO VOYAGE', 'Escape the Room', 'Sport', 'Chemist Kitchen']
      }
    ],
    externalClubs: ['Chess', 'Build It', 'Scout', 'AI Awareness Club (Grade 9 to 12)'],
    externalRuleNote: 'Choose Package Falcon, OR ONE external club above.'
  }
];

export const RegistrationPage: React.FC<RegistrationPageProps> = ({
  onBack,
  onSelectCategory,
  onOpenRegistrationForm
}) => {
  // Always scroll to top when RegistrationPage mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Dropdown / Accordion state for each grade section (all collapsed by default)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'girls-1-3': false,
    'girls-4-6': false,
    'girls-7-12': false,
    'boys-1-3': false,
    'boys-4-6': false,
    'boys-7-12': false
  });

  // Filter dropdown: "all" or specific section ID
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [genderTab, setGenderTab] = useState<'all' | 'girls' | 'boys'>('all');

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    GRADE_SECTIONS.forEach((s) => (allOpen[s.id] = true));
    setOpenSections(allOpen);
  };

  const collapseAll = () => {
    const allClosed: Record<string, boolean> = {};
    GRADE_SECTIONS.forEach((s) => (allClosed[s.id] = false));
    setOpenSections(allClosed);
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedFilter(val);
    if (val !== 'all') {
      // Auto expand the chosen section
      setOpenSections((prev) => ({
        ...prev,
        [val]: true
      }));
      // Scroll to that section
      setTimeout(() => {
        const el = document.getElementById(`section-${val}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  // Filtered sections based on gender tab and dropdown filter
  const filteredSections = GRADE_SECTIONS.filter((section) => {
    if (selectedFilter !== 'all' && section.id !== selectedFilter) return false;
    if (genderTab === 'girls' && section.gender !== 'girls') return false;
    if (genderTab === 'boys' && section.gender !== 'boys') return false;
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3.5 sm:px-8 py-3 sm:py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm transition-all active:scale-95 shrink-0"
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <img src="/images/logo/club_logo.png" alt="MEIS Clubs" className="h-8 sm:h-9 w-auto object-contain shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-[#1c448d] text-sm sm:text-base leading-tight tracking-tight truncate">MEIS CLUBS</span>
                <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Parent Information & Registration Guide</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Academic Year 2026–2027
            </span>
            <img src="/images/logo/meis_logo.png" alt="MEIS Logo" className="h-8 sm:h-9 w-auto object-contain hidden xs:block" />
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-10 space-y-7 sm:space-y-12">
        
        {/* Hero Section: Presentation Intro */}
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1c448d] via-[#163673] to-[#0f2452] text-white p-5 sm:p-10 lg:p-12 shadow-xl border border-blue-900/30">
          {/* Background Decorative Rings */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none blur-2xl"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-400/10 pointer-events-none blur-2xl"></div>

          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Clubs Program & Registration
            </h1>

            <p className="text-xs sm:text-base md:text-lg text-blue-100/90 leading-relaxed font-normal">
              A comprehensive guide for parents explaining internal packages, external activities, category tracks, and simple registration options for students from Grade 1 to 12.
            </p>
          </div>
        </section>

        {/* CRITICAL NOTE BANNER (Slide 5 from presentation) */}
        <section className="rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-orange-500/15 border-2 border-amber-400/60 p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:block shrink-0">
              <div className="p-2.5 sm:p-3 bg-amber-500 text-white rounded-xl sm:rounded-2xl shadow-sm shrink-0">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="sm:hidden px-2.5 py-1 rounded-md bg-amber-500 text-white text-[11px] font-black uppercase tracking-wider">
                Important Rule
              </span>
            </div>
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="hidden sm:flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-white text-xs font-black uppercase tracking-wider">
                  Important Rule
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                You may choose ONE Package, OR ONE External Club at a time
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
                A <strong>Package</strong> is a curated bundle of internal clubs tailored for your child's grade band. If you prefer a single <strong>External Activity</strong> instead (such as Chess, Robotics, or Build It), that choice replaces the whole package for that session.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 1: Internal vs External Clubs Comparison (Slide 3) */}
        <section className="space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#1c448d] uppercase">Comparison Overview</span>
              <h2 className="text-xl sm:text-3xl font-bold text-slate-900">Internal Clubs vs. External Clubs</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">Understanding the two formats and delivery schedules</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Internal Clubs Card */}
            <div className="rounded-2xl bg-[#fff9f3] border-2 border-orange-200/80 p-4 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-[#e58319] text-white shadow-sm shrink-0">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-orange-800">Campus Delivered</span>
                    <h3 className="text-lg sm:text-xl font-bold text-orange-950">INTERNAL CLUBS</h3>
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm md:text-base text-slate-700">
                  <li className="flex items-start gap-2 sm:gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Delivered by MEIS teachers and staff</strong> directly on school campus.</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 shrink-0 mt-0.5" />
                    <span>Run during <strong>regular school hours</strong> as an integrated student experience.</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 shrink-0 mt-0.5" />
                    <span>Included as part of a <strong>curated grade-level Package</strong>.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-orange-200">
                <span className="text-[10px] sm:text-xs font-bold text-orange-800 uppercase tracking-wider block mb-2">Examples Included:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Art & Craft', 'Cooking', 'Crochet', 'Chemist Kitchen', 'Sport', 'Anatomy / Bio Voyage', 'STEM', 'Scout', 'AI'].map((ex, i) => (
                    <span key={i} className="px-2 sm:px-2.5 py-1 bg-white text-orange-900 text-[11px] sm:text-xs font-semibold rounded-lg border border-orange-200 shadow-2xs">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* External Clubs Card */}
            <div className="rounded-2xl bg-[#f0faf9] border-2 border-teal-200/80 p-4 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-[#139992] text-white shadow-sm shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-teal-800">Specialized Vendors</span>
                    <h3 className="text-lg sm:text-xl font-bold text-teal-950">EXTERNAL CLUBS</h3>
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm md:text-base text-slate-700">
                  <li className="flex items-start gap-2 sm:gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span>Delivered by <strong>specialised outside vendors & expert instructors</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span>Offered during <strong>school hours</strong>, or on <strong>Thursdays 1:00–2:00 PM</strong> according to demand.</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-2.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Chosen individually</strong> — replaces the grade-level package for that session.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-teal-200">
                <span className="text-[10px] sm:text-xs font-bold text-teal-800 uppercase tracking-wider block mb-2">Examples Included:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Chess', 'Robotics', 'Build It', 'Specialized AI'].map((ex, i) => (
                    <span key={i} className="px-2 sm:px-2.5 py-1 bg-white text-teal-900 text-[11px] sm:text-xs font-semibold rounded-lg border border-teal-200 shadow-2xs">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Three Ways to Join (Slide 8 from presentation) */}
        <section className="space-y-4 sm:space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#1c448d] uppercase">Registration Paths</span>
            <h2 className="text-xl sm:text-3xl font-bold text-slate-900">Registration — Three Ways to Join</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Choose the participation pathway that best suits your child’s weekly timetable</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Way 1 */}
            <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-100 text-orange-700 font-extrabold text-base sm:text-lg flex items-center justify-center border border-orange-200 shrink-0">
                      1
                    </span>
                    <div className="p-2 sm:p-2.5 bg-orange-50 rounded-xl text-orange-600 shrink-0">
                      <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-[11px] sm:text-xs font-bold shrink-0">
                    Package Track
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Internal Clubs</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    During regular school hours, as part of your child's chosen grade-level Package (e.g. Tulip, Lily, Titan, Falcon).
                  </p>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 text-[11px] sm:text-xs font-semibold text-slate-500">
                • Standard weekly school schedule
              </div>
            </div>

            {/* Way 2 */}
            <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-teal-100 text-teal-700 font-extrabold text-base sm:text-lg flex items-center justify-center border border-teal-200 shrink-0">
                      2
                    </span>
                    <div className="p-2 sm:p-2.5 bg-teal-50 rounded-xl text-teal-600 shrink-0">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-[11px] sm:text-xs font-bold shrink-0">
                    Single Specialization
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">External Clubs</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    During regular school hours, as an individually selected external club (replaces the grade package for that period).
                  </p>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 text-[11px] sm:text-xs font-semibold text-slate-500">
                • Individual expert vendor guidance
              </div>
            </div>

            {/* Way 3 */}
            <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-100 text-rose-700 font-extrabold text-base sm:text-lg flex items-center justify-center border border-rose-200 shrink-0">
                      3
                    </span>
                    <div className="p-2 sm:p-2.5 bg-rose-50 rounded-xl text-rose-600 shrink-0">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-[11px] sm:text-xs font-bold shrink-0">
                    After Hours / Demand
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Thursdays Session</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    <strong>1:00 PM – 2:00 PM</strong> on Thursdays, for external clubs held outside regular school hours according to parent and student demand.
                  </p>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 text-[11px] sm:text-xs font-semibold text-slate-500">
                • Extended activity time (Thursdays 1–2 PM)
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Six Categories by Type (Slide 4 from presentation) */}
        <section className="space-y-5">
          <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold tracking-wider text-[#1c448d] uppercase">Curricular Pillars</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Club Categories by Type</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">All clubs align across 6 developmental domains</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                num: '1',
                title: 'Creative Arts & Performing Arts',
                color: 'bg-rose-500',
                border: 'border-rose-200',
                bg: 'bg-rose-50/50',
                items: ['Art & Craft', 'Recycled Art', 'Crochet', 'Drama – Arabic', 'Drama – English']
              },
              {
                num: '2',
                title: 'STEM, Science & Technology',
                color: 'bg-amber-500',
                border: 'border-amber-200',
                bg: 'bg-amber-50/50',
                items: ['STEM', 'Robotics', 'AI', 'Anatomy / Bio Voyage', 'Chemist Kitchen', 'Build It']
              },
              {
                num: '3',
                title: 'Strategy, Thinking & Problem-Solving',
                color: 'bg-indigo-600',
                border: 'border-indigo-200',
                bg: 'bg-indigo-50/50',
                items: ['Chess', 'Escape the Room']
              },
              {
                num: '4',
                title: 'Life Skills & Sustainability',
                color: 'bg-emerald-600',
                border: 'border-emerald-200',
                bg: 'bg-emerald-50/50',
                items: ['Cooking', 'Gardening', 'Scout']
              },
              {
                num: '5',
                title: 'Sports & Wellbeing',
                color: 'bg-teal-500',
                border: 'border-teal-200',
                bg: 'bg-teal-50/50',
                items: ['Sport', 'Zumba']
              },
              {
                num: '6',
                title: 'Innovation & Future Skills',
                color: 'bg-purple-600',
                border: 'border-purple-200',
                bg: 'bg-purple-50/50',
                items: ['Build It', 'AI (Artificial Intelligence)', 'Robotics']
              }
            ].map((cat, idx) => (
              <div key={idx} className={`rounded-2xl border ${cat.border} ${cat.bg} p-5 flex flex-col justify-between shadow-2xs`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-lg ${cat.color} text-white font-bold text-xs flex items-center justify-center`}>
                      {cat.num}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{cat.title}</h3>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-xs sm:text-sm text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: ALL CLUBS DIRECTORY (Slides 6 & 7) */}
        <section className="space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold tracking-wider text-[#1c448d] uppercase">Directory</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">All Available Clubs Roster</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Quick catalog of internal campus clubs and vendor external clubs</p>
          </div>

          <div className="space-y-4">
            {/* Internal Clubs Grid */}
            <div className="p-4 sm:p-5 rounded-2xl bg-orange-50/50 border border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4 text-orange-600" />
                <h3 className="text-xs sm:text-sm font-bold text-orange-950 uppercase tracking-wide">Internal Clubs (13 Available)</h3>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5">
                {[
                  'Art & Craft',
                  'Recycled Art',
                  'Cooking',
                  'Chemist Kitchen',
                  'Crochet',
                  'Sport / Zumba',
                  'Gardening',
                  'BIO VOYAGE',
                  'Drama (English / Arabic)',
                  'STEM – Nutty Science',
                  'Escape the Room',
                  'Scout',
                  'Artificial Intelligence (AI)'
                ].map((club, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-orange-100 shadow-2xs">
                    <div className="shrink-0">
                      {getClubIcon(club)}
                    </div>
                    <span className="text-xs font-semibold text-slate-800 leading-snug break-words">{club}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* External Clubs Grid */}
            <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/50 border border-teal-200">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs sm:text-sm font-bold text-teal-950 uppercase tracking-wide">External Clubs</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                {['Chess', 'STEM / Robotics', 'Build It', 'AI Awareness Club (Grade 9 to 12)'].map((club, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-teal-100 shadow-2xs">
                    <div className="p-1.5 sm:p-2 bg-teal-50 rounded-lg shrink-0">
                      {getClubIcon(club)}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{club}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: GRADE PACKAGES WITH INTERACTIVE DROPDOWNS (Slides 9 - 16) */}
        <section className="space-y-5 sm:space-y-6 pt-2 sm:pt-4">
          <div className="border-b border-slate-200 pb-4">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#1c448d] uppercase">Curated Packages by Grade</span>
                <h2 className="text-xl sm:text-3xl font-bold text-slate-900">Grade Band Packages & Sections</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Click on any grade band dropdown to see its internal club packages and alternative external club options.
                </p>
              </div>

              {/* Controls: Jump Dropdown & Quick Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
                {/* Select dropdown requested by user */}
                <div className="relative w-full sm:min-w-[260px]">
                  <label htmlFor="grade-select" className="sr-only">Jump to Grade Band</label>
                  <select
                    id="grade-select"
                    value={selectedFilter}
                    onChange={handleDropdownChange}
                    className="w-full bg-white border-2 border-[#1c448d]/30 text-slate-800 text-xs sm:text-sm rounded-xl px-3 sm:px-3.5 py-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-[#1c448d] shadow-2xs cursor-pointer"
                  >
                    <option value="all">🔍 Show All Grade Bands</option>
                    <option value="girls-1-3">🌸 Girls — Grades 1 to 3 (Tulip)</option>
                    <option value="girls-4-6">🌸 Girls — Grades 4 to 6 (Lily / Daffodil)</option>
                    <option value="girls-7-12">🌸 Girls — Grades 7 to 12 (Rose / Jasmine)</option>
                    <option value="boys-1-3">⚡ Boys — Grades 1 to 3 (Ranger)</option>
                    <option value="boys-4-6">⚡ Boys — Grades 4 to 6 (Titan / Atlas)</option>
                    <option value="boys-7-12">⚡ Boys — Grades 7 to 12 (Falcon)</option>
                  </select>
                </div>

                {/* Expand / Collapse All */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={expandAll}
                    className="flex-1 sm:flex-initial px-3 py-2 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-center"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    className="flex-1 sm:flex-initial px-3 py-2 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-center"
                  >
                    Collapse All
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Gender Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3.5 sm:mt-4">
              <span className="text-xs font-bold text-slate-500 mr-1">Section:</span>
              <button
                onClick={() => setGenderTab('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  genderTab === 'all'
                    ? 'bg-[#1c448d] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Sections (6)
              </button>
              <button
                onClick={() => setGenderTab('girls')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  genderTab === 'girls'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                Girls (Grades 1–12)
              </button>
              <button
                onClick={() => setGenderTab('boys')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  genderTab === 'boys'
                    ? 'bg-sky-700 text-white shadow-sm'
                    : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                Boys (Grades 1–12)
              </button>
            </div>
          </div>

          {/* Render Grade Accordion Sections */}
          <div className="space-y-4 sm:space-y-6">
            {filteredSections.map((section) => {
              const isOpen = openSections[section.id] ?? false;
              const isGirls = section.gender === 'girls';

              return (
                <div
                  key={section.id}
                  id={`section-${section.id}`}
                  className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-sm transition-all duration-200"
                >
                  {/* Accordion / Dropdown Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-3.5 sm:px-7 py-3.5 sm:py-4.5 flex items-center justify-between text-left transition-colors hover:bg-slate-50 focus:outline-none"
                    style={{
                      borderLeft: `6px solid ${section.themeColor}`
                    }}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                      <div
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-xs shrink-0"
                        style={{ backgroundColor: section.themeColor }}
                      >
                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider"
                            style={{
                              backgroundColor: section.secondaryColor,
                              color: section.themeColor
                            }}
                          >
                            {isGirls ? 'Girls Section' : 'Boys Section'} • {section.gradeBand}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-xl font-bold text-slate-900 mt-0.5 leading-snug">
                          {section.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0 ml-2 sm:ml-4">
                      {/* Small "Expand" on top of the arrow */}
                      <span
                        className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-1 transition-colors select-none"
                        style={{ color: isOpen ? '#64748b' : section.themeColor }}
                      >
                        {isOpen ? 'Close' : 'Expand'}
                      </span>

                      {/* Arrow button with continuous box-themed color animation */}
                      {isOpen ? (
                        <div className="p-2 sm:p-2.5 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 shadow-2xs flex items-center justify-center">
                          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      ) : (
                        <motion.div
                          animate={{
                            scale: [1, 1.07, 1],
                            boxShadow: [
                              `0 0 0 0px ${section.themeColor}55`,
                              `0 0 0 7px ${section.themeColor}00`,
                              `0 0 0 0px ${section.themeColor}55`
                            ],
                            backgroundColor: [
                              section.secondaryColor,
                              `${section.themeColor}22`,
                              section.secondaryColor
                            ]
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className="p-2 sm:p-2.5 rounded-xl border-2 flex items-center justify-center shadow-xs"
                          style={{
                            borderColor: section.themeColor,
                            color: section.themeColor
                          }}
                        >
                          <motion.div
                            animate={{ y: [0, 2.5, 0] }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          >
                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.75]" />
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  </button>

                  {/* Accordion / Dropdown Body */}
                  {isOpen && (
                    <div className="p-3.5 sm:p-7 pt-2 sm:pt-2 border-t border-slate-100 bg-slate-50/50 space-y-4 sm:space-y-6 animate-in fade-in duration-200">
                      
                      {/* Packages Grid */}
                      <div>
                        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                          <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                            Available Package Options
                          </h4>
                          <span className="text-[10px] sm:text-[11px] text-slate-500">
                            {section.packages.length === 1 ? '1 Curated Package' : `${section.packages.length} Packages to choose from`}
                          </span>
                        </div>

                        <div className={`grid grid-cols-1 ${section.packages.length > 1 ? 'lg:grid-cols-2' : ''} gap-4 sm:gap-5`}>
                          {section.packages.map((pkg, pIdx) => (
                            <div
                              key={pIdx}
                              className="rounded-2xl border-2 bg-white p-4 sm:p-6 shadow-sm flex flex-col justify-between"
                              style={{ borderColor: `${section.themeColor}30` }}
                            >
                              <div className="space-y-3 sm:space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider text-white shrink-0"
                                      style={{ backgroundColor: section.themeColor }}
                                    >
                                      PACKAGE {section.packages.length > 1 ? pIdx + 1 : ''}
                                    </span>
                                    <h5 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                                      {pkg.name}
                                    </h5>
                                  </div>
                                  <span className="text-[11px] sm:text-xs font-semibold text-slate-500">
                                    {pkg.clubs.length} Clubs Included
                                  </span>
                                </div>

                                {/* Club Items inside Package */}
                                <div className="space-y-2 pt-1 border-t border-slate-100">
                                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                                    Clubs in Package {pkg.name}:
                                  </span>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                                    {pkg.clubs.map((club, cIdx) => (
                                      <div
                                        key={cIdx}
                                        className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 transition-colors shadow-2xs"
                                      >
                                        <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-100 shadow-2xs shrink-0">
                                          {getClubIcon(club)}
                                        </div>
                                        <span className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight leading-snug">{club}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* External Clubs Option Box (Matching slides) */}
                      <div className="rounded-2xl bg-teal-50/80 border-2 border-teal-200 p-4 sm:p-6 shadow-2xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-xl bg-[#139992] text-white shrink-0">
                              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                                Prefer an External Club instead?
                              </h4>
                              <p className="text-[11px] sm:text-xs text-slate-600">
                                You can choose ONE external club instead of the package:
                              </p>
                            </div>
                          </div>

                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-[11px] sm:text-xs font-bold text-teal-800 border border-teal-200 shadow-2xs shrink-0 self-start sm:self-auto">
                            <AlertCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <span>{section.externalRuleNote}</span>
                          </div>
                        </div>

                        {/* External clubs list */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                          {section.externalClubs.map((extClub, eIdx) => (
                            <div
                              key={eIdx}
                              className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 rounded-xl bg-white border border-teal-100 shadow-2xs hover:border-teal-200 transition-colors"
                            >
                              <div className="p-1.5 sm:p-2 rounded-lg bg-teal-50 border border-teal-100/60 shrink-0">
                                {getClubIcon(extClub)}
                              </div>
                              <span className="font-bold text-xs sm:text-sm text-teal-950 tracking-tight leading-snug">{extClub}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 6: STUDENT REGISTRATION ADVISORY NOTE & REGISTRATION BUTTON */}
        <section className="pt-4 sm:pt-6 border-t-2 border-slate-200">
          <div className="rounded-3xl bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/40 border-2 border-[#1c448d]/30 p-5 sm:p-8 md:p-10 shadow-lg relative overflow-hidden">
            {/* Background Decorative Accent */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#1c448d]/5 rounded-full pointer-events-none blur-3xl"></div>

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#1c448d] text-xs font-bold border border-blue-200 shadow-2xs">
                <ClipboardList className="w-4 h-4 text-[#1c448d]" />
                <span>Student Club Registration</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Ready to Register Your Child's Preference?
                </h2>
                <div className="h-1 w-20 bg-[#1c448d] mx-auto rounded-full"></div>
              </div>

              {/* Professional Advisory Note requested by user */}
              <div className="rounded-2xl bg-amber-50/95 border-2 border-amber-300/80 p-4 sm:p-5 text-left flex items-start gap-3.5 shadow-xs">
                <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5 shadow-2xs">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Important Notice for Parents:
                  </h3>
                  <p>
                    Please note that this registration is an <strong>initial preference survey</strong> to help the school check student interest and determine the number of students in each club. <strong>This is not the final registration.</strong>
                  </p>
                  <p>
                    Official physical registration forms, including complete club fees, detailed schedules, and final enrollment instructions, will be distributed to students directly in their classrooms by their floor supervisors.
                  </p>
                </div>
              </div>

              {/* Action Button to Open Registration Form */}
              <div className="pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    onOpenRegistrationForm?.();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl bg-[#1c448d] hover:bg-[#14336c] text-white font-extrabold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Student Registration</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-2.5">
                  Select grade band, student name, grade, section, and club preference
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-4 px-4 sm:px-8 flex justify-between items-center z-20 mt-auto">
        <div className="flex items-center gap-3">
          <img src="/images/logo/meis_logo.png" alt="meis logo" className="h-10 sm:h-12 w-auto object-contain" />
          <div className="flex flex-col">
            <span className="font-bold text-[#1c448d] text-sm sm:text-base">MEIS CLUBS</span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Middle East International School — Murooj</span>
          </div>
        </div>
        <img src="/images/logo/ataa_logo.png" alt="ataa logo" className="h-10 sm:h-12 w-auto object-contain" />
      </footer>
    </div>
  );
};
