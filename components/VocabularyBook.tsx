
import React, { useState } from 'react';
import type { VocabEntry, VocabCategory } from '../types';
import { VOCAB_CATEGORIES } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { TagIcon } from './icons/TagIcon';

interface VocabularyBookProps {
  entries: VocabEntry[];
}

const VocabListItem: React.FC<{ entry: VocabEntry }> = ({ entry }) => {
  return (
    <li className="p-4 bg-slate-50 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-lg font-semibold text-slate-900">{entry.swahili}</p>
          <p className="text-md text-slate-600">{entry.korean}</p>
        </div>
      </div>
      {entry.exampleSentences && entry.exampleSentences.length > 0 && (
        <p className="text-sm text-slate-500 italic mt-2">
          e.g., "{entry.exampleSentences[0]}"
        </p>
      )}
    </li>
  );
};

export const VocabularyBook: React.FC<VocabularyBookProps> = ({ entries }) => {
  const [selectedCategory, setSelectedCategory] = useState<VocabCategory | null>(null);

  const groupedEntries = entries.reduce((acc, entry) => {
    (acc[entry.category] = acc[entry.category] || []).push(entry);
    return acc;
  }, {} as Record<VocabCategory, VocabEntry[]>);

  const sortedCategories = VOCAB_CATEGORIES.filter(category => groupedEntries[category]);

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center text-slate-500">
        <p>Your vocabulary book is empty.</p>
        <p>Start learning to collect new words!</p>
      </div>
    );
  }

  if (selectedCategory) {
    const words = groupedEntries[selectedCategory];
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600 font-semibold transition-colors mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>All Categories</span>
        </button>
        <h2 className="text-2xl font-bold text-indigo-600 border-b-2 border-indigo-200 pb-2 mb-4">
          {selectedCategory}
        </h2>
        <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {words.map((entry, index) => (
            <VocabListItem key={index} entry={entry} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Vocabulary Book</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sortedCategories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="p-4 bg-slate-50 rounded-lg text-left hover:bg-indigo-100 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <TagIcon className="w-6 h-6 text-indigo-500 mb-2" />
            <h3 className="font-semibold text-slate-800">{category}</h3>
            <p className="text-sm text-slate-500">{groupedEntries[category].length} words</p>
          </button>
        ))}
      </div>
    </div>
  );
};