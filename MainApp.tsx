
import React, { useState, useCallback } from 'react';
import type { Lesson, QuizResult, UnitTest, MasterTest, LevelTest } from './types';
import { generateNextLesson, generateUnitTest, generateFullTest, generateLevelTest } from './services/lessonGenerator';
import { VocabularyBook } from './components/VocabularyBook';
import { BookOpenIcon } from './components/icons/BookOpenIcon';
import { XMarkIcon } from './components/icons/XMarkIcon';
import { HomeScreen } from './screens/HomeScreen';
import { LevelScreen } from './screens/LevelScreen';
import { LessonView } from './screens/LessonView';
import { UnitTestView } from './screens/UnitTestView';
import { LevelTestView } from './screens/LevelTestView';
import { FullTestView } from './screens/FullTestView';
import { useAuth } from './contexts/AuthContext';

const INITIAL_LESSON: Lesson = {
    day: 1,
    level: "Beginner",
    theme: "Greetings & Basic Actions",
    patternExposure: "Ninapenda kahawa.",
    examples: [
      { swahili: "Ninakula.", korean: "나는 먹어요.", breakdown: "ni = I, na = now, kula = eat" },
      { swahili: "Ninapika.", korean: "나는 요리해요.", breakdown: "ni = I, na = now, pika = cook" },
      { swahili: "Ninalala.", korean: "나는 자요.", breakdown: "ni = I, na = now, lala = sleep" },
      { swahili: "Ninasoma.", korean: "나는 읽어요.", breakdown: "ni = I, na = now, soma = read/study" }
    ],
    imagePrompt: "A person eating a meal.",
    dailyAchievementTag: {
      todayYouCanSay: "Ninakula.",
      todaysProgress: "You learned to talk about what you are doing now.",
      recommendedReviewDay: null
    },
    newVocabulary: [
        { swahili: 'kula', korean: '먹다', exampleSentences: ['Ninakula.'], category: 'Common Actions (verbs)' },
        { swahili: 'pika', korean: '요리하다', exampleSentences: ['Ninapika.'], category: 'Common Actions (verbs)' },
        { swahili: 'lala', korean: '자다', exampleSentences: ['Ninalala.'], category: 'Common Actions (verbs)' },
        { swahili: 'soma', korean: '읽다', exampleSentences: ['Ninasoma.'], category: 'Common Actions (verbs)' },
        { swahili: 'maji', korean: '물', exampleSentences: ['Nipe maji.'], category: 'Food & Drink' },
    ],
    quiz: [
        { question: "'Ninakula'는 무엇일까요?", options: ["A) 요리해요", "B) 먹어요", "C) 자요"], correctAnswer: "B", explanation: "kula는 먹다입니다." },
    ]
};

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "준비 중입니다..." }) => (
  <div className="flex flex-col justify-center items-center p-12 space-y-4">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 shadow-xl"></div>
    <p className="text-indigo-600 font-bold animate-pulse text-center">{message}</p>
  </div>
);

type View = 'home' | 'level' | 'lesson' | 'vocab' | 'unit-test' | 'level-test' | 'master-test';

