import React, { useState } from 'react';

interface TopicThumbnailIllustrationProps {
  thumbnailKey:
    | 'informatika'
    | 'matematika'
    | 'ipa'
    | 'ips'
    | 'pkn'
    | 'bahasa-indonesia'
    | 'jejak-digital'
    | 'analisis-data';
  coverImage?: string;
  className?: string;
}

export const TopicThumbnailIllustration: React.FC<TopicThumbnailIllustrationProps> = ({
  thumbnailKey,
  coverImage,
  className = 'w-full h-full'
}) => {
  const [imageError, setImageError] = useState(false);

  if (coverImage && !imageError) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 ${className} flex items-center justify-center`}>
        <img
          src={coverImage}
          alt="Sampul Topik"
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  switch (thumbnailKey) {
    case 'jejak-digital':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 ${className} flex items-center justify-center`}>
          {/* Cyber network matrix grid */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:14px_14px]" />

          {/* SVG Illustration: Digital Footprint, Shield & Web Identity */}
          <svg className="w-full h-full p-4 max-w-[280px] max-h-[160px]" viewBox="0 0 280 160" fill="none">
            {/* Background cyan/emerald glow */}
            <circle cx="140" cy="80" r="55" fill="#14b8a6" fillOpacity="0.25" filter="blur(16px)" />

            {/* Central Security Shield */}
            <path
              d="M 140 30 L 175 42 C 175 80, 160 105, 140 125 C 120 105, 105 80, 105 42 Z"
              fill="#042f2e"
              stroke="#2dd4bf"
              strokeWidth="2.5"
            />
            {/* Glowing Lock inside shield */}
            <rect x="128" y="70" width="24" height="20" rx="3" fill="#14b8a6" />
            <path d="M 133 70 L 133 60 C 133 54, 147 54, 147 60 L 147 70" stroke="#f0fdf4" strokeWidth="2.5" fill="none" />
            <circle cx="140" cy="80" r="2.5" fill="#042f2e" />

            {/* Stylized Digital Footprint Tracks */}
            <g opacity="0.85">
              {/* Footprint 1 Left */}
              <ellipse cx="60" cy="90" rx="10" ry="16" fill="#0d9488" fillOpacity="0.6" transform="rotate(-15 60 90)" />
              <circle cx="53" cy="68" r="3" fill="#2dd4bf" />
              <circle cx="59" cy="66" r="3.2" fill="#2dd4bf" />
              <circle cx="66" cy="67" r="3" fill="#2dd4bf" />
              <circle cx="72" cy="71" r="2.5" fill="#2dd4bf" />

              {/* Footprint 2 Right */}
              <ellipse cx="220" cy="65" rx="10" ry="16" fill="#0d9488" fillOpacity="0.6" transform="rotate(15 220 65)" />
              <circle cx="212" cy="44" r="2.8" fill="#5eead4" />
              <circle cx="218" cy="42" r="3.2" fill="#5eead4" />
              <circle cx="225" cy="43" r="3" fill="#5eead4" />
              <circle cx="231" cy="47" r="2.4" fill="#5eead4" />
            </g>

            {/* Connecting network lines */}
            <path d="M 75 90 Q 105 90 105 60" stroke="#5eead4" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 175 60 Q 185 85 205 75" stroke="#5eead4" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Floating cyber badges */}
            <text x="20" y="35" fill="#5eead4" fontSize="10" fontFamily="monospace" fontWeight="bold">COOKIES</text>
            <text x="215" y="125" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold">PRIVASI</text>
            <text x="25" y="135" fill="#2dd4bf" fontSize="9" fontWeight="semibold">Etika Siber</text>
          </svg>

          {/* Subject Pill Badge */}
          <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-teal-500/30 backdrop-blur-xs border border-teal-400/40 text-teal-200 text-[10px] font-bold tracking-wider uppercase">
            Informatika
          </div>
        </div>
      );

    case 'analisis-data':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 ${className} flex items-center justify-center`}>
          {/* Subtle analytics graph grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:14px_14px]" />

          {/* SVG Illustration: Data Analysis, Bar Charts & Insights */}
          <svg className="w-full h-full p-4 max-w-[280px] max-h-[160px]" viewBox="0 0 280 160" fill="none">
            {/* Background glow */}
            <circle cx="140" cy="80" r="55" fill="#0284c7" fillOpacity="0.25" filter="blur(16px)" />

            {/* Mini spreadsheet / data table on left */}
            <g transform="translate(30, 42)">
              <rect x="0" y="0" width="70" height="75" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Header row */}
              <rect x="0" y="0" width="70" height="16" rx="4" fill="#0284c7" />
              <line x1="25" y1="0" x2="25" y2="75" stroke="#1e293b" strokeWidth="1" />
              <line x1="48" y1="0" x2="48" y2="75" stroke="#1e293b" strokeWidth="1" />
              <line x1="0" y1="30" x2="70" y2="30" stroke="#1e293b" strokeWidth="1" />
              <line x1="0" y1="45" x2="70" y2="45" stroke="#1e293b" strokeWidth="1" />
              <line x1="0" y1="60" x2="70" y2="60" stroke="#1e293b" strokeWidth="1" />

              <circle cx="12" cy="8" r="2.5" fill="#f0fdf4" />
              <circle cx="36" cy="8" r="2.5" fill="#f0fdf4" />
              <circle cx="58" cy="8" r="2.5" fill="#f0fdf4" />

              <text x="8" y="24" fill="#93c5fd" fontSize="7" fontWeight="bold">A1</text>
              <text x="30" y="24" fill="#93c5fd" fontSize="7">14</text>
              <text x="52" y="24" fill="#34d399" fontSize="7">92%</text>
              <text x="8" y="39" fill="#93c5fd" fontSize="7" fontWeight="bold">A2</text>
              <text x="30" y="39" fill="#93c5fd" fontSize="7">28</text>
              <text x="52" y="39" fill="#34d399" fontSize="7">85%</text>
              <text x="8" y="54" fill="#93c5fd" fontSize="7" fontWeight="bold">A3</text>
              <text x="30" y="54" fill="#93c5fd" fontSize="7">45</text>
              <text x="52" y="54" fill="#34d399" fontSize="7">98%</text>
            </g>

            {/* Transform Arrow: Raw data -> Insight */}
            <path d="M 112 80 L 126 80" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="128,80 123,76 123,84" fill="#f59e0b" />

            {/* Bar Chart & Trend Line Visualization */}
            <g transform="translate(145, 38)">
              {/* Chart background container */}
              <rect x="0" y="0" width="105" height="82" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
              {/* Axes */}
              <line x1="12" y1="12" x2="12" y2="70" stroke="#475569" strokeWidth="1.5" />
              <line x1="12" y1="70" x2="98" y2="70" stroke="#475569" strokeWidth="1.5" />

              {/* Bar 1 */}
              <rect x="22" y="44" width="12" height="26" rx="2" fill="#38bdf8" />
              {/* Bar 2 */}
              <rect x="42" y="30" width="12" height="40" rx="2" fill="#60a5fa" />
              {/* Bar 3 */}
              <rect x="62" y="18" width="12" height="52" rx="2" fill="#34d399" />
              {/* Bar 4 */}
              <rect x="82" y="24" width="12" height="46" rx="2" fill="#f59e0b" />

              {/* Trend upward curve line */}
              <path d="M 28 42 Q 52 26 88 20" stroke="#ec4899" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle cx="88" cy="20" r="3" fill="#f43f5e" />
            </g>

            {/* Floating analytics formula tags */}
            <text x="25" y="26" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">=SUM(B1:B10)</text>
            <text x="205" y="136" fill="#34d399" fontSize="10" fontFamily="sans-serif" fontWeight="bold">VISUALISASI</text>
          </svg>

          {/* Subject Pill Badge */}
          <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-sky-500/30 backdrop-blur-xs border border-sky-400/40 text-sky-200 text-[10px] font-bold tracking-wider uppercase">
            Informatika
          </div>
        </div>
      );
    case 'informatika':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 ${className} flex items-center justify-center`}>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* SVG Illustration: Computational Thinking & Algorithm Flow */}
          <svg className="w-full h-full p-4 max-w-[280px] max-h-[160px]" viewBox="0 0 280 160" fill="none">
            {/* Background glowing blob */}
            <circle cx="140" cy="80" r="60" fill="#6366f1" fillOpacity="0.2" filter="blur(20px)" />

            {/* Laptop Base */}
            <rect x="70" y="40" width="140" height="85" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
            <rect x="76" y="46" width="128" height="68" rx="4" fill="#0f172a" />
            <path d="M50 128 L230 128 L220 134 L60 134 Z" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />

            {/* Code / Flowchart on screen */}
            <rect x="84" y="54" width="40" height="8" rx="3" fill="#38bdf8" />
            <circle cx="88" cy="74" r="5" fill="#a855f7" />
            <line x1="93" y1="74" x2="115" y2="74" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="120" cy="74" r="5" fill="#10b981" />
            <circle cx="120" cy="94" r="5" fill="#f59e0b" />
            <line x1="120" y1="79" x2="120" y2="89" stroke="#64748b" strokeWidth="2" />

            {/* Flowchart diamond & decision tree on right of screen */}
            <polygon points="155,64 170,74 155,84 140,74" fill="#ec4899" fillOpacity="0.8" />
            <circle cx="185" cy="74" r="4" fill="#38bdf8" />
            <line x1="170" y1="74" x2="181" y2="74" stroke="#38bdf8" strokeWidth="1.5" />

            {/* Binary data floating bubbles */}
            <g opacity="0.85">
              <text x="25" y="45" fill="#818cf8" fontSize="11" fontFamily="monospace" fontWeight="bold">0101</text>
              <text x="220" y="55" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">{"{...}"}</text>
              <text x="35" y="110" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="bold">IF / ELSE</text>
              <text x="215" y="115" fill="#f472b6" fontSize="11" fontFamily="monospace" fontWeight="bold">O(log n)</text>
            </g>

            {/* Glowing search magnifying glass node */}
            <circle cx="210" cy="80" r="16" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
            <line x1="222" y1="92" x2="232" y2="102" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="210" cy="80" r="6" fill="#38bdf8" fillOpacity="0.4" />
          </svg>

          {/* Subject Pill Badge in Illustration */}
          <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-indigo-500/30 backdrop-blur-xs border border-indigo-400/40 text-indigo-200 text-[10px] font-bold tracking-wider uppercase">
            Informatika
          </div>
        </div>
      );

    case 'matematika':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-blue-900 via-sky-900 to-indigo-950 ${className} flex items-center justify-center`}>
          {/* Subtle math grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* SVG Illustration: Pythagorean Theorem and Spatial Geometry */}
          <svg className="w-full h-full p-4 max-w-[280px] max-h-[160px]" viewBox="0 0 280 160" fill="none">
            {/* Background glow */}
            <circle cx="140" cy="80" r="55" fill="#0284c7" fillOpacity="0.25" filter="blur(18px)" />

            {/* Right-angled triangle */}
            <polygon points="90,120 180,120 90,50" fill="#0369a1" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Right angle square indicator */}
            <rect x="90" y="110" width="10" height="10" fill="none" stroke="#facc15" strokeWidth="1.5" />

            {/* Square on side a (base 3) */}
            <rect x="90" y="120" width="90" height="24" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="130" y="136" fill="#7dd3fc" fontSize="10" fontWeight="bold">a² (9)</text>

            {/* Square on side b (height 4) */}
            <rect x="66" y="50" width="24" height="70" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="70" y="90" fill="#7dd3fc" fontSize="10" fontWeight="bold">b²</text>

            {/* Hypotenuse label (c = 5) */}
            <text x="145" y="78" fill="#facc15" fontSize="12" fontWeight="extrabold" transform="rotate(-38 145 78)">
              c² = a² + b²
            </text>

            {/* Geometric tools: Compass / Ruler silhouette */}
            <path d="M210 35 L225 75 L240 35" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
            <circle cx="225" cy="35" r="4" fill="#fbbf24" />

            {/* Math floating symbols */}
            <g opacity="0.8">
              <text x="30" y="45" fill="#93c5fd" fontSize="13" fontWeight="bold">π</text>
              <text x="235" y="115" fill="#facc15" fontSize="12" fontWeight="bold">√x</text>
              <text x="35" y="135" fill="#38bdf8" fontSize="10" fontWeight="bold">90°</text>
              <text x="210" y="140" fill="#93c5fd" fontSize="10" fontWeight="bold">(3, 4, 5)</text>
            </g>
          </svg>

          {/* Subject Pill Badge in Illustration */}
          <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-blue-500/30 backdrop-blur-xs border border-blue-400/40 text-blue-200 text-[10px] font-bold tracking-wider uppercase">
            Matematika
          </div>
        </div>
      );

    case 'ipa':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 ${className} flex items-center justify-center`}>
          {/* Subtle starry grid */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:18px_18px]" />

          {/* SVG Illustration: Solar System & Gravitational Orbits */}
          <svg className="w-full h-full p-4 max-w-[280px] max-h-[160px]" viewBox="0 0 280 160" fill="none">
            {/* Glowing Sun center */}
            <circle cx="90" cy="80" r="26" fill="#f59e0b" />
            <circle cx="90" cy="80" r="32" fill="#fbbf24" fillOpacity="0.3" filter="blur(8px)" />
            <circle cx="90" cy="80" r="14" fill="#fef08a" />

            {/* Orbital Rings */}
            <ellipse cx="90" cy="80" rx="60" ry="34" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            <ellipse cx="90" cy="80" rx="100" ry="54" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
            <ellipse cx="90" cy="80" rx="145" ry="76" stroke="#34d399" strokeWidth="1" strokeOpacity="0.4" fill="none" />

            {/* Earth on Orbit 2 */}
            <circle cx="170" cy="60" r="9" fill="#38bdf8" />
            <circle cx="178" cy="54" r="3" fill="#cbd5e1" /> {/* Moon */}

            {/* Mars on Orbit 1 */}
            <circle cx="145" cy="90" r="6" fill="#ef4444" />

            {/* Saturn with rings on outer track */}
            <circle cx="215" cy="115" r="12" fill="#eab308" />
            <ellipse cx="215" cy="115" rx="20" ry="5" stroke="#fde047" strokeWidth="2" fill="none" transform="rotate(-20 215 115)" />

            {/* Gravity vector arrows */}
            <path d="M162 64 L125 74" stroke="#6ee7b7" strokeWidth="1.5" strokeDasharray="2 2" />
            <polygon points="123,74 130,71 128,77" fill="#6ee7b7" />

            {/* Science tags */}
            <text x="25" y="35" fill="#6ee7b7" fontSize="10" fontFamily="sans-serif" fontWeight="bold">GRAVITASI</text>
            <text x="210" y="38" fill="#fef08a" fontSize="10" fontFamily="monospace">F = G·(m₁m₂)/r²</text>
          </svg>

          {/* Subject Pill Badge in Illustration */}
          <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-emerald-500/30 backdrop-blur-xs border border-emerald-400/40 text-emerald-200 text-[10px] font-bold tracking-wider uppercase">
            IPA
          </div>
        </div>
      );

    case 'ips':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 ${className} flex items-center justify-center`}>
          {/* Subtle topo grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* SVG Illustration: Maritime Trade & Nusantara Spatial Economy */}
          <svg className="w-full h-full p-4 max-w-[280px] max-h-[160px]" viewBox="0 0 280 160" fill="none">
            {/* Soft island landmasses in background */}
            <path d="M30 75 Q60 60 90 70 Q110 85 80 95 Q40 100 30 75 Z" fill="#065f46" fillOpacity="0.4" stroke="#10b981" strokeWidth="1" />
            <path d="M180 60 Q215 50 250 65 Q260 85 230 90 Q190 95 180 60 Z" fill="#065f46" fillOpacity="0.4" stroke="#10b981" strokeWidth="1" />

            {/* Traditional Phinisi Sailing Boat */}
            <g transform="translate(110, 50)">
              {/* Boat Hull */}
              <path d="M10 50 Q30 58 60 55 L55 45 L15 45 Z" fill="#b45309" stroke="#f59e0b" strokeWidth="1.5" />
              {/* Main Mast & Sails */}
              <line x1="35" y1="45" x2="35" y2="10" stroke="#fde68a" strokeWidth="2" />
              <path d="M35 15 L52 35 L35 38 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
              <path d="M35 18 L20 36 L35 38 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
              {/* Water wave ripples */}
              <path d="M-5 58 Q10 55 25 58 Q40 61 55 58 Q70 55 85 58" stroke="#38bdf8" strokeWidth="2" fill="none" />
            </g>

            {/* Maritime Trade Route Arrow connecting East and West */}
            <path d="M70 85 Q135 110 205 85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <polygon points="208,83 198,82 201,89" fill="#f59e0b" />

            {/* Vintage Compass Rose in top left */}
            <g transform="translate(45, 30)">
              <circle cx="0" cy="0" r="14" stroke="#d97706" strokeWidth="1.5" fill="#451a03" fillOpacity="0.6" />
              <polygon points="0,-12 3,0 0,2 -3,0" fill="#ef4444" />
              <polygon points="0,12 3,0 0,-2 -3,0" fill="#fef3c7" />
              <text x="-3" y="-14" fill="#ef4444" fontSize="8" fontWeight="bold">U</text>
            </g>

            {/* Economy & Spatial tags */}
            <text x="180" y="35" fill="#fef08a" fontSize="10" fontWeight="bold">PASAR & KOMODITAS</text>
            <text x="15" y="135" fill="#fde68a" fontSize="9" fontWeight="medium">Perdagangan Antarpulau Nusantara</text>
          </svg>

          {/* Subject Pill Badge in Illustration */}
          <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-amber-500/30 backdrop-blur-xs border border-amber-400/40 text-amber-200 text-[10px] font-bold tracking-wider uppercase">
            IPS
          </div>
        </div>
      );

    case 'pkn':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-rose-950 via-red-900 to-slate-950 ${className} flex items-center justify-center`}>
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* SVG Illustration: Civics, Pancasila Harmony & Rule of Law */}
          <svg className="w-full h-full p-4 max-w-[280px] max-h-[160px]" viewBox="0 0 280 160" fill="none">
            {/* Background harmony glow */}
            <circle cx="140" cy="80" r="55" fill="#be123c" fillOpacity="0.25" filter="blur(16px)" />

            {/* Central Shield of Harmony & Pancasila */}
            <g transform="translate(140, 75)">
              <path d="M-30 -35 L30 -35 Q35 0 25 25 Q0 45 0 50 Q0 45 -25 25 Q-35 0 -30 -35 Z" fill="#991b1b" stroke="#fecdd3" strokeWidth="2" />
              {/* Inner Golden Star of Principle 1 */}
              <polygon points="0,-18 4,-6 16,-6 6,2 10,14 0,6 -10,14 -6,2 -16,-6 -4,-6" fill="#facc15" />
              {/* Scale of Justice emblem inside shield */}
              <line x1="-15" y1="22" x2="15" y2="22" stroke="#fef08a" strokeWidth="2" />
              <line x1="0" y1="12" x2="0" y2="28" stroke="#fef08a" strokeWidth="2" />
            </g>

            {/* Red & White Indonesian Ribbon Banner */}
            <path d="M60 120 Q140 145 220 120" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M60 115 Q140 140 220 115" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" fill="none" />

            {/* Friendly Unity Handshakes / Collaborative circles */}
            <circle cx="65" cy="65" r="14" fill="#881337" stroke="#fda4af" strokeWidth="1.5" />
            <circle cx="215" cy="65" r="14" fill="#881337" stroke="#fda4af" strokeWidth="1.5" />
            <text x="59" y="69" fill="#ffffff" fontSize="11" fontWeight="bold">⚖️</text>
            <text x="209" y="69" fill="#ffffff" fontSize="11" fontWeight="bold">🤝</text>

            {/* Civics tags */}
            <text x="25" y="32" fill="#fda4af" fontSize="10" fontWeight="bold">NORMA HUKUM</text>
            <text x="180" y="32" fill="#fecdd3" fontSize="10" fontWeight="bold">BHINNEKA TUNGGAL IKA</text>
          </svg>

          {/* Subject Pill Badge in Illustration */}
          <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-rose-500/30 backdrop-blur-xs border border-rose-400/40 text-rose-200 text-[10px] font-bold tracking-wider uppercase">
            PKn
          </div>
        </div>
      );

    case 'bahasa-indonesia':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-teal-950 via-cyan-900 to-slate-950 ${className} flex items-center justify-center`}>
          {/* Subtle literary grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* SVG Illustration: Observation Report Text, Journal, Magnifier & Quill */}
          <svg className="w-full h-full p-4 max-w-[280px] max-h-[160px]" viewBox="0 0 280 160" fill="none">
            {/* Glowing background aura */}
            <circle cx="140" cy="80" r="55" fill="#0f766e" fillOpacity="0.3" filter="blur(16px)" />

            {/* Open Observation Journal Book */}
            <g transform="translate(85, 45)">
              {/* Left Page */}
              <rect x="0" y="5" width="52" height="70" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Text lines on left page */}
              <line x1="8" y1="18" x2="44" y2="18" stroke="#0f766e" strokeWidth="2.5" />
              <line x1="8" y1="28" x2="40" y2="28" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="8" y1="38" x2="44" y2="38" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="8" y1="48" x2="35" y2="48" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="8" y1="58" x2="42" y2="58" stroke="#cbd5e1" strokeWidth="2" />

              {/* Book Spine */}
              <rect x="52" y="5" width="6" height="70" fill="#0d9488" />

              {/* Right Page */}
              <rect x="58" y="5" width="52" height="70" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="66" y1="18" x2="102" y2="18" stroke="#0f766e" strokeWidth="2.5" />
              {/* Small botanical sketch on right page */}
              <circle cx="84" cy="38" r="10" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="1" />
              <line x1="66" y1="58" x2="102" y2="58" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="66" y1="66" x2="95" y2="66" stroke="#cbd5e1" strokeWidth="2" />
            </g>

            {/* Magnifying Glass inspecting the observation report */}
            <circle cx="195" cy="75" r="22" fill="#042f2e" fillOpacity="0.4" stroke="#2dd4bf" strokeWidth="3" />
            <line x1="211" y1="91" x2="235" y2="115" stroke="#2dd4bf" strokeWidth="4.5" strokeLinecap="round" />
            <text x="187" y="80" fill="#5eead4" fontSize="14" fontWeight="bold">🔍</text>

            {/* Floating letters & literary elements */}
            <g opacity="0.85">
              <text x="35" y="45" fill="#5eead4" fontSize="16" fontFamily="serif" fontWeight="bold">A</text>
              <text x="235" y="50" fill="#99f6e4" fontSize="14" fontFamily="serif" fontWeight="bold">B</text>
              <text x="45" y="125" fill="#2dd4bf" fontSize="15" fontFamily="serif" fontWeight="bold">C</text>
              <text x="120" y="32" fill="#5eead4" fontSize="10" fontWeight="bold">FAKTA OBJEKTIF</text>
            </g>
          </svg>

          {/* Subject Pill Badge in Illustration */}
          <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-teal-500/30 backdrop-blur-xs border border-teal-400/40 text-teal-200 text-[10px] font-bold tracking-wider uppercase">
            Bahasa Indonesia
          </div>
        </div>
      );

    default:
      return null;
  }
};
