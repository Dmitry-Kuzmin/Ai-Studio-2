
import React, { useEffect, useState } from 'react';
import { Trophy, Zap, Crown, Sparkles, Hexagon, Star } from 'lucide-react';

export type EffectType = 'mythic' | 'legendary' | 'quantum';

interface RewardOverlayProps {
  type: EffectType;
  onComplete: () => void;
}

export const RewardOverlay: React.FC<RewardOverlayProps> = ({ type, onComplete }) => {
  const [stage, setStage] = useState<'intro' | 'hold' | 'exit'>('intro');

  useEffect(() => {
    // Stage timing adjusted for higher impact
    const holdTimer = setTimeout(() => setStage('hold'), 600); 
    const exitTimer = setTimeout(() => setStage('exit'), 2800);
    const completeTimer = setTimeout(onComplete, 3500);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // The exit transition
  const backdropClass = stage === 'exit' ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100';

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 overflow-hidden ${backdropClass}`}>
      
      {/* =================================================================================
          TYPE 1: MYTHIC (Impact, Shake, RGB Split)
         ================================================================================= */}
      {type === 'mythic' && (
        <div className="relative w-full h-full flex items-center justify-center bg-indigo-950">
           
           {/* FLASH OVERLAY */}
           <div className={`absolute inset-0 bg-white z-50 pointer-events-none mix-blend-overlay ${stage === 'intro' ? 'animate-flash' : 'opacity-0'}`}></div>

           {/* SHAKE CONTAINER */}
           <div className={`${stage === 'intro' ? 'animate-shake-hard' : ''} flex flex-col items-center justify-center relative z-10`}>
              
              {/* Spinning God Rays (Background) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-[200vw] h-[200vw] bg-[conic-gradient(from_0deg,#4f46e5_0deg,transparent_20deg,#818cf8_40deg,transparent_60deg,#6366f1_100deg,transparent_120deg)] opacity-30 animate-spin-slow"></div>
              </div>

              {/* Main Icon with RGB Split Effect */}
              <div className="relative mb-8 group">
                 <div className="absolute inset-0 text-red-500 blur-[2px] translate-x-1 animate-pulse opacity-70">
                    <Star size={120} fill="currentColor" />
                 </div>
                 <div className="absolute inset-0 text-blue-500 blur-[2px] -translate-x-1 animate-pulse opacity-70" style={{ animationDelay: '0.1s' }}>
                    <Star size={120} fill="currentColor" />
                 </div>
                 <div className="relative z-10 text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.8)] scale-110">
                    <Star size={120} fill="white" />
                 </div>
              </div>

              {/* RGB Text */}
              <h1 className="text-8xl font-black text-white italic tracking-tighter mix-blend-screen relative" style={{ textShadow: '4px 4px 0px #ef4444, -4px -4px 0px #3b82f6' }}>
                 MYTHIC
              </h1>
              
              <div className="mt-6 px-8 py-3 bg-white text-indigo-900 font-bold uppercase tracking-[0.5em] text-sm shadow-[0_0_30px_rgba(255,255,255,0.5)] animate-bounce-in">
                 Discovery
              </div>
           </div>
           
           {/* Floating Particles */}
           <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                 <div key={i} className="absolute w-2 h-2 bg-fuchsia-400 rounded-full animate-float-particle" 
                      style={{ 
                         left: `${Math.random() * 100}%`, 
                         top: `${Math.random() * 100}%`,
                         animationDelay: `${Math.random()}s`
                      }}></div>
              ))}
           </div>
        </div>
      )}

      {/* =================================================================================
          TYPE 2: LEGENDARY (Gold Explosion, Lens Flare)
         ================================================================================= */}
      {type === 'legendary' && (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
           
           {/* Golden Radial BG */}
           <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,#d97706_0%,#000_70%)] transition-opacity duration-1000 ${stage === 'intro' ? 'opacity-100 scale-150' : 'opacity-80 scale-100'}`}></div>

           {/* LENS FLARE SWEEP */}
           <div className={`absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-40 pointer-events-none ${stage === 'intro' ? 'animate-lens-flare' : 'opacity-0'}`}></div>

           {/* Central Content */}
           <div className={`relative z-10 flex flex-col items-center transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${stage === 'intro' ? 'scale-0' : 'scale-100'}`}>
              
              {/* Crown Icon */}
              <div className="relative mb-6">
                 <div className="absolute inset-0 bg-yellow-400 blur-[60px] opacity-60 animate-pulse"></div>
                 <Crown size={100} className="text-yellow-100 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] relative z-10" fill="url(#goldGradient)" />
                 <svg width="0" height="0">
                   <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop stopColor="#fef08a" offset="0%" />
                     <stop stopColor="#eab308" offset="50%" />
                     <stop stopColor="#a16207" offset="100%" />
                   </linearGradient>
                 </svg>
              </div>

              <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-700 filter drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-tight">
                 LEGENDARY
              </h1>
              
              <div className="mt-4 flex items-center gap-2">
                 <div className="h-[1px] w-12 bg-yellow-500/50"></div>
                 <span className="text-yellow-500 font-mono text-xs uppercase tracking-widest">Treasure Unlocked</span>
                 <div className="h-[1px] w-12 bg-yellow-500/50"></div>
              </div>
           </div>

           {/* EXPLODING PARTICLES */}
           {stage !== 'exit' && (
             <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {[...Array(40)].map((_, i) => {
                   const angle = (i / 40) * 360;
                   return (
                      <div key={i} className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-sm animate-explode-out"
                           style={{
                              transform: `rotate(${angle}deg) translateX(0px)`,
                              '--angle': `${angle}deg`,
                              '--dist': `${200 + Math.random() * 300}px`
                           } as React.CSSProperties}></div>
                   )
                })}
             </div>
           )}
        </div>
      )}

      {/* =================================================================================
          TYPE 3: QUANTUM (Glitch, Matrix, Neon)
         ================================================================================= */}
      {type === 'quantum' && (
        <div className="relative w-full h-full flex items-center justify-center bg-[#050505]">
           
           {/* Matrix Rain / Grid */}
           <div className="absolute inset-0 opacity-20" 
                style={{ 
                   backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, .3) 25%, rgba(6, 182, 212, .3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .3) 75%, rgba(6, 182, 212, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, .3) 25%, rgba(6, 182, 212, .3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .3) 75%, rgba(6, 182, 212, .3) 76%, transparent 77%, transparent)',
                   backgroundSize: '50px 50px',
                   transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)'
                }}></div>

           {/* Glitch Container */}
           <div className="relative z-10 flex flex-col items-center">
              
              {/* Hexagon Spinner */}
              <div className="relative mb-8">
                 <div className={`absolute inset-0 border-2 border-cyan-500 rounded-full animate-ping opacity-20`}></div>
                 <div className="w-32 h-32 border-4 border-cyan-400 flex items-center justify-center relative bg-cyan-900/20 backdrop-blur-sm" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <Zap size={64} className={`text-cyan-400 ${stage === 'intro' ? 'animate-glitch-icon' : ''}`} />
                 </div>
                 {/* Glitch Clones */}
                 <div className="absolute top-0 left-0 w-32 h-32 flex items-center justify-center text-red-500 opacity-50 mix-blend-screen animate-glitch-1" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <Zap size={64} />
                 </div>
              </div>

              {/* Glitch Text */}
              <h1 className="text-8xl font-mono font-bold text-white tracking-widest relative">
                 <span className={`${stage === 'intro' ? 'animate-glitch-text' : ''}`}>QUANTUM</span>
              </h1>
              
              <div className="mt-4 bg-cyan-900/50 border border-cyan-500/50 px-6 py-2 rounded-sm flex items-center gap-4">
                 <div className="w-2 h-2 bg-cyan-400 animate-pulse"></div>
                 <span className="text-cyan-400 font-mono text-xs">SYSTEM_OVERRIDE_COMPLETE</span>
              </div>
           </div>
        </div>
      )}

      {/* INJECTED STYLES FOR PERFORMANCE AND ISOLATION */}
      <style>{`
        /* MYTHIC ANIMATIONS */
        @keyframes shake-hard {
          0% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-10px, -10px) rotate(-5deg); }
          20% { transform: translate(10px, 10px) rotate(5deg); }
          30% { transform: translate(-10px, 10px) rotate(-5deg); }
          40% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(-5px, 0px) rotate(-2deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes flash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-shake-hard { animation: shake-hard 0.6s ease-out; }
        .animate-flash { animation: flash 0.5s ease-out forwards; }
        .animate-float-particle { animation: float-up 2s ease-in-out infinite; }
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-50px) scale(0); opacity: 0; }
        }

        /* LEGENDARY ANIMATIONS */
        @keyframes lens-flare {
          0% { transform: translateX(-100%) skewX(12deg); }
          100% { transform: translateX(100%) skewX(12deg); }
        }
        @keyframes explode-out {
          0% { transform: rotate(var(--angle)) translateX(0) scale(1); opacity: 1; }
          100% { transform: rotate(var(--angle)) translateX(var(--dist)) scale(0); opacity: 0; }
        }
        .animate-lens-flare { animation: lens-flare 0.8s ease-out forwards; }
        .animate-explode-out { animation: explode-out 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        /* QUANTUM ANIMATIONS */
        @keyframes glitch-text {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes glitch-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px,0); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px,0); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px,0); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px,0); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-2px,0); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(2px,0); }
        }
        .animate-glitch-text { animation: glitch-text 0.3s infinite; }
        .animate-glitch-1 { animation: glitch-1 2s infinite linear alternate-reverse; }
        .animate-glitch-icon { animation: glitch-text 0.2s infinite; }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
