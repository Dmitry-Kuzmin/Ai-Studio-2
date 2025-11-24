
import React, { useState } from 'react';
import { 
  Volume2, Monitor, Globe, Cpu, Radio, Zap, 
  Activity, Power, RefreshCw, Smartphone, 
  ChevronRight, Layers, Sliders
} from 'lucide-react';
import { playClickSound, playHoverSound, playTabSwitchSound, playSuccessSound } from '../services/audioService';

interface SettingsViewProps {
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const [volume, setVolume] = useState(75);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [graphicsMode, setGraphicsMode] = useState<'performance' | 'quality'>('quality');
  const [language, setLanguage] = useState('es');
  const [animations, setAnimations] = useState(true);

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    playClickSound();
    setter(!value);
  };

  const handleSave = () => {
    playSuccessSound();
    onBack();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 md:p-10 font-sans pb-24 text-white flex justify-center animate-fade-in">
      <div className="w-full max-w-5xl">
        
        {/* ECU Header */}
        <div className="flex items-center justify-between mb-8">
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <Cpu className="text-indigo-500 animate-pulse" size={18} />
                 <span className="text-xs font-mono font-bold text-indigo-500 tracking-[0.2em] uppercase">System Configuration</span>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter">ECU Control Unit</h2>
           </div>
           
           <button 
             onClick={handleSave}
             className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
           >
             <Power size={18} />
             <span>APLICAR CAMBIOS</span>
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* COL 1: AUDIO MIXER */}
           <div className="bg-slate-900 rounded-[2rem] border border-slate-800 p-8 shadow-xl relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Radio size={120} />
              </div>
              
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                 <div className="p-2 bg-slate-800 rounded-lg text-indigo-400 border border-slate-700">
                    <Volume2 size={20} />
                 </div>
                 Audio Mixer
              </h3>

              <div className="space-y-8">
                 {/* Master Volume */}
                 <div>
                    <div className="flex justify-between mb-2 text-sm font-medium text-slate-400">
                       <span>Master Gain</span>
                       <span className="text-white">{volume}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-slate-900 [&::-webkit-slider-thumb]:shadow-lg"
                    />
                 </div>

                 {/* Toggles */}
                 <div className="space-y-4">
                    <ToggleRow 
                      label="SFX Engine" 
                      desc="Sonidos de interfaz y motor" 
                      active={sfxEnabled} 
                      onClick={() => handleToggle(setSfxEnabled, sfxEnabled)} 
                    />
                    <ToggleRow 
                      label="Música Generativa" 
                      desc="Ambient music streaming" 
                      active={musicEnabled} 
                      onClick={() => handleToggle(setMusicEnabled, musicEnabled)} 
                    />
                 </div>
              </div>
           </div>

           {/* COL 2: VISUAL ENGINE */}
           <div className="bg-slate-900 rounded-[2rem] border border-slate-800 p-8 shadow-xl relative overflow-hidden group hover:border-fuchsia-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Monitor size={120} />
              </div>

              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                 <div className="p-2 bg-slate-800 rounded-lg text-fuchsia-400 border border-slate-700">
                    <Layers size={20} />
                 </div>
                 Visual Engine
              </h3>

              <div className="space-y-6">
                 {/* Graphics Mode */}
                 <div className="p-1 bg-slate-800 rounded-xl flex">
                    <button 
                      onClick={() => { playTabSwitchSound(); setGraphicsMode('performance'); }}
                      className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${graphicsMode === 'performance' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                       Performance
                    </button>
                    <button 
                      onClick={() => { playTabSwitchSound(); setGraphicsMode('quality'); }}
                      className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${graphicsMode === 'quality' ? 'bg-fuchsia-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                       Quality (Ultra)
                    </button>
                 </div>

                 <ToggleRow 
                    label="Particle Effects" 
                    desc="Lluvia, chispas y humo" 
                    active={animations} 
                    onClick={() => handleToggle(setAnimations, animations)} 
                 />

                 <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-between">
                    <div>
                       <div className="text-white font-bold text-sm">Tema de Interfaz</div>
                       <div className="text-xs text-slate-500">Esquema de color ADAS</div>
                    </div>
                    <div className="flex gap-2">
                       <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-indigo-500 cursor-pointer"></div>
                       <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-500 cursor-pointer opacity-50"></div>
                       <div className="w-6 h-6 rounded-full bg-orange-900 border border-orange-500 cursor-pointer opacity-50"></div>
                    </div>
                 </div>
              </div>
           </div>

           {/* COL 3: SYSTEM */}
           <div className="bg-slate-900 rounded-[2rem] border border-slate-800 p-8 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Activity size={120} />
              </div>

              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                 <div className="p-2 bg-slate-800 rounded-lg text-emerald-400 border border-slate-700">
                    <Sliders size={20} />
                 </div>
                 System
              </h3>

              <div className="space-y-6">
                 
                 {/* Language */}
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Lenguaje Sistema</label>
                    <div className="grid grid-cols-3 gap-2">
                       {['ES', 'EN', 'CAT'].map((lang) => (
                          <button
                            key={lang}
                            onClick={() => { playClickSound(); setLanguage(lang.toLowerCase()); }}
                            className={`py-3 rounded-xl border font-bold text-sm transition-all ${
                               language === lang.toLowerCase() 
                               ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                               : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500'
                            }`}
                          >
                             {lang}
                          </button>
                       ))}
                    </div>
                 </div>

                 <ToggleRow 
                    label="Haptic Feedback" 
                    desc="Vibración en móvil" 
                    active={true} 
                    onClick={() => {}} 
                 />

                 <button className="w-full py-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-rose-500/10 hover:border-rose-500/50 transition-all font-bold text-sm flex items-center justify-center gap-2 group/danger">
                    <RefreshCw size={16} className="group-hover/danger:rotate-180 transition-transform duration-500" />
                    Resetear Progreso
                 </button>

              </div>
           </div>

        </div>

        {/* DATA STREAM FOOTER */}
        <div className="mt-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-6 opacity-70">
           <div className="flex items-center gap-4">
              <div className="flex flex-col">
                 <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Latency</span>
                 <span className="text-emerald-400 font-mono font-bold">24ms</span>
              </div>
              <div className="w-[1px] h-8 bg-slate-700"></div>
              <div className="flex flex-col">
                 <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Memory</span>
                 <span className="text-indigo-400 font-mono font-bold">128MB</span>
              </div>
              <div className="w-[1px] h-8 bg-slate-700"></div>
              <div className="flex flex-col">
                 <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Version</span>
                 <span className="text-slate-300 font-mono font-bold">v2.5.0-beta</span>
              </div>
           </div>
           
           <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono uppercase">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              All Systems Nominal
           </div>
        </div>

      </div>
    </div>
  );
};

const ToggleRow = ({ label, desc, active, onClick }: { label: string, desc: string, active: boolean, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
       active ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-slate-800 border-slate-700'
    }`}
  >
     <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${active ? 'bg-indigo-400 shadow-[0_0_10px_#818cf8]' : 'bg-slate-600'}`}></div>
        <div>
           <div className={`font-bold text-sm ${active ? 'text-white' : 'text-slate-400'}`}>{label}</div>
           <div className="text-[10px] text-slate-500">{desc}</div>
        </div>
     </div>
     <div className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-indigo-600' : 'bg-slate-700'}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${active ? 'left-7' : 'left-1'}`}></div>
     </div>
  </div>
);
