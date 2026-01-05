
import React from 'react';
import { TENNIS_BRANDS, CATEGORIES } from '../constants';
import { BrandStock } from '../types';

interface HeroProps {
  onBrandSelect: (brand: BrandStock) => void;
  activeBrand: BrandStock | null;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  isDevMode?: boolean;
  onQuickAdd?: (brandName: string) => void;
}

const Hero: React.FC<HeroProps> = ({ 
  onBrandSelect, 
  activeBrand, 
  selectedCategory, 
  onCategorySelect,
  isDevMode = false,
  onQuickAdd
}) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col bg-[#020202] pt-28 pb-12 transition-all duration-700">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${isDevMode ? 'from-emerald-500/10' : 'from-emerald-500/5'} to-transparent opacity-20`}></div>
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-emerald-500/5 blur-[180px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="px-6 md:px-20 mb-12 space-y-8 animate-fade-in">
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="w-12 h-[1px] bg-emerald-500/50"></span>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-emerald-500/60">
                {isDevMode ? 'SYSTEM OVERRIDE PROTOCOL' : 'Elite Inventory'}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              Superior <span className="text-white/20">Footwear</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className={`px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${
                  selectedCategory === cat 
                    ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_25px_rgba(52,211,153,0.3)]' 
                    : 'bg-transparent text-zinc-500 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Static Brands Grid with Hover Reveal */}
        <div className="px-6 md:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TENNIS_BRANDS.map((brand) => (
              <div
                key={brand.name}
                className={`relative h-[50vh] md:h-[60vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border transition-all duration-500 group bg-zinc-900 cursor-default ${isDevMode ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(52,211,153,0.1)]' : 'border-white/5'}`}
                onClick={() => onBrandSelect(brand)}
              >
                {/* Brand Image */}
                <img 
                  src={brand.marqueeImage} 
                  alt={brand.name} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                />
                
                {/* Initial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-40"></div>
                
                {/* Brand Identity Label */}
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col items-start space-y-3 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                  <div className="flex items-center space-x-2 bg-emerald-500/10 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-emerald-400">
                      {isDevMode ? 'SECURE_NODE_OK' : 'Authorized Stock'}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
                    {brand.name}
                  </h3>
                </div>

                {/* Size Vault Overlay (Shown on Hover) */}
                <div 
                  className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-all duration-700 flex flex-col items-center justify-center p-8 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto"
                >
                  <div className="text-center space-y-6 w-full">
                    <div className="space-y-2">
                      <span className="text-emerald-400 text-[9px] font-black uppercase tracking-[0.5em] block animate-pulse">Available Sizes</span>
                      <h4 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                        {brand.name} <span className="text-white/20">Vault</span>
                      </h4>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2.5 w-full max-w-[280px] mx-auto items-center">
                      {brand.availableSizes.map(size => (
                        <div 
                          key={size}
                          className="aspect-square rounded-xl border border-white/10 flex items-center justify-center bg-white/5 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] transition-all duration-300 text-[11px] font-black italic"
                        >
                          {size}
                        </div>
                      ))}
                      {/* Contextual ADD Button for Developers */}
                      {isDevMode && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onQuickAdd?.(brand.name); }}
                          className="aspect-square rounded-xl border-2 border-dashed border-emerald-500/50 flex items-center justify-center bg-emerald-500/10 hover:bg-emerald-500 hover:text-black text-emerald-500 transition-all duration-300 group/btn shadow-[0_0_20px_rgba(52,211,153,0.2)]"
                          title="Inject new product into this brand"
                        >
                          <span className="text-xl font-bold">+</span>
                        </button>
                      )}
                    </div>
                    
                    <div className="pt-4">
                      <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-[0.3em] animate-bounce">
                        {isDevMode ? 'PROTOCOL_ADD_ENABLED' : 'Explore Collection ↓'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
