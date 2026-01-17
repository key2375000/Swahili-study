
export const VOCAB_CATEGORIES = [
  'Food & Drink',
  'Movement & Transportation',
  'Health & Hospital',
  'Market & Money',
  'Home & Daily Life',
  'Emotions & Feelings',
  'People & Relationships',
  'Time & Plans',
  'Church & Community',
  'Common Actions (verbs)',
  'Adjectives & Descriptions',
  'Numbers & Time',
  'Nature & Animals',
] as const;

export type VocabCategory = typeof VOCAB_CATEGORIES[number];

export interface Example {
  swahili: string;
  korean: string;
  breakdown: string;
}

export interface VocabEntry {
    swahili: string;
    korean: string;
    exampleSentences: string[];
    category: VocabCategory;
    grammar?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
}

export interface Lesson {
  day: number;
  level: 'Beginner' | 'Daily Life' | 'Comfort';
  theme: string;
  patternExposure: string;
  examples: Example[];
  imagePrompt: string;
  dailyAchievementTag: {
    todayYouCanSay: string;
    todaysProgress: string;
    recommendedReviewDay: number | null;
  };
  newVocabulary: VocabEntry[];
  quiz: QuizQuestion[];
}

export interface UnitTest {
    unitNumber: number;
    targetDays: number[];
    questions: QuizQuestion[];
}

export interface LevelTest {
    levelNumber: number;
    questions: QuizQuestion[];
}

export interface MasterTest {
    questions: QuizQuestion[];
}

export interface QuizResult {
  correct: number;
  incorrect: number;
}

export interface UserData {
  username: string;
  completedDays: number[];
  quizResults: Record<number, QuizResult>;
  unitTestResults: Record<number, QuizResult>;
  levelTestResults: Record<number, QuizResult>;
  masterTestResult?: QuizResult & { date: string };
  vocabBook: VocabEntry[];
  totalLearningTime: number; // in seconds
  reviewDays: number[];
  xp: number;
  streak: number;
  lastLoginDate?: string;
}