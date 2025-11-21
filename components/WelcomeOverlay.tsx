import React, { useState, useEffect } from 'react';
import { Car, ChevronRight, Zap } from 'lucide-react';

interface WelcomeOverlayProps {
  onComplete: () => void;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence animation steps
    setTimeout(() => setStep(1), 500);
    setTimeout(() => setStep(2), 1200);
  }, []);

  const handleStart = () => {
    setIsVisible(false);
    setTimeout(onComplete, 800); // Long fade out for smoothness
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a] flex flex-col items-center justify-center p-6 transition-all duration-1000 ease-in-out overflow-hidden">
      
      {/* Background Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 flex flex-col items-center">
        
        {/* Animated Logo Container */}
        <div className={`relative w-32 h-32 mb-10 transition-all duration-1000 ${step >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl rotate-6 opacity-50 animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl shadow-2xl flex items-center justify-center border border-white/10">
            <Car size={56} className="text-white drop-shadow-lg" />
          </div>
          {/* Decorative orbits */}
          <div className="absolute -inset-4 border border-indigo-500/30 rounded-full animate-spin-slow"></div>
          <div className="absolute -inset-8 border border-indigo-500/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
        </div>

        {/* Text Content */}
        <div className={`text-center space-y-4 transition-all duration-1000 delay-300 ${step >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Skily<span className="text-indigo-400">.</span>
          </h1>
          <p className="text-slate-400 text-lg font-light tracking-wide">
            La evolución de tu carnet de conducir.
          </p>
        </div>

        {/* Action Button */}
        <div className={`mt-16 w-full transition-all duration-1000 delay-700 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button 
            onClick={handleStart}
            className="group relative w-full py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-transform hover:scale-[1.02] active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100 to-transparent translate-x-[-100%] group-hover:animate-shimmer"></div>
            <div className="relative flex items-center justify-center gap-3">
              <span>Iniciar Sistema</span>
              <ChevronRight size={20} className="text-indigo-600" />
            </div>
          </button>
          
          <p className="mt-6 text-center text-xs text-slate-600 font-mono uppercase tracking-widest">
            Secured by Gemini AI
          </p>
        </div>
      </div>
    </div>
  );
};