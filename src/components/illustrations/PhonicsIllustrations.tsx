import React from 'react';

interface IllustrationProps {
  className?: string;
  size?: number;
}

export const SunIllustration: React.FC<IllustrationProps> = ({ className = '', size = 160 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md ${className}`}
  >
    {/* Sun Rays */}
    <g className="animate-spin" style={{ transformOrigin: '80px 80px', animationDuration: '24s' }}>
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
        <path
          key={i}
          d="M80 14L86 34H74L80 14Z"
          fill="#F59E0B"
          transform={`rotate(${deg} 80 80)`}
          rx="4"
        />
      ))}
    </g>

    {/* Sun Body */}
    <circle cx="80" cy="80" r="50" fill="#FBBF24" stroke="#F59E0B" strokeWidth="4" />
    <circle cx="80" cy="80" r="46" fill="#FDE047" />

    {/* Rosy Cheeks */}
    <circle cx="62" cy="88" r="7" fill="#FCA5A5" opacity="0.8" />
    <circle cx="98" cy="88" r="7" fill="#FCA5A5" opacity="0.8" />

    {/* Big Happy Eyes */}
    <circle cx="66" cy="74" r="6" fill="#1E293B" />
    <circle cx="68" cy="72" r="2.5" fill="#FFFFFF" />
    <circle cx="94" cy="74" r="6" fill="#1E293B" />
    <circle cx="96" cy="72" r="2.5" fill="#FFFFFF" />

    {/* Big Cheerful Smile */}
    <path
      d="M68 86C72 96 88 96 92 86"
      stroke="#1E293B"
      strokeWidth="4"
      strokeLinecap="round"
      fill="#F87171"
    />
  </svg>
);

export const AppleIllustration: React.FC<IllustrationProps> = ({ className = '', size = 160 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md ${className}`}
  >
    {/* Stem */}
    <path
      d="M80 42C80 28 88 20 94 16"
      stroke="#78350F"
      strokeWidth="6"
      strokeLinecap="round"
    />

    {/* Leaf */}
    <path
      d="M82 32C94 22 110 26 114 36C102 44 88 38 82 32Z"
      fill="#22C55E"
      stroke="#15803D"
      strokeWidth="2.5"
    />

    {/* Apple Body */}
    <path
      d="M80 50C62 38 34 50 34 82C34 116 60 144 80 144C100 144 126 116 126 82C126 50 98 38 80 50Z"
      fill="#EF4444"
      stroke="#DC2626"
      strokeWidth="4"
    />

    {/* Shine highlight */}
    <path
      d="M48 64C44 76 46 92 50 100"
      stroke="#FCA5A5"
      strokeWidth="4.5"
      strokeLinecap="round"
      opacity="0.85"
    />

    {/* Cute Face */}
    <circle cx="66" cy="86" r="5.5" fill="#1E293B" />
    <circle cx="68" cy="84" r="2" fill="#FFFFFF" />
    <circle cx="94" cy="86" r="5.5" fill="#1E293B" />
    <circle cx="96" cy="84" r="2" fill="#FFFFFF" />

    {/* Rosy Cheeks */}
    <circle cx="58" cy="95" r="5.5" fill="#F87171" opacity="0.6" />
    <circle cx="102" cy="95" r="5.5" fill="#F87171" opacity="0.6" />

    {/* Smile */}
    <path
      d="M72 95C76 102 84 102 88 95"
      stroke="#1E293B"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);

