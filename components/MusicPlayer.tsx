
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Activity, Waves, Zap } from 'lucide-react';
import { musicEngine, MusicTrack, playClickSound, playHoverSound } from '../services/audioService';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>('lofi');
  const [isHovered, setIsHovered] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const tracks: { id: MusicTrack; name: string; sub: string; hz: string; icon: any; color: string }[] = [
    { 
      id: 'lofi', 
      name: 'Neural Flow / Lo-Fi', 
      sub: 'Cognitive Boost',
      hz: '140 BPM',
      icon: Zap, 
      color: 'text-orange-400'
    },
    { 
      id: 'piano', 
      name: 'Quantum Piano / Ambient', 
      sub: 'Deep Focus',
      hz: '432 Hz',
      icon: Waves, 
      color: 'text-cyan-400'
    },
    { 
      id: 'ambient', 
      name: 'Deep Space / Drone', 
      sub: 'Stress Relief',
      hz: 'Theta Waves',
      icon: Activity, 
      color: 'text-fuchsia-400'
    }
  ];

  const activeTrack = tracks.find(t => t.id === currentTrack) || tracks[0];

  const togglePlay = async () => {
    playClickSound();
    const playing = await musicEngine.toggle();
    setIsPlaying(playing);
  };

  const nextTrack = async () => {
    playClickSound();
    const idx = tracks.findIndex(t => t.id === currentTrack);
    const next = tracks[(idx + 1) % tracks.length];
    setCurrentTrack(next.id);
    
    await musicEngine.setTrack(next.id);
    if (!isPlaying) {
        await musicEngine.play();
        setIsPlaying(true);
    } else {
        setIsPlaying(musicEngine.isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    // Note: In a real scenario, we'd bind this to the audio engine's gain node
    if (musicEngine['audio']) {
        musicEngine['audio'].volume = newVol;
    }
  };

  return (
    <div 
      onMouseEnter={() => { setIsHovered(true); playHoverSound(); }}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group z-50"
    >
      {/* Ambient Glow */}
      <div className={`absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700`}></div>

      <div className={`relative flex items-center gap-4 bg-[#0b1120]/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 pr-6 shadow-2xl transition-all duration-500 ease-out ${isHovered ? 'pr-8 scale-[1.02]' : ''} overflow-hidden`}>
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

        {/* Cover Art / Hologram */}
        <div className="relative w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden shadow-inner">
           <div className={`absolute inset-0 opacity-30 bg-gradient-to-tr from-transparent via-white to-transparent ${isPlaying ? 'animate-spin-slow' : ''}`}></div>
           <div className={`relative z-10 transition-all duration-500 ${isPlaying ? 'scale-100 opacity-100' : 'scale-90 opacity-60'}`}>
              <activeTrack.icon size={20} className={activeTrack.color} />
           </div>
           
           {/* Spinning Ring */}
           <div className={`absolute inset-1 rounded-full border border-dashed border-slate-600 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}></div>
        </div>

        {/* Track Info & Visualizer */}
        <div className="flex flex-col justify-center w-32 overflow-hidden">
           <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                 {isPlaying ? <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]"></span> : null}
                 {activeTrack.hz}
              </span>
           </div>
           
           {/* Scrolling Text Marquee */}
           <div className="relative h-5 overflow-hidden w-full mask-linear-fade">
             <div className={`whitespace-nowrap text-sm font-bold text-slate-200 ${isPlaying ? 'animate-[shimmer_3s_infinite]' : ''}`}>
               {activeTrack.name}
             </div>
           </div>
        </div>

        {/* Visualizer (Enhanced) */}
        <div className="flex items-end gap-[2px] h-6 w-12 mx-1">
           {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className={`w-1 rounded-t-sm ${isPlaying ? 'bg-indigo-500 shadow-[0_0_5px_#6366f1]' : 'bg-slate-700'}`}
                style={{
                   height: isPlaying ? '100%' : '20%',
                   animation: isPlaying ? `equalizer 0.8s ease-in-out infinite alternate` : 'none',
                   animationDelay: `${i * 0.1}s`
                }}
              ></div>
           ))}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-8 bg-slate-700/50"></div>

        {/* Controls */}
        <div className="flex items-center gap-3">
           
           {/* Volume Slider (Reveals on Hover) */}
           <div className={`flex items-center gap-2 overflow-hidden transition-all duration-500 ${isHovered ? 'w-20 opacity-100 mr-2' : 'w-0 opacity-0'}`}>
              <Volume2 size={14} className="text-slate-500 shrink-0" />
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
           </div>

           <button 
             onClick={togglePlay}
             className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)]"
           >
             {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
           </button>

           <button 
             onClick={nextTrack}
             className="text-slate-400 hover:text-white transition-colors hover:rotate-12"
           >
             <SkipForward size={20} />
           </button>
        </div>

      </div>
    </div>
  );
};
