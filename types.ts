export enum Topic {
  GENERAL = 'General',
  SENALES = 'Señales',
  VELOCIDAD = 'Velocidad',
  PRIORIDAD = 'Prioridad',
  SEGURIDAD = 'Seguridad Vial',
  ALCOHOL_DROGAS = 'Alcohol y Drogas'
}

export interface Question {
  id: number;
  topic: Topic;
  text: string;
  imageUrl?: string;
  options: string[];
  correctIndex: number;
  explanation?: string; // Pre-defined explanation
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: (number | null)[]; // Index of selected answer per question
  isFinished: boolean;
}

export interface UserStats {
  testsTaken: number;
  averageScore: number;
  topicMastery: {
    [key in Topic]: number; // 0-100 percentage
  };
  // New gamification stats
  currentStreak: number;
  maxStreak: number;
  xp: number;
  level: number;
  lastRewardClaimed?: string; // ISO Date string
}