
import React, { useState } from 'react';
import { ShoppingBag, User, Menu, X, Search, Heart, ChevronDown, ArrowRight, ChevronRight, Info } from 'lucide-react';
import { CATEGORIES, PRODUCTS, BRAND_STORY_IMAGE } from '../constants';
import { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  wardrobeItems: Product[];
  onCartClick: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  onProductClick: (product: Product) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, wardrobeItems, onCartClick, onNavigate, currentPage, onProductClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const navLinks = [
    { name: 'Home', id: 'home', icon: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=100' },
    { name: 'Shop', id: 'shop', icon: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=100' },
    { name: 'Wardrobe', id: 'wardrobe', icon: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=100' },
    { name: 'About', id: 'about', icon: 'https://images.unsplash.com/photo-1534452286302-2f5631f5a13a?auto=format&fit=crop&q=80&w=100' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setActiveMegaMenu(null);
    setIsMenuOpen(false);
  };

  return (
    <header 
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-zinc-100"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer" 
            onClick={() => handleLinkClick('home')}
          >
            <h1 className="text-2xl font-black tracking-tighter text-zinc-900">
              MODERN<span className="text-indigo-600">STITCH</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <div 
                key={link.id} 
                className="relative group py-7"
                onMouseEnter={() => setActiveMegaMenu(link.id)}
              >
                <button
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center gap-1.5 text-sm font-bold transition-all hover:text-indigo-600 ${
                    currentPage === link.id ? 'text-indigo-600' : 'text-zinc-600'
                  }`}
                >
                  {link.name}
                  {(link.id !== 'home') && <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform" />}
                </button>
                {currentPage === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full" />
                )}
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button className="text-zinc-600 hover:text-indigo-600 transition-colors hidden lg:block">
              <Search size={20} />
            </button>
            <button 
              onClick={() => handleLinkClick('wardrobe')}
              className="relative text-zinc-600 hover:text-rose-500 transition-colors"
            >
              <Heart size={20} className={currentPage === 'wardrobe' ? 'fill-rose-500 text-rose-500' : ''} />
              {wardrobeItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wardrobeItems.length}
                </span>
              )}
            </button>
            <button 
              onClick={onCartClick}
              className="relative text-zinc-600 hover:text-indigo-600 transition-colors"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden text-zinc-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menus */}
      {/* SHOP Mega Menu */}
      {activeMegaMenu === 'shop' && (
        <div className="hidden md:block absolute top-full left-0 w-full bg-white border-b border-zinc-100 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 p-10">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.name} 
                className="group cursor-pointer"
                onClick={() => handleLinkClick('shop')}
              >
                <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-zinc-100">
                  <img src={cat.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={cat.name} />
                </div>
                <h4 className="font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">{cat.name}</h4>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">{cat.count} Essentials</p>
              </div>
            ))}
          </div>
          <div className="bg-zinc-50 p-4 border-t border-zinc-100">
            <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
              <span>Free Worldwide Shipping</span>
              <span>•</span>
              <span>New Arrivals Every Tuesday</span>
              <span>•</span>
              <button onClick={() => handleLinkClick('shop')} className="text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">
                See Full Catalog <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WARDROBE Mega Menu */}
      {activeMegaMenu === 'wardrobe' && (
        <div className="hidden md:block absolute top-full left-0 w-full bg-white border-b border-zinc-100 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto p-10">
            {wardrobeItems.length === 0 ? (
              <div className="flex items-center justify-center gap-8 py-10">
                <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center">
                  <Heart size={32} className="text-rose-200" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Wardrobe Empty</h4>
                  <p className="text-zinc-500 mb-4 max-w-sm">Save your favorite pieces to see them beautifully displayed here.</p>
                  <button onClick={() => handleLinkClick('shop')} className="text-indigo-600 font-bold flex items-center gap-2">
                    Start Browsing <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold">Your Saved Styles</h4>
                  <button onClick={() => handleLinkClick('wardrobe')} className="text-xs font-bold text-zinc-400 hover:text-indigo-600 uppercase tracking-widest">Manage Wardrobe</button>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                  {wardrobeItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex-shrink-0 w-48 group cursor-pointer"
                      onClick={() => {
                        onProductClick(item);
                        setActiveMegaMenu(null);
                      }}
                    >
                      <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3 bg-zinc-100 relative">
                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-4 py-2 bg-white text-zinc-900 rounded-full text-[10px] font-bold uppercase">View Detail</span>
                        </div>
                      </div>
                      <h5 className="font-bold text-sm text-zinc-900 line-clamp-1">{item.name}</h5>
                      <span className="text-xs font-bold text-indigo-600">${item.price}</span>
                    </div>
                  ))}
                  <button 
                    onClick={() => handleLinkClick('shop')}
                    className="flex-shrink-0 w-48 aspect-[3/4] border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-zinc-400 hover:border-indigo-600 hover:text-indigo-600 transition-all gap-3"
                  >
                    <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center">
                      <Heart size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Add More</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ABOUT Mega Menu */}
      {activeMegaMenu === 'about' && (
        <div className="hidden md:block absolute top-full left-0 w-full bg-white border-b border-zinc-100 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto grid grid-cols-2 gap-16 p-10 items-center">
            <div className="aspect-[16/10] rounded-[32px] overflow-hidden shadow-xl">
              <img src={BRAND_STORY_IMAGE} className="w-full h-full object-cover" alt="Brand Story" />
            </div>
            <div>
              <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">Since 2024</span>
              <h4 className="text-3xl font-bold mt-2 mb-6 tracking-tight">Crafting the Future of Ethical Fashion</h4>
              <p className="text-zinc-500 leading-relaxed mb-8">
                MODERN-STITCH was founded on the principle that premium style shouldn't come at a premium cost to our planet. We curate the finest organic materials to create timeless silhouettes.
              </p>
              <button 
                onClick={() => handleLinkClick('about')}
                className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all"
              >
                Read Our Mission <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-4 pb-10 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`flex items-center gap-4 w-full text-left p-4 rounded-2xl border transition-all ${
                  currentPage === link.id ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-white border-zinc-50 text-zinc-600'
                }`}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={link.icon} className="w-full h-full object-cover" alt={link.name} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{link.name}</h4>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">
                    {link.id === 'shop' ? 'Browse Catalog' : link.id === 'wardrobe' ? `Saved Pieces (${wardrobeItems.length})` : link.id === 'about' ? 'Our Mission' : 'Back to Start'}
                  </p>
                </div>
                <ChevronRight size={20} className="opacity-20" />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
