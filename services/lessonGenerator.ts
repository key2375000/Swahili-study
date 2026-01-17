
import { GoogleGenAI, Type } from "@google/genai";
import type { Lesson, UnitTest, MasterTest, LevelTest } from '../types';
import { VOCAB_CATEGORIES } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const quizQuestionSchema = {
    type: Type.OBJECT,
    properties: {
        question: { type: Type.STRING },
        options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        correctAnswer: { type: Type.STRING, enum: ['A', 'B', 'C', 'D'] },
        explanation: { type: Type.STRING },
    },
    required: ['question', 'options', 'correctAnswer', 'explanation'],
};

const lessonSchema = {
    type: Type.OBJECT,
    properties: {
        day: { type: Type.NUMBER },
        level: { type: Type.STRING, enum: ['Beginner', 'Daily Life', 'Comfort'] },
        theme: { type: Type.STRING },
        patternExposure: { type: Type.STRING },
        examples: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    swahili: { type: Type.STRING },
                    korean: { type: Type.STRING },
                    breakdown: { type: Type.STRING },
                },
                required: ['swahili', 'korean', 'breakdown'],
            },
        },
        imagePrompt: { type: Type.STRING },
        dailyAchievementTag: {
            type: Type.OBJECT,
            properties: {
                todayYouCanSay: { type: Type.STRING },
                todaysProgress: { type: Type.STRING },
                recommendedReviewDay: { type: Type.NUMBER, nullable: true },
            },
            required: ['todayYouCanSay', 'todaysProgress', 'recommendedReviewDay'],
        },
        newVocabulary: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    swahili: { type: Type.STRING },
                    korean: { type: Type.STRING },
                    exampleSentences: { type: Type.ARRAY, items: { type: Type.STRING } },
                    category: { type: Type.STRING, enum: VOCAB_CATEGORIES as unknown as string[] },
                },
                required: ['swahili', 'korean', 'exampleSentences', 'category'],
            },
        },
        quiz: {
            type: Type.ARRAY,
            items: quizQuestionSchema,
        },
    },
    required: ['day', 'level', 'theme', 'patternExposure', 'examples', 'imagePrompt', 'dailyAchievementTag', 'newVocabulary', 'quiz'],
};

const unitTestSchema = {
    type: Type.OBJECT,
    properties: {
        unitNumber: { type: Type.NUMBER },
        targetDays: { type: Type.ARRAY, items: { type: Type.NUMBER } },
        questions: {
            type: Type.ARRAY,
            items: quizQuestionSchema,
        },
    },
    required: ['unitNumber', 'targetDays', 'questions'],
};

const levelTestSchema = {
    type: Type.OBJECT,
    properties: {
        levelNumber: { type: Type.NUMBER },
        questions: {
            type: Type.ARRAY,
            items: quizQuestionSchema,
        },
    },
    required: ['levelNumber', 'questions'],
};

const masterTestSchema = {
    type: Type.OBJECT,
    properties: {
        questions: {
            type: Type.ARRAY,
            items: quizQuestionSchema,
        },
    },
    required: ['questions'],
};

export const generateNextLesson = async (lastLesson: Lesson): Promise<Lesson> => {
  const nextDay = lastLesson.day + 1;
  let level = 'Beginner';
  if (nextDay > 140) level = 'Comfort';
  else if (nextDay > 60) level = 'Daily Life';

  const prompt = `Generate JSON for Day ${nextDay} of Swahili learning. 
  Previous Day ${lastLesson.day} theme was: ${lastLesson.theme}.
  Identify 5 new words/phrases. Create 10 easy questions. Everything in Korean.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: lessonSchema,
    },
  });

  return JSON.parse(response.text.trim()) as Lesson;
};

export const generateUnitTest = async (unitNumber: number, history: Lesson[]): Promise<UnitTest> => {
    const vocabList = history.flatMap(l => l.newVocabulary.map(v => `${v.swahili} (${v.korean})`)).join(', ');
    const patterns = history.map(l => l.patternExposure).join(', ');
    const days = history.map(l => l.day).sort((a, b) => a - b);
    const dayRange = `${days[0]}~${days[days.length - 1]}`;

    const prompt = `
        Act as an expert Swahili teacher. Create a 20-question UNIT TEST for Unit ${unitNumber} (covering Days ${dayRange}).
        The test must cover the following words and patterns learned in this 10-day period:
        Words: ${vocabList}
        Patterns: ${patterns}

        REQUIREMENTS:
        1. Exactly 20 diverse questions.
        2. Types: Vocabulary matching, Grammar (tense/prefixes), Sentence completion.
        3. All questions, options, and explanations must be in Korean.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: unitTestSchema,
        },
    });

    return JSON.parse(response.text.trim()) as UnitTest;
};

export const generateLevelTest = async (levelNumber: number, history: Lesson[]): Promise<LevelTest> => {
    const vocabCount = history.flatMap(l => l.newVocabulary).length;
    const prompt = `
        Create a 40-question LEVEL GRADUATION TEST for Level ${levelNumber}.
        The level covers ${history.length} days of learning with approximately ${vocabCount} words.
        
        REQUIREMENTS:
        1. 40 balanced questions (Vocabulary, Grammar, Reading Comprehension).
        2. Questions must be challenging enough to certify the user has finished Level ${levelNumber}.
        3. All content in Korean.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: levelTestSchema,
        },
    });

    return JSON.parse(response.text.trim()) as LevelTest;
};

export const generateFullTest = async (allVocab: string[]): Promise<MasterTest> => {
    const prompt = `
        ACT AS THE ULTIMATE SWAHILI PROFESSOR.
        Create a MASTER FINAL TEST that covers ALL LEVELS of Swahili learning (Days 1 to 200).
        Curriculum Context: ${allVocab.slice(0, 100).join(', ')} ...
        
        REQUIREMENTS:
        1. Generate exactly 50 highly diverse and comprehensive questions.
        2. Types: 30% Grammar, 40% Vocabulary, 30% Context/Situation.
        3. Language: Questions, options, and explanations must be in Korean.
        4. Target: Test if the user is now a Master of Swahili.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: masterTestSchema,
        },
    });

    return JSON.parse(response.text.trim()) as MasterTest;
};
