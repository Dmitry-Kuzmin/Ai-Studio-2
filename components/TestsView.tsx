
import React, { useState } from 'react';
import { ArrowLeft, Zap, BookOpen, AlertTriangle, Clock, Car, Shield, Heart, Wrench, Leaf, FileText } from 'lucide-react';
import { Topic, UserStats } from '../types';
import { playClickSound, playHoverSound } from '../services/audioService';

interface TestsViewProps {
  onBack: () => void;
  onSelectTopic: (topic: Topic) => void;
  stats: UserStats;
}

const TOPIC_CONFIG: Record<Topic, { icon: any, color: string, desc: string }> = {
  [Topic.GENERAL]: { icon: Zap, color: 'indigo', desc: 'Mezcla de todos los temas' },
  [Topic.SENALES]: { icon: AlertTriangle, color: 'orange', desc: 'Señales de tráfico' },
  [Topic.VELOCIDAD]: { icon: Clock, color: 'red', desc: 'Límites de velocidad' },
  [Topic.PRIORIDAD]: { icon: ArrowLeft, color: 'blue', desc: 'Intersecciones y prioridad' },
  [Topic.SEGURIDAD]: { icon: Shield, color: 'emerald', desc: 'Seguridad activa y pasiva' },
  [Topic.ALCOHOL_DROGAS]: { icon: AlertTriangle, color: 'purple', desc: 'Tasas y efectos' },
  [Topic.DOCUMENTACION]: { icon: FileText, color: 'slate', desc: 'Permisos y papeles' },
  [Topic.PRIMEROS_AUXILIOS]: { icon: Heart, color: 'rose', desc: 'PAS y socorrismo' },
  [Topic.MECANICA]: { icon: Wrench, color: 'cyan', desc: 'Mantenimiento básico' },
  [Topic.CONDUCCION_EFICIENTE]: { icon: Leaf, color: 'lime', desc: 'Ecología y consumo' }
};

export const TestsView: React.FC<TestsViewProps> = ({ onBack, onSelectTopic, stats }) => {
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 md:p-10 animate-fade-in pb-24 font-sans text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0f172a] to-[#0f172a] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1370px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => { playClickSound(); onBack(); }}
            className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all shadow-lg shadow-black/20"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm tracking-wide">DASHBOARD</span>
          </button>
          
          <div className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
             <button 
               onClick={() => { playClickSound(); setMode('practice'); }}
               className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all tracking-wide ${mode === 'practice' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
             >
               Entrenamiento
             </button>
             <button 
               onClick={() => { playClickSound(); setMode('exam'); }}
               className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all tracking-wide ${mode === 'exam' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/50' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
             >
               Examen DGT
             </button>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight flex items-center gap-4">
            {mode === 'practice' ? (
              <>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Módulos de Práctica</span>
                <Zap className="text-indigo-400 fill-indigo-400/20" size={32} />
              </>
            ) : (
              <>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-400">Simulacro Oficial</span>
                <AlertTriangle className="text-rose-400 fill-rose-400/20" size={32} />
              </>
            )}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            {mode === 'practice' 
              ? 'Perfecciona tu técnica. Selecciona un módulo específico para entrenar con la IA y mejorar tus estadísticas.' 
              : 'Modo Hardcore activado. 30 preguntas, 30 minutos. Simulación exacta de las condiciones de examen de la DGT.'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.values(Topic).map((topic) => {
            const config = TOPIC_CONFIG[topic];
            const Icon = config.icon;
            const mastery = stats.topicMastery[topic] || 0;
            
            // Map internal color names to tailwind classes manually to ensure dark mode compatibility
            // Using a consistent mapping strategy for dynamic classes
            let colorStyles = {
              bg: 'bg-indigo-500/10', text: 'text-indigo-400', bar: 'bg-indigo-500', border: 'group-hover:border-indigo-500/50', glow: 'group-hover:shadow-indigo-500/20'
            };
            
            if (config.color === 'orange') colorStyles = { bg: 'bg-orange-500/10', text: 'text-orange-400', bar: 'bg-orange-500', border: 'group-hover:border-orange-500/50', glow: 'group-hover:shadow-orange-500/20' };
            if (config.color === 'red') colorStyles = { bg: 'bg-red-500/10', text: 'text-red-400', bar: 'bg-red-500', border: 'group-hover:border-red-500/50', glow: 'group-hover:shadow-red-500/20' };
            if (config.color === 'blue') colorStyles = { bg: 'bg-blue-500/10', text: 'text-blue-400', bar: 'bg-blue-500', border: 'group-hover:border-blue-500/50', glow: 'group-hover:shadow-blue-500/20' };
            if (config.color === 'emerald') colorStyles = { bg: 'bg-emerald-500/10', text: 'text-emerald-400', bar: 'bg-emerald-500', border: 'group-hover:border-emerald-500/50', glow: 'group-hover:shadow-emerald-500/20' };
            if (config.color === 'purple') colorStyles = { bg: 'bg-purple-500/10', text: 'text-purple-400', bar: 'bg-purple-500', border: 'group-hover:border-purple-500/50', glow: 'group-hover:shadow-purple-500/20' };
            if (config.color === 'slate') colorStyles = { bg: 'bg-slate-500/10', text: 'text-slate-400', bar: 'bg-slate-500', border: 'group-hover:border-slate-500/50', glow: 'group-hover:shadow-slate-500/20' };
            if (config.color === 'rose') colorStyles = { bg: 'bg-rose-500/10', text: 'text-rose-400', bar: 'bg-rose-500', border: 'group-hover:border-rose-500/50', glow: 'group-hover:shadow-rose-500/20' };
            if (config.color === 'cyan') colorStyles = { bg: 'bg-cyan-500/10', text: 'text-cyan-400', bar: 'bg-cyan-500', border: 'group-hover:border-cyan-500/50', glow: 'group-hover:shadow-cyan-500/20' };
            if (config.color === 'lime') colorStyles = { bg: 'bg-lime-500/10', text: 'text-lime-400', bar: 'bg-lime-500', border: 'group-hover:border-lime-500/50', glow: 'group-hover:shadow-lime-500/20' };

            return (
              <button
                key={topic}
                onClick={() => { playClickSound(); onSelectTopic(topic); }}
                onMouseEnter={playHoverSound}
                className={`group relative bg-slate-800/50 backdrop-blur-sm rounded-[2rem] p-6 border border-slate-700/50 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 overflow-hidden text-left ${colorStyles.border} ${colorStyles.glow}`}
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-white to-transparent`}></div>
                
                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl ${colorStyles.bg} flex items-center justify-center ${colorStyles.text} mb-5 group-hover:scale-110 transition-transform duration-300 border border-white/5 shadow-inner`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight mb-2 group-hover:text-indigo-200 transition-colors">{topic}</h3>
                    <p className="text-xs text-slate-400 font-medium">{config.desc}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span>Dominio</span>
                      <span className={colorStyles.text}>{mastery}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700/50">
                      <div 
                        className={`h-full ${colorStyles.bar} rounded-full transition-all duration-1000 shadow-[0_0_10px_currentColor]`} 
                        style={{ width: `${mastery}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
