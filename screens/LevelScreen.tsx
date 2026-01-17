
import React from 'react';
import { BackButton } from '../components/Navigation';
import { ProgressBar } from '../components/ProgressBar';
import { TrophyIcon } from '../components/icons/TrophyIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';

interface LevelScreenProps {
  level: number;
  completedDays: Set<number>;
  reviewDays: Set<number>;
  unitTestsCompleted: Set<number>;
  levelTestsCompleted: Set<number>;
  onSelectDay: (day: number) => void;
  onSelectUnitTest: (unit: number) => void;
  onSelectLevelTest: (level: number) => void;
  onBack: () => void;
}

const LEVEL_CONFIG = {
  1: { start: 1, end: 60, title: "Beginner" },
  2: { start: 61, end: 140, title: "Daily Life" },
  3: { start: 141, end: 200, title: "Comfort" },
};

export const LevelScreen: React.FC<LevelScreenProps> = ({ 
    level, completedDays, reviewDays, unitTestsCompleted, levelTestsCompleted, onSelectDay, onSelectUnitTest, onSelectLevelTest, onBack 
}) => {
  const config = LEVEL_CONFIG[level as keyof typeof LEVEL_CONFIG];
  if (!config) return <div>Invalid Level</div>;

  const daysInLevel = Array.from({ length: config.end - config.start + 1 }, (_, i) => config.start + i);
  const lastCompletedDay = completedDays.size === 0 ? 0 : Math.max(...completedDays);
  
  // 10일 단위로 유닛 그룹화 (UNIT_SIZE = 10)
  const units = [];
  const UNIT_SIZE = 10;
  for (let i = 0; i < daysInLevel.length; i += UNIT_SIZE) {
      units.push(daysInLevel.slice(i, i + UNIT_SIZE));
  }

  const getDayStatus = (day: number) => {
    if (reviewDays.has(day)) return 'review';
    if (completedDays.has(day)) return 'completed';
    if (day === lastCompletedDay + 1) return 'inProgress';
    return 'locked';
  };

  const completedCountInLevel = daysInLevel.filter(day => completedDays.has(day)).length;
  const isLevelCompleted = completedCountInLevel === daysInLevel.length;
  const hasPassedLevelTest = levelTestsCompleted.has(level);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
             <BackButton onClick={onBack} text={`전체 레벨`} />
             <div className="text-right">
                <h2 className="text-2xl font-bold text-indigo-600">{config.title}</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Day {config.start}-{config.end}</p>
             </div>
        </div>
        <ProgressBar current={completedCountInLevel} total={daysInLevel.length} />
      
        <div className="space-y-8 mt-8 pb-20 relative">
            {units.map((unitDays, unitIdx) => {
                // 유닛 번호는 전체 날짜 기준으로 10일마다 1씩 증가
                const unitNumber = Math.floor((unitDays[0] - 1) / UNIT_SIZE) + 1;
                const isUnitCompleted = unitDays.every(d => completedDays.has(d));
                const hasPassedUnitTest = unitTestsCompleted.has(unitNumber);

                return (
                    <div key={unitIdx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 shadow-sm">
                        <div className="flex justify-between items-end mb-4 px-1">
                            <div>
                                <h3 className="font-black text-slate-800 text-lg">Unit {unitNumber}</h3>
                                <p className="text-[10px] text-slate-400 font-bold">DAY {unitDays[0]} ~ {unitDays[unitDays.length - 1]}</p>
                            </div>
                            {hasPassedUnitTest && (
                                <div className="flex items-center gap-1 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                                    <TrophyIcon className="w-3 h-3 text-amber-600" />
                                    <span className="text-[10px] font-black text-amber-700">PASSED</span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {unitDays.map(day => {
                                const status = getDayStatus(day);
                                let styles = "w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all relative";
                                let isEnabled = false;

                                switch (status) {
                                    case 'review': styles += " bg-indigo-500 text-white shadow-md ring-2 ring-indigo-300"; isEnabled = true; break;
                                    case 'completed': styles += " bg-indigo-600/90 text-white shadow-sm"; isEnabled = true; break;
                                    case 'inProgress': styles += " bg-amber-400 text-white ring-2 ring-amber-500 animate-pulse"; isEnabled = true; break;
                                    case 'locked': styles += " bg-slate-200 text-slate-400 cursor-not-allowed"; break;
                                }

                                return (
                                    <button key={day} onClick={() => onSelectDay(day)} disabled={!isEnabled} className={styles}>
                                        {day}
                                        {status === 'review' && <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-blue-400 border-2 border-white"></span>}
                                    </button>
                                );
                            })}
                            
                            <button 
                                onClick={() => onSelectUnitTest(unitNumber)}
                                disabled={!isUnitCompleted}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all shadow-md transform active:scale-90 ${
                                    hasPassedUnitTest ? 'bg-green-500 text-white ring-2 ring-green-200' : 
                                    isUnitCompleted ? 'bg-indigo-700 text-white animate-bounce' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                                title={`Unit ${unitNumber} 종합 테스트 (Day ${unitDays[0]}-${unitDays[unitDays.length - 1]})`}
                            >
                                <TrophyIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Level Graduation Test Footer */}
        <div className="mt-10 pt-6 border-t-2 border-indigo-100">
            <button 
                onClick={() => onSelectLevelTest(level)}
                disabled={!isLevelCompleted}
                className={`w-full p-6 rounded-2xl flex items-center justify-between transition-all ${
                    hasPassedLevelTest 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' 
                      : isLevelCompleted 
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-xl animate-pulse scale-[1.02]' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
            >
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${hasPassedLevelTest ? 'bg-white/20' : 'bg-indigo-500/30'}`}>
                        <SparklesIcon className="w-8 h-8" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-xl font-black uppercase tracking-tight">Level {level} Graduation</h3>
                        <p className="text-sm opacity-90 font-medium">
                            {hasPassedLevelTest ? '축하합니다! 레벨을 완수했습니다.' : isLevelCompleted ? '레벨 최종 테스트가 해제되었습니다!' : '모든 Unit을 완료하면 열립니다.'}
                        </p>
                    </div>
                </div>
                <TrophyIcon className={`w-10 h-10 ${hasPassedLevelTest ? 'text-amber-300' : 'text-white/30'}`} />
            </button>
        </div>
    </div>
  );
};
