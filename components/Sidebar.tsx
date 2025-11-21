import React from 'react';
import { LayoutDashboard, BookOpen, MessageCircle, LogOut, Car, Zap } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Resumen', icon: LayoutDashboard },
    { id: 'quiz', label: 'Simulacro Examen', icon: BookOpen },
    { id: 'tutor', label: 'Tutor IA', icon: MessageCircle },
  ];

  return (
    <div className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 z-20 bg-white border-r border-slate-100/50 backdrop-blur-xl">
      {/* Logo Area */}
      <div className="p-10">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
             <Car size={20} />
           </div>
           <span className="text-xl font-bold text-slate-900 tracking-tight">Skily<span className="text-indigo-600">.</span></span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-2">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Main Menu</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 text-sm font-medium group ${
                isActive
                  ? 'bg-slate-50 text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:bg-white hover:shadow-sm hover:text-slate-800'
              }`}
            >
              <Icon size={20} className={`transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'}`} />
              <span>{item.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>}
            </button>
          );
        })}
      </nav>

      {/* Pro Badge */}
      <div className="px-6 pb-8">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden group cursor-pointer">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors"></div>
          
          <div className="relative z-10">
             <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Plan Pro</span>
                <Zap size={14} className="text-yellow-400 fill-yellow-400" />
             </div>
             <p className="text-sm font-semibold text-white mb-1">Acceso Ilimitado</p>
             <p className="text-xs text-slate-400">Desbloquea todas las funciones</p>
          </div>
        </div>
      </div>
    </div>
  );
};