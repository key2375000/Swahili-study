
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MOTIVATIONAL_PHRASES } from '../data/motivationalPhrases';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { TrophyIcon } from '../components/icons/TrophyIcon';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';

interface HomeScreenProps {
  onSelectLevel: (level: number) => void;
  onSelectMasterTest: () => void;
}

const LevelButton: React.FC<{ level: number, title: string, days: string, onClick: () => void, isLocked?: boolean }> = ({ level, title, days, onClick, isLocked }) => (
    <button 
        onClick={onClick}
        disabled={isLocked}
        className={`w-full text-left p-6 rounded-2xl shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex justify-between items-center group ${isLocked ? 'bg-slate-100 opacity-60 cursor-not-allowed' : 'bg-white hover:shadow-xl hover:-translate-y-1'}`}
    >
        <div>
            <h2 className={`text-2xl font-black ${isLocked ? 'text-slate-400' : 'text-indigo-600'}`}>Level {level}</h2>
            <p className="text-slate-700 font-bold mt-1">{title}</p>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">Day {days}</p>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isLocked ? 'bg-slate-200 text-slate-400' : 'bg-indigo-50 text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white'}`}>
            {isLocked ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            )}
        </div>
    </button>
);

const getDailyIndex = (arrayLength: number) => {
    const date = new Date();
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear % arrayLength;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectLevel, onSelectMasterTest }) => {
  const { currentUser } = useAuth();
  const completedDays = currentUser?.completedDays || [];
  const currentDay = completedDays.length > 0 ? Math.max(...completedDays) + 1 : 1;
  const isMasterReady = completedDays.length >= 200 || completedDays.includes(200);

  const [phraseIndex, setPhraseIndex] = useState(getDailyIndex(MOTIVATIONAL_PHRASES.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % MOTIVATIONAL_PHRASES.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const dailyPhrase = MOTIVATIONAL_PHRASES[phraseIndex];

  return (
    <div className="space-y-6 pb-10">
      {/* Stats Dashboard */}
      <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Streak</p>
              <div className="flex items-center justify-center gap-1">
                  <span className="text-xl font-black text-orange-500">{currentUser?.streak || 0}</span>
                  <SparklesIcon className="w-4 h-4 text-orange-400" />
              </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">XP</p>
              <div className="flex items-center justify-center gap-1">
                  <span className="text-xl font-black text-indigo-600">{currentUser?.xp || 0}</span>
              </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Words</p>
              <div className="flex items-center justify-center gap-1">
                  <span className="text-xl font-black text-emerald-600">{currentUser?.vocabBook.length || 0}</span>
              </div>
          </div>
      </div>

      <div className="p-8 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>
        
        <div className="relative z-10">
            <p className="text-indigo-100 font-bold uppercase tracking-[0.2em] text-xs mb-2">Today's Mission</p>
            <h1 className="text-6xl font-black text-white mb-6">Day {currentDay}</h1>
            
            {dailyPhrase && (
                <div key={phraseIndex} className="animate-fade-in bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 inline-block max-w-xs mx-auto">
                    <p className="text-lg font-bold text-white leading-tight">"{dailyPhrase.swahili}"</p>
                    <p className="text-xs text-indigo-100 mt-1 font-medium">{dailyPhrase.korean}</p>
                </div>
            )}
        </div>
      </div>

      {isMasterReady && (
          <button 
            onClick={onSelectMasterTest}
            className="w-full relative overflow-hidden p-6 bg-slate-900 rounded-2xl shadow-2xl border-2 border-amber-500 group animate-float"
          >
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <TrophyIcon className="w-20 h-20 text-amber-300" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-black text-amber-400 tracking-tighter italic">MASTER CHALLENGE</h2>
                <p className="text-white font-bold text-sm">최종 200일 과정 완수! 마스터 인증에 도전하세요.</p>
              </div>
          </button>
      )}

      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Learning Path</h3>
        <LevelButton level={1} title="Beginner Foundations" days="1 - 60" onClick={() => onSelectLevel(1)} />
        <LevelButton level={2} title="Daily Life Fluency" days="61 - 140" onClick={() => onSelectLevel(2)} isLocked={currentDay < 61} />
        <LevelButton level={3} title="Comfort & Mastery" days="141 - 200" onClick={() => onSelectLevel(3)} isLocked={currentDay < 141} />
      </div>
    </div>
  );
};
