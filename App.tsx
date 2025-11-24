
import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { WelcomeOverlay } from './components/WelcomeOverlay';
import { TestsView } from './components/TestsView';
import { QuizView } from './components/QuizView';
import { LandingView } from './components/LandingView';
import { Sidebar } from './components/Sidebar';
import { TutorView } from './components/TutorView';
import { SettingsView } from './components/SettingsView';
import { UserStats, Topic, ViewState } from './types';

// Initial stats
const INITIAL_STATS: UserStats = {
  testsTaken: 12,
  averageScore: 68,
  topicMastery: {
    [Topic.GENERAL]: 75,
    [Topic.SENALES]: 80,
    [Topic.VELOCIDAD]: 45,
    [Topic.PRIORIDAD]: 60,
    [Topic.SEGURIDAD]: 90,
    [Topic.ALCOHOL_DROGAS]: 50,
    [Topic.DOCUMENTACION]: 30,
    [Topic.PRIMEROS_AUXILIOS]: 40,
    [Topic.MECANICA]: 20,
    [Topic.CONDUCCION_EFICIENTE]: 55
  },
  currentStreak: 3,
  maxStreak: 5,
  xp: 450,
  level: 4,
  lastRewardClaimed: '2023-01-01',
  currentSkin: 'cadet'
};

const App: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedQuizTopic, setSelectedQuizTopic] = useState<Topic | null>(null);

  // Prevent scrolling when welcome overlay is active
  useEffect(() => {
    if (showWelcome) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showWelcome]);

  const handleClaimReward = () => {
    const today = new Date().toISOString().split('T')[0];
    setStats(prev => ({
      ...prev,
      currentStreak: prev.currentStreak + 1,
      xp: prev.xp + 50,
      lastRewardClaimed: today
    }));
  };

  const handleSkinChange = (skinId: string) => {
    setStats(prev => ({
      ...prev,
      currentSkin: skinId
    }));
  };

  const navigateToTests = () => {
    setCurrentView('tests');
    window.scrollTo(0, 0);
  };

  const startTopicQuiz = (topic: Topic) => {
    setSelectedQuizTopic(topic);
    setCurrentView('quiz');
    window.scrollTo(0, 0);
  };

  const handleQuizComplete = (score: number) => {
    setStats(prev => ({
      ...prev,
      testsTaken: prev.testsTaken + 1,
      averageScore: Math.round((prev.averageScore + score) / 2),
      xp: prev.xp + (score > 50 ? 100 : 20)
    }));
    setCurrentView('dashboard');
    window.scrollTo(0, 0);
  };

  // Flow: Welcome -> Landing -> Dashboard
  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setCurrentView('landing');
  };

  const handleEnterApp = () => {
    setCurrentView('dashboard');
    window.scrollTo(0, 0);
  };

  const handleSidebarNav = (tab: string) => {
    if (tab === 'dashboard') setCurrentView('dashboard');
    else if (tab === 'tests') setCurrentView('tests');
    else if (tab === 'tutor') setCurrentView('tutor');
    else if (tab === 'settings') setCurrentView('settings');
    
    window.scrollTo(0, 0);
  };

  return (
    <>
      {showWelcome && (
        <WelcomeOverlay onComplete={handleWelcomeComplete} />
      )}
      
      <div className={`min-h-screen bg-[#0f172a] font-sans ${showWelcome ? 'blur-sm' : ''} transition-all duration-700`}>
        
        {/* Sidebar Navigation (Visible only after landing) */}
        {!showWelcome && currentView !== 'landing' && (
          <Sidebar activeTab={currentView} setActiveTab={handleSidebarNav} />
        )}

        <div className={`w-full transition-all duration-300 ${!showWelcome && currentView !== 'landing' ? 'md:pl-72' : ''}`}>
          
          {currentView === 'landing' && (
            <LandingView onEnterApp={handleEnterApp} />
          )}

          {currentView === 'dashboard' && (
            <div className="max-w-[1370px] mx-auto">
              <Dashboard 
                stats={stats} 
                onStartQuiz={navigateToTests} 
                onClaimReward={handleClaimReward}
                onSkinChange={handleSkinChange}
              />
            </div>
          )}

          {currentView === 'tests' && (
            <div className="max-w-[1370px] mx-auto">
              <TestsView 
                onBack={() => setCurrentView('dashboard')}
                onSelectTopic={startTopicQuiz}
                stats={stats}
              />
            </div>
          )}

          {currentView === 'quiz' && (
            <div className="max-w-[1370px] mx-auto">
              <QuizView 
                onComplete={handleQuizComplete}
                topic={selectedQuizTopic || Topic.GENERAL}
              />
            </div>
          )}

          {currentView === 'tutor' && (
             <TutorView />
          )}

          {currentView === 'settings' && (
             <SettingsView onBack={() => setCurrentView('dashboard')} />
          )}

        </div>
      </div>
    </>
  );
};

export default App;
