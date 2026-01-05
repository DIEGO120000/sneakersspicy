
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = React.useState(product.availableSizes[0]);
  const [viewMode, setViewMode] = React.useState<'image' | '3d'>('image');

  return (
    <div className="group space-y-6">
      <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
        
        {/* Render Image or 3D Model */}
        {product.asset3d && viewMode === '3d' ? (
          <div className="w-full h-full relative">
            {/* Fix: Use React.createElement to avoid "Property 'model-viewer' does not exist on type 'JSX.IntrinsicElements'" error */}
            {React.createElement('model-viewer', {
              src: product.asset3d,
              'camera-controls': true,
              'auto-rotate': true,
              'shadow-intensity': '1',
              'environment-image': 'neutral',
              exposure: '0.5',
              'touch-action': 'pan-y',
              style: { width: '100%', height: '100%' }
            })}
            <button 
              onClick={() => setViewMode('image')}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest border border-white/10 hover:bg-emerald-500 hover:text-black transition-all"
            >
              Close 3D
            </button>
          </div>
        ) : (
          <div className="w-full h-full relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
            />
            {product.asset3d && (
              <button 
                onClick={() => setViewMode('3d')}
                className="absolute top-4 right-4 z-10 p-3 bg-emerald-500 text-black rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center space-x-2 hover:scale-105 transition-transform"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z"/></svg>
                <span>3D View</span>
              </button>
            )}
          </div>
        )}

        <div className="absolute top-6 left-6">
          <span className="px-4 py-2 bg-emerald-500 text-black text-[9px] font-black uppercase tracking-[0.2em] shadow-xl rounded">
            {product.brand}
          </span>
        </div>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/80 flex flex-col justify-end p-8 translate-y-full group-hover:translate-y-0 transition-all duration-500 backdrop-blur-md z-10">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Inventory Select</span>
              <span className="text-[9px] font-bold text-white/40 uppercase">US / Grip</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.availableSizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] h-12 flex items-center justify-center text-xs font-black border rounded-lg transition-all ${
                    selectedSize === size 
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                      : 'border-white/10 text-white hover:border-emerald-500/40'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button 
              onClick={() => onAddToCart(product, selectedSize)}
              className="w-full bg-emerald-500 text-black text-[10px] font-black uppercase py-5 tracking-[0.3em] hover:bg-emerald-400 transition-all shadow-xl flex items-center justify-center space-x-3 rounded-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              <span>Add to Circuit Bag</span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3 px-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg tracking-tight group-hover:text-emerald-400 transition-colors uppercase max-w-[75%] leading-tight">{product.name}</h3>
          <p className="font-black italic text-xl tracking-tighter text-emerald-500">${product.price}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-black">{product.category}</span>
          <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
          <span className="text-[10px] text-emerald-500/60 uppercase tracking-[0.2em] font-black">Authorized</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
