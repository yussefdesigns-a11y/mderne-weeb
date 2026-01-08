
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-zinc-900">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000" 
          alt="Fashion Hero" 
          className="w-full h-full object-cover opacity-70 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 mb-8 text-[10px] font-bold tracking-[0.2em] text-white uppercase bg-indigo-600 rounded-full">
            SPRING SUMMER 2024
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tighter">
            Modern <br />
            <span className="italic font-serif font-light text-indigo-300">Aesthetics.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-lg leading-relaxed font-medium">
            Discover a curated collection of premium essentials designed to define your personal style with effortless sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={onShopClick}
              className="px-10 py-5 bg-white text-zinc-900 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all duration-500 group shadow-2xl shadow-white/5"
            >
              Shop New Arrivals
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onShopClick}
              className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/15 transition-all duration-500"
            >
              Explore Lookbook
            </button>
          </div>
          
          <div className="mt-20 flex items-center gap-12 text-white/40 text-xs font-bold uppercase tracking-widest border-t border-white/10 pt-10">
            <div className="flex flex-col gap-2">
              <span className="text-white text-2xl tracking-tighter">150+</span>
              <span>Global Styles</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white text-2xl tracking-tighter">4.9/5</span>
              <span>Customer Rating</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white text-2xl tracking-tighter">100%</span>
              <span>Sustainable</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
