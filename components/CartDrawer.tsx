
import React from 'react';
/* Added ShieldCheck and RefreshCw to imports */
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2, ShieldCheck, RefreshCw } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <ShoppingBag size={22} />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Your Bag ({items.length})</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 transition-colors p-2">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={48} className="text-zinc-300" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">Bag is empty</h3>
              <p className="text-zinc-500 mb-10 max-w-[240px]">Explore our new arrivals and find your next statement piece.</p>
              <button 
                onClick={onClose}
                className="px-10 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-6 group">
                <div className="w-28 h-36 flex-shrink-0 rounded-[20px] overflow-hidden bg-zinc-100 shadow-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex flex-col py-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-base text-zinc-900 leading-tight line-clamp-2">{item.name}</h4>
                    <span className="font-bold text-base text-indigo-600">${item.price * item.quantity}</span>
                  </div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                    {item.selectedSize} / {item.selectedColor}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center bg-zinc-100 rounded-xl p-1 shadow-inner">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center hover:text-indigo-600 transition-colors active:scale-90"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center hover:text-indigo-600 transition-colors active:scale-90"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="p-2 text-zinc-400 hover:text-rose-500 transition-colors active:scale-90"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 border-t border-zinc-100 bg-zinc-50 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Subtotal</span>
                <span className="font-bold text-zinc-900 text-base">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Global Shipping</span>
                <span className="text-green-600 font-bold uppercase tracking-widest text-[10px] bg-green-50 px-2 py-1 rounded">Complimentary</span>
              </div>
            </div>
            <div className="flex justify-between text-2xl font-black border-t border-zinc-200 pt-6 tracking-tighter">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full py-5 bg-zinc-900 text-white rounded-[20px] font-bold text-lg hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-indigo-100 active:scale-95"
            >
              Secure Checkout
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center justify-center gap-6 text-[10px] text-zinc-400 font-bold tracking-widest pt-2">
              <span className="flex items-center gap-1.5 uppercase">
                <ShieldCheck size={14} className="text-green-500" /> Encrypted
              </span>
              <span className="flex items-center gap-1.5 uppercase">
                <RefreshCw size={14} className="text-green-500" /> Free Returns
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
