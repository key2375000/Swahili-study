
import React from 'react';
import type { Lesson } from '../types';
import { PronunciationPractice } from './PronunciationPractice';

const ExampleSentence: React.FC<{ example: Lesson['examples'][0] }> = ({ example }) => {
  return (
    <li className="p-4 bg-slate-50 rounded-lg">
      <div className="flex items-start">
        <div>
          <p className="text-xl font-semibold text-slate-900">{example.swahili}</p>
          <p className="text-lg text-slate-600">{example.korean}</p>
          <p className="text-md text-indigo-800 bg-indigo-100 rounded px-2 py-1 mt-2 inline-block font-mono">
            {example.breakdown}
          </p>
        </div>
      </div>
      <PronunciationPractice />
    </li>
  );
};


export const LessonCard: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-8">
      <div className="mb-6">
        <p className="text-sm text-slate-500 uppercase font-semibold">Pattern Exposure</p>
        <p className="text-2xl italic text-slate-700 text-center py-4 px-2 bg-slate-100 rounded-lg">
          "{lesson.patternExposure}"
        </p>
      </div>
      
      <div>
        <p className="text-sm text-slate-500 uppercase font-semibold mb-2">Examples & Pronunciation</p>
        <ul className="space-y-4">
          {lesson.examples.map((ex, index) => (
            <ExampleSentence key={index} example={ex} />
          ))}
        </ul>
      </div>

      <div className="mt-8 border-t pt-4">
         <p className="text-sm text-slate-500 uppercase font-semibold mb-2">Visual Cue</p>
         <div className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
            <div className="w-16 h-16 bg-indigo-200 rounded-lg flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2> 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
            </div>
            <p className="text-slate-600 italic">{lesson.imagePrompt}</p>
         </div>
      </div>
    </div>
  );
};