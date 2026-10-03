import React, { useState } from 'react';

interface ConceptIllustrationProps {
  type:
    | 'solar'
    | 'digestive'
    | 'pythagoras'
    | 'circuit'
    | 'aljabar'
    | 'litosfer'
    | 'algorithm'
    | 'trade'
    | 'civics'
    | 'observation'
    | 'cyber'
    | 'analytics';
  interactive?: boolean;
  step?: number;
}

export const ConceptIllustration: React.FC<ConceptIllustrationProps> = ({ type, interactive = true }) => {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  if (type === 'solar') {
    return (
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#0B132B] via-[#1C2541] to-[#0B132B] p-6 text-white overflow-hidden shadow-sm border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold tracking-wide text-white">Visualisasi Orbit & Gravitasi Tata Surya</span>
          </div>
          <span className="text-[11px] text-slate-400">Klik planet untuk inspeksi data</span>
        </div>

        <div className="relative w-full aspect-[16/9] max-h-[380px] flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 800 450" fill="none">
            {/* Background stars */}
            <circle cx="50" cy="40" r="1.5" fill="#fff" opacity="0.6" />
            <circle cx="120" cy="90" r="1" fill="#fff" opacity="0.4" />
            <circle cx="280" cy="30" r="1.5" fill="#fff" opacity="0.8" />
            <circle cx="700" cy="80" r="1.2" fill="#fff" opacity="0.5" />
            <circle cx="750" cy="320" r="1.5" fill="#fff" opacity="0.7" />
            <circle cx="90" cy="380" r="1.2" fill="#fff" opacity="0.4" />
            <circle cx="620" cy="410" r="1.5" fill="#fff" opacity="0.6" />

            {/* Orbit lines */}
            <ellipse cx="140" cy="225" rx="100" ry="70" stroke="#3A506B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <ellipse cx="140" cy="225" rx="160" ry="110" stroke="#3A506B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <ellipse cx="140" cy="225" rx="230" ry="155" stroke="#4A6572" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.8" />
            <ellipse cx="140" cy="225" rx="310" ry="200" stroke="#3A506B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <ellipse cx="140" cy="225" rx="440" ry="250" stroke="#486581" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.7" />
            <ellipse cx="140" cy="225" rx="580" ry="300" stroke="#3A506B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

            {/* Sun Glow */}
            <circle cx="140" cy="225" r="70" fill="url(#sunGlow)" opacity="0.3" />
            <circle cx="140" cy="225" r="48" fill="#F59E0B" />
            <circle cx="140" cy="225" r="42" fill="#FBBF24" />
            <circle cx="140" cy="225" r="34" fill="#FEF08A" />
            <text x="140" y="229" textAnchor="middle" fill="#78350F" fontSize="13" fontWeight="bold">Matahari</text>

            {/* Planet: Merkurius */}
            <g
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => setActiveElement('Merkurius: Periode revolusi tercepat (88 hari), planet terdekat ke Matahari.')}
            >
              <circle cx="210" cy="180" r="7" fill="#9CA3AF" />
              <text x="210" y="202" textAnchor="middle" fill="#D1D5DB" fontSize="10">Merkurius</text>
            </g>

            {/* Planet: Venus */}
            <g
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => setActiveElement('Venus: Rotasi retrograd (berlawanan arah jarum jam), suhu paling panas akibat efek rumah kaca ekstrem.')}
            >
              <circle cx="260" cy="285" r="11" fill="#FDE68A" />
              <text x="260" y="310" textAnchor="middle" fill="#FDE68A" fontSize="10">Venus</text>
            </g>

            {/* Planet: Bumi */}
            <g
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => setActiveElement('Bumi: Periode revolusi 365,25 hari, rotasi 24 jam, kemiringan 23,5° menghasilkan 4 musim!')}
            >
              <circle cx="340" cy="160" r="14" fill="#38BDF8" stroke="#1D4ED8" strokeWidth="2" />
              <circle cx="346" cy="156" r="3" fill="#4ADE80" />
              <text x="340" y="190" textAnchor="middle" fill="#67E8F9" fontSize="11" fontWeight="bold">Bumi</text>
              {/* Moon orbit indicator */}
              <circle cx="340" cy="160" r="22" stroke="#60A5FA" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
              <circle cx="360" cy="152" r="3" fill="#E2E8F0" />
            </g>

            {/* Planet: Mars */}
            <g
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => setActiveElement('Mars: Si Planet Merah karena oksida besi tanahnya, memiliki 2 satelit kecil (Phobos dan Deimos).')}
            >
              <circle cx="430" cy="275" r="9" fill="#EF4444" />
              <text x="430" y="298" textAnchor="middle" fill="#FCA5A5" fontSize="10">Mars</text>
            </g>

            {/* Asteroid Belt representation */}
            <path d="M 470 120 Q 500 225 470 330" stroke="#64748B" strokeWidth="6" strokeDasharray="1 8" opacity="0.5" />
            <text x="495" y="225" fill="#94A3B8" fontSize="9" transform="rotate(90, 495, 225)">Sabuk Asteroid</text>

            {/* Planet: Jupiter */}
            <g
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => setActiveElement('Jupiter: Planet terbesar, pelindung Bumi dari tabrakan komet berkat gravitasinya yang masif!')}
            >
              <circle cx="560" cy="150" r="26" fill="#F97316" />
              <ellipse cx="560" cy="150" rx="26" ry="6" fill="#EA580C" opacity="0.6" />
              <circle cx="572" cy="158" r="4" fill="#B91C1C" /> {/* Red spot */}
              <text x="560" y="192" textAnchor="middle" fill="#FDBA74" fontSize="11" fontWeight="bold">Jupiter</text>
            </g>

            {/* Planet: Saturnus */}
            <g
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => setActiveElement('Saturnus: Terkenal dengan sistem cincin spektakuler dari debu es dan batuan kosmik.')}
            >
              <ellipse cx="690" cy="260" rx="34" ry="10" stroke="#FDE047" strokeWidth="4" fill="none" transform="rotate(-20, 690, 260)" />
              <circle cx="690" cy="260" r="20" fill="#EAB308" />
              <ellipse cx="690" cy="260" rx="34" ry="10" stroke="#FACC15" strokeWidth="2" fill="none" opacity="0.6" transform="rotate(-20, 690, 260)" />
              <text x="690" y="295" textAnchor="middle" fill="#FEF08A" fontSize="11" fontWeight="bold">Saturnus</text>
            </g>

            <defs>
              <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {activeElement ? (
          <div className="mt-3 bg-white/10 backdrop-blur-md rounded-xl p-3 text-xs text-emerald-200 border border-emerald-400/30 flex items-center justify-between">
            <p><strong className="text-white">Detail Terpilih:</strong> {activeElement}</p>
            <button onClick={() => setActiveElement(null)} className="ml-2 text-slate-300 hover:text-white px-2 py-0.5 rounded bg-white/10 text-[11px]">Tutup</button>
          </div>
        ) : (
          <div className="mt-2 text-center text-xs text-slate-400">
            Hukum III Kepler: Jarak orbit berbanding lurus dengan periode revolusi planet (T² ∝ R³)
          </div>
        )}
      </div>
    );
  }

  if (type === 'pythagoras') {
    return (
      <div className="relative w-full rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="font-semibold text-slate-800">Pembuktian Geometri Persegi: a² + b² = c²</span>
          </div>
          <span className="text-[11px] text-slate-500">Tripel Siku-Siku Klasik (3, 4, 5)</span>
        </div>

        <div className="w-full aspect-[16/9] max-h-[360px] flex items-center justify-center">
          <svg className="w-full h-full max-w-[550px]" viewBox="0 0 500 400" fill="none">
            {/* Grid background */}
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="500" height="400" fill="url(#smallGrid)" />

            {/* Triangle base coordinates */}
            {/* A = (160, 240), B = (280, 240), C = (160, 150) -> a = 90px (3 units), b = 120px (4 units), c = 150px (5 units) */}

            {/* Square on side a (vertical, left): width 90, height 90 */}
            <rect x="70" y="150" width="90" height="90" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" rx="4" />
            {/* Subgrid for a² = 9 units */}
            <path d="M 100 150 L 100 240 M 130 150 L 130 240 M 70 180 L 160 180 M 70 210 L 160 210" stroke="#BAE6FD" strokeWidth="1" />
            <text x="115" y="198" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="bold">a² = 9</text>
            <text x="115" y="214" textAnchor="middle" fill="#0284C7" fontSize="10">(3 × 3)</text>

            {/* Square on side b (horizontal, bottom): width 120, height 120 */}
            <rect x="160" y="240" width="120" height="120" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="4" />
            {/* Subgrid for b² = 16 units */}
            <path d="M 190 240 L 190 360 M 220 240 L 220 360 M 250 240 L 250 360 M 160 270 L 280 270 M 160 300 L 280 300 M 160 330 L 280 330" stroke="#FDE68A" strokeWidth="1" />
            <text x="220" y="295" textAnchor="middle" fill="#B45309" fontSize="13" fontWeight="bold">b² = 16</text>
            <text x="220" y="312" textAnchor="middle" fill="#D97706" fontSize="10">(4 × 4)</text>

            {/* The Right Triangle */}
            <polygon points="160,240 280,240 160,150" fill="#EFF6FF" stroke="#1E40AF" strokeWidth="3" />
            {/* Right angle marker at (160, 240) */}
            <rect x="160" y="222" width="18" height="18" fill="none" stroke="#1E40AF" strokeWidth="2" />
            <circle cx="169" cy="231" r="2" fill="#1E40AF" />

            {/* Sisi labels */}
            <text x="145" y="195" textAnchor="end" fill="#0369A1" fontSize="12" fontWeight="bold">a = 3</text>
            <text x="220" y="232" textAnchor="middle" fill="#B45309" fontSize="12" fontWeight="bold">b = 4</text>
            <text x="235" y="185" textAnchor="start" fill="#15803D" fontSize="13" fontWeight="bold">c = 5 (Hipotenusa)</text>

            {/* Square on side c (hypotenuse): tilted square */}
            <g transform="translate(160, 150) rotate(36.87)">
              <rect x="0" y="-150" width="150" height="150" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" rx="4" />
              <text x="75" y="-80" textAnchor="middle" fill="#15803D" fontSize="14" fontWeight="bold">c² = 25</text>
              <text x="75" y="-60" textAnchor="middle" fill="#16A34A" fontSize="11">(5 × 5 = 9 + 16)</text>
            </g>
          </svg>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-sky-50 text-sky-800 border border-sky-100">
            <span className="block font-semibold">Persegi Sisi Tegak</span>
            <span>3² = 9 satuan</span>
          </div>
          <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-100">
            <span className="block font-semibold">Persegi Sisi Alas</span>
            <span>4² = 16 satuan</span>
          </div>
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
            <span className="block font-semibold">Persegi Sisi Miring</span>
            <span>5² = 25 satuan (9+16)</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'digestive') {
    return (
      <div className="relative w-full rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span className="font-semibold text-slate-800">Alur Organ Pencernaan & Kelenjar Enzim</span>
          </div>
          <span className="text-[11px] text-slate-500">Klik organ untuk melihat peran enzim</span>
        </div>

        <div className="w-full aspect-[16/9] max-h-[360px] flex items-center justify-center">
          <svg className="w-full h-full max-w-[500px]" viewBox="0 0 450 360" fill="none">
            {/* Outline of Human Torso */}
            <path
              d="M 160 40 C 180 20 270 20 290 40 C 310 60 320 110 320 200 C 320 280 290 340 225 340 C 160 340 130 280 130 200 C 130 110 140 60 160 40 Z"
              fill="#F8FAFC"
              stroke="#E2E8F0"
              strokeWidth="2"
            />

            {/* 1. Mouth / Rongga Mulut */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Mulut: Enzim Ptialin (amilase ludah) memecah amilum jadi maltosa.')}>
              <ellipse cx="225" cy="55" rx="18" ry="12" fill="#FCA5A5" stroke="#DC2626" strokeWidth="2" />
              <text x="280" y="58" fill="#B91C1C" fontSize="11" fontWeight="bold">1. Mulut & Ptialin</text>
              <line x1="243" y1="55" x2="275" y2="55" stroke="#DC2626" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            {/* 2. Esophagus / Kerongkongan */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Kerongkongan: Gerak peristaltik (otot meremas) mendorong bolus makanan ke lambung.')}>
              <path d="M 225 67 L 225 125" stroke="#F87171" strokeWidth="8" strokeLinecap="round" />
              <text x="110" y="100" fill="#991B1B" fontSize="10" textAnchor="end">Gerak Peristaltik</text>
              <line x1="120" y1="97" x2="218" y2="97" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            {/* 3. Stomach / Lambung */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Lambung: Asam Klorida (HCl) membunuh bakteri dan mengaktifkan Enzim Pepsin pengurai protein.')}>
              <path
                d="M 225 125 C 205 130 185 145 185 170 C 185 200 230 205 240 185 C 245 170 235 150 225 125 Z"
                fill="#FED7AA"
                stroke="#EA580C"
                strokeWidth="2.5"
              />
              <text x="120" y="165" fill="#C2410C" fontSize="11" fontWeight="bold" textAnchor="end">2. Lambung (HCl & Pepsin)</text>
              <line x1="125" y1="162" x2="190" y2="162" stroke="#EA580C" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            {/* Liver & Gallbladder / Hati & Empedu */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Hati & Kantung Empedu: Menghasilkan cairan empedu untuk mengemulsi lemak.')}>
              <path d="M 240 135 C 265 135 285 150 280 175 C 260 175 245 160 240 135 Z" fill="#F87171" opacity="0.8" stroke="#B91C1C" strokeWidth="1.5" />
              <circle cx="255" cy="165" r="5" fill="#84CC16" /> {/* Empedu */}
              <text x="315" y="150" fill="#15803D" fontSize="10" fontWeight="bold">Hati & Empedu</text>
              <line x1="260" y1="165" x2="310" y2="150" stroke="#16A34A" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            {/* 4. Small Intestine / Usus Halus */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Usus Halus: Enzim Lipase, Amilase, Tripsin & Vili menyerap sari makanan ke pembuluh darah.')}>
              <path
                d="M 225 200 C 200 210 200 230 225 235 C 250 240 250 260 225 265 C 205 270 215 285 225 280"
                stroke="#FB923C"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="325" y="240" fill="#EA580C" fontSize="11" fontWeight="bold">3. Usus Halus (Vili)</text>
              <line x1="240" y1="238" x2="320" y2="238" stroke="#EA580C" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            {/* 5. Large Intestine / Usus Besar */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Usus Besar: Penyerapan kembali air dan pembusukan sisa makanan oleh bakteri E. coli.')}>
              <path
                d="M 180 280 L 180 200 C 180 190 270 190 270 200 L 270 280 L 225 310"
                stroke="#CBD5E1"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="110" y="245" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="end">4. Usus Besar (Air)</text>
              <line x1="115" y1="242" x2="175" y2="242" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
            </g>
          </svg>
        </div>

        {activeElement ? (
          <div className="mt-3 bg-emerald-50 rounded-xl p-3 text-xs text-emerald-900 border border-emerald-200 flex items-center justify-between">
            <p><strong className="text-emerald-950">Fungsi Organ:</strong> {activeElement}</p>
            <button onClick={() => setActiveElement(null)} className="ml-2 text-emerald-700 hover:text-emerald-950 px-2 py-0.5 rounded bg-emerald-100 text-[11px]">Tutup</button>
          </div>
        ) : (
          <div className="mt-2 text-center text-xs text-slate-500">
            Sari nutrisi diserap di Usus Halus melalui jonjot vili seluas lapangan bulu tangkis!
          </div>
        )}
      </div>
    );
  }

  // Default Circuit / Law of Ohm
  return (
    <div className="relative w-full rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span className="font-semibold text-slate-800">Segitiga Ajaib Hukum Ohm: V = I × R</span>
        </div>
        <span className="text-[11px] text-slate-500">Tegangan, Kuat Arus & Hambatan</span>
      </div>

      <div className="w-full aspect-[16/9] max-h-[300px] flex items-center justify-center">
        <svg className="w-full h-full max-w-[420px]" viewBox="0 0 400 300" fill="none">
          {/* VIR Magic Triangle */}
          <polygon points="200,40 70,250 330,250" fill="#F8FAFC" stroke="#2563EB" strokeWidth="3" />
          
          {/* Horizontal divider */}
          <line x1="125" y1="160" x2="275" y2="160" stroke="#2563EB" strokeWidth="2.5" />
          
          {/* Vertical divider */}
          <line x1="200" y1="160" x2="200" y2="250" stroke="#2563EB" strokeWidth="2.5" />

          {/* V (Volt) */}
          <g className="cursor-pointer" onClick={() => setActiveElement('Tegangan (V): Dorongan listrik dari sumber daya (Volt). V = I × R')}>
            <circle cx="200" cy="105" r="28" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="2" />
            <text x="200" y="114" textAnchor="middle" fill="#1E40AF" fontSize="26" fontWeight="bold">V</text>
            <text x="200" y="142" textAnchor="middle" fill="#3B82F6" fontSize="10">Volt (Tegangan)</text>
          </g>

          {/* I (Ampere) */}
          <g className="cursor-pointer" onClick={() => setActiveElement('Kuat Arus (I): Banyaknya muatan listrik per detik (Ampere). I = V / R')}>
            <circle cx="145" cy="205" r="24" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
            <text x="145" y="213" textAnchor="middle" fill="#B45309" fontSize="22" fontWeight="bold">I</text>
            <text x="145" y="240" textAnchor="middle" fill="#D97706" fontSize="10">Ampere (Arus)</text>
          </g>

          {/* Multiplication dot */}
          <circle cx="200" cy="205" r="3" fill="#64748B" />

          {/* R (Ohm) */}
          <g className="cursor-pointer" onClick={() => setActiveElement('Hambatan (R): Tahanan kawat penghantar (Ohm Ω). R = V / I')}>
            <circle cx="255" cy="205" r="24" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
            <text x="255" y="213" textAnchor="middle" fill="#15803D" fontSize="22" fontWeight="bold">R</text>
            <text x="255" y="240" textAnchor="middle" fill="#16A34A" fontSize="10">Ohm (Hambatan)</text>
          </g>
        </svg>
      </div>

      <div className="mt-2 text-center text-xs text-slate-500">
        {activeElement || 'Trik Segitiga: Tutup huruf yang dicari dengan jarimu untuk melihat rumus perhitungannya!'}
      </div>
    </div>
  );

  if (type === 'algorithm') {
    return (
      <div className="relative w-full rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-5 text-white overflow-hidden shadow-sm border border-indigo-800">
        <div className="flex items-center justify-between pb-3 border-b border-indigo-800/60 mb-3 text-xs text-indigo-300">
          <span className="font-semibold text-white">Visualisasi Alur Algoritma Pencarian</span>
          <span className="text-[11px] text-indigo-400">Binary Search vs Linear Search</span>
        </div>
        <div className="relative w-full aspect-[16/9] max-h-[300px] flex items-center justify-center">
          <svg className="w-full h-full max-w-[420px]" viewBox="0 0 400 240" fill="none">
            {/* Array Boxes */}
            {[2, 5, 8, 12, 16, 23, 38, 56].map((num, i) => (
              <g key={i} className="cursor-pointer" onClick={() => setActiveElement(`Elemen ke-${i}: Nilai ${num}. Pada Binary Search, kita membelah deret terurut di titik tengah!`)}>
                <rect x={30 + i * 42} y="90" width="38" height="50" rx="6" fill={i === 4 ? '#38bdf8' : i === 3 ? '#6366f1' : '#1e1b4b'} stroke="#818cf8" strokeWidth="2" />
                <text x={49 + i * 42} y="122" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">{num}</text>
                <text x={49 + i * 42} y="156" textAnchor="middle" fill="#94a3b8" fontSize="10">idx {i}</text>
              </g>
            ))}
            {/* Mid Pointer Arrow */}
            <path d="M218 55 L218 80" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
            <polygon points="218,85 213,75 223,75" fill="#38bdf8" />
            <text x="218" y="46" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Titik Tengah (Mid)</text>
          </svg>
        </div>
        <div className="mt-2 text-center text-xs text-indigo-300">
          {activeElement || 'Klik kotak angka untuk melihat langkah perbandingan pencarian algoritma!'}
        </div>
      </div>
    );
  }

  if (type === 'trade') {
    return (
      <div className="relative w-full rounded-2xl bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 p-5 text-white overflow-hidden shadow-sm border border-amber-800">
        <div className="flex items-center justify-between pb-3 border-b border-amber-800/60 mb-3 text-xs text-amber-300">
          <span className="font-semibold text-white">Visualisasi Interaksi Keruangan & Jalur Perdagangan</span>
          <span className="text-[11px] text-amber-400">Komplementaritas Antardaerah</span>
        </div>
        <div className="relative w-full aspect-[16/9] max-h-[300px] flex items-center justify-center">
          <svg className="w-full h-full max-w-[420px]" viewBox="0 0 400 240" fill="none">
            {/* Region A (Dataran Tinggi) */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Wilayah Pegunungan: Surplus sayur mayur & buah, minus ikan laut.')}>
              <circle cx="90" cy="120" r="50" fill="#065f46" stroke="#34d399" strokeWidth="2.5" />
              <text x="90" y="112" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Dataran Tinggi</text>
              <text x="90" y="130" textAnchor="middle" fill="#a7f3d0" fontSize="10">Surplus Sayuran</text>
            </g>
            {/* Region B (Pesisir Pantai) */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Wilayah Pesisir: Surplus ikan laut & garam, minus sayuran segar.')}>
              <circle cx="310" cy="120" r="50" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="310" y="112" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Wilayah Pesisir</text>
              <text x="310" y="130" textAnchor="middle" fill="#bae6fd" fontSize="10">Surplus Ikan Laut</text>
            </g>
            {/* Trade Exchange Bidirectional Curves */}
            <path d="M145 95 Q200 65 255 95" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
            <polygon points="258,97 248,93 250,101" fill="#f59e0b" />
            <text x="200" y="60" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Distribusi Sayur 🥦</text>

            <path d="M255 145 Q200 175 145 145" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
            <polygon points="142,143 152,147 150,139" fill="#38bdf8" />
            <text x="200" y="190" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="bold">Distribusi Ikan Laut 🐟</text>
          </svg>
        </div>
        <div className="mt-2 text-center text-xs text-amber-300">
          {activeElement || 'Klik wilayah untuk menganalisis arus pertukaran komoditas antardaerah!'}
        </div>
      </div>
    );
  }

  if (type === 'civics') {
    return (
      <div className="relative w-full rounded-2xl bg-gradient-to-br from-rose-950 via-slate-900 to-red-950 p-5 text-white overflow-hidden shadow-sm border border-rose-800">
        <div className="flex items-center justify-between pb-3 border-b border-rose-800/60 mb-3 text-xs text-rose-300">
          <span className="font-semibold text-white">Hierarki Norma & Nilai Keadilan Pancasila</span>
          <span className="text-[11px] text-rose-400">Agama, Kesusilaan, Kesopanan, Hukum</span>
        </div>
        <div className="relative w-full aspect-[16/9] max-h-[300px] flex items-center justify-center">
          <svg className="w-full h-full max-w-[420px]" viewBox="0 0 400 240" fill="none">
            {/* 4 Pyramid Tiers of Norms */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Norma Agama: Berasal dari Tuhan YME, sanksi di akhirat / spiritual')}>
              <polygon points="200,30 235,70 165,70" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="200" y="58" textAnchor="middle" fill="#713f12" fontSize="10" fontWeight="bold">Agama</text>
            </g>
            <g className="cursor-pointer" onClick={() => setActiveElement('Norma Kesusilaan: Berasal dari hati nurani manusia, sanksi rasa bersalah & malu')}>
              <polygon points="165,72 235,72 265,115 135,115" fill="#f43f5e" stroke="#e11d48" strokeWidth="1.5" />
              <text x="200" y="98" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Kesusilaan</text>
            </g>
            <g className="cursor-pointer" onClick={() => setActiveElement('Norma Kesopanan: Berasal dari tata krama pergaulan adat masyarakat, sanksi dikucilkan')}>
              <polygon points="135,117 265,117 295,160 105,160" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5" />
              <text x="200" y="142" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Kesopanan</text>
            </g>
            <g className="cursor-pointer" onClick={() => setActiveElement('Norma Hukum: Dibuat lembaga resmi negara, sanksi tegas, mengikat & memaksa (denda/penjara)')}>
              <polygon points="105,162 295,162 330,210 70,210" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
              <text x="200" y="190" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Norma Hukum (Tegas & Memaksa)</text>
            </g>
          </svg>
        </div>
        <div className="mt-2 text-center text-xs text-rose-300">
          {activeElement || 'Klik tingkatan piramida norma untuk mempelajari sumber dan bentuk sanksinya!'}
        </div>
      </div>
    );
  }

  if (type === 'observation') {
    return (
      <div className="relative w-full rounded-2xl bg-gradient-to-br from-teal-950 via-slate-900 to-teal-900 p-5 text-white overflow-hidden shadow-sm border border-teal-800">
        <div className="flex items-center justify-between pb-3 border-b border-teal-800/60 mb-3 text-xs text-teal-300">
          <span className="font-semibold text-white">Struktur Teks Laporan Hasil Observasi (LHO)</span>
          <span className="text-[11px] text-teal-400">Pernyataan Umum, Deskripsi Bagian & Manfaat</span>
        </div>
        <div className="relative w-full aspect-[16/9] max-h-[300px] flex items-center justify-center">
          <svg className="w-full h-full max-w-[420px]" viewBox="0 0 400 240" fill="none">
            {/* 3 Flow Sections of LHO Report */}
            <g className="cursor-pointer" onClick={() => setActiveElement('1. Pernyataan Umum: Definisi ilmiah, klasifikasi subjek, dan pengantar objek observasi.')}>
              <rect x="50" y="40" width="300" height="42" rx="8" fill="#0f766e" stroke="#2dd4bf" strokeWidth="2" />
              <text x="200" y="66" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">1. Pernyataan Umum & Definisi</text>
            </g>
            <path d="M200 82 L200 98" stroke="#2dd4bf" strokeWidth="2" />
            <g className="cursor-pointer" onClick={() => setActiveElement('2. Deskripsi Bagian: Rincian ciri fisik, anatomi, perilaku, atau habitat objek secara faktual.')}>
              <rect x="50" y="100" width="300" height="42" rx="8" fill="#115e59" stroke="#14b8a6" strokeWidth="2" />
              <text x="200" y="126" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">2. Deskripsi Bagian Objektif</text>
            </g>
            <path d="M200 142 L200 158" stroke="#14b8a6" strokeWidth="2" />
            <g className="cursor-pointer" onClick={() => setActiveElement('3. Deskripsi Manfaat / Simpulan: Kegunaan objek dalam ekosistem dan kehidupan nyata.')}>
              <rect x="50" y="160" width="300" height="42" rx="8" fill="#134e4a" stroke="#5eead4" strokeWidth="2" />
              <text x="200" y="186" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">3. Deskripsi Manfaat / Kegunaan</text>
            </g>
          </svg>
        </div>
        <div className="mt-2 text-center text-xs text-teal-300">
          {activeElement || 'Klik tiap blok struktur LHO untuk memahami kaidah kebahasaan dan isinya!'}
        </div>
      </div>
    );
  }

  if (type === 'cyber') {
    return (
      <div className="relative w-full rounded-2xl bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 p-5 text-white overflow-hidden shadow-sm border border-teal-800">
        <div className="flex items-center justify-between pb-3 border-b border-teal-800/60 mb-3 text-xs text-teal-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-semibold text-white">Anatomi Jejak Digital: Aktif vs Pasif & Keamanan Privasi</span>
          </div>
          <span className="text-[11px] text-teal-400">Klik elemen untuk info bahaya & proteksi</span>
        </div>

        <div className="relative w-full aspect-[16/9] max-h-[320px] flex items-center justify-center">
          <svg className="w-full h-full max-w-[620px]" viewBox="0 0 540 280" fill="none">
            {/* Left Box: Jejak Digital Aktif */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Jejak Aktif: Data yang sengaja kita bagikan (postingan medsos, status, video, komentar, dan pesan). Selamanya bisa disimpan pihak lain!')}>
              <rect x="25" y="30" width="220" height="100" rx="10" fill="#0f2b26" stroke="#14b8a6" strokeWidth="2" />
              <text x="135" y="55" textAnchor="middle" fill="#5eead4" fontSize="13" fontWeight="bold">Jejak Digital Aktif</text>
              <text x="135" y="75" textAnchor="middle" fill="#ccfbf1" fontSize="10">Foto profil, status, komentar</text>
              <text x="135" y="92" textAnchor="middle" fill="#ccfbf1" fontSize="10">Unggahan video & kirim pesan</text>
              <rect x="55" y="105" width="160" height="16" rx="4" fill="#115e59" />
              <text x="135" y="116" textAnchor="middle" fill="#a7f3d0" fontSize="8.5" fontWeight="bold">Tersimpan di Cloud & Server Publik</text>
            </g>

            {/* Right Box: Jejak Digital Pasif */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Jejak Pasif: Data yang terekam otomatis tanpa kita sadari (alamat IP, cookies browsing, riwayat pencarian, info perangkat, geolokasi GPS).')}>
              <rect x="295" y="30" width="220" height="100" rx="10" fill="#132438" stroke="#38bdf8" strokeWidth="2" />
              <text x="405" y="55" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontWeight="bold">Jejak Digital Pasif</text>
              <text x="405" y="75" textAnchor="middle" fill="#e0f2fe" fontSize="10">Alamat IP & riwayat penelusuran</text>
              <text x="405" y="92" textAnchor="middle" fill="#e0f2fe" fontSize="10">Cookies web & sensor lokasi GPS</text>
              <rect x="325" y="105" width="160" height="16" rx="4" fill="#0369a1" />
              <text x="405" y="116" textAnchor="middle" fill="#bae6fd" fontSize="8.5" fontWeight="bold">Terekam Otomatis oleh Algoritma</text>
            </g>

            {/* Central Protection Shield */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Perlindungan Privasi Siber: Gunakan password kuat unik, aktifkan 2FA, atur akun ke mode privat, dan pikirkan reputasi masa depan sebelum posting!')}>
              <path d="M 270 145 L 320 165 C 320 220, 270 255, 270 260 C 270 255, 220 220, 220 165 Z" fill="#042f2e" stroke="#2dd4bf" strokeWidth="2.5" />
              <circle cx="270" cy="190" r="14" fill="#0f766e" />
              <text x="270" y="195" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">🛡️</text>
              <text x="270" y="222" textAnchor="middle" fill="#5eead4" fontSize="9" fontWeight="bold">Etika & 2FA</text>
            </g>

            {/* Connecting arrows */}
            <path d="M 135 130 L 135 180 L 210 180" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 405 130 L 405 180 L 330 180" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>

        <div className="mt-2 text-center text-xs text-teal-300">
          {activeElement || 'Klik Jejak Aktif, Jejak Pasif, atau Perisai Keamanan untuk membaca penjelasannya!'}
        </div>
      </div>
    );
  }

  if (type === 'analytics') {
    return (
      <div className="relative w-full rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-5 text-white overflow-hidden shadow-sm border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="font-semibold text-white">Siklus Analisis Data: Pengumpulan → Pembersihan → Visualisasi</span>
          </div>
          <span className="text-[11px] text-slate-400">Klik tahapan analisis</span>
        </div>

        <div className="relative w-full aspect-[16/9] max-h-[320px] flex items-center justify-center">
          <svg className="w-full h-full max-w-[620px]" viewBox="0 0 540 280" fill="none">
            {/* Step 1: Pengumpulan Data */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Tahap 1 - Pengumpulan Data: Mengambil data dari kuesioner, formulir, sensor IoT, atau log sistem.')}>
              <rect x="20" y="50" width="140" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="90" y="78" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">1. Pengumpulan</text>
              <text x="90" y="98" textAnchor="middle" fill="#94a3b8" fontSize="9.5">Formulir & Angket</text>
              <text x="90" y="114" textAnchor="middle" fill="#94a3b8" fontSize="9.5">Data Mentah (Raw)</text>
            </g>

            {/* Arrow 1 -> 2 */}
            <path d="M 165 95 L 190 95" stroke="#f59e0b" strokeWidth="2" />
            <polygon points="195,95 188,91 188,99" fill="#f59e0b" />

            {/* Step 2: Pembersihan & Pemodelan */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Tahap 2 - Pembersihan Data: Membuang duplikat, memperbaiki nilai kosong (missing values), dan merapikan kolom tabel spreadsheet.')}>
              <rect x="200" y="50" width="140" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="270" y="78" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">2. Pembersihan</text>
              <text x="270" y="98" textAnchor="middle" fill="#94a3b8" fontSize="9.5">Hapus Data Duplikat</text>
              <text x="270" y="114" textAnchor="middle" fill="#94a3b8" fontSize="9.5">Kalkulasi Rumus Excel</text>
            </g>

            {/* Arrow 2 -> 3 */}
            <path d="M 345 95 L 370 95" stroke="#10b981" strokeWidth="2" />
            <polygon points="375,95 368,91 368,99" fill="#10b981" />

            {/* Step 3: Visualisasi & Kesimpulan */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Tahap 3 - Visualisasi & Keputusan: Mengubah angka jadi grafik batang, lingkaran, atau garis untuk menemukan pola tren dan mengambil keputusan.')}>
              <rect x="380" y="50" width="140" height="90" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="450" y="78" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">3. Visualisasi</text>
              <text x="450" y="98" textAnchor="middle" fill="#94a3b8" fontSize="9.5">Grafik Batang / Tren</text>
              <text x="450" y="114" textAnchor="middle" fill="#94a3b8" fontSize="9.5">Wawasan Keputusan</text>
            </g>

            {/* Decision output banner */}
            <g className="cursor-pointer" onClick={() => setActiveElement('Wawasan Berharga (Actionable Insight): Dari pola data yang terlihat di diagram, guru atau siswa dapat menarik kesimpulan ilmiah yang akurat.')}>
              <rect x="120" y="180" width="300" height="50" rx="25" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
              <text x="270" y="210" textAnchor="middle" fill="#c7d2fe" fontSize="12" fontWeight="bold">💡 Hasil: Kesimpulan & Solusi Berbasis Data</text>
            </g>

            {/* Connecting lines downward */}
            <path d="M 450 145 L 450 165 L 360 185" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>

        <div className="mt-2 text-center text-xs text-sky-300">
          {activeElement || 'Klik tiap tahapan diagram alir analisis data untuk membaca keterangannya!'}
        </div>
      </div>
    );
  }

  return null;
};


