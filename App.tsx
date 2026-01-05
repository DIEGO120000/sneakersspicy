
import React, { useState, useEffect } from 'react';
import { PRODUCTS, TENNIS_BRANDS } from './constants';
import { Product, CartItem, BrandStock } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AIConsultant from './components/AIConsultant';
import DeveloperMode from './components/DeveloperMode';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false); 
  const [isDevPanelOpen, setIsDevPanelOpen] = useState(false);
  const [prefilledBrand, setPrefilledBrand] = useState<string | undefined>(undefined);
  const [activeBrand, setActiveBrand] = useState<BrandStock | null>(TENNIS_BRANDS[0]);

  const [dynamicProducts, setDynamicProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('spicy_custom_products');
      const custom = saved ? JSON.parse(saved) : [];
      return [...PRODUCTS, ...custom];
    } catch (e) {
      console.error("Failed to load custom products:", e);
      return PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      const custom = dynamicProducts.filter(p => p.id.startsWith('custom-'));
      localStorage.setItem('spicy_custom_products', JSON.stringify(custom));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        console.error("LocalStorage quota exceeded. Custom products might not be saved.");
        // We don't alert here to avoid spamming, but we ensure the app stays functional.
      }
    }
  }, [dynamicProducts]);

  const filteredProducts = selectedCategory === 'All' 
    ? dynamicProducts 
    : dynamicProducts.filter(s => s.category === selectedCategory);

  const handleAddToCart = (product: Product, size: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string, size: number) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const handleBrandSelect = (brand: BrandStock) => {
    setActiveBrand(brand);
  };

  const handleOpenDevWithContext = (brandName: string) => {
    setPrefilledBrand(brandName);
    setIsDevPanelOpen(true);
  };

  const handleAddProduct = (newProduct: Product) => {
    setDynamicProducts(prev => [newProduct, ...prev]);
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-white selection:bg-emerald-500 selection:text-black transition-all duration-700 ${isDevMode ? 'ring-1 ring-emerald-500/20' : ''}`}>
      {/* Dev Mode Grid Overlay */}
      {isDevMode && (
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
      )}

      {isDevMode && (
        <div className="fixed top-24 left-6 z-[100] bg-emerald-500 text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.3em] animate-pulse shadow-[0_0_20px_rgba(52,211,153,0.5)]">
          System Override Active
        </div>
      )}

      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenDev={() => setIsDevPanelOpen(true)}
        isDevMode={isDevMode}
        onToggleDevMode={() => setIsDevMode(!isDevMode)}
      />

      <main>
        <Hero 
          onBrandSelect={handleBrandSelect} 
          activeBrand={activeBrand} 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          isDevMode={isDevMode}
          onQuickAdd={handleOpenDevWithContext}
        />

        <section className="px-6 md:px-20 py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        <section className="bg-zinc-950 px-6 md:px-20 py-40 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="max-w-4xl mx-auto space-y-14 relative z-10 text-center">
             <div className="inline-block px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
                <span className="text-emerald-400 text-[11px] font-black uppercase tracking-[0.5em]">The Hype Cycle</span>
             </div>
            <h2 className="text-6xl md:text-[9rem] font-black uppercase italic tracking-tighter leading-[0.85]">
              Spicy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-zinc-800">Drops</span>
            </h2>
            <p className="text-zinc-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Join the most exclusive sneaker community. Get direct access to limited collaborations and member-only restocks.
            </p>
          </div>
        </section>
      </main>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={handleRemoveFromCart}
      />
      
      <AIConsultant 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)}
      />

      <DeveloperMode 
        isOpen={isDevPanelOpen}
        onClose={() => {
          setIsDevPanelOpen(false);
          setPrefilledBrand(undefined);
        }}
        onAddProduct={handleAddProduct}
        prefilledBrand={prefilledBrand}
        onLoginSuccess={() => setIsDevMode(true)}
      />
    </div>
  );
};

export default App;
