
import React from 'react';
import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tighter">
              MODERN<span className="text-indigo-400">STITCH</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed text-sm max-w-xs">
              Defining modern fashion since 2024. Premium quality garments for those who value style and sustainability.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition-all">
                <Instagram size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition-all">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition-all">
                <Facebook size={18} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-500">Shop</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Men's Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Women's Collection</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-500">Company</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-500">Newsletter</h4>
            <p className="text-sm text-zinc-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-indigo-400"
              />
              <button className="absolute right-2 top-2 bottom-2 px-3 bg-indigo-600 rounded-md text-white hover:bg-indigo-500 transition-colors">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 uppercase tracking-widest">
          <p>© 2024 MODERN-STITCH. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span>Secure Checkout</span>
            <span>Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
