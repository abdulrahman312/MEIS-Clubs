import { GradeSectionData } from '../types';

export const GRADE_SECTIONS: GradeSectionData[] = [
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
    externalClubs: ['Chess', 'Build It', 'Scout', 'Robotics', 'AI Awareness Club (Grade 9 to 12)'],
    externalRuleNote: 'Choose Package Falcon, OR ONE external club above.'
  }
];

export const getGradesForGradeBand = (gradeBand: string): string[] => {
  if (gradeBand.includes('1–3') || gradeBand.includes('1 to 3')) {
    return ['Grade 1', 'Grade 2', 'Grade 3'];
  }
  if (gradeBand.includes('4–6') || gradeBand.includes('4 to 6')) {
    return ['Grade 4', 'Grade 5', 'Grade 6'];
  }
  if (gradeBand.includes('7–12') || gradeBand.includes('7 to 12')) {
    return [
      'Grade 7',
      'Grade 8',
      'Grade 9',
      'Grade 10',
      'Grade 11',
      'Grade 12'
    ];
  }
  return ['Grade 1', 'Grade 2', 'Grade 3'];
};

export const SECTIONS_A_TO_Z = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);
