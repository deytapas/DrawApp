"use client"

import { Pencil, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#FFFEF9] shadow-sm border-b border-stone-200' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center rotate-[-4deg] group-hover:rotate-0 transition-transform duration-300">
            <Pencil size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-stone-900 tracking-tight">Sketchly</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it works', 'Showcase', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors px-4 py-2">
            Sign in
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors px-5 py-2.5 rounded-xl"
          >
            Start drawing free
          </a>
        </div>

        <button
          className="md:hidden p-2 text-stone-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#FFFEF9] border-t border-stone-200 px-6 py-4 flex flex-col gap-4">
          {['Features', 'How it works', 'Showcase', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-medium text-stone-700"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#"
            className="text-sm font-semibold text-white bg-[#2563EB] px-5 py-2.5 rounded-xl text-center mt-2"
          >
            Start drawing free
          </a>
        </div>
      )}
    </nav>
  );
}