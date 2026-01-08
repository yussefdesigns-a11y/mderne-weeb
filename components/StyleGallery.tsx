
import React, { useState } from 'react';
import { LOOKBOOK_ITEMS } from '../constants';
import { MapPin, Plus, Heart, Share2, X, Upload, Camera } from 'lucide-react';

const StyleGallery: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">Community</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">In The Wild</h2>
            <p className="text-zinc-500 leading-relaxed">
              Explore how our global community styles MODERN-STITCH in their favorite places. 
              Tag us to get featured in our seasonal lookbook.
            </p>
          </div>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all duration-300 group shadow-xl shadow-zinc-200"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            Upload Your Look
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOOKBOOK_ITEMS.map((item, idx) => (
            <div 
              key={item.id} 
              className={`group relative overflow-hidden rounded-3xl bg-zinc-100 cursor-pointer ${
                idx % 3 === 0 ? 'lg:row-span-2 aspect-[3/4] lg:aspect-auto' : 'aspect-[4/5]'
              }`}
            >
              <img 
                src={item.imageUrl} 
                alt={item.productName} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-300 mb-2">
                  <MapPin size={14} />
                  {item.location}
                </div>
                <h4 className="text-xl font-bold mb-4">{item.productName}</h4>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-xs font-bold hover:text-indigo-300 transition-colors">
                    <Heart size={16} /> 2.4k
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-bold hover:text-indigo-300 transition-colors">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={() => setIsUploadModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-xl font-bold">Share Your Style</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-zinc-400 hover:text-zinc-900">
                <X size={24} />
              </button>
            </div>
            <div className="p-8">
              <div className="border-2 border-dashed border-zinc-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center hover:border-indigo-600 transition-colors cursor-pointer group bg-zinc-50">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Camera size={24} className="text-zinc-400 group-hover:text-indigo-600" />
                </div>
                <p className="font-bold text-sm mb-1">Drag and drop your photo</p>
                <p className="text-xs text-zinc-400">High resolution JPG or PNG</p>
              </div>
              
              <div className="mt-8 space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Where was this taken?</label>
                  <input type="text" placeholder="e.g. Soho, London" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Which product are you wearing?</label>
                  <select className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none">
                    <option>Select a product</option>
                    {LOOKBOOK_ITEMS.map(i => <option key={i.id}>{i.productName}</option>)}
                  </select>
                </div>
              </div>
              
              <button className="w-full mt-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                <Upload size={18} />
                Publish Look
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StyleGallery;
