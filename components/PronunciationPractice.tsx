
import React, { useState, useRef } from 'react';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { PlayIcon } from './icons/PlayIcon';
import { StopIcon } from './icons/StopIcon';

type RecordingStatus = 'idle' | 'recording' | 'recorded' | 'playing' | 'error';

export const PronunciationPractice: React.FC = () => {
    const [status, setStatus] = useState<RecordingStatus>('idle');
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleRecord = async () => {
        if (status === 'recording') {
            mediaRecorderRef.current?.stop();
            setStatus('recorded');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                stream.getTracks().forEach(track => track.stop()); // Stop microphone access
            };

            mediaRecorderRef.current.start();
            setStatus('recording');
        } catch (err) {
            console.error('Error accessing microphone:', err);
            setStatus('error');
        }
    };

    const handlePlay = () => {
        if (audioUrl && audioRef.current) {
            audioRef.current.play();
            setStatus('playing');
        }
    };
    
    const onAudioEnded = () => {
        setStatus('recorded');
    };

    const getButton = () => {
        switch (status) {
            case 'idle':
            case 'error':
                return (
                    <button onClick={handleRecord} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm">
                        <MicrophoneIcon className="w-5 h-5" /> Record
                    </button>
                );
            case 'recording':
                return (
                    <button onClick={handleRecord} className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold text-sm animate-pulse">
                        <StopIcon className="w-5 h-5" /> Stop
                    </button>
                );
            case 'recorded':
            case 'playing':
                 return (
                    <button onClick={handlePlay} disabled={status === 'playing'} className="flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold text-sm disabled:opacity-50">
                        <PlayIcon className="w-5 h-5" /> Play
                    </button>
                );
        }
    }

    return (
        <div className="mt-2 pl-12 flex items-center gap-4">
            {getButton()}
            {status === 'recorded' && (
                 <button onClick={handleRecord} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 font-semibold text-sm">
                    <MicrophoneIcon className="w-5 h-5" /> Re-record
                </button>
            )}
            {audioUrl && <audio ref={audioRef} src={audioUrl} onEnded={onAudioEnded} />}
            {status === 'error' && <p className="text-xs text-red-500">Mic access denied.</p>}
        </div>
    );
};
