
import React from 'react';
import { BackButton } from '../components/Navigation';
import { VocabularySearch } from '../components/VocabularySearch';

interface DictionaryScreenProps {
    onBack: () => void;
}

export const DictionaryScreen: React.FC<DictionaryScreenProps> = ({ onBack }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <BackButton onClick={onBack} text="Home" />
                <h2 className="text-2xl font-bold text-indigo-600">Online Dictionary</h2>
            </div>
            <VocabularySearch />
        </div>
    );
};
