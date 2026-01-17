
import React, { useState } from 'react';
import type { UnitTest, QuizResult } from '../types';
import { Quiz } from '../components/Quiz';
import { TrophyIcon } from '../components/icons/TrophyIcon';
import { BackButton } from '../components/Navigation';

interface UnitTestViewProps {
    unitTest: UnitTest;
    onComplete: (unitNumber: number, result: QuizResult) => void;
    onBack: () => void;
}

export const UnitTestView: React.FC<UnitTestViewProps> = ({ unitTest, onComplete, onBack }) => {
    const [isFinished, setIsFinished] = useState(false);
    const [result, setResult] = useState<QuizResult>({ correct: 0, incorrect: 0 });

    const handleQuizComplete = (res: QuizResult) => {
        setResult(res);
        setIsFinished(true);
    };

    const handleFinish = () => {
        onComplete(unitTest.unitNumber, result);
    };

    if (isFinished) {
        const score = Math.round((result.correct / (result.correct + result.incorrect)) * 100);
        return (
            <div className="bg-indigo-900 text-white rounded-xl shadow-2xl p-8 text-center animate-fade-in">
                <TrophyIcon className={`w-20 h-20 mx-auto mb-4 ${score >= 80 ? 'text-amber-400' : 'text-slate-400'}`} />
                <h2 className="text-3xl font-bold mb-2">Unit {unitTest.unitNumber} Test Result</h2>
                <p className="text-5xl font-black my-6">{score}%</p>
                <div className="flex justify-center gap-8 mb-8">
                    <p className="text-green-400"><span className="font-bold">{result.correct}</span> Correct</p>
                    <p className="text-red-400"><span className="font-bold">{result.incorrect}</span> Incorrect</p>
                </div>
                <div className="space-y-4">
                    <button 
                        onClick={() => setIsFinished(false)}
                        className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-lg font-bold"
                    >
                        Retry Test
                    </button>
                    <button 
                        onClick={handleFinish}
                        className="w-full bg-amber-500 hover:bg-amber-600 py-4 rounded-lg font-black text-indigo-950 shadow-lg"
                    >
                        Finish & Continue
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center text-indigo-900">
                <BackButton onClick={onBack} text="Exit Test" />
                <span className="font-black">UNIT {unitTest.unitNumber} FINAL TEST</span>
            </div>
            <Quiz quiz={unitTest.questions} onQuizComplete={handleQuizComplete} />
        </div>
    );
};
