
import React, { useState } from 'react';
import type { MasterTest, QuizResult } from '../types';
import { Quiz } from '../components/Quiz';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { BackButton } from '../components/Navigation';

interface FullTestViewProps {
    masterTest: MasterTest;
    onComplete: (result: QuizResult) => void;
    onBack: () => void;
}

export const FullTestView: React.FC<FullTestViewProps> = ({ masterTest, onComplete, onBack }) => {
    const [isFinished, setIsFinished] = useState(false);
    const [result, setResult] = useState<QuizResult>({ correct: 0, incorrect: 0 });

    const handleQuizComplete = (res: QuizResult) => {
        setResult(res);
        setIsFinished(true);
    };

    if (isFinished) {
        const score = Math.round((result.correct / (result.correct + result.incorrect)) * 100);
        const isMaster = score >= 90;

        return (
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-2xl p-10 text-center animate-fade-in border-4 border-amber-500/30">
                <SparklesIcon className={`w-24 h-24 mx-auto mb-6 ${isMaster ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
                <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">
                    {isMaster ? 'Swahili Master' : 'Challenge Complete'}
                </h2>
                <div className="text-6xl font-black my-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">
                    {score}%
                </div>
                <p className="text-indigo-200 text-lg mb-8">
                    {isMaster 
                      ? "축하합니다! 당신은 진정한 스와힐리어 마스터입니다. 아프리카 어디를 가도 당당하게 말할 수 있습니다." 
                      : "훌륭한 도전이었습니다! 조금만 더 복습하면 완벽한 마스터가 될 수 있습니다."}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="bg-white/10 p-4 rounded-xl">
                        <p className="text-xs text-indigo-300 uppercase font-bold">Correct</p>
                        <p className="text-2xl font-black text-green-400">{result.correct}</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl">
                        <p className="text-xs text-indigo-300 uppercase font-bold">Incorrect</p>
                        <p className="text-2xl font-black text-red-400">{result.incorrect}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <button 
                        onClick={() => setIsFinished(false)}
                        className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold transition-all"
                    >
                        다시 도전하기
                    </button>
                    <button 
                        onClick={() => onComplete(result)}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 py-5 rounded-xl font-black text-slate-900 shadow-xl transform active:scale-95 transition-all"
                    >
                        마스터 인증서 받기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center text-slate-900">
                <BackButton onClick={onBack} text="중단하기" />
                <div className="flex flex-col items-end">
                    <span className="font-black text-indigo-700 tracking-widest text-xs">MASTER CHALLENGE</span>
                    <span className="text-xs text-slate-500">전체 과정 최종 평가</span>
                </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-1 overflow-hidden">
                 <Quiz quiz={masterTest.questions} onQuizComplete={handleQuizComplete} />
            </div>
        </div>
    );
};
