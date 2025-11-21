import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { QuizView } from './components/QuizView';
import { TutorView } from './components/TutorView';
import { WelcomeOverlay } from './components/WelcomeOverlay';
import { Menu, X } from 'lucide-react';
import { UserStats, Topic } from './types';

// Mock initial stats
const INITIAL_STATS: UserStats = {
  testsTaken: 12,
  averageScore: 68,
  topicMastery: {
    [Topic.GENERAL]: 75,
    [Topic.SENALES]: 80,
    [Topic.VELOCIDAD]: 45,
    [Topic.PRIORIDAD]: 60,
    [Topic.SEGURIDAD]: 90,
    [Topic.ALCOHOL_DROGAS]: 50
  },
  currentStreak: 3,
  maxStreak: 5,
  xp: 450,
  level: 4,
  lastRewardClaimed: '2023-01-01' // Old date to allow claiming
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [showWelcome, setShowWelcome] = useState(true);

  // Prevent scrolling when welcome overlay is active
  useEffect(() => {
    if (showWelcome) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showWelcome]);

  const handleQuizComplete = (score: number) => {
    setStats(prev => ({
      ...prev,
      testsTaken: prev.testsTaken + 1,
      averageScore: Math.round((prev.averageScore * prev.testsTaken + score) / (prev.testsTaken + 1)),
      xp: prev.xp + 20 // Add XP for completing a quiz
    }));
    setActiveTab('dashboard');
  };

  const handleClaimReward = () => {
    const today = new Date().toISOString().split('T')[0];
    setStats(prev => ({
      ...prev,
      currentStreak: prev.currentStreak + 1,
      xp: prev.xp + 50,
      lastRewardClaimed: today
    }));
  };

  return (
    <>
      {showWelcome && (
        <WelcomeOverlay onComplete={() => setShowWelcome(false)} />
      )}
      
      <div className={`min-h-screen bg-skily-dark flex text-gray-200 font-sans ${showWelcome ? 'blur-sm' : ''} transition-all duration-700`}>
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 w-full bg-skily-panel z-20 border-b border-slate-800 p-4 flex justify-between items-center">
          <div className="font-display font-bold text-lg text-skily-neon tracking-widest">SKILY_APP</div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-400">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-skily-dark z-10 pt-20 px-6 md:hidden animate-fade-in">
             <div className="space-y-4 font-mono">
               <button onClick={() => {setActiveTab('dashboard'); setIsMobileMenuOpen(false)}} className="block w-full text-left p-4 border border-slate-700 hover:border-skily-neon rounded-sm text-white">:: DASHBOARD</button>
               <button onClick={() => {setActiveTab('quiz'); setIsMobileMenuOpen(false)}} className="block w-full text-left p-4 border border-slate-700 hover:border-skily-neon rounded-sm text-white">:: START SIMULATION</button>
               <button onClick={() => {setActiveTab('tutor'); setIsMobileMenuOpen(false)}} className="block w-full text-left p-4 border border-slate-700 hover:border-skily-neon rounded-sm text-white">:: AI INSTRUCTOR</button>
             </div>
          </div>
        )}

        {/* Sidebar (Desktop) */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1 md:ml-72 pt-20 md:pt-0 h-screen overflow-y-auto bg-[#050B14]">
          <div className="max-w-full">
            {activeTab === 'dashboard' && (
              <Dashboard 
                stats={stats} 
                onStartQuiz={() => setActiveTab('quiz')} 
                onClaimReward={handleClaimReward}
              />
            )}
            
            {activeTab === 'quiz' && (
              <QuizView onComplete={handleQuizComplete} />
            )}

            {activeTab === 'tutor' && (
               <TutorView />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default App;