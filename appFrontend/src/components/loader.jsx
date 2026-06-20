const StorkLoader = () => {
  return (
    <>
      <style>{`
        @keyframes stork-float {
          0%, 100% { transform: translateY(20px); }
          50%       { transform: translateY(-18px); }
        }
        @keyframes stork-swing {
          0%, 100% { transform: rotate(-9deg); }
          50%       { transform: rotate(9deg); }
        }
        @keyframes stork-twinkle {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.15; }
        }
        @keyframes stork-dot {
          0%, 20%    { opacity: 0; }
          50%        { opacity: 1; }
          80%, 100%  { opacity: 0; }
        }
        @keyframes stork-cloud {
          0%, 100% { transform: translateX(0px); }
          50%      { transform: translateX(6px); }
        }

        .stork-float {
          animation: stork-float 3s ease-in-out infinite;
          transform-origin: 340px 170px;
        }
        .stork-swing {
          animation: stork-swing 2s ease-in-out infinite;
          transform-origin: 340px 118px;
        }
        .stork-cloud-l { animation: stork-cloud 4s ease-in-out infinite; }
        .stork-cloud-r { animation: stork-cloud 4s ease-in-out infinite reverse; }

        .stork-star-1 { animation: stork-twinkle 1.8s ease-in-out infinite 0.0s; }
        .stork-star-2 { animation: stork-twinkle 1.8s ease-in-out infinite 0.5s; }
        .stork-star-3 { animation: stork-twinkle 1.8s ease-in-out infinite 1.0s; }
        .stork-star-4 { animation: stork-twinkle 1.8s ease-in-out infinite 1.5s; }
        .stork-star-5 { animation: stork-twinkle 1.8s ease-in-out infinite 0.3s; }
        .stork-star-6 { animation: stork-twinkle 1.8s ease-in-out infinite 1.2s; }

        .stork-dot-1 { animation: stork-dot 1.4s ease-in-out infinite 0.0s; }
        .stork-dot-2 { animation: stork-dot 1.4s ease-in-out infinite 0.3s; }
        .stork-dot-3 { animation: stork-dot 1.4s ease-in-out infinite 0.6s; }
      `}</style>

      <svg
      className="bg-gray-900 h-screen"
        width="100%"
        height="100%"
        viewBox="0 0 680 340"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Loading — stork carrying a baby bundle"
      >
        {/* Left cloud */}
        <g className="stork-cloud-l">
          <ellipse cx="100" cy="85" rx="58" ry="30" fill="#fce8f3" opacity="0.6" />
          <ellipse cx="148" cy="74" rx="46" ry="23" fill="#fce8f3" opacity="0.6" />
          <ellipse cx="78"  cy="80" rx="36" ry="19" fill="#fce8f3" opacity="0.55" />
        </g>

        {/* Right cloud */}
        <g className="stork-cloud-r">
          <ellipse cx="578" cy="85" rx="58" ry="30" fill="#e3f0fb" opacity="0.6" />
          <ellipse cx="530" cy="74" rx="46" ry="23" fill="#e3f0fb" opacity="0.6" />
          <ellipse cx="600" cy="80" rx="36" ry="19" fill="#e3f0fb" opacity="0.55" />
        </g>

        {/* Stars */}
        <text className="stork-star-1" x="58"  y="155" fontSize="15" textAnchor="middle" fill="#D4537E">✦</text>
        <text className="stork-star-2" x="622" y="145" fontSize="13" textAnchor="middle" fill="#378ADD">✦</text>
        <text className="stork-star-3" x="130" y="245" fontSize="11" textAnchor="middle" fill="#D4537E">✦</text>
        <text className="stork-star-4" x="550" y="240" fontSize="11" textAnchor="middle" fill="#378ADD">✦</text>
        <text className="stork-star-5" x="200" y="115" fontSize="9"  textAnchor="middle" fill="#D4537E">✦</text>
        <text className="stork-star-6" x="480" y="118" fontSize="9"  textAnchor="middle" fill="#378ADD">✦</text>

        {/* Floating stork + bundle */}
        <g className="stork-float">

          {/* String */}
          <line x1="340" y1="138" x2="340" y2="168" stroke="#B4B2A9" strokeWidth="1.5" strokeDasharray="4,3" />

          {/* Swinging bundle */}
          <g className="stork-swing">
            <ellipse cx="340" cy="202" rx="37" ry="33" fill="#fdf3f8" />
            <ellipse cx="340" cy="202" rx="37" ry="33" fill="none" stroke="#ED93B1" strokeWidth="2" />
            <path d="M328 173 Q340 162 352 173" fill="none" stroke="#ED93B1" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="340" cy="200" rx="14" ry="13" fill="#FAC775" opacity="0.85" />
            <circle cx="336" cy="198" r="1.8" fill="#5F5E5A" />
            <circle cx="344" cy="198" r="1.8" fill="#5F5E5A" />
            <path d="M336 205 Q340 209 344 205" fill="none" stroke="#D85A30" strokeWidth="1.3" strokeLinecap="round" />
          </g>

          {/* Stork body */}
          <ellipse cx="340" cy="95" rx="22" ry="30" fill="white" stroke="#D3D1C7" strokeWidth="1.2" />
          {/* Wing */}
          <path d="M318 90 Q294 79 300 100 Q311 109 325 100Z" fill="white" stroke="#D3D1C7" strokeWidth="1.2" />
          {/* Head */}
          <circle cx="340" cy="60" r="16" fill="white" stroke="#D3D1C7" strokeWidth="1.2" />
          {/* Head patch */}
          <path d="M328 52 Q340 44 352 52 Q340 57 328 52Z" fill="#2C2C2A" />
          {/* Eye */}
          <circle cx="345" cy="57" r="2.5" fill="#2C2C2A" />
          <circle cx="346.2" cy="55.8" r="0.8" fill="white" />
          {/* Beak */}
          <path d="M354 60 L372 57 L354 63Z" fill="#EF9F27" stroke="#BA7517" strokeWidth="0.8" />
          {/* Legs */}
          <line x1="333" y1="122" x2="328" y2="150" stroke="#EF9F27" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="347" y1="122" x2="352" y2="150" stroke="#EF9F27" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M322 150 L328 150 L326 157" stroke="#EF9F27" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M346 150 L352 150 L355 157" stroke="#EF9F27" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* Loading dots */}
        <text x="50%" y="95%" textAnchor = "middle" fontFamily="sans-serif" fontSize="14" fontWeight="500" fill="#888780">Loading</text>
        <circle className="stork-dot-1" cx="55%" cy="94%" r="3" fill="#888780" />
        <circle className="stork-dot-2" cx="57%" cy="94%" r="3" fill="#888780" />
        <circle className="stork-dot-3" cx="59%" cy="94%" r="3" fill="#888780" />
      </svg>
    </>
  );
};

export default StorkLoader;