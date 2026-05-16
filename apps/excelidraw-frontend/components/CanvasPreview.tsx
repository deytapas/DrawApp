export default function CanvasPreview() {
  return (
    <div className="relative bg-[#FFFEF9] h-[420px] overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #d6d3cf 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.5,
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 900 420"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* User A cursor */}
        <g transform="translate(540,60)">
          <path d="M0 0 L0 16 L4 12 L7 18 L9 17 L6 11 L11 11 Z" fill="#2563EB" opacity="0.9" />
          <rect x="12" y="-8" width="56" height="18" rx="4" fill="#2563EB" />
          <text x="40" y="5" textAnchor="middle" fill="white" fontSize="9" fontFamily="sans-serif" fontWeight="600">Alex</text>
        </g>

        {/* User B cursor */}
        <g transform="translate(300,280)">
          <path d="M0 0 L0 16 L4 12 L7 18 L9 17 L6 11 L11 11 Z" fill="#16A34A" opacity="0.9" />
          <rect x="12" y="-8" width="56" height="18" rx="4" fill="#16A34A" />
          <text x="40" y="5" textAnchor="middle" fill="white" fontSize="9" fontFamily="sans-serif" fontWeight="600">Sam</text>
        </g>

        {/* Hand-drawn box - top left */}
        <rect x="60" y="50" width="200" height="110" rx="4"
          fill="white" stroke="#1C1C1E" strokeWidth="2.5"
          strokeLinejoin="round"
          style={{ filter: 'url(#sketch)' }}
        />
        <text x="160" y="96" textAnchor="middle" fill="#1C1C1E" fontSize="13" fontFamily="'Caveat', cursive, sans-serif" fontWeight="700">User Research</text>
        <text x="160" y="115" textAnchor="middle" fill="#64748B" fontSize="11" fontFamily="sans-serif">4 interviews done</text>
        <text x="160" y="133" textAnchor="middle" fill="#64748B" fontSize="11" fontFamily="sans-serif">2 remaining</text>

        {/* Hand-drawn box - middle */}
        <rect x="340" y="50" width="200" height="110" rx="4"
          fill="#EFF6FF" stroke="#2563EB" strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="440" y="96" textAnchor="middle" fill="#1e40af" fontSize="13" fontFamily="'Caveat', cursive, sans-serif" fontWeight="700">Wireframing</text>
        <text x="440" y="115" textAnchor="middle" fill="#3b82f6" fontSize="11" fontFamily="sans-serif">In progress</text>
        <text x="440" y="133" textAnchor="middle" fill="#3b82f6" fontSize="11" fontFamily="sans-serif">3 screens left</text>

        {/* Hand-drawn box - top right */}
        <rect x="620" y="50" width="200" height="110" rx="4"
          fill="white" stroke="#1C1C1E" strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="720" y="96" textAnchor="middle" fill="#1C1C1E" fontSize="13" fontFamily="'Caveat', cursive, sans-serif" fontWeight="700">Prototyping</text>
        <text x="720" y="115" textAnchor="middle" fill="#64748B" fontSize="11" fontFamily="sans-serif">Not started</text>

        {/* Arrow 1 */}
        <path d="M262 105 L338 105" stroke="#64748B" strokeWidth="2" strokeDasharray="0"
          markerEnd="url(#arrowhead)" />
        <path d="M262 105 Q300 105 338 105" stroke="#64748B" strokeWidth="2" fill="none" />

        {/* Arrow 2 */}
        <path d="M542 105 L618 105" stroke="#64748B" strokeWidth="2"
          markerEnd="url(#arrowhead)" />

        {/* Sticky note */}
        <rect x="60" y="210" width="160" height="120" rx="2"
          fill="#FEF9C3" stroke="#EAB308" strokeWidth="1.5"
        />
        <text x="140" y="240" textAnchor="middle" fill="#713F12" fontSize="11" fontFamily="'Caveat', cursive, sans-serif" fontWeight="700">Key Insight</text>
        <text x="140" y="258" textAnchor="middle" fill="#78350F" fontSize="10" fontFamily="sans-serif">Users want faster</text>
        <text x="140" y="273" textAnchor="middle" fill="#78350F" fontSize="10" fontFamily="sans-serif">onboarding flow</text>
        <text x="140" y="293" textAnchor="middle" fill="#92400E" fontSize="9" fontFamily="sans-serif">— from interview #2</text>

        {/* Ellipse */}
        <ellipse cx="500" cy="270" rx="130" ry="70" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="8 4" />
        <text x="500" y="265" textAnchor="middle" fill="#DC2626" fontSize="12" fontFamily="'Caveat', cursive, sans-serif" fontWeight="700">Critical path</text>
        <text x="500" y="282" textAnchor="middle" fill="#DC2626" fontSize="10" fontFamily="sans-serif">Review by Friday</text>

        {/* Hand-drawn line/arrow from sticky to ellipse */}
        <path d="M220 270 Q340 230 368 250" stroke="#94A3B8" strokeWidth="1.5" fill="none" strokeDasharray="5 3"
          markerEnd="url(#arrowhead-light)" />

        {/* Free-hand scribble note */}
        <path d="M650 230 Q660 220 680 225 Q700 230 710 220 Q720 210 740 218 Q760 225 755 240 Q750 255 730 252 Q710 249 705 260 Q700 270 685 265 Q670 260 662 248 Q654 236 650 230"
          fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
        <text x="705" y="248" textAnchor="middle" fill="#166534" fontSize="10" fontFamily="sans-serif">✓ Approved</text>

        {/* Text annotation */}
        <text x="650" y="320" fill="#94A3B8" fontSize="11" fontFamily="'Caveat', cursive, sans-serif">v2 flow diagram</text>

        {/* Selection handles on middle box */}
        {[340, 440, 540].map((x) =>
          [50, 105, 160].map((y) => (
            <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" rx="1.5"
              fill="white" stroke="#2563EB" strokeWidth="1.5" />
          ))
        )}

        {/* Arrow markers */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748B" />
          </marker>
          <marker id="arrowhead-light" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#94A3B8" />
          </marker>
        </defs>
      </svg>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white border border-stone-200 rounded-lg px-2 py-1 shadow-sm">
        <button className="w-6 h-6 flex items-center justify-center text-stone-500 hover:text-stone-900 text-sm font-bold">−</button>
        <span className="text-xs text-stone-500 px-1 font-medium">80%</span>
        <button className="w-6 h-6 flex items-center justify-center text-stone-500 hover:text-stone-900 text-sm font-bold">+</button>
      </div>

      {/* Collaborators status */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-1.5 shadow-sm">
        <div className="flex -space-x-1.5">
          {['#2563EB', '#16A34A', '#DC2626'].map((c, i) => (
            <div key={i} className="w-5 h-5 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="text-xs text-stone-500 font-medium">3 collaborating now</span>
      </div>
    </div>
  );
}
