
import React from 'react';
import { LayoutDashboard, BookOpen, MessageCircle, Zap, Car, Settings } from 'lucide-react';
import { playClickSound, playHoverSound } from '../services/audioService';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Telemetría', icon: LayoutDashboard },
    { id: 'tests', label: 'Simulación', icon: BookOpen },
    { id: 'tutor', label: 'Asistente IA', icon: MessageCircle },
  ];

  const handleNav = (id: string) => {
    playClickSound();
    setActiveTab(id);
  };

  return (
    <div className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 z-40 bg-[#0f172a] border-r border-slate-800">
      {/* Logo Area */}
      <div className="p-10 pb-6">
        <div className="flex items-center gap-3">
           <div className="relative">
             <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20"></div>
             <div className="relative w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl flex items-center justify-center text-white shadow-xl">
               <Car size={20} className="text-indigo-400" />
             </div>
           </div>
           <div>
             <span className="text-xl font-black text-white tracking-tighter block leading-none">Skily<span className="text-indigo-500">.</span></span>
             <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">ADAS v2.5</span>
           </div>
        </div>
      </div>

      {/* ADAS Status */}
      <div className="px-6 mb-8">
         <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">System Status</span>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <div className="space-y-1">
               <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>AI Core</span>
                  <span className="text-emerald-400">ONLINE</span>
               </div>
               <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Cloud DGT</span>
                  <span className="text-emerald-400">SYNCED</span>
               </div>
            </div>
         </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-2">
        <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Modos de Conducción</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (activeTab === 'quiz' && item.id === 'tests');
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              onMouseEnter={playHoverSound}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 text-sm font-bold group relative overflow-hidden ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-700'
              }`}
            >
              {isActive && <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"></div>}
              <Icon size={20} className={`transition-colors relative z-10 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
              <span className="relative z-10">{item.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>}
            </button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-slate-800">
          <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Sistema</p>
           <button
              onClick={() => handleNav('settings')}
              onMouseEnter={playHoverSound}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 text-sm font-bold group ${
                activeTab === 'settings'
                  ? 'bg-slate-800 text-white border border-slate-600'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'
              }`}
            >
              <Settings size={20} className={`transition-colors ${activeTab === 'settings' ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
              <span>Configuración</span>
            </button>
        </div>
      </nav>

      {/* Pro Badge */}
      <div className="px-6 pb-8">
        <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl p-5 text-white shadow-xl border border-slate-800 relative overflow-hidden group cursor-pointer hover:border-yellow-500/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-yellow-500/20 transition-colors"></div>
          
          <div className="relative z-10">
             <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-500/80">Black Pass</span>
                <Zap size={14} className="text-yellow-400 fill-yellow-400" />
             </div>
             <p className="text-sm font-bold text-white mb-1">Modo Sport+</p>
             <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mt-2">
               <div className="h-full bg-yellow-500 w-3/4"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
