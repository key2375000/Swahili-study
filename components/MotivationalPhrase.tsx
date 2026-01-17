
import React, { useState } from 'react';
import { MOTIVATIONAL_PHRASES } from '../data/motivationalPhrases';
import { ArrowRightIcon } from './icons/ArrowRightIcon'; 

const getDailyIndex = (arrayLength: number) => {
    const date = new Date();
    // Use the day of the year to get a daily rotating index.
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear % arrayLength;
};

export const MotivationalPhrase: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(getDailyIndex(MOTIVATIONAL_PHRASES.length));

    const showNextPhrase = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % MOTIVATIONAL_PHRASES.length);
    };

    const phrase = MOTIVATIONAL_PHRASES[currentIndex];

    if (!phrase) return null;

    return (
        <div className="p-4 bg-white rounded-xl shadow-lg relative">
            <p className="text-sm font-semibold text-indigo-600 mb-1">오늘의 스와힐리어 한마디</p>
            <blockquote className="space-y-1">
              <p className="text-lg font-semibold text-slate-800">"{phrase.swahili}"</p>
              <p className="text-md text-slate-600">"{phrase.korean}"</p>
            </blockquote>
            <button
                onClick={showNextPhrase}
                className="absolute top-1/2 -right-3 -translate-y-1/2 p-2 bg-white rounded-full text-slate-500 hover:text-indigo-600 hover:bg-slate-100 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Next phrase"
            >
                <ArrowRightIcon className="w-5 h-5" />
            </button>
        </div>
    );
};
