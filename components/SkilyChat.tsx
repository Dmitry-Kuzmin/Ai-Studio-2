
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Maximize2, Minimize2, Loader2, Settings2 } from 'lucide-react';
import { askTutor } from '../services/geminiService';
import { playClickSound, playNotificationSound, playTabSwitchSound, playHoverSound } from '../services/audioService';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

type AvatarType = 'core' | 'tesseract' | 'eclipse';

// The New "Quantum Core" Avatar and variants
const SkilyCore = ({ 
  size = 'lg', 
  state = 'idle',
  type = 'core'
}: { 
  size?: 'sm' | 'md' | 'lg' | 'xl', 
  state?: 'idle' | 'thinking' | 'speaking',
  type?: AvatarType
}) => {
  const sizePx = {
    sm: 40,
    md: 64,
    lg: 140, 
    xl: 180
  };

  const s = sizePx[size];
  
  // Common styles
  const colorClass = state === 'thinking' ? 'border-pink-500' : 'border-indigo-500';
  const glowClass = state === 'thinking' ? 'shadow-[0_0_30px_rgba(236,72,153,0.6)]' : 'shadow-[0_0_20px_rgba(99,102,241,0.4)]';

  return (
    <div 
      className="relative flex items-center justify-center rounded-full" 
      style={{ width: s, height: s, perspective: '500px' }}
    >
       {/* ---------------- VARIANT 1: QUANTUM CORE (Gyroscopic) ---------------- */}
       {type === 'core' && (
         <>
           <div className={`absolute w-[20%] h-[20%] bg-white rounded-full blur-md z-20 animate-pulse`}></div>
           <div className={`absolute w-[15%] h-[15%] bg-indigo-400 rounded-full z-25`}></div>
           <div 
             className={`absolute inset-0 rounded-full border-[2px] ${colorClass} opacity-60 border-t-transparent border-b-transparent ${glowClass}`}
             style={{ animation: `spinX ${state === 'thinking' ? 1 : 8}s linear infinite` }}
           ></div>
           <div 
             className={`absolute inset-2 rounded-full border-[2px] border-purple-500 opacity-60 border-l-transparent border-r-transparent`}
             style={{ animation: `spinY ${state === 'thinking' ? 1.5 : 12}s linear infinite` }}
           ></div>
           <div 
             className={`absolute inset-4 rounded-full border-[1px] border-slate-400 opacity-30`}
             style={{ animation: `spinZ ${state === 'thinking' ? 2 : 15}s linear infinite reverse` }}
           ></div>
         </>
       )}

       {/* ---------------- VARIANT 2: TESSERACT (Hypercube) ---------------- */}
       {type === 'tesseract' && (
         <>
            <div className="absolute inset-[25%] border border-indigo-500/80 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                 style={{ animation: `spinX ${state === 'thinking' ? 2 : 10}s linear infinite` }}></div>
            <div className="absolute inset-[25%] border border-indigo-400/50" 
                 style={{ animation: `spinY ${state === 'thinking' ? 2 : 10}s linear infinite reverse` }}></div>
            <div className="absolute inset-[35%] border-2 border-white/80 bg-indigo-500/10 backdrop-blur-sm"
                 style={{ animation: `spinZ ${state === 'thinking' ? 1 : 6}s linear infinite` }}></div>
            {state === 'speaking' && <div className="absolute inset-[40%] bg-white animate-pulse shadow-[0_0_20px_#fff]"></div>}
         </>
       )}

       {/* ---------------- VARIANT 3: ECLIPSE ULTRA (Black Hole Quasar) ---------------- */}
       {type === 'eclipse' && (
         <>
            {/* 0. DARK MATTER BACKDROP (Subtle) */}
            <div className="absolute inset-[-5%] rounded-full bg-[#020617] opacity-80 scale-95"></div>

            {/* 1. Background Nebula (Very subtle now) */}
            <div className={`absolute inset-[-30%] rounded-full bg-gradient-to-tr from-indigo-900 via-fuchsia-900 to-cyan-900 blur-[30px] opacity-20 ${state === 'thinking' ? 'animate-pulse opacity-40' : ''}`}></div>

            {/* 2. Polar Jets (Quasar Beams) - Reduced opacity */}
            <div className={`absolute top-1/2 left-1/2 w-[1px] h-[140%] bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-sm opacity-30 -translate-x-1/2 -translate-y-1/2`} 
                 style={{ animation: 'spin-slow 20s linear infinite' }}></div>
             <div className={`absolute top-1/2 left-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent blur-sm opacity-20 -translate-x-1/2 -translate-y-1/2`} 
                 style={{ animation: 'spin-slow 15s linear infinite reverse' }}></div>


            {/* 3. Accretion Disk (Multi-color Plasma) - Sharper, less blur */}
            <div className={`absolute inset-[-15%] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,#6366f1_90deg,#d946ef_180deg,#06b6d4_270deg,transparent_360deg)] opacity-50 blur-[1px]`}
                 style={{ animation: `spin-slow ${state === 'thinking' ? '1s' : '6s'} linear infinite` }}></div>
            
            {/* 4. Photon Ring - Reduced shadow */}
            <div className="absolute inset-[0%] rounded-full border-[1px] border-white/50 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                 style={{ animation: 'spin-slow 20s linear infinite reverse', transform: 'rotateX(60deg)' }}></div>

            {/* 5. THE SINGULARITY (Textured Core) */}
            <div className={`absolute inset-[10%] rounded-full z-10 flex items-center justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)] ${state === 'speaking' ? 'scale-90' : 'scale-100'} transition-transform duration-500`}>
               {/* Deep Void Gradient */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e1b4b_0%,#000000_60%)]"></div>
               
               {/* Internal Digital Grid - Subtle */}
               <div className="absolute inset-0 opacity-20" 
                    style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '10px 10px', transform: 'scale(1.5)' }}></div>
               
               {/* Inner Pulse */}
               <div className={`w-[30%] h-[30%] rounded-full bg-indigo-500 blur-xl ${state === 'speaking' ? 'opacity-60 animate-pulse' : 'opacity-10'}`}></div>
            </div>
            
            {/* 6. Particles (Feeding the hole) - Reduced glow */}
             <div className="absolute inset-[-20%] animate-spin-ultra-slow opacity-60">
                <div className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-twinkle"></div>
                <div className="absolute bottom-0 right-1/2 w-0.5 h-0.5 bg-fuchsia-300 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-0 w-0.5 h-0.5 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
             </div>
         </>
       )}
    </div>
  );
};

