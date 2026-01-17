
import React, { useState, useEffect, useRef } from 'react';
import type { Lesson, QuizResult } from '../types';
import { LessonCard } from '../components/LessonCard';
import { Quiz } from '../components/Quiz';
import { AchievementCard } from '../components/AchievementCard';
import { BackButton } from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: (lesson: Lesson, quizResult: QuizResult, learningTime: number) => void;
  onBack: () => void;
}

type ViewState = 'lesson' | 'quiz' | 'achievement';

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onComplete, onBack }) => {
  const { currentUser, updateUserData } = useAuth();
  const [viewState, setViewState] = useState<ViewState>('lesson');
  const [quizResult, setQuizResult] = useState<QuizResult>({ correct: 0, incorrect: 0 });
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    setViewState('lesson'); // Reset view when lesson changes
  }, [lesson.day]); 

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    // Grant XP based on performance
    if (currentUser) {
        const xpGained = (result.correct * 10) + 50; // 50 for completion + 10 per correct answer
        updateUserData({ ...currentUser, xp: (currentUser.xp || 0) + xpGained });
    }
    setViewState('achievement');
  };

  const handleFinish = () => {
    const endTime = Date.now();
    const learningTimeInSeconds = Math.round((endTime - startTimeRef.current) / 1000);
    onComplete(lesson, quizResult, learningTimeInSeconds);
  };
  
  const handleRetry = () => {
    setQuizResult({ correct: 0, incorrect: 0 });
    setViewState('quiz');
  };

  const renderContent = () => {
    switch (viewState) {
      case 'lesson':
        return (
          <>
            <LessonCard lesson={lesson} />
            <div className="mt-8 text-center pb-10">
              <button 
                onClick={() => setViewState('quiz')}
                className="w-full sm:w-auto bg-indigo-600 text-white font-black py-5 px-12 rounded-2xl shadow-xl hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95"
              >
                START DAILY QUIZ
              </button>
            </div>
          </>
        );
      case 'quiz':
        return <Quiz quiz={lesson.quiz} onQuizComplete={handleQuizComplete} />;
      case 'achievement':
        return (
            <AchievementCard 
                achievement={lesson.dailyAchievementTag} 
                quizResult={quizResult}
                onFinish={handleFinish} 
                onRetry={handleRetry}
            />
        );
      default:
        return null;
    }
  }

  return (
    <div className="animate-fade-in">
        <div className="mb-6">
            <BackButton onClick={onBack} text="Exit Lesson"/>
        </div>
        {renderContent()}
    </div>
  );
};
