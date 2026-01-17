
import { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { decode, decodeAudioData } from '../utils/audioUtils';

// Initialize API client and AudioContext once for performance.
const API_KEY = process.env.API_KEY;
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;
const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 }) : null;

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const speak = async (text: string) => {
    if (isSpeaking) {
      if (sourceRef.current) {
        sourceRef.current.stop();
      }
      setIsSpeaking(false); // This allows toggling off
      return;
    }

    if (!ai || !audioContext) {
      console.error("Audio generation is not available. API key or AudioContext is missing.");
      return;
    }

    setIsSpeaking(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (base64Audio && audioContext) {
        const audioBytes = decode(base64Audio);
        const audioBuffer = await decodeAudioData(audioBytes, audioContext, 24000, 1);
        
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();

        sourceRef.current = source;
        source.onended = () => {
          setIsSpeaking(false);
          sourceRef.current = null;
        };
      } else {
        throw new Error("No audio data received from API.");
      }
    } catch (error) {
      console.error("Error generating or playing audio:", error);
      setIsSpeaking(false);
    }
  };

  return { isSpeaking, speak };
};
