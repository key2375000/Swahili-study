
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface BackButtonProps {
  onClick: () => void;
  text?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, text = "Back" }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg p-2"
    >
      <ArrowLeftIcon className="w-5 h-5" />
      <span>{text}</span>
    </button>
  );
};