export const TapIllustration: React.FC<IllustrationProps> = ({ className = '', size = 160 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md ${className}`}
  >
    {/* Wall Pipe */}
    <rect x="18" y="60" width="30" height="24" rx="4" fill="#94A3B8" stroke="#64748B" strokeWidth="3" />

    {/* Tap Handle (Top valve knob) */}
    <ellipse cx="96" cy="34" rx="24" ry="7" fill="#EF4444" stroke="#DC2626" strokeWidth="3" />
    <rect x="91" y="40" width="10" height="16" fill="#64748B" />

    {/* Tap Curved Spout */}
    <path
      d="M44 72H96C104 72 112 80 112 88V104H88V88C88 84 84 80 80 80H44V72Z"
      fill="#38BDF8"
      stroke="#0284C7"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />

    {/* Spout Mouth */}
    <rect x="84" y="102" width="32" height="10" rx="3" fill="#0284C7" />

    {/* Shiny Water Droplet falling */}
    <path
      d="M100 120C100 120 90 134 90 142C90 148 94.5 152 100 152C105.5 152 110 148 110 142C110 134 100 120 100 120Z"
      fill="#0EA5E9"
      stroke="#0284C7"
      strokeWidth="2"
      className="animate-bounce"
    />
    <ellipse cx="97" cy="142" rx="2" ry="4" fill="#E0F2FE" />

    {/* Friendly Tap Eyes */}
    <circle cx="68" cy="68" r="4.5" fill="#0F172A" />
    <circle cx="70" cy="66" r="1.5" fill="#FFFFFF" />
    <circle cx="82" cy="68" r="4.5" fill="#0F172A" />
    <circle cx="84" cy="66" r="1.5" fill="#FFFFFF" />
    <path d="M72 74C74 77 78 77 80 74" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const PenIllustration: React.FC<IllustrationProps> = ({ className = '', size = 160 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md ${className}`}
  >
    {/* Pen Body tilted 45 deg */}
    <g transform="rotate(-35 80 80)">
      {/* Clicker */}
      <rect x="74" y="14" width="12" height="10" rx="2" fill="#64748B" stroke="#475569" strokeWidth="2" />
      {/* Clip */}
      <path d="M72 26V60H68V26C68 24 70 24 72 26Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
      {/* Pen Upper Barrel */}
      <rect x="70" y="24" width="20" height="42" rx="4" fill="#A855F7" stroke="#7E22CE" strokeWidth="3" />
      {/* Grip with stripes */}
      <rect x="70" y="66" width="20" height="40" rx="3" fill="#C084FC" stroke="#7E22CE" strokeWidth="2.5" />
      <line x1="72" y1="76" x2="88" y2="76" stroke="#9333EA" strokeWidth="2" />
      <line x1="72" y1="86" x2="88" y2="86" stroke="#9333EA" strokeWidth="2" />
      <line x1="72" y1="96" x2="88" y2="96" stroke="#9333EA" strokeWidth="2" />
      {/* Cone Tip */}
      <path d="M70 106L80 134L90 106H70Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="2.5" />
      {/* Ballpoint */}
      <circle cx="80" cy="136" r="3" fill="#4C1D95" />
    </g>

    {/* Playful ink star trail */}
    <path
      d="M106 122C116 116 126 124 136 122"
      stroke="#A855F7"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="4 6"
    />
    <polygon points="144,116 147,123 154,124 149,129 150,136 144,132 138,136 139,129 134,124 141,123" fill="#F59E0B" />
  </svg>
);

