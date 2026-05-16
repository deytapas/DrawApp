import { ArrowRight, Play } from 'lucide-react';
import CanvasPreview from './CanvasPreview';
import { BACKEND_URL, FONTEND_URL } from '@/app/config';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col items-center overflow-hidden bg-[#FFFEF9]">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #d6d3cf 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.5,
        }}
      />

      {/* Gradient fades */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FFFEF9] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          Now with real-time collaboration
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-stone-900 leading-[1.08] tracking-tight mb-6">
          Draw ideas that{' '}
          <span className="relative inline-block">
            <span className="text-[#2563EB]">actually stick</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 9C50 4 100 2 150 5C200 8 250 6 298 3"
                stroke="#FBBF24"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto mb-10">
          A virtual whiteboard with a hand-drawn feel. Sketch diagrams, wireframes, and ideas alone or with your team — in real time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/signup"
            className="group flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-base px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5"
          >
            Sign Up
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="/signin"
            className="group flex items-center gap-2 text-stone-700 font-medium text-base px-7 py-3.5 rounded-xl border border-stone-200 hover:border-stone-300 bg-white transition-all duration-200 hover:-translate-y-0.5"
          >
            <Play size={16} className="text-stone-400" />
            Sign in
          </a>
        </div>

        <p className="mt-4 text-sm text-stone-400">No sign-up required &middot; Free forever plan available</p>
      </div>

      {/* Canvas preview */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 px-6">
        <div className="rounded-2xl border border-stone-200 shadow-2xl shadow-stone-200/60 overflow-hidden bg-white">
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-100 bg-stone-50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg px-3 py-1">
                {['cursor', 'rect', 'ellipse', 'line', 'pencil', 'text', 'eraser'].map((tool) => (
                  <div
                    key={tool}
                    className={`w-7 h-7 rounded flex items-center justify-center text-xs ${tool === 'pencil' ? 'bg-blue-100 text-blue-700' : 'text-stone-400 hover:bg-stone-100'}`}
                  >
                    {tool === 'cursor' && '↖'}
                    {tool === 'rect' && '□'}
                    {tool === 'ellipse' && '○'}
                    {tool === 'line' && '╱'}
                    {tool === 'pencil' && '✏'}
                    {tool === 'text' && 'T'}
                    {tool === 'eraser' && '⌫'}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {['#2563EB', '#16A34A', '#DC2626'].map((color, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: color }} />
                ))}
              </div>
              <span className="text-xs text-stone-400">3 online</span>
            </div>
          </div>
          {/* Canvas */}
          <CanvasPreview />
        </div>
      </div>
    </section>
  );
}
