
import React, { useState } from 'react';
import { Building2, Trees, Moon, Camera, Sparkles, Loader2, RefreshCcw } from 'lucide-react';
import { visualizeInScene } from '../services/gemini';

interface SceneSwitcherProps {
  originalImage: string;
  productName: string;
}

const SceneSwitcher: React.FC<SceneSwitcherProps> = ({ originalImage, productName }) => {
  const [currentImage, setCurrentImage] = useState(originalImage);
  const [isLoading, setIsLoading] = useState(false);
  const [activePlace, setActivePlace] = useState('Studio');

  const places = [
    { name: 'Studio', icon: <Camera size={18} />, prompt: 'professional studio' },
    { name: 'Urban', icon: <Building2 size={18} />, prompt: 'busy New York city street' },
    { name: 'Nature', icon: <Trees size={18} />, prompt: 'serene misty pine forest' },
    { name: 'Nightlife', icon: <Moon size={18} />, prompt: 'modern rooftop bar at night with neon lights' },
  ];

  const handleSwitch = async (place: typeof places[0]) => {
    if (place.name === 'Studio') {
      setCurrentImage(originalImage);
      setActivePlace('Studio');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    setActivePlace(place.name);

    // Fetch the original image as base64 to send to Gemini
    try {
      const response = await fetch(originalImage);
      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const generatedImage = await visualizeInScene(base64, place.prompt, productName);
        if (generatedImage) {
          setCurrentImage(generatedImage);
        } else {
          setActivePlace('Studio');
          setCurrentImage(originalImage);
        }
        setIsLoading(false);
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 shadow-2xl transition-all duration-500">
        <img 
          src={currentImage} 
          alt={productName} 
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`} 
        />
        
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-[2px]">
            <Loader2 size={40} className="text-white animate-spin mb-3" />
            <span className="text-white font-bold text-xs tracking-widest uppercase">AI Rendering Scene...</span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="bg-zinc-900/80 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
            <Sparkles size={12} className="text-indigo-400" />
            <span className="text-[10px] font-bold text-white uppercase tracking-tighter">AI Vision: {activePlace}</span>
          </div>
          {activePlace !== 'Studio' && (
            <button 
              onClick={() => handleSwitch(places[0])}
              className="pointer-events-auto w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:rotate-180 transition-transform duration-500"
            >
              <RefreshCcw size={14} className="text-zinc-900" />
            </button>
          )}
        </div>
      </div>

      <div>
        <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-400 mb-4">View In Environment</h4>
        <div className="flex gap-2">
          {places.map((place) => (
            <button
              key={place.name}
              onClick={() => handleSwitch(place)}
              disabled={isLoading}
              className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                activePlace === place.name 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                  : 'border-zinc-100 hover:border-zinc-300 text-zinc-500'
              }`}
            >
              {place.icon}
              <span className="text-[10px] font-bold uppercase tracking-tighter">{place.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SceneSwitcher;
