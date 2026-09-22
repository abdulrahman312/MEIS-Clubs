import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown, X } from 'lucide-react';
import { RegistrationPage } from './components/RegistrationPage';

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
      <img src="/images/logo/meis_logo.png" alt="meis logo" className="h-10 sm:h-12 w-auto object-contain" />
      <div className="flex flex-col">
        <span className="font-bold text-[#1c448d] text-sm sm:text-base">MEIS CLUBS</span>
        <span className="text-[10px] sm:text-xs text-gray-400 font-medium">© 2026 All rights reserved</span>
      </div>
    </div>
    <img src="/images/logo/ataa_logo.png" alt="ataa preview" className="h-10 sm:h-12 w-auto object-contain" />
  </footer>
);

const isYouTubeMedia = (url?: string): boolean => {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
};

const isVideoMedia = (url?: string): boolean => {
  if (!url) return false;
  return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg') || url.includes('.mp4?');
};

const getYouTubeEmbedUrl = (url?: string, autoplay: boolean = false): string => {
  if (!url) return '';
  let videoId = '';
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) {
    videoId = shortsMatch[1];
  } else {
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) {
      videoId = watchMatch[1];
    } else {
      const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
      if (youtuBeMatch) {
        videoId = youtuBeMatch[1];
      }
    }
  }
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?rel=0${autoplay ? '&autoplay=1' : ''}`;
  }
  if (url.includes('youtube.com/embed/')) {
    return `${url}${url.includes('?') ? '&' : '?'}rel=0${autoplay ? '&autoplay=1' : ''}`;
  }
  return url;
};

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
      id: 1, title: 'Art & Craft', src: '/images/grades-1-3/art_cn.png', bg: '#FF6B81',  
      desc: 'A fun club where students explore drawing, painting, coloring, crafts, and creative art projects.', 
      banners: ['/images/grades-1-3/ART.png'], 
      details: [ 
        { title: 'Skills Gained', content: 'Creativity,imagination, focus, and artistic expression.' }, 
        { title: 'Expected Outcome', content: 'Students will create their own artwork, explore different art techniques, and build confidence in expressing their ideas creatively.' } 
         
      ] 
    }, 
    {  
      id: 2, title: 'BUILD-IT', src: '/images/grades-1-3/buildit_cn.png', bg: '#FFA502',  
      desc: 'The Build It Club is a STEM club for Grades 1, 2, and 3. It encourages students to explore Science, Technology, Engineering, and Mathematics through fun, hands-on activities. Students will design, build, experiment, and solve problems while working together on creative STEM projects.', 
      banners: ['/images/grades-1-3/BUILD-IT(1).jpeg', '/images/grades-1-3/BUILD-IT(2).jpeg'], 
      details: [ 
        { title: 'Skills Gained', bullets: ['Creativity and imagination', 'Problem-solving and critical thinking', 'Teamwork and collaboration', 'Communication skills', 'Basic engineering and design skills', 'Scientific inquiry and experimentation', 'Building and construction skills', 'Innovation and logical thinking'] }, 
        { title: 'Expected Outcome', bullets: ['Apply basic STEM concepts through practical activities.', 'Design and build simple models and projects.', 'Use problem-solving skills to overcome challenges.', 'Work cooperatively with their classmates.', 'Develop creativity, confidence, and curiosity.', 'Explain their ideas and present their completed projects.', 'Demonstrate an interest in science, technology, engineering, and mathematics.'] } 
         
      ] 
    }, 
    {  
      id: 3, title: 'Cooking', src: '/images/grades-1-3/cooking_cn.png', bg: '#FF4757',  
      desc: 'Fun, hands-on cooking activities where students prepare simple and healthy recipes.', 
      banners: ['/images/grades-1-3/COOKING.png'], 
      details: [ 
        { title: 'Skills Gained', content: 'Cooking basics, teamwork, creativity, hygiene, and following instructions.' }, 
        { title: 'Expected Outcome', content: 'Students will safely prepare simple recipes, work as a team, and gain confidence in the kitchen.' } 
         
      ] 
    }, 
    {  
      id: 4, title: 'Robotics', src: '/images/grades-1-3/robotics_cn.png', bg: '#1E90FF',  
      desc: 'An interactive STEM & Robotics club where students explore hands-on engineering, block-based coding, and physical computing. Through building real-world models and programming autonomous systems, students learn problem-solving, critical thinking, and the fundamentals of modern technology in a fun, collaborative environment.', 
      banners: ['/images/grades-1-3/ROBOTICS.png'], 
      details: [ 
        { title: 'Skills Gained', bullets: ['Problem-Solving & Algorithmic Thinking', 'STEM & Mechanical Engineering Principles (Gears, Levers, & Motion)', 'Block-Based Coding & Logic Design', 'Teamwork, Collaboration, & Communication', 'Creative Thinking & Innovation'] }, 
        { title: 'Expected Outcome', bullets: ['Ability to design, build, and program functional robotic and mechanical models.', 'Strong understanding of basic programming concepts (loops, conditions, variables, and functions).', 'Enhanced logical reasoning and analytical skills to debug and troubleshoot technical challenges.', 'Completion of practical STEM projects ready for presentation and competition.'] } 
      ] 
    }, 
    {  
      id: 5, title: 'Sports', src: '/images/grades-1-3/sports_cn.png', bg: '#2ED573',  
      desc: 'A fun club with sports, movement games, and team activities.', 
      banners: ['/images/grades-1-3/SPORTS.jpeg'], 
      details: [ 
        { title: 'Skills Gained', content: 'Teamwork, coordination, discipline, confidence, and fitness' }, 
        { title: 'Expected Outcome', content: 'Students will improve physical skills, follow rules, work in teams, and develop good sportsmanship.' } 
      ] 
    }, 
    {  
      id: 6, title: 'STEM', src: '/images/grades-1-3/stem_cn.png', bg: '#5352ED',  
      desc: 'A fun club where students explore science, technology, engineering, and math through simple hands-on activities.', 
      banners: ['/images/grades-1-3/STEM.jpeg'], 
      details: [ 
        { title: 'Skills Gained', content: 'Problem-solving, creativity, teamwork, critical thinking, and observation.' }, 
        { title: 'Expected Outcome', content: 'Students will enjoy STEM learning, build simple projects, solve challenges, and work confidently in teams.' } 
      ] 
    } 
 ],
  'Girls (Grade 4 to 6)': [
   {   
      id: 1, title: 'Chemist Kitchen', src: '/images/girls-4-6/chemist_cn.png', bg: '#34B399',   
      desc: 'Where Science Meets Flavor\n•In every session, we transform the kitchen into a real, safe laboratory for your children (Grades 4-6).\n•They won\'t just learn new recipes—they will discover the hidden chemistry and physics behind every reaction.',  
      banners: ['/images/girls-4-6/CHEMIST KITCHEN.jpeg'],  
      details: [  
        { title: 'Skills Gained', content: 'Developing hand skills,Precision & Focus, Fine motor activity, Fostering Curiosity' },  
        { title: 'Expected Outcome', content: 'Building Patience, Teamwork, Inspiring Future Careers' }  
          
      ]  
    },  
    {   
      id: 2, title: 'Cooking', src: '/images/girls-4-6/cooking_cn.png', bg: '#D76A8D',   
      desc: 'Cook and have fun ',  
      banners: ['/images/girls-4-6/COOKING.png'],  
      details: [  
        { title: 'Skills Gained', bullets: ['Teamwork and collaboration', 'Communication skills', 'Time management', 'Following instructions and recipes'] },  
        { title: 'Expected Outcome', bullets: ['Students gained basic cooking and food-preparation skills.', 'Students learned to follow recipes and instructions accurately.', 'Students developed teamwork and communication skills.'] }  
          
      ]  
    },  
    {   
      id: 3, title: 'Crochet', src: '/images/girls-4-6/crochet_cn.png', bg: '#667EEA',   
      desc: 'The Crochet Club is a fun and creative space where students can learn the art of crochet, develop new skills, and express their creativity through hands-on projects.\n\nProgram 1 – Grades 4–6:\nStudents will learn the basic crochet skills, including how to hold the hook and yarn, make simple stitches, and create small, colorful projects. The program focuses on creativity, patience, and confidence in a fun and supportive environment.\n\nProgram 2 – Grades 7–9:\nStudents will build on basic crochet techniques and explore more advanced stitches, patterns, and creative designs. They will work on larger and more detailed projects while developing independence, concentration, and artistic expression.',  
      banners: ['/images/girls-4-6/CROCHET.png'],  
      details: [  
        { title: 'Skills Gained', content: 'Bu the end of the club, students will be artistic, patient, passionate, and productive students.' },  
        { title: 'Expected Outcome', content: 'Enough products to be sold in a bazaar or in the Erax' }  
          
      ]  
    },  
    {   
      id: 4, title: 'Gardening', src: '/images/girls-4-6/gardening_cn.png', bg: '#7B9E46',   
      desc: 'A simple hands-on gardening activity where students decorate pots and plant sprouts to learn care and teamwork ',  
      banners: ['/images/girls-4-6/GARDENING.jpeg'],  
      details: [  
        { title: 'Skills Gained', content: 'Responsibility & care, Hands-on inquiry skills, Teamwork & collaboration, following steps & Procedures' },  
        { title: 'Expected Outcome', content: 'Students follow simple planting steps, students show responsibility, students express creativity ' }  
      ]  
    },  
    {   
      id: 5, title: 'Robotics', src: '/images/girls-4-6/robotics_cn.png', bg: '#2e3ae0',   
      desc: 'An interactive STEM & Robotics club where students explore hands-on engineering, block-based coding, and physical computing. Through building real-world models and programming autonomous systems, students learn problem-solving, critical thinking, and the fundamentals of modern technology in a fun, collaborative environment.',  
      banners: ['/images/girls-4-6/ROBOTICS.png'],  
      details: [  
        { title: 'Skills Gained', bullets: ['Problem-Solving & Algorithmic Thinking', 'STEM & Mechanical Engineering Principles (Gears, Levers, & Motion)', 'Block-Based Coding & Logic Design', 'Teamwork, Collaboration, & Communication', 'Creative Thinking & Innovation'] },  
        { title: 'Expected Outcome', bullets: ['Ability to design, build, and program functional robotic and mechanical models.', 'Strong understanding of basic programming concepts (loops, conditions, variables, and functions).', 'Enhanced logical reasoning and analytical skills to debug and troubleshoot technical challenges.', 'Completion of practical STEM projects ready for presentation and competition.'] }  
      ]  
    },  
    {   
      id: 6, title: 'Sports', src: '/images/girls-4-6/sports_cn.png', bg: '#6ebe06',   
      desc: 'The Sports Club for Grades 4–6 Girls empowers young female athletes through structured skill development, physical fitness, and dynamic team competitions.',  
      banners: ['/images/girls-4-6/SPORTS.jpeg'],  
      details: [  
        { title: 'Skills Gained', content: 'Athletic agility, teamwork, strategic sportsmanship, and physical endurance.' },  
        { title: 'Expected Outcome', content: 'Improved physical health, strong sportsmanship, enhanced teamwork abilities, and confidence in competitive play.' }  
      ]  
    },
    {   
      id: 7, title: 'BUILD IT', src: '/images/girls-4-6/buildit_cn.png', bg: '#1da7e7',   
      desc: 'The Build It Club is a STEM club for Grades 4-6. It encourages students to explore Science, Technology, Engineering, and Mathematics through fun, hands-on activities. Students will design, build, experiment, and solve problems while working together on creative STEM projects.',  
      banners: ['/images/girls-4-6/BUILD-IT(2).jpeg'],  
      details: [  
        { title: 'Skills Gained', bullets: ['Creativity and imagination', 'Problem-solving and critical thinking', 'Teamwork and collaboration', 'Communication skills', 'Basic engineering and design skills', 'Scientific inquiry and experimentation', 'Building and construction skills', 'Innovation and logical thinking'] }, 
        { title: 'Expected Outcome', bullets: ['Apply basic STEM concepts through practical activities.', 'Design and build simple models and projects.', 'Use problem-solving skills to overcome challenges.', 'Work cooperatively with their classmates.', 'Develop creativity, confidence, and curiosity.', 'Explain their ideas and present their completed projects.', 'Demonstrate an interest in science, technology, engineering, and mathematics.'] }   
      ]  
    }   

  ],
  'Girls (Grade 7 to 12)': [
{
  id: 1,
  title: 'CHESS', 
  src: '/images/girls-7-12/chess_cn.png',
  bg: '#ec6458',
  desc: ' An engaging and structured 8-week chess program designed to develop chess skills, strategic thinking, concentration, problem-solving, and confidence through interactive learning and practical play',
  banners: ['/images/girls-7-12/chess1.png', '/images/girls-7-12/chess2.png'],
  details: [
    { 
      title: 'Skills Gained', 
      bullets: [
      'Strategic Thinking',
        'Focus & Concentration',
        'Problem-Solving',
        'Sportsmanship',
        'Tactical & Positional Play',
        'Time Management & Rules Mastery'
      ] 
    },
    { 
      title: 'Expected Outcome', 
      bullets:[
        'Confidence & Competition',
        'Structured Journey Completion',
        'Championship Participation',
        'Recognition'
      ] 
    }
  ]
},
{
  id: 2,
  title: 'ART-CLUB',
  src: '/images/girls-7-12/art_cn.png',
  bg: '#5D9C59',
  desc: 'A fun club where students explore drawing, painting, coloring, crafts, and creative art projects.',
  banners: ['/images/girls-7-12/ART-CLUB.png'],
  
  details:
       [ 
        { title: 'Skills Gained', content: 'Creativity,imagination, focus, and artistic expression.' }, 
        { title: 'Expected Outcome', content: 'Students will create their own artwork, explore different art techniques, and build confidence in expressing their ideas creatively.' } 
         
      ] 
},
{
  id: 3,
  title: 'Zumba club',
  src: '/images/girls-7-12/zumba_cn.png',
  bg: '#D946A9',
  desc: 'An energetic Zumba fitness poster promoting fun, dance, fitness, confidence, and friendship for the girls.',
  banners: ['/images/girls-7-12/Zumba.jpeg'],
  details: [
    { 
      title: 'Skills Gained', 
      bullets: [
        'Fitness',
        'Coordination',
        'Rhythm',
        'Teamwork',
        'Confidence',
        'Social skills'
      ] 
    },
    { 
      title: 'Expected Outcome', 
      content: 'Improved physical health, positive mood, self-confidence, stronger friendships, and a greater enjoyment of sport and movement.' 
    }
  ]
},
{
  id: 4,
  title: 'Cooking club',
  src: '/images/girls-7-12/cooking_cn.png',
  bg: '#F4B400',
  desc: 'Fun, hands-on cooking activities where students prepare simple and healthy recipes.',
  
  banners: ['/images/girls-7-12/COOKING.png'],
  details: 
  
  [ 
   { title: 'Skills Gained', content: 'Cooking basics, teamwork, creativity, hygiene, and following instructions.' }, 
   { title: 'Expected Outcome', content: 'Students will safely prepare simple recipes, work as a team, and gain confidence in the kitchen.' } 
  ] 
},
{
  id: 5,
  title: 'Scout',
  src: '/images/girls-7-12/scout_cn.png',
  bg: '#4285F4',
  desc: 'The MEIS Scout Team is a student development program designed to build leadership, character, teamwork, discipline, and practical life skills through hands-on scouting activities.',
  banners: ['/images/girls-7-12/SCOUT.jpg'],
  details: [
    { 
      title: 'Skills Gained', 
      bullets: [
        'Leadership and decision-making skills',
        'Teamwork and effective communication',
        'Problem-solving and critical-thinking skills',
        'Self-discipline and responsibility',
        'First aid and basic emergency-response skills',
        'Navigation, map-reading, and outdoor skills',
        'Time management and organization',
        'Confidence, independence, and resilience',
        'Community service and volunteering skills',
        'Respect, cooperation, and positive citizenship'
      ] 
    },
    { 
      title: 'Expected Outcome', 
      bullets: [
        'Demonstrate greater confidence, leadership, and independence.',
        'Apply practical skills in real-life and emergency situations.',
        'Work effectively as part of a team and communicate respectfully with others.',
        'Demonstrate discipline, responsibility, and commitment.',
        'Take initiative and participate actively in school and community activities.'
      ] 
    }
  ]
},
{
  id: 6,
  title: 'Recycled ART',
  src: '/images/girls-7-12/recycled.png',
  bg: '#9C27B0',
  banners: ['/images/girls-7-12/Recycled.png'],
  desc: 'Recycled Art is a creative hands-on club where students transform everyday discarded materials into unique, eco-friendly artwork. By repurposing items like plastic, paper, and packaging, students explore artistic expression while learning the principles of sustainability and environmental responsibility.',
  details: [
    { 
      title: 'Skills Gained', 
      bullets: [
        'Creative Problem-Solving',
        'Teamwork and effective communication',
        'Fine Motor Skills',
        'Environmental Awareness',
        
      ] 
    },
    { 
      title: 'Expected Outcome', 
      bullets: [
        'Eco-Friendly Artwork',
        'Mindset Shift',
        'Pride of Creation',
        
      ] 
    },
  ]
},
 {
  id: 7,
  title: 'Build It',
  src: '/images/girls-7-12/buildit_cn.png',
  bg: '#4285F4',
  desc: 'The Build It Club is a STEM club for Grades 7-12. It encourages students to explore Science, Technology, Engineering, and Mathematics through fun, hands-on activities. Students will design, build, experiment, and solve problems while working together on creative STEM projects.',
  banners: ['/images/girls-7-12/BUILD-IT(2).jpeg'],
  details: [ 
        { title: 'Skills Gained', bullets: ['Creativity and imagination', 'Problem-solving and critical thinking', 'Teamwork and collaboration', 'Communication skills', 'Basic engineering and design skills', 'Scientific inquiry and experimentation', 'Building and construction skills', 'Innovation and logical thinking'] }, 
        { title: 'Expected Outcome', bullets: ['Apply basic STEM concepts through practical activities.', 'Design and build simple models and projects.', 'Use problem-solving skills to overcome challenges.', 'Work cooperatively with their classmates.', 'Develop creativity, confidence, and curiosity.', 'Explain their ideas and present their completed projects.', 'Demonstrate an interest in science, technology, engineering, and mathematics.'] } 
         
      ] 
},
{
  id: 8,
  title: 'CROCHET CLUB',
  src: '/images/girls-7-12/crochet_cn.png',
  bg: '#D946A9',
  desc: 'The Crochet Club is a fun and creative space where students can learn the art of crochet, develop new skills, and express their creativity through hands-on projects.\n\nProgram 1 – Grades 4–6:\nStudents will learn the basic crochet skills, including how to hold the hook and yarn, make simple stitches, and create small, colorful projects. The program focuses on creativity, patience, and confidence in a fun and supportive environment.\n\nProgram 2 – Grades 7–9:\nStudents will build on basic crochet techniques and explore more advanced stitches, patterns, and creative designs. They will work on larger and more detailed projects while developing independence, concentration, and artistic expression.',
  banners: ['/images/girls-7-12/CROCHET.png'],
  details: [  
        { title: 'Skills Gained', content: 'By the end of the club, students will be artistic, patient, passionate, and productive students.' },  
        { title: 'Expected Outcome', content: 'Enough products to be sold in a bazaar or in the Erax' }  
          
      ]  
},
  ],
  'Boys (Grade 4 to 6)': [
  {
  id: 1,
  title: 'Scouting Club',
  src: '/images/boys-4-6/scout_cn.png',
  bg: '#EA7655',
  desc: 'A four-week adventure that builds self-reliance, leadership, and teamwork. Members explore nature, learn essential survival skills, and participate in an immersive outdoor Scout trip and community service project.',
  banners: ['/images/boys-4-6/scout.jpg'],
  details: [
    { 
      title: 'Program Highlights', 
      bullets: [
        'First-aid training and compass navigation', 
        'Mastering basic rope knots (e.g., Joining Knot, Clove Hitch)', 
        'Outdoor Scout trip with hiking and environmental service', 
        'Hands-on community service projects and team-building games'
      ] 
    },
    { 
      title: 'Skills & Outcomes', 
      bullets: [
        'Enhanced teamwork, discipline, and a strong sense of belonging', 
        'Self-reliance and readiness in outdoor environments', 
        'Confidence in leadership, safety, and decision-making', 
        'Practical trip-planning and survival abilities'
      ] 
    }
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
  desc: "This program introduces boys in Grades 4–6 to the fundamentals of drama—voice, movement, character, improvisation, and performance—through progressively challenging rounds. Each round builds directly on the skills of the round before it and ends with a hands-on activity that lets students apply what they've learned in a fun, low-pressure setting. The program culminates in a Final Showcase performed for parents and the school community.",
  banners: ['/images/boys-4-6/drama1.jpeg', '/images/boys-4-6/drama2.jpeg', '/images/boys-4-6/drama3.jpeg'],
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
  id: 1,
  title: 'Bio Voyage Club (Dissection Club)',
  src: '/images/boys-7-12/bio_cn.png',
  bg: '#f3960a',
  desc: 'The Dissection club provides students with practical experience in anatomy while developing scientific skills, teamwork, and leadership.',
  banners: ['images/boys-7-12/Bio_voyage.png'],
  details: [
    { 
      title: 'Skills Gained', 
      content: 'Develop skills, encourage scientific creativity, and leadership.' 
    },
    { 
      title: 'Expected Outcome', 
      content: 'Understand the body and inspire the future.' 
    }
  ]
},
 {
  id: 2,
  title: 'AI Awareness Club',
  src: '/images/boys-7-12/ai_cn.png',
  bg: '#1360ee',
  desc: '"Gen AI Awareness Club" is specifically for our higher grades students. This club will consist of four learning sessions within a month. Goal: To make students aware of Generative AI, teach them how to use AI tools effectively and ethically, and inspire them to create innovative projects, potentially even complete applications using modern coding approaches.',
  banners: ['images/boys-7-12/GenAI.png', '/images/boys-7-12/ai_club.mp4'],
  details: [
    { 
      title: 'Skills Gained', 
      bullets: [
        'AI Fundamentals: Understand what Generative AI is, how large language models work in simple terms, and foundational principles for responsible AI usage.',
        'Brainstorming & Planning: Use AI tools like Gemini to ideate creative concepts, map out study schedules, and structure project roadmaps efficiently.',
        'Research & Insights: Leverage tools like NotebookLM to summarize complex documents, extract key insights, and conduct reliable academic research.',
        'Writing & Communicating: Master prompt engineering ("Talking to AI") to draft professional emails, refine essays, and communicate clearly across different formats.',
        'Content Creation: Discover how AI generates multimodal content, creating custom graphics, presentations, and interactive media for school projects.',
        'Data Analysis: Learn to organize raw information, analyze datasets, and identify trends using AI-assisted analysis workflows.',
        'App Building: Design functional AI-powered applications, write prompt-based logic, and create interactive tools tailored to student and classroom needs.',
        'App Deployment: Package, test, and publish web applications so peers and instructors can access and use completed projects online.'
      ] 
    },
    { 
      title: 'Expected Outcome', 
      bullets: [
        'Master AI Fundamentals & Ethics: Build a solid foundation in how generative AI works and how to use it safely, responsibly, and effectively.',
        'Supercharge Academic Research & Writing: Use tools like Gemini and NotebookLM to brainstorm, summarize complex texts, analyze data, and craft clear communications.',
        'Produce Creative Multimodal Content: Confidently generate custom graphics, dynamic presentations, and digital media for school projects.',
        'Build & Deploy Real-World Apps: Progress from basic prompting to designing, developing, and launching functional AI-powered web applications.'
      ] 
    }
  ]
},

{
  id: 3,
  title: 'Drama Club',
  src: '/images/boys-7-12/drama_cn.png',
  bg: '#4D9EE0',
  desc: 'Develop the ability to express ideas, emotions, and stories using only body language, facial expressions, and gestures.',
  banners: ['images/boys-7-12/Drama1.png', 'images/boys-7-12/Drama2.png'],
  details: [
    { 
      title: 'Skills Gained', 
      content: 'Communication goes beyond spoken language.' 
    },
    { 
      title: 'Expected Outcome', 
      content: 'Teach students to "show" rather than to "tell".' 
    }
  ]
},
{
  id: 4,
  title: 'Escape the room',
  src: '/images/boys-7-12/escape_cn.png',
  bg: '#E5A038',
  desc: 'Escape the Room is an exciting and interactive club where students work in teams to solve puzzles, riddles, codes, and challenges inside a computer lab transformed into multiple themed rooms. Students will use teamwork, logical thinking, creativity, problem-solving, and digital skills to discover clues and complete each challenge in order to unlock the next room. The club provides a fun, engaging, and challenging experience that encourages students to think critically, communicate, collaborate, and learn through an exciting adventure.',
  banners: ['images/boys-7-12/Escape room.jpg'],
  details: [
    { 
      title: 'Skills Gained', 
      bullets: [
        'Problem-Solving',
        'Critical Thinking',
        'Logical Thinking',
        'Teamwork and Collaboration',
        'Communication',
        'Creativity',
        'Decision-Making',
        'Digital Skills',
        'Time Management',
        'Adaptability'
      ] 
    },
    { 
      title: 'Expected Outcome', 
      content: 'Students will develop stronger problem-solving and critical-thinking skills while learning to work effectively as a team. They will improve their communication, creativity, logical reasoning, decision-making, and digital skills through hands-on challenges. By the end of the club, students will be able to approach problems creatively, collaborate with others, analyze clues and information, and apply different strategies to successfully complete challenges.' 
    }
  ]
},
{
  id: 5,
  title: 'مداد Ink',
  src: '/images/boys-7-12/madar_cn.png',
  bg: '#8C7AE6',
  desc: 'تدريب الطلاب على إلقاء الشعر والخطابة.',
  banners: ['images/boys-7-12/madar.jpeg'],
  details: [
    { 
      title: 'Skills Gained', 
      content: 'مهارات الشعر والخطابة.' 
    },
    { 
      title: 'Expected Outcome', 
      content: 'التعريف بشعراء العصور الأدبية.' 
    }
  ]
},
{
  id: 6,
  title: 'CHESS', 
  src: '/images/girls-7-12/chess_cn.png',
  bg: '#ec6458',
  desc: ' An engaging and structured 8-week chess program designed to develop chess skills, strategic thinking, concentration, problem-solving, and confidence through interactive learning and practical play',
  banners: ['/images/boys-7-12/chess1.png', '/images/boys-7-12/chess2.png'],
  details: [
    { 
      title: 'Skills Gained', 
      bullets: [
      'Strategic Thinking',
        'Focus & Concentration',
        'Problem-Solving',
        'Sportsmanship',
        'Tactical & Positional Play',
        'Time Management & Rules Mastery'
      ] 
    },
    { 
      title: 'Expected Outcome', 
      bullets:[
        'Confidence & Competition',
        'Structured Journey Completion',
        'Championship Participation',
        'Recognition'
      ] 
    }
  ]
},
  ],
};

type ViewState = 'home' | 'club-view' | 'registration';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('Girls (Grade 4 to 6)');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  const [fullBannerOpen, setFullBannerOpen] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (fullBannerOpen) {
        setFullBannerOpen(false);
      } else if (currentView !== 'home') {
        setCurrentView('home');
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView, fullBannerOpen]);
  
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
    setCurrentView('registration');
    window.history.pushState({ view: 'registration' }, '', '#registration');
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
    if (window.history.state?.view === 'club-view' || window.history.state?.view === 'registration') {
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
          <img src="/images/logo/meis_logo.png" alt="meis" className="h-10 sm:h-16 w-auto flex-shrink-0 drop-shadow-sm" />
          <div className="flex flex-col items-end justify-center ml-4">
             <span className="font-bold text-[#1c448d] tracking-tight text-[10px] sm:text-[14px] md:text-base whitespace-nowrap">Middle East International School - AlMuruj</span>
             <span className="font-bold text-[#1c448d] tracking-tight text-[10px] sm:text-[14px] md:text-base whitespace-nowrap" dir="rtl">مدرسة الشرق الأوسط العالمية - المروج</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-start sm:justify-center relative z-10 min-h-0">
          <div className="flex flex-col items-center mb-6 sm:mb-12 mt-4 sm:mt-0 shrink-0">
            <img src="/images/logo/club_logo.png" alt="Clubs" className="h-20 sm:h-32 md:h-40 mb-2 sm:mb-4 object-contain" />
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-widest drop-shadow-sm animate-text-color uppercase">MEIS CLUBS</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 w-full max-w-3xl flex-1 sm:flex-none overflow-y-auto sm:overflow-visible pb-4 sm:pb-0 hide-scrollbar">
            {[
              { id: 'grades-1-3', label: 'Grades 1 to 3', color: '#9b59b6'},
              { id: 'girls-4-6', label: 'Girls (Grade 4 to 6)', color: '#dd0922' },
              { id: 'girls-7-12', label: 'Girls (Grade 7 to 12)', color: '#ec881b'  },
              { id: 'boys-4-6', label: 'Boys (Grade 4 to 6)', color: '#73ba11' },
              { id: 'boys-7-12', label: 'Boys (Grade 7 to 12)', color: '#19aca4'  }
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
      </div>
    );
  }

  if (currentView === 'registration') {
    return (
      <RegistrationPage
        onBack={goHome}
        onSelectCategory={(category) => {
          handleCategorySelect(category);
        }}
      />
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
              <img src="/images/logo/meis_logo.png" alt="meis" className="h-8 sm:h-12 w-auto hidden sm:block object-contain" />
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
              
              <div className="w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex justify-center bg-gray-50 relative group p-3 sm:p-4">
                {isVideoMedia(activeClub.banners[bannerIndex]) ? (
                  <div className="w-[85vw] max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-black">
                    <video
                      key={bannerIndex}
                      src={activeClub.banners[bannerIndex]}
                      controls
                      playsInline
                      className="w-full h-full object-contain bg-black"
                    />
                  </div>
                ) : isYouTubeMedia(activeClub.banners[bannerIndex]) ? (
                  <div className="w-[85vw] max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-black">
                    <iframe
                      src={getYouTubeEmbedUrl(activeClub.banners[bannerIndex], false)}
                      title={`${activeClub.title} Video`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <img 
                    key={bannerIndex}
                    src={activeClub.banners[bannerIndex]} 
                    alt={`${activeClub.title} Banner ${bannerIndex + 1}`}
                    className="w-full max-w-3xl h-auto object-contain transition-opacity duration-300 animate-in fade-in"
                    style={{ maxHeight: '300px' }}
                  />
                )}
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
            
            {isVideoMedia(activeClub.banners[bannerIndex]) ? (
              <div className="w-[88vw] max-w-[340px] sm:max-w-[380px] aspect-[9/16] max-h-[78vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black z-[205] flex items-center justify-center">
                <video
                  key={bannerIndex}
                  src={activeClub.banners[bannerIndex]}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              </div>
            ) : isYouTubeMedia(activeClub.banners[bannerIndex]) ? (
              <div className="w-[88vw] max-w-[340px] sm:max-w-[380px] aspect-[9/16] max-h-[78vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black z-[205]">
                <iframe
                  key={bannerIndex}
                  src={getYouTubeEmbedUrl(activeClub.banners[bannerIndex], true)}
                  title={`${activeClub.title} Full Video`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <img 
                key={bannerIndex}
                src={activeClub.banners[bannerIndex]} 
                alt={`Full Banner View ${bannerIndex + 1}`} 
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl select-none transition-opacity duration-300 animate-in fade-in"
              />
            )}
            
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