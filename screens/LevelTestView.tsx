
import React, { useState } from 'react';
import type { LevelTest, QuizResult } from '../types';
import { Quiz } from '../components/Quiz';
import { TrophyIcon } from '../components/icons/TrophyIcon';
import { BackButton } from '../components/Navigation';
import { SparklesIcon } from '../components/icons/SparklesIcon';

interface LevelTestViewProps {
    levelTest: LevelTest;
    onComplete: (levelNumber: number, result: QuizResult) => void;
    onBack: () => void;
}

export const LevelTestView: React.FC<LevelTestViewProps> = ({ levelTest, onComplete, onBack }) => {
    const [isFinished, setIsFinished] = useState(false);
    const [result, setResult] = useState<QuizResult>({ correct: 0, incorrect: 0 });

    const handleQuizComplete = (res: QuizResult) => {
        setResult(res);
        setIsFinished(true);
    };

    const handleFinish = () => {
        onComplete(levelTest.levelNumber, result);
    };

    if (isFinished) {
        const total = result.correct + result.incorrect;
        const score = total > 0 ? Math.round((result.correct / total) * 100) : 0;
        const passed = score >= 80;

        return (
            <div className={`rounded-2xl shadow-2xl p-10 text-center animate-fade-in ${passed ? 'bg-emerald-900 text-white border-4 border-emerald-400' : 'bg-slate-900 text-white'}`}>
                {passed ? (
                    <SparklesIcon className="w-24 h-24 mx-auto mb-4 text-amber-400 animate-bounce" />
                ) : (
                    <TrophyIcon className="w-24 h-24 mx-auto mb-4 text-slate-500" />
                )}
                <h2 className="text-3xl font-black mb-2 tracking-tight">Level {levelTest.levelNumber} Final Grade</h2>
                <div className="text-7xl font-black my-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                    {score}%
                </div>
                
                <p className="text-lg mb-8 font-medium">
                    {passed 
                      ? "놀랍습니다! 레벨을 완벽하게 마스터하셨습니다. 이제 다음 단계로 갈 준비가 되었습니다." 
                      : "조금 아쉽습니다. 80점 이상을 받아야 레벨을 통과할 수 있습니다. 복습 후 다시 도전해 보세요!"}
                </p>

                <div className="flex justify-center gap-10 mb-10">
                    <div>
                        <p className="text-xs uppercase text-white/50 font-bold mb-1">Correct</p>
                        <p className="text-3xl font-black text-emerald-400">{result.correct}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase text-white/50 font-bold mb-1">Incorrect</p>
                        <p className="text-3xl font-black text-rose-400">{result.incorrect}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <button 
                        onClick={() => setIsFinished(false)}
                        className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold"
                    >
                        Retry This Level Test
                    </button>
                    <button 
                        onClick={handleFinish}
                        className={`w-full py-5 rounded-xl font-black shadow-lg transform active:scale-95 transition-all ${passed ? 'bg-amber-400 text-emerald-950' : 'bg-slate-700 text-white'}`}
                    >
                        {passed ? 'Complete & Graduate Level' : 'Go Back to Review'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center text-slate-900">
                <BackButton onClick={onBack} text="Cancel Test" />
                <div className="text-right">
                    <span className="block font-black text-indigo-600 text-sm">LEVEL {levelTest.levelNumber}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Graduation Exam</span>
                </div>
            </div>
            <div className="bg-slate-100 rounded-2xl p-2">
                <Quiz quiz={levelTest.questions} onQuizComplete={handleQuizComplete} />
            </div>
        </div>
    );
};
