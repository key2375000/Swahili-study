
import React from 'react';
import type { QuizResult } from '../types';

interface AchievementCardProps {
  achievement: {
    todayYouCanSay: string;
    todaysProgress: string;
  };
  quizResult: QuizResult;
  onFinish: () => void;
  onRetry: () => void;
}

const ScoreRing: React.FC<{ score: number }> = ({ score }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                    className="text-slate-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <circle
                    className="text-indigo-600"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                    transform="rotate(-90 60 60)"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-indigo-600">
                {score}%
            </span>
        </div>
    );
};


export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, quizResult, onFinish, onRetry }) => {
  const totalQuestions = quizResult.correct + quizResult.incorrect;
  const score = totalQuestions > 0 ? Math.round((quizResult.correct / totalQuestions) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
      <h2 className="text-2xl font-bold text-slate-800">Quiz Complete!</h2>
      
      <div className="my-6 flex flex-col items-center">
          <ScoreRing score={score} />
          <div className="flex justify-center gap-6 mt-4 text-slate-600">
              <p><span className="font-bold text-green-500">{quizResult.correct}</span> Correct</p>
              <p><span className="font-bold text-red-500">{quizResult.incorrect}</span> Incorrect</p>
          </div>
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-lg text-left">
         <p className="text-slate-600 text-sm">Today's new achievement:</p>
         <p className="font-semibold text-indigo-900">{achievement.todaysProgress}</p>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button 
            onClick={onRetry}
            className="bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 transition-colors"
        >
            Retry Quiz
        </button>
        <button 
            onClick={onFinish}
            className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
            Continue
        </button>
      </div>
    </div>
  );
};