export const InsectIllustration: React.FC<IllustrationProps> = ({ className = '', size = 160 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md ${className}`}
  >
    {/* Fresh green leaf underneath */}
    <path
      d="M20 135C45 100 85 95 142 120C120 148 68 155 20 135Z"
      fill="#86EFAC"
      stroke="#22C55E"
      strokeWidth="3.5"
    />
    <path d="M22 136C70 128 110 126 140 121" stroke="#16A34A" strokeWidth="2.5" />

    {/* Little Cute Caterpillar Body Segments */}
    {/* Tail segment */}
    <circle cx="44" cy="98" r="16" fill="#4ADE80" stroke="#16A34A" strokeWidth="3" />
    {/* Middle segment 1 */}
    <circle cx="64" cy="88" r="17" fill="#34D399" stroke="#059669" strokeWidth="3" />
    {/* Middle segment 2 */}
    <circle cx="86" cy="84" r="18" fill="#10B981" stroke="#047857" strokeWidth="3" />
    {/* Head segment */}
    <circle cx="110" cy="74" r="21" fill="#2DD4BF" stroke="#0D9488" strokeWidth="3.5" />

    {/* Antennae */}
    <path d="M112 55C110 40 102 32 94 30" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
    <circle cx="93" cy="30" r="4.5" fill="#F59E0B" />
    <path d="M120 57C124 42 134 35 142 34" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
    <circle cx="142" cy="34" r="4.5" fill="#F59E0B" />

    {/* Eyes */}
    <circle cx="106" cy="70" r="5" fill="#0F172A" />
    <circle cx="108" cy="68" r="1.8" fill="#FFFFFF" />
    <circle cx="122" cy="71" r="5" fill="#0F172A" />
    <circle cx="124" cy="69" r="1.8" fill="#FFFFFF" />

    {/* Cheerful mouth & rosy cheek */}
    <circle cx="116" cy="82" r="4" fill="#F87171" opacity="0.6" />
    <path d="M110 78C114 83 120 83 124 78" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

    {/* Cute tiny yellow dots on body */}
    <circle cx="64" cy="86" r="3.5" fill="#FDE047" />
    <circle cx="86" cy="82" r="4" fill="#FDE047" />
  </svg>
);

export const NetIllustration: React.FC<IllustrationProps> = ({ className = '', size = 160 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md ${className}`}
  >
    {/* Wooden Handle */}
    <line x1="20" y1="140" x2="68" y2="92" stroke="#B45309" strokeWidth="12" strokeLinecap="round" />
    <line x1="22" y1="138" x2="66" y2="94" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />

    {/* Net Mesh Bag */}
    <path
      d="M74 86C68 116 100 144 126 138C148 132 152 96 128 66L74 86Z"
      fill="#BAE6FD"
      fillOpacity="0.65"
      stroke="#0284C7"
      strokeWidth="3"
    />

    {/* Net Grid Lines */}
    <path
      d="M84 83C90 105 110 128 128 136M98 77C104 95 124 116 138 122M80 98C102 96 124 90 142 80M88 114C108 116 128 108 146 96"
      stroke="#0284C7"
      strokeWidth="1.8"
      strokeDasharray="2 3"
      opacity="0.8"
    />

    {/* Net Ring / Rim */}
    <ellipse
      cx="98"
      cy="72"
      rx="32"
      ry="18"
      transform="rotate(-25 98 72)"
      fill="none"
      stroke="#F97316"
      strokeWidth="7"
    />
    <ellipse
      cx="98"
      cy="72"
      rx="32"
      ry="18"
      transform="rotate(-25 98 72)"
      fill="none"
      stroke="#FDBA74"
      strokeWidth="2.5"
    />

    {/* Caught Shining Golden Star */}
    <polygon
      points="114,84 118,94 128,95 120,102 122,112 114,107 106,112 108,102 100,95 110,94"
      fill="#FBBF24"
      stroke="#D97706"
      strokeWidth="2"
      className="animate-pulse"
    />
    <circle cx="112" cy="98" r="1.5" fill="#FFFFFF" />
  </svg>
);

export const PhonicsIllustration: React.FC<{
  type: string;
  className?: string;
  size?: number;
}> = ({ type, className, size = 140 }) => {
  switch (type) {
    case 'sun':
      return <SunIllustration className={className} size={size} />;
    case 'apple':
      return <AppleIllustration className={className} size={size} />;
    case 'tap':
      return <TapIllustration className={className} size={size} />;
    case 'pen':
      return <PenIllustration className={className} size={size} />;
    case 'insect':
      return <InsectIllustration className={className} size={size} />;
    case 'net':
      return <NetIllustration className={className} size={size} />;
    default:
      return <SunIllustration className={className} size={size} />;
  }
};
