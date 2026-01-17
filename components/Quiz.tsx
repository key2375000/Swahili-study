
import React, { useState } from 'react';
import type { QuizQuestion, QuizResult } from '../types';

interface QuizProps {
  quiz: QuizQuestion[];
  onQuizComplete: (result: QuizResult) => void;
}

export const Quiz: React.FC<QuizProps> = ({ quiz, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<QuizResult>({ correct: 0, incorrect: 0 });

  const currentQuestion = quiz[currentQuestionIndex];

  const handleAnswer = (option: string) => {
    if (showFeedback) return;
    const answerKey = option.split(')')[0];
    const isAnswerCorrect = answerKey === currentQuestion.correctAnswer;
    
    setSelectedAnswer(answerKey);
    setShowFeedback(true);
    
    if (isAnswerCorrect) {
      setResults(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setResults(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onQuizComplete(results);
    }
  };

  const getButtonClass = (option: string) => {
    const optionKey = option.split(')')[0];
    if (!showFeedback) {
      return "bg-white hover:bg-indigo-100 text-slate-700 border-slate-300";
    }
    if (optionKey === currentQuestion.correctAnswer) {
      return "bg-green-500 text-white border-green-500";
    }
    if (optionKey === selectedAnswer) {
      return "bg-red-500 text-white border-red-500";
    }
    return "bg-white text-slate-700 border-slate-300 opacity-60";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h2 className="text-sm text-slate-500 uppercase font-semibold mb-1">
        Quiz: Question {currentQuestionIndex + 1} / {quiz.length}
      </h2>
      <p className="text-xl font-semibold text-slate-900 mb-6">{currentQuestion.question}</p>
      
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={showFeedback}
            className={`w-full text-left p-4 rounded-lg border-2 font-semibold transition-colors duration-200 ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
      
      {showFeedback && (
        <div className="mt-6 text-center">
            <p className={`font-bold text-lg ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Not quite!'}
            </p>
            {currentQuestion.explanation && (
                <p className="mt-2 text-sm text-slate-600 bg-slate-100 p-3 rounded-md text-left">
                    {currentQuestion.explanation}
                </p>
            )}
            <button
                onClick={handleNext}
                className="mt-4 bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700"
            >
                {currentQuestionIndex < quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
        </div>
      )}
    </div>
  );
};