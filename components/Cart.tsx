
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string, size: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-[#050505] h-full shadow-2xl flex flex-col border-l border-white/10">
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-2xl font-black uppercase tracking-tighter italic">Pro Bag <span className="text-emerald-500 ml-2">[{items.length}]</span></h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-500 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 bg-zinc-900/50 rounded-3xl flex items-center justify-center border border-white/5">
                <svg className="w-10 h-10 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <div className="space-y-2">
                <p className="font-black uppercase tracking-[0.3em] text-sm">Bag is Empty</p>
                <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Select your equipment from the circuit.</p>
              </div>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex space-x-6 group animate-fade-in">
                <div className="w-28 h-28 bg-zinc-900 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm leading-tight uppercase tracking-tight">{item.name}</h4>
                    <button onClick={() => onRemove(item.id, item.selectedSize)} className="text-zinc-700 hover:text-emerald-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="flex items-center space-x-3 text-[9px] font-black uppercase tracking-[0.2em]">
                    <span className="text-zinc-500">Size: US {item.selectedSize}</span>
                    <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
                    <span className="text-emerald-500">Qty: {item.quantity}</span>
                  </div>
                  <p className="font-black text-lg italic text-white">${item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 bg-zinc-950/80 backdrop-blur-md space-y-6 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="uppercase tracking-[0.4em] text-[10px] font-black text-zinc-500">Subtotal</span>
              <span className="text-3xl italic font-black text-emerald-500">${total}</span>
            </div>
            <button className="w-full bg-emerald-500 text-black font-black uppercase py-5 tracking-[0.3em] hover:bg-emerald-400 transition-all rounded-xl shadow-[0_10px_30px_rgba(52,211,153,0.2)]">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
