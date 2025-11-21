import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, Tooltip as RechartsTooltip
} from 'recharts';
import { 
  Trophy, Target, MapPin, Activity, Crown, Power
} from 'lucide-react';
import { UserStats } from '../types';
import { DailyRewards } from './DailyRewards';

interface DashboardProps {
  stats: UserStats;
  onStartQuiz: () => void;
  onClaimReward: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, onStartQuiz, onClaimReward }) => {
  
  const today = new Date().toISOString().split('T')[0];
  const hasClaimedToday = stats.lastRewardClaimed === today;

  const effectivenessData = [
    { name: 'Aprobado', value: stats.averageScore, color: '#6366f1' }, 
    { name: 'Restante', value: 100 - stats.averageScore, color: '#f1f5f9' } 
  ];

  const topicData = Object.entries(stats.topicMastery).map(([name, value]) => ({
    name: name.split(' ')[0], 
    value: value as number,
  }));

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans pb-24">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-4 animate-fade-in">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Dashboard <span className="text-indigo-600">Pro</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">Sistema listo. Bienvenido, Piloto.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-sm font-bold text-slate-600">Online</span>
            </div>
          </div>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-slide-up">
          
          {/* 1. HERO CARD (Big, spanning 2 cols, 2 rows on LG) */}
          <div className="md:col-span-3 lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-[2.5rem] mesh-gradient text-white p-8 md:p-10 flex flex-col justify-between shadow-2xl shadow-indigo-500/30 group">
            
            {/* Ambient Noise/Texture */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
            
            {/* Floating Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 h-full">
              <div className="flex-1 self-start md:self-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full mb-6">
                  <Crown size={14} className="text-yellow-300 fill-yellow-300" />
                  <span className="text-xs font-bold tracking-widest uppercase">Premium Access</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">
                  Ready for <br /> Takeoff?
                </h2>
                <p className="text-indigo-100 font-medium max-w-xs text-lg mb-6 md:mb-0">
                  Tu rendimiento está al {stats.averageScore}%. Los sensores indican que estás listo.
                </p>
              </div>

              {/* THE START BUTTON - REALISTIC CAR IGNITION */}
              <button 
                onClick={onStartQuiz}
                className="group relative w-40 h-40 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
              >
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-indigo-500/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Metal Ring */}
                <div className="absolute inset-0 rounded-full metal-ring shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_2px_5px_rgba(255,255,255,0.9)] p-2">
                  {/* Inner Dark Plastic */}
                  <div className="w-full h-full rounded-full bg-[#1a1a1a] shadow-[inset_0_5px_15px_rgba(0,0,0,0.9)] p-1">
                    
                    {/* Button Surface */}
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-[#333] to-[#111] border-t border-white/10 flex flex-col items-center justify-center relative overflow-hidden group-hover:shadow-[inset_0_0_30px_rgba(99,102,241,0.4)] transition-all">
                      
                      {/* Brushed Metal Texture */}
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
                      
                      {/* LED Indicator */}
                      <div className="w-12 h-1.5 rounded-full bg-black/50 mb-3 overflow-hidden border border-white/5 shadow-[inset_0_1px_3px_rgba(0,0,0,1)]">
                        <div className="w-full h-full bg-gradient-to-r from-indigo-600 to-indigo-400 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                      </div>

                      <div className="flex flex-col items-center relative z-10">
                         <Power size={24} className="text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" />
                         <span className="text-[10px] text-slate-400 font-bold tracking-[0.25em] uppercase group-hover:text-indigo-400 transition-colors">Engine</span>
                         <span className="text-[8px] text-slate-600 font-bold tracking-widest uppercase mt-0.5">Start/Stop</span>
                      </div>
                      
                      {/* Bottom Gloss Reflection */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/5 blur-md rounded-t-full opacity-60"></div>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Bottom stats in Hero */}
            <div className="relative z-10 grid grid-cols-2 gap-4 mt-8">
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/20 transition-colors">
                 <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-wider">Nivel Actual</span>
                 <div className="text-2xl font-bold mt-1">{stats.level}</div>
               </div>
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/20 transition-colors">
                 <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-wider">XP Total</span>
                 <div className="text-2xl font-bold mt-1">{stats.xp}</div>
               </div>
            </div>
          </div>

          {/* 2. STREAK CARD (Dark Mode) */}
          <div className="md:col-span-1 lg:col-span-1 lg:row-span-2">
            <DailyRewards 
              currentStreak={stats.currentStreak}
              hasClaimedToday={hasClaimedToday}
              onClaim={onClaimReward}
            />
          </div>

          {/* 3. EFFECTIVENESS */}
          <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
             <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900">Efectividad</h3>
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <Target size={18} />
                </div>
             </div>
             
             <div className="flex-1 flex items-center justify-center relative min-h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={effectivenessData}
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                      cornerRadius={8}
                      stroke="none"
                    >
                      {effectivenessData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{stats.averageScore}%</span>
                   <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">Aprobado</span>
                </div>
             </div>
             
             <div className="mt-4 text-center">
               <p className="text-xs text-slate-400 font-medium">
                 Basado en {stats.testsTaken} simulacros
               </p>
             </div>
          </div>

          {/* 4. MINI STATS ROW */}
          <div className="md:col-span-3 lg:col-span-2 grid grid-cols-2 gap-6">
            <BentoStat 
              title="Victorias" 
              value={stats.testsTaken.toString()} 
              icon={Trophy} 
              color="bg-amber-100 text-amber-700"
            />
            <BentoStat 
              title="Precisión" 
              value="Alto" 
              icon={Activity} 
              color="bg-emerald-100 text-emerald-700"
            />
          </div>

          {/* 5. KNOWLEDGE MAP */}
          <div className="md:col-span-3 lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 group hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                <MapPin size={18} />
              </div>
              <h3 className="font-bold text-slate-900">Mapa de Conocimiento</h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={topicData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.15)', padding: '12px' }}
                    cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5 5' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#6366f1" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorVal)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const BentoStat = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-center gap-5 transition-all hover:-translate-y-1 hover:shadow-md">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-inner`}>
      <Icon size={26} />
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
      <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
    </div>
  </div>
);