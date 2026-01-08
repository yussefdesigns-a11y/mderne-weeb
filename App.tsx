
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AIStylist from './components/AIStylist';
import StyleGallery from './components/StyleGallery';
import SceneSwitcher from './components/SceneSwitcher';
import { Product, CartItem, Category } from './types';
import { PRODUCTS, TESTIMONIALS, CATEGORIES, BRAND_STORY_IMAGE } from './constants';
import { Star, ShieldCheck, Truck, RefreshCw, ChevronRight, Filter, ChevronLeft, Heart, ShoppingBag, Trash2, Globe, Leaf, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wardrobe, setWardrobe] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter logic
  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product, size?: string, color?: string) => {
    const defaultSize = size || product.sizes[0];
    const defaultColor = color || product.colors[0];
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === defaultSize);
      if (existing) {
        return prev.map(item => item.id === product.id && item.selectedSize === defaultSize 
          ? { ...item, quantity: item.quantity + 1 }
          : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: defaultSize, selectedColor: defaultColor }];
    });
    setIsCartOpen(true);
  };

  const toggleWardrobe = (product: Product) => {
    setWardrobe(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  };

  const navigateToCategory = (category: Category) => {
    setSelectedCategory(category);
    setCurrentPage('shop');
    window.scrollTo(0, 0);
  };

  // Sections
  const renderHome = () => (
    <>
      <Hero onShopClick={() => setCurrentPage('shop')} />
      
      {/* Category Spotlight */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center lg:text-left">
            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">Collections</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2 tracking-tight">Browse by Aesthetic</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.name}
                onClick={() => navigateToCategory(cat.name)}
                className="group relative h-[500px] overflow-hidden rounded-[32px] cursor-pointer"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-10 left-10 text-white">
                  <h3 className="text-3xl font-bold mb-1 tracking-tight">{cat.name}</h3>
                  <p className="text-sm font-bold text-white/60 tracking-widest uppercase">{cat.count} Essentials</p>
                </div>
                <div className="absolute top-10 right-10 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ChevronRight size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">Best Sellers</span>
              <h2 className="text-4xl font-bold mt-2 tracking-tight">Curated for You</h2>
            </div>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="group flex items-center gap-2 text-zinc-500 hover:text-indigo-600 font-bold transition-colors"
            >
              Explore All Collection
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {PRODUCTS.slice(0, 3).map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer bg-white p-5 rounded-[32px] hover:shadow-2xl hover:shadow-zinc-200 transition-all duration-700"
                onClick={() => navigateToProduct(product)}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100 mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {product.category}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWardrobe(product);
                    }}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur shadow-sm transition-all ${
                      wardrobe.some(w => w.id === product.id) 
                        ? 'bg-rose-500 text-white shadow-lg' 
                        : 'bg-white/95 text-zinc-400 hover:text-rose-500'
                    }`}
                  >
                    <Heart size={18} className={wardrobe.some(w => w.id === product.id) ? 'fill-current' : ''} />
                  </button>
                  <div className="absolute inset-x-4 bottom-4 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full py-4 bg-zinc-900 text-white rounded-xl font-bold text-sm shadow-2xl"
                    >
                      Quick Add — ${product.price}
                    </button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2 px-1">
                    <h3 className="font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors text-lg">{product.name}</h3>
                    <span className="font-bold text-zinc-500 text-lg">${product.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 px-1">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold text-zinc-400">{product.rating} ({product.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Gallery Section */}
      <StyleGallery />

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Worldwide Shipping</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Enjoy free delivery on all orders over $150. Global tracking included with every shipment.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Payment</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                All transactions are encrypted with 256-bit SSL security. Your financial data is always safe.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                <RefreshCw size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">30-Day Free Returns</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Not satisfied with your fit? Return any unworn items within 30 days for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white tracking-tight">Trusted by Stylists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white/5 backdrop-blur-md p-10 rounded-3xl relative border border-white/10">
                <div className="absolute -top-6 left-10">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-4 border-zinc-900 shadow-lg object-cover" />
                </div>
                <p className="text-lg font-medium text-zinc-300 mb-6 italic">"{t.content}"</p>
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">Join the Fashion Revolution</h2>
          <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get 15% off your first order and stay ahead of the trends with our weekly curated newsletter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-8 py-4 bg-white/10 border border-white/20 rounded-full w-full max-w-sm text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:bg-zinc-100 transition-all active:scale-95 shadow-xl shadow-indigo-900/20">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </>
  );

  const renderShop = () => (
    <div className="py-12 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-8 tracking-tighter">All Collection</h1>
          
          <div className="flex flex-wrap items-center gap-4 border-b border-zinc-200 pb-8">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                selectedCategory === 'All' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 hover:bg-zinc-100 shadow-sm'
              }`}
            >
              All Styles
            </button>
            {(['Men', 'Women', 'Streetwear', 'Essentials', 'Modern'] as Category[]).map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 hover:bg-zinc-100 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 text-sm font-bold text-zinc-500 cursor-pointer hover:text-indigo-600">
              <Filter size={18} />
              <span>More Filters</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 pb-20">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group cursor-pointer bg-white p-4 rounded-[32px] hover:shadow-2xl hover:shadow-zinc-200 transition-all duration-500"
              onClick={() => navigateToProduct(product)}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWardrobe(product);
                  }}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    wardrobe.some(w => w.id === product.id) 
                      ? 'bg-rose-500 text-white shadow-lg' 
                      : 'bg-white/95 text-zinc-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 shadow-sm'
                  }`}
                >
                  <Heart size={18} className={wardrobe.some(w => w.id === product.id) ? 'fill-current' : ''} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md py-3 rounded-xl text-zinc-900 font-bold text-xs opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                >
                  Quick Add — ${product.price}
                </button>
              </div>
              <div className="px-1">
                <h3 className="font-bold text-sm mb-1">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 font-bold text-sm">${product.price}</span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-400" fill="currentColor" />
                    <span className="text-[10px] font-bold text-zinc-400">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWardrobe = () => (
    <div className="py-20 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-6xl font-bold mb-4 tracking-tighter">My Wardrobe</h1>
          <p className="text-zinc-500 text-lg">Your personal collection of curated styles. Ready to bring them home?</p>
        </div>

        {wardrobe.length === 0 ? (
          <div className="bg-white rounded-[48px] p-24 flex flex-col items-center justify-center text-center shadow-sm border border-zinc-100">
            <div className="w-40 h-40 bg-rose-50 rounded-full flex items-center justify-center mb-10 animate-bounce-slow">
              <Heart size={64} className="text-rose-200" />
            </div>
            <h2 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Your wardrobe is empty</h2>
            <p className="text-zinc-500 mb-10 max-w-md text-lg leading-relaxed">Save your favorite pieces while you shop to create the ultimate visual lookbook of your dream fits.</p>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="px-12 py-5 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all flex items-center gap-3 shadow-xl shadow-zinc-200 active:scale-95"
            >
              Start Discovering
              <ChevronRight size={24} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20">
            {wardrobe.map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer bg-white p-5 rounded-[32px] hover:shadow-2xl transition-all duration-500"
                onClick={() => navigateToProduct(product)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 mb-4 shadow-inner">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWardrobe(product);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="absolute bottom-4 left-4 right-4 bg-zinc-900 text-white py-4 rounded-xl text-xs font-bold shadow-2xl active:scale-95"
                  >
                    Add to Bag — ${product.price}
                  </button>
                </div>
                <div className="px-1">
                  <h3 className="font-bold text-base mb-1">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-600 font-bold text-base">${product.price}</span>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-50 px-2 py-1 rounded-md">{product.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="bg-white min-h-screen">
      {/* Brand Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img src={BRAND_STORY_IMAGE} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="Brand Story" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center text-white px-4">
          <span className="font-bold text-sm tracking-[0.3em] uppercase opacity-80 mb-4 block">Our Legacy</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">Built to Last</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed font-medium">
            At MODERN-STITCH, we believe fashion shouldn't be fast. It should be intentional, sustainable, and personal.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=600" className="rounded-[32px] aspect-[3/4] object-cover shadow-xl" alt="Factory" />
              <img src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=600" className="rounded-[32px] aspect-square object-cover shadow-xl" alt="Material" />
            </div>
            <div className="space-y-4 pt-12">
              <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=600" className="rounded-[32px] aspect-square object-cover shadow-xl" alt="Craft" />
              <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=600" className="rounded-[32px] aspect-[3/4] object-cover shadow-xl" alt="Result" />
            </div>
          </div>
          <div>
            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase mb-4 block">Our Philosophy</span>
            <h2 className="text-5xl font-bold mb-8 tracking-tighter">The Modern Standard</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-indigo-600">
                  <Leaf size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">100% Organic Origins</h4>
                  <p className="text-zinc-500 leading-relaxed">We trace every thread back to certified organic farms, ensuring minimal water waste and zero harmful pesticides.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-indigo-600">
                  <Globe size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Ethically Manufactured</h4>
                  <p className="text-zinc-500 leading-relaxed">Our partners are vetted for fair wages and safe conditions. Human dignity is woven into every stitch.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-indigo-600">
                  <Zap size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Powered by Tech</h4>
                  <p className="text-zinc-500 leading-relaxed">We use AI to optimize our supply chain and reduce overproduction, ensuring only what is needed is created.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderProduct = () => {
    if (!selectedProduct) return null;
    
    const detailKeywords = [
      'fashion detail',
      'fabric texture',
      'clothing close up',
      'garment stitching'
    ];

    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Gallery with SceneSwitcher and detailed shots */}
            <div className="space-y-6">
              <SceneSwitcher originalImage={selectedProduct.image} productName={selectedProduct.name} />
              
              <div className="grid grid-cols-4 gap-4">
                {detailKeywords.map((kw, i) => (
                  <div key={kw} className="aspect-square rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 shadow-sm">
                    <img 
                      src={`https://i.postimg.cc/NfvTkfpb/CDA47-1-ZC1-(1).png${1500000000000 + (i * 10000)}?auto=format&fit=crop&q=60&w=300&q=fashion,${kw.replace(' ', ',')}`} 
                      alt="Detail shot" 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <nav className="flex items-center gap-2 text-xs text-zinc-400 font-bold uppercase tracking-widest mb-6">
                <button className="cursor-pointer hover:text-zinc-900" onClick={() => setCurrentPage('home')}>Home</button>
                <ChevronRight size={12} />
                <button className="cursor-pointer hover:text-zinc-900" onClick={() => setCurrentPage('shop')}>Collection</button>
                <ChevronRight size={12} />
                <span className="text-zinc-900">{selectedProduct.name}</span>
              </nav>

              <div className="flex justify-between items-start mb-6">
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter">{selectedProduct.name}</h1>
                <button 
                  onClick={() => toggleWardrobe(selectedProduct)}
                  className={`p-5 rounded-2xl transition-all border-2 active:scale-90 ${
                    wardrobe.some(w => w.id === selectedProduct.id)
                      ? 'bg-rose-50 border-rose-500 text-rose-500 shadow-lg shadow-rose-100'
                      : 'border-zinc-100 text-zinc-400 hover:text-rose-500 hover:border-rose-100'
                  }`}
                >
                  <Heart size={28} className={wardrobe.some(w => w.id === selectedProduct.id) ? 'fill-current' : ''} />
                </button>
              </div>
              
              <div className="flex items-center gap-6 mb-10">
                <span className="text-4xl font-black text-indigo-600">${selectedProduct.price}</span>
                <div className="h-6 w-px bg-zinc-200"></div>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill={i <= Math.floor(selectedProduct.rating) ? 'currentColor' : 'none'} />)}
                  </div>
                  <span className="text-sm font-bold text-zinc-500">{selectedProduct.rating} ({selectedProduct.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-zinc-500 mb-12 leading-relaxed text-xl max-w-xl">
                {selectedProduct.longDescription}
              </p>

              <div className="space-y-10 mb-12">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-zinc-400">Select Size</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.sizes.map(size => (
                      <button key={size} className="w-16 h-16 rounded-2xl border-2 border-zinc-100 flex items-center justify-center font-bold text-base hover:border-zinc-900 transition-all focus:border-indigo-600 focus:bg-indigo-50 focus:text-indigo-600 active:scale-90">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-zinc-400">Colors</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.colors.map(color => (
                      <button key={color} className="group flex items-center gap-3 px-6 py-4 rounded-2xl border-2 border-zinc-100 hover:border-zinc-900 transition-all active:scale-95">
                        <span className={`w-5 h-5 rounded-full shadow-sm ${color.toLowerCase().includes('black') ? 'bg-black' : color.toLowerCase().includes('white') ? 'bg-zinc-100 border border-zinc-200' : 'bg-indigo-400'}`}></span>
                        <span className="text-sm font-bold text-zinc-600 group-hover:text-zinc-900">{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 mb-12">
                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="flex-1 py-6 bg-zinc-900 text-white rounded-[20px] font-bold text-xl hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-200/50 active:scale-95"
                >
                  Add to Bag
                </button>
                <button className="px-10 py-6 border-2 border-zinc-100 rounded-[20px] font-bold text-xl hover:border-zinc-900 transition-all active:scale-95">
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-12 border-t border-zinc-100">
                {selectedProduct.features.map(f => (
                  <div key={f} className="flex items-center gap-4 group">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full group-hover:scale-150 transition-transform"></div>
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home': return renderHome();
      case 'shop': return renderShop();
      case 'wardrobe': return renderWardrobe();
      case 'about': return renderAbout();
      case 'product': return renderProduct();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-600">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        wardrobeItems={wardrobe}
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        onProductClick={navigateToProduct}
      />
      
      <main className="flex-1">
        {renderContent()}
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          alert('Moving to secure payment gateway...');
          setIsCartOpen(false);
        }}
      />

      <AIStylist />
    </div>
  );
};

export default App;
