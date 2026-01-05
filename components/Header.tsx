
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAI: () => void;
  onOpenDev: () => void;
  isDevMode?: boolean;
  onToggleDevMode?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onOpenCart, 
  onOpenAI, 
  onOpenDev, 
  isDevMode = false,
  onToggleDevMode
}) => {
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isDevMode ? 'bg-zinc-950/90 border-b border-emerald-500/30' : 'bg-black/80 border-b border-white/10'} backdrop-blur-md px-6 py-4 flex items-center justify-between`}>
      <div className="flex items-center space-x-2">
        <div 
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all cursor-pointer group shadow-xl ${isDevMode ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-white'}`}
          onClick={onOpenDev}
        >
          <span className={`font-black text-xl italic group-hover:rotate-12 transition-transform ${isDevMode ? 'text-black' : 'text-black'}`}>SP</span>
        </div>
        <h1 className="text-2xl font-black tracking-tighter uppercase hidden sm:block">
          Sneakers <span className={`${isDevMode ? 'text-emerald-500' : 'text-white/40 italic'}`}>{isDevMode ? 'Dev' : 'Spicy'}</span>
        </h1>
      </div>

      <div className="hidden md:flex items-center space-x-8 font-semibold text-[10px] uppercase tracking-[0.3em] text-white/50">
        <a href="#" className="hover:text-white transition-colors">Drops</a>
        <a href="#" className="hover:text-white transition-colors">Brands</a>
        <button 
          onClick={onToggleDevMode} 
          className={`px-4 py-1 rounded border transition-all ${isDevMode ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-black' : 'border-white/10 hover:border-white/30 hover:text-white'}`}
        >
          {isDevMode ? 'DEV_ACTIVE' : 'Terminal'}
        </button>
      </div>

      <div className="flex items-center space-x-6">
        <button 
          onClick={onOpenAI}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg ${isDevMode ? 'bg-zinc-900 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black' : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:brightness-110 shadow-emerald-900/20'}`}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
          <span>Sneaker Pro AI</span>
        </button>

        <button onClick={onOpenCart} className="relative p-2 hover:bg-white/10 rounded-full transition-colors group">
          <svg className={`w-6 h-6 transition-colors ${isDevMode ? 'text-emerald-500/80 group-hover:text-emerald-400' : 'text-white/80 group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <span className={`absolute -top-1 -right-1 text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full ${isDevMode ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-white text-black'}`}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Header;