export const SkilyChat: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [aiState, setAiState] = useState<'idle' | 'thinking' | 'speaking'>('idle');
  const [currentAvatar, setCurrentAvatar] = useState<AvatarType>('eclipse'); 
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isExpanded, aiState]);

  const handleExpand = () => {
    playTabSwitchSound();
    setIsExpanded(true);
  };

  const handleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setIsExpanded(false);
  };

  const toggleAvatar = () => {
    const types: AvatarType[] = ['core', 'tesseract', 'eclipse'];
    const next = types[(types.indexOf(currentAvatar) + 1) % types.length];
    setCurrentAvatar(next);
    playClickSound();
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    playClickSound();
    const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    setAiState('thinking');

    const response = await askTutor(input);
    
    playNotificationSound();
    const aiMsg: Message = { id: Date.now() + 1, text: response, sender: 'ai' };
    setMessages(prev => [...prev, aiMsg]);
    
    setAiState('speaking');
    setTimeout(() => setAiState('idle'), 3000);
  };

  return (
    <>
      {/* COMPACT WIDGET (DARK MODE) */}
      <div 
        onClick={handleExpand}
        onMouseEnter={playHoverSound}
        className={`h-full bg-slate-800/80 backdrop-blur-md rounded-[2.5rem] p-8 shadow-lg border border-slate-700 flex flex-col justify-between group hover:border-slate-600 transition-all cursor-pointer relative overflow-hidden ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div className="flex flex-col items-center justify-center flex-1 relative z-10">
          <div className="mb-8 transition-transform group-hover:scale-110 duration-700">
             <SkilyCore size="lg" state="idle" type={currentAvatar} />
          </div>

          <div className="text-center">
             <h3 className="font-bold text-white text-xl tracking-tight">Skily AI</h3>
             <p className="text-xs text-slate-400 mt-2 font-medium">Asistente Inteligente</p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="w-full h-12 pl-5 pr-4 bg-slate-900/50 border border-slate-700 rounded-xl font-medium text-sm text-slate-400 flex items-center justify-between group-hover:bg-slate-900 group-hover:border-indigo-500/30 transition-all">
            <span>Consultar norma...</span>
            <Maximize2 size={16} className="text-indigo-400" />
          </div>
        </div>
      </div>

      {/* EXPANDED OVERLAY (DARK MODE) */}
      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={handleCollapse}></div>
          
          <div className="relative w-full max-w-4xl h-[85vh] bg-slate-900 rounded-[2rem] shadow-2xl shadow-black border border-slate-800 overflow-hidden flex flex-col animate-slide-up">
            
            {/* Header */}
            <div className="h-24 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900 z-20">
               <div className="flex items-center gap-6">
                  <div className="scale-75 cursor-pointer" onClick={toggleAvatar} title="Cambiar apariencia">
                    <SkilyCore size="md" state={aiState} type={currentAvatar} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Skily Neural Core</h2>
                    <div className="flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${aiState === 'thinking' ? 'bg-pink-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                         {aiState === 'thinking' ? 'PROCESSING...' : 'ONLINE'}
                       </span>
                    </div>
                  </div>
               </div>

               <div className="flex items-center gap-2">
                 <button 
                   onClick={toggleAvatar}
                   className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                   title="Cambiar Skin de IA"
                 >
                   <Settings2 size={20} />
                 </button>
                 <button 
                   onClick={handleCollapse}
                   className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                 >
                   <Minimize2 size={20} />
                 </button>
               </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-slate-950/50 relative overflow-hidden flex flex-col">
               <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 relative z-10 scroll-smooth">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full opacity-100">
                       <div className="mb-8 scale-150 opacity-90 transition-all duration-500">
                          <SkilyCore size="xl" state="idle" type={currentAvatar} />
                       </div>
                       <p className="text-2xl font-bold text-white mb-2">Sistemas listos.</p>
                       <p className="text-base text-slate-400 text-center max-w-sm">
                         Accede a la base de datos de la DGT en tiempo real. Haz tu pregunta.
                       </p>
                       <p className="mt-8 text-xs text-slate-600 font-mono">MODEL: GEMINI-2.5-FLASH // LATENCY: 24ms</p>
                    </div>
                  )}

                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-[85%] p-6 rounded-2xl text-lg shadow-sm leading-relaxed ${
                         msg.sender === 'user' 
                           ? 'bg-indigo-600 text-white rounded-tr-none' 
                           : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                       }`}>
                          {msg.text}
                       </div>
                    </div>
                  ))}

                  {aiState === 'thinking' && (
                    <div className="flex justify-start">
                       <div className="bg-slate-800 px-6 py-4 rounded-2xl rounded-tl-none border border-slate-700 shadow-sm flex items-center gap-3 text-indigo-400 font-medium">
                          <Loader2 size={18} className="animate-spin" />
                          <span className="text-sm">Analizando reglamento...</span>
                       </div>
                    </div>
                  )}
               </div>
            </div>

            {/* Input */}
            <div className="p-6 bg-slate-900 border-t border-slate-800 relative z-20">
               <div className="relative flex items-center">
                  <input
                    autoFocus
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe tu consulta..."
                    className="w-full h-16 pl-6 pr-20 bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10 rounded-xl font-medium text-white text-lg transition-all outline-none placeholder:text-slate-500"
                  />
                  <div className="absolute right-2">
                     <button 
                       onClick={handleSendMessage}
                       disabled={!input.trim()}
                       className="w-12 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center justify-center transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:scale-95"
                     >
                        <ArrowRight size={24} />
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
