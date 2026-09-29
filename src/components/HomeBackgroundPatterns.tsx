import React from 'react';

export const HomeBackgroundPatterns: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <svg
        className="w-full h-full min-h-[950px]"
        viewBox="0 0 1440 1100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients using the club logo palette: Red/Pink, Orange, Amber, Emerald/Green, Sky/Blue with bright, vivid tones */}
          <linearGradient id="waveGradRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0.18" />
          </linearGradient>

          <linearGradient id="waveGradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0.20" />
          </linearGradient>

          <linearGradient id="waveGradYellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eab308" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0.22" />
          </linearGradient>

          <linearGradient id="waveGradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0.18" />
          </linearGradient>

          <linearGradient id="waveGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.20" />
          </linearGradient>

          <linearGradient id="waveGradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.16" />
          </linearGradient>
        </defs>

        {/* 1. Large Top-Left Curvy Ribbon (Amber / Yellow) */}
        <path
          d="M-50,0 C120,40 240,160 210,320 C180,480 320,540 420,560 C320,620 180,590 60,510 C-60,430 -100,280 -50,0 Z"
          fill="url(#waveGradYellow)"
        />

        {/* 2. Top-Right Big Flowing Wave Ribbon (Sky Blue) */}
        <path
          d="M1500,-40 C1320,20 1180,140 1200,290 C1220,440 1340,510 1480,580 L1520,-40 Z"
          fill="url(#waveGradBlue)"
        />

        {/* 3. Deep Sweeping Wavy Band across upper-mid (Emerald Green) */}
        <path
          d="M-80,260 C260,210 520,380 840,320 C1140,260 1340,380 1520,340 L1520,440 C1300,500 1100,380 800,430 C480,480 200,350 -80,400 Z"
          fill="url(#waveGradGreen)"
        />

        {/* 4. Mid-Right Curvy Bulbous Wave (Warm Orange) */}
        <path
          d="M1490,440 C1350,470 1240,560 1260,680 C1280,800 1390,880 1510,910 L1520,440 Z"
          fill="url(#waveGradOrange)"
        />

        {/* 5. Mid-Left Sweeping Wave Ribbon (Vibrant Rose / Red) */}
        <path
          d="M-60,480 C110,490 220,580 240,710 C260,840 150,940 -40,980 L-60,480 Z"
          fill="url(#waveGradRed)"
        />

        {/* 6. Lower Flowing S-Curve Ribbon (Lilac / Sky Blue) */}
        <path
          d="M-50,820 C240,760 520,890 840,840 C1160,790 1360,890 1520,860 L1520,960 C1340,1000 1140,900 820,950 C500,1000 220,880 -50,940 Z"
          fill="url(#waveGradPurple)"
        />

        {/* Smooth decorative curvy contour wave lines (strokes) */}
        {/* Sky Blue Wave Line */}
        <path
          d="M-40,180 C280,120 580,280 920,210 C1240,140 1380,240 1500,220"
          stroke="#0284c7"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity="0.65"
          strokeDasharray="9 9"
        />

        {/* Orange Wavy Arc Line */}
        <path
          d="M-60,380 C300,310 640,490 980,410 C1280,340 1420,430 1520,400"
          stroke="#ea580c"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.60"
        />

        {/* Emerald Green Smooth Contour Wave Line */}
        <path
          d="M-30,640 C280,590 560,720 900,660 C1220,600 1390,690 1500,670"
          stroke="#16a34a"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.65"
        />

        {/* Rose Red Smooth Contour Wave Line */}
        <path
          d="M-40,790 C290,740 600,860 940,800 C1260,740 1410,830 1500,810"
          stroke="#e11d48"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.60"
          strokeDasharray="7 7"
        />

        {/* Soft playful light colored dots & circular bubbles along the flow */}
        <circle cx="210" cy="180" r="14" fill="#eab308" fillOpacity="0.45" />
        <circle cx="250" cy="220" r="7" fill="#ea580c" fillOpacity="0.50" />
        <circle cx="1270" cy="220" r="16" fill="#0284c7" fillOpacity="0.45" />
        <circle cx="1220" cy="260" r="8" fill="#16a34a" fillOpacity="0.50" />
        <circle cx="180" cy="620" r="12" fill="#e11d48" fillOpacity="0.45" />
        <circle cx="1280" cy="610" r="15" fill="#f97316" fillOpacity="0.45" />
        <circle cx="1320" cy="650" r="8" fill="#eab308" fillOpacity="0.50" />
        <circle cx="190" cy="880" r="14" fill="#0284c7" fillOpacity="0.45" />
      </svg>
    </div>
  );
};
