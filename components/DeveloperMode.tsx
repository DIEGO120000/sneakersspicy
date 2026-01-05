
import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';

interface DeveloperModeProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  prefilledBrand?: string;
  onLoginSuccess?: () => void;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB limit to prevent localStorage overflow

const DeveloperMode: React.FC<DeveloperModeProps> = ({ isOpen, onClose, onAddProduct, prefilledBrand, onLoginSuccess }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    brand: 'Nike',
    price: '',
    image: '',
    asset3d: '', 
    description: '',
    category: 'Shoes' as const,
    availableSizes: [] as number[]
  });

  useEffect(() => {
    if (prefilledBrand) {
      setFormData(prev => ({ ...prev, brand: prefilledBrand }));
    }
  }, [prefilledBrand, isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@spicy.com' && password === 'spicy2025') {
      setIsAuthorized(true);
      setError('');
      onLoginSuccess?.();
    } else {
      setError('ACCESS DENIED: PROTOCOL BREACH');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert(`ERROR: File is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum allowed is 2MB to ensure system stability.`);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, asset3d: event.target?.result as string }));
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert("ERROR: Failed to encode 3D asset.");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleSize = (size: number) => {
    setFormData(prev => ({
      ...prev,
      availableSizes: prev.availableSizes.includes(size)
        ? prev.availableSizes.filter(s => s !== size)
        : [...prev.availableSizes, size].sort((a, b) => a - b)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final check for size constraints if manually bypassed
    const payloadSize = JSON.stringify(formData).length;
    if (payloadSize > 4 * 1024 * 1024) {
      alert("SYSTEM ERROR: Data packet too large for local database storage. Please use smaller assets.");
      return;
    }

    const newProduct: Product = {
      ...formData,
      id: `custom-${Date.now()}`,
      price: Number(formData.price),
      category: formData.category
    };

    try {
      onAddProduct(newProduct);
      setFormData({
        name: '',
        brand: prefilledBrand || 'Nike',
        price: '',
        image: '',
        asset3d: '',
        description: '',
        category: 'Shoes',
        availableSizes: []
      });
      alert('SYSTEM_MSG: SNEAKER_DATA_INJECTED_SUCCESSFULLY');
      onClose();
    } catch (err) {
      console.error(err);
      alert("CRITICAL ERROR: Failed to inject data into main circuit. Storage may be full.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-emerald-500/30 rounded-[2.5rem] overflow-hidden shadow-[0_0_120px_rgba(16,185,129,0.15)] animate-fade-in font-mono max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-20 p-8 border-b border-white/5 flex items-center justify-between bg-zinc-900/80 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-black font-black italic shadow-[0_0_25px_rgba(52,211,153,0.4)]">
              {'>_'}
            </div>
            <div>
              <h3 className="font-black uppercase tracking-tighter text-xl text-white">SYSTEM_OVERRIDE.exe</h3>
              <p className="text-[10px] text-emerald-500 uppercase tracking-[0.4em] font-bold">Admin Clearance Verified</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-emerald-500 hover:text-black rounded-lg transition-all text-zinc-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-10">
          {!isAuthorized ? (
            <form onSubmit={handleLogin} className="space-y-8 max-w-sm mx-auto py-10">
              <div className="text-center space-y-3">
                <h4 className="text-2xl font-black italic uppercase tracking-tighter text-emerald-400">Vault Decryption</h4>
                <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-[0.2em] leading-relaxed">Identity verification required to modify inventory database</p>
              </div>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="USER_ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-emerald-500/10 px-6 py-4 text-[10px] font-black tracking-widest text-emerald-500 focus:border-emerald-500 outline-none transition-all rounded-lg placeholder:text-zinc-800"
                  required
                />
                <input 
                  type="password" 
                  placeholder="RSA_TOKEN_KEY"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-emerald-500/10 px-6 py-4 text-[10px] font-black tracking-widest text-emerald-500 focus:border-emerald-500 outline-none transition-all rounded-lg placeholder:text-zinc-800"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-[10px] font-black uppercase text-center tracking-widest bg-red-500/10 py-3 rounded border border-red-500/20">{error}</p>}
              <button type="submit" className="w-full bg-emerald-500 text-black py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-400 transition-all rounded-lg">
                Execute Authorization
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500/60 ml-1">Object.Name</label>
                  <input 
                    type="text" 
                    placeholder="E.G. JORDAN_1_HIGH_OG"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black border border-white/5 px-6 py-4 text-[11px] font-black tracking-widest focus:border-emerald-500 outline-none rounded-lg"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500/60 ml-1">Object.Brand</label>
                    <select 
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="w-full bg-black border border-white/5 px-6 py-4 text-[11px] font-black tracking-widest focus:border-emerald-500 outline-none rounded-lg appearance-none"
                    >
                      <option value="Nike">NIKE</option>
                      <option value="Adidas">ADIDAS</option>
                      <option value="Converse">CONVERSE</option>
                      <option value="Puma">PUMA</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500/60 ml-1">Market_Value ($)</label>
                    <input 
                      type="number" 
                      placeholder="180"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-black border border-white/5 px-6 py-4 text-[11px] font-black tracking-widest focus:border-emerald-500 outline-none rounded-lg"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-500/60 ml-1">Asset.3D_Engine_Model (GLB/glTF/USDZ - MAX 2MB)</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${formData.asset3d ? 'border-emerald-500 bg-emerald-500/5' : 'border-amber-500/20 hover:border-amber-500/50 bg-black'}`}
                  >
                    {isUploading ? (
                      <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full"></div>
                    ) : formData.asset3d ? (
                      <div className="text-center">
                        <svg className="w-10 h-10 text-emerald-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-[9px] text-emerald-500 font-black uppercase">Model Encoded</p>
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <svg className="w-10 h-10 text-amber-500/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        <p className="text-[9px] text-zinc-500 font-black uppercase">Drop 3D Object File</p>
                        <p className="text-[7px] text-zinc-700 font-bold uppercase mt-1 italic">Quota limit: 2MB per asset</p>
                      </div>
                    )}
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept=".glb,.gltf,.fbx,.usdz"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500/60 ml-1">Asset.Static_Poster_URL</label>
                  <input 
                    type="url" 
                    placeholder="HTTPS://..."
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-black border border-white/5 px-6 py-4 text-[11px] font-black tracking-widest focus:border-emerald-500 outline-none rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500/60 ml-1">Metadata.Specs</label>
                  <textarea 
                    placeholder="CORE SPECIFICATIONS AND MATERIALS..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full h-32 bg-black border border-white/5 px-6 py-4 text-[11px] font-black tracking-widest focus:border-emerald-500 outline-none rounded-lg resize-none"
                    required
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500/60 ml-1">Database.Size_Matrix</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[7, 8, 9, 10, 11, 12, 13].map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleToggleSize(size)}
                        className={`py-3 text-[10px] font-black italic border rounded-lg transition-all ${
                          formData.availableSizes.includes(size)
                            ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                            : 'bg-transparent border-white/5 text-zinc-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="w-full bg-white text-black py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-emerald-500 transition-all rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                  PUSH_TO_MAIN_CIRCUIT
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeveloperMode;
