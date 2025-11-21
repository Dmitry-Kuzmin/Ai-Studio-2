
export enum Topic {
  GENERAL = 'General',
  SENALES = 'Señales',
  VELOCIDAD = 'Velocidad',
  PRIORIDAD = 'Prioridad',
  SEGURIDAD = 'Seguridad Vial',
  ALCOHOL_DROGAS = 'Alcohol y Drogas',
  DOCUMENTACION = 'Documentación',
  PRIMEROS_AUXILIOS = 'Primeros Auxilios',
  MECANICA = 'Mecánica',
  CONDUCCION_EFICIENTE = 'Conducción Eficiente'
}

export type ViewState = 'dashboard' | 'tests' | 'quiz';

export interface Question {
  id: number;
  topic: Topic;
  text: string;
  imageUrl?: string;
  options: string[];
  correctIndex: number;
  explanation?: string; 
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: (number | null)[]; 
  isFinished: boolean;
}

export interface UserStats {
  testsTaken: number;
  averageScore: number;
  topicMastery: {
    [key in Topic]?: number;
  };
  currentStreak: number;
  maxStreak: number;
  xp: number;
  level: number;
  lastRewardClaimed?: string;
  currentSkin: string;
}