export default function MainApp() {
  const { currentUser, updateUserData } = useAuth();
  const [lessons, setLessons] = useState<Record<number, Lesson>>({ 1: INITIAL_LESSON });
  const [view, setView] = useState<View>('home');
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeUnitTest, setActiveUnitTest] = useState<UnitTest | null>(null);
  const [activeLevelTest, setActiveLevelTest] = useState<LevelTest | null>(null);
  const [activeMasterTest, setActiveMasterTest] = useState<MasterTest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDaySelection = useCallback(async (day: number) => {
    if (lessons[day]) {
      setActiveLesson(lessons[day]);
      setView('lesson');
      return;
    }
    setIsLoading(true);
    try {
      const lastGeneratedDay = Math.max(...Object.keys(lessons).map(Number));
      const lastLesson = lessons[lastGeneratedDay];
      const newLesson = await generateNextLesson(lastLesson);
      setLessons(prev => ({ ...prev, [day]: newLesson }));
      setActiveLesson(newLesson);
      setView('lesson');
    } catch (err) {
      setError("학습 내용을 생성하지 못했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  }, [lessons]);

  const handleSelectUnitTest = async (unit: number) => {
    setIsLoading(true);
    try {
        // 10일 주기로 히스토리 계산 (Unit 1: 1-10, Unit 2: 11-20...)
        const UNIT_SIZE = 10;
        const startDay = (unit - 1) * UNIT_SIZE + 1;
        const endDay = unit * UNIT_SIZE;
        const history = (Object.values(lessons) as Lesson[]).filter(l => l.day >= startDay && l.day <= endDay);
        const test = await generateUnitTest(unit, history);
        setActiveUnitTest(test);
        setView('unit-test');
    } catch (err) {
        setError("유닛 테스트를 생성하지 못했습니다.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleSelectLevelTest = async (levelNum: number) => {
      setIsLoading(true);
      try {
          const history = (Object.values(lessons) as Lesson[]).filter(l => {
              if (levelNum === 1) return l.day <= 60;
              if (levelNum === 2) return l.day > 60 && l.day <= 140;
              if (levelNum === 3) return l.day > 140;
              return false;
          });
          const test = await generateLevelTest(levelNum, history);
          setActiveLevelTest(test);
          setView('level-test');
      } catch (err) {
          setError("레벨 테스트를 생성하지 못했습니다.");
      } finally {
          setIsLoading(false);
      }
  };

  const handleSelectMasterTest = async () => {
    setIsLoading(true);
    try {
        const allVocab = (Object.values(lessons) as Lesson[]).flatMap(l => l.newVocabulary.map(v => v.swahili));
        const test = await generateFullTest(allVocab);
        setActiveMasterTest(test);
        setView('master-test');
    } catch (err) {
        setError("마스터 테스트를 생성하지 못했습니다.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleUnitTestComplete = (unitNum: number, result: QuizResult) => {
      if (!currentUser) return;
      const updatedData = {
          ...currentUser,
          unitTestResults: { ...currentUser.unitTestResults, [unitNum]: result }
      };
      updateUserData(updatedData);
      setView('level');
  };

  const handleLevelTestComplete = (levelNum: number, result: QuizResult) => {
      if (!currentUser) return;
      // 80점 이상일 때만 결과 저장 및 통과 처리 (UI에서 제어하지만 데이터도 업데이트)
      const updatedData = {
          ...currentUser,
          levelTestResults: { ...currentUser.levelTestResults, [levelNum]: result }
      };
      updateUserData(updatedData);
      setView('level');
  };

  const handleMasterTestComplete = (result: QuizResult) => {
    if (!currentUser) return;
    const updatedData = {
        ...currentUser,
        masterTestResult: { ...result, date: new Date().toISOString() }
    };
    updateUserData(updatedData);
    setView('home');
  };

  const renderContent = () => {
    if (isLoading) {
        let msg = "준비 중입니다...";
        if (view === 'master-test') msg = "마스터 테스트를 구성 중입니다...";
        if (view === 'level-test') msg = "레벨 졸업 테스트를 생성 중입니다...";
        if (view === 'unit-test') msg = "유닛 종합 테스트를 준비 중입니다...";
        return <LoadingSpinner message={msg} />;
    }
    if (!currentUser) return null;

    switch(view) {
      case 'level':
        return <LevelScreen 
                  level={activeLevel!} 
                  completedDays={new Set(currentUser.completedDays)}
                  reviewDays={new Set(currentUser.reviewDays)}
                  unitTestsCompleted={new Set(Object.keys(currentUser.unitTestResults || {}).map(Number))}
                  levelTestsCompleted={new Set(Object.keys(currentUser.levelTestResults || {}).map(Number))}
                  onSelectDay={handleDaySelection}
                  onSelectUnitTest={handleSelectUnitTest}
                  onSelectLevelTest={handleSelectLevelTest}
                  onBack={() => setView('home')}
                />;
      case 'lesson':
        return <LessonView lesson={activeLesson!} onComplete={(lesson, quizResult, learningTime) => {
            if (!currentUser) return;

            let reviewDays = [...currentUser.reviewDays];
            if (quizResult.incorrect > 0) {
                reviewDays = [...new Set([...reviewDays, lesson.day])];
            } else {
                reviewDays = reviewDays.filter(d => d !== lesson.day);
            }
            
            if (lesson.dailyAchievementTag.recommendedReviewDay) {
                reviewDays = [...new Set([...reviewDays, lesson.dailyAchievementTag.recommendedReviewDay])];
            }

            const updatedData = {
                ...currentUser,
                completedDays: [...new Set([...currentUser.completedDays, lesson.day])],
                vocabBook: [...currentUser.vocabBook, ...lesson.newVocabulary],
                quizResults: {
                    ...currentUser.quizResults,
                    [lesson.day]: quizResult
                },
                totalLearningTime: currentUser.totalLearningTime + learningTime,
                reviewDays: reviewDays,
            };
            updateUserData(updatedData);
            setView('level');
        }} onBack={() => setView('level')} />;
      case 'unit-test':
        return <UnitTestView unitTest={activeUnitTest!} onComplete={handleUnitTestComplete} onBack={() => setView('level')} />;
      case 'level-test':
        return <LevelTestView levelTest={activeLevelTest!} onComplete={handleLevelTestComplete} onBack={() => setView('level')} />;
      case 'master-test':
        return <FullTestView masterTest={activeMasterTest!} onComplete={handleMasterTestComplete} onBack={() => setView('home')} />;
      case 'vocab':
        return <VocabularyBook entries={currentUser.vocabBook} />;
      case 'home':
      default:
        return <HomeScreen onSelectLevel={(lv) => { setActiveLevel(lv); setView('level'); }} onSelectMasterTest={handleSelectMasterTest} />;
    }
  };

  return (
    <div className="min-h-screen">
      <header className="mb-4 relative h-12 flex items-center justify-center">
        <h1 className="text-3xl font-black text-center text-indigo-600 cursor-pointer tracking-tighter" onClick={() => setView('home')}>내공스</h1>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center gap-2">
          <button onClick={() => setView(view === 'vocab' ? 'home' : 'vocab')} className="p-2 bg-white rounded-full text-slate-600 shadow-sm border border-slate-100">{view === 'vocab' ? <XMarkIcon className="w-5 h-5" /> : <BookOpenIcon className="w-5 h-5 text-indigo-500" />}</button>
        </div>
      </header>
      {error && (
          <div className="flex items-center justify-between text-red-500 my-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
              <span className="text-sm font-bold">{error}</span>
              <button onClick={() => setError(null)}><XMarkIcon className="w-4 h-4" /></button>
          </div>
      )}
      <main className="relative">{renderContent()}</main>
    </div>
  );
}