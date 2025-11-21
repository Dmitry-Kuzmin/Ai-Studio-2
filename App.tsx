
import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { WelcomeOverlay } from './components/WelcomeOverlay';
import { TestsView } from './components/TestsView';
import { QuizView } from './components/QuizView';
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
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
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

  return (
    <>
      {showWelcome && (
        <WelcomeOverlay onComplete={() => setShowWelcome(false)} />
      )}
      
      <div className={`min-h-screen bg-[#F8FAFC] flex justify-center font-sans ${showWelcome ? 'blur-sm' : ''} transition-all duration-700`}>
        <div className="w-full max-w-[1370px]">
          
          {currentView === 'dashboard' && (
            <Dashboard 
              stats={stats} 
              onStartQuiz={navigateToTests} 
              onClaimReward={handleClaimReward}
              onSkinChange={handleSkinChange}
            />
          )}

          {currentView === 'tests' && (
            <TestsView 
              onBack={() => setCurrentView('dashboard')}
              onSelectTopic={startTopicQuiz}
              stats={stats}
            />
          )}

          {currentView === 'quiz' && (
            <QuizView 
              onComplete={handleQuizComplete}
              topic={selectedQuizTopic || Topic.GENERAL}
            />
          )}

        </div>
      </div>
    </>
  );
};

export default App;
