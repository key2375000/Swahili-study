
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { VocabEntry } from '../types';
import { VOCAB_CATEGORIES } from '../types';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { SpeakerWaveIcon } from './icons/SpeakerWaveIcon';
import { SearchIcon } from './icons/SearchIcon';

const API_KEY = process.env.API_KEY;
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const vocabEntrySchema = {
    type: Type.OBJECT,
    properties: {
        swahili: { type: Type.STRING },
        korean: { type: Type.STRING },
        exampleSentences: { type: Type.ARRAY, items: { type: Type.STRING } },
        category: { type: Type.STRING, enum: VOCAB_CATEGORIES as unknown as string[] },
        grammar: { type: Type.STRING, description: "Beginner-friendly grammar info in Korean (e.g., '명사 (KI-VI class). 복수형: vitabu.')" },
    },
    required: ['swahili', 'korean', 'exampleSentences', 'category', 'grammar'],
};

const dictionarySchema = {
    type: Type.ARRAY,
    items: vocabEntrySchema,
};

const SearchResultItem: React.FC<{ entry: VocabEntry }> = ({ entry }) => {
    const { isSpeaking, speak } = useTextToSpeech();

    return (
        <li className="p-4 bg-slate-50 rounded-lg space-y-3">
            <div className="flex justify-between items-start gap-4">
                <div className="flex-grow">
                    <p className="text-xl font-bold text-slate-900">{entry.swahili}</p>
                    <p className="text-lg text-slate-600">{entry.korean}</p>
                </div>
                <button
                    onClick={() => speak(entry.swahili)}
                    disabled={isSpeaking || !API_KEY}
                    className="text-indigo-500 hover:text-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed p-1 flex-shrink-0"
                    aria-label={`Listen to ${entry.swahili}`}
                >
                    {isSpeaking ? (
                        <div className="w-6 h-6 flex items-center justify-center" aria-label="playing audio">
                            <div className="w-1.5 h-3 bg-indigo-500 rounded-full animate-pulse mx-0.5"></div>
                            <div className="w-1.5 h-3 bg-indigo-500 rounded-full animate-pulse animation-delay-200 mx-0.5"></div>
                            <div className="w-1.5 h-3 bg-indigo-500 rounded-full animate-pulse animation-delay-400 mx-0.5"></div>
                        </div>
                    ) : (
                        <SpeakerWaveIcon className="w-6 h-6" />
                    )}
                </button>
            </div>
            
            {entry.grammar && (
                <div className="border-t border-slate-200 pt-3">
                    <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Grammar</h4>
                    <p className="text-sm text-slate-700 mt-1">{entry.grammar}</p>
                </div>
            )}

            {entry.exampleSentences && entry.exampleSentences.length > 0 && (
                <div className="border-t border-slate-200 pt-3">
                    <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Examples</h4>
                    <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1 pl-1">
                        {entry.exampleSentences.map((sentence, i) => (
                            <li key={i} className="italic">{sentence}</li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
};

export const VocabularySearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<VocabEntry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchResults = useCallback(async (searchTerm: string) => {
        if (!ai) {
            setError("API client is not initialized.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setResults([]);

        const prompt = `Act as a Swahili-Korean dictionary. Provide detailed entries for the Swahili word "${searchTerm}". If it's a verb stem, show its infinitive. If it's an adjective stem, give examples. Return up to 3 relevant entries. If no word matches, return an empty array. The response must be a JSON array conforming to the provided schema.`;

        try {
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: dictionarySchema,
                },
            });

            if (response.text) {
                const parsedResults = JSON.parse(response.text.trim());
                setResults(parsedResults);
            } else {
                setResults([]);
            }
        } catch (err) {
            console.error("Error fetching dictionary data:", err);
            setError("Failed to fetch results. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            setError(null);
            return;
        }

        const handler = setTimeout(() => {
            fetchResults(query.trim());
        }, 500); // Debounce API calls by 500ms

        return () => {
            clearTimeout(handler);
        };
    }, [query, fetchResults]);

    return (
        <div>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search any Swahili word..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    aria-label="Search Vocabulary"
                    disabled={!API_KEY}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-slate-400" />
                </div>
            </div>
            
            {!API_KEY && <p className="text-center text-red-500 py-2 text-sm">Dictionary feature is unavailable: API Key is missing.</p>}

            <div className="mt-4">
                {isLoading && (
                    <div className="flex justify-center items-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                )}
                {error && <p className="text-center text-red-500 py-4">{error}</p>}
                {!isLoading && !error && query && results.length > 0 && (
                    <ul className="space-y-3 max-h-72 overflow-y-auto pr-2">
                        {results.map((entry, index) => (
                            <SearchResultItem key={index} entry={entry} />
                        ))}
                    </ul>
                )}
                {!isLoading && !error && query && results.length === 0 && (
                    <p className="text-center text-slate-500 py-4">No matching words found.</p>
                )}
            </div>
        </div>
    );
};