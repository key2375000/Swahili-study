
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainApp from './MainApp';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return <MainApp />;
};

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col items-center p-4 font-sans text-slate-800">
        <div className="w-full max-w-2xl mx-auto">
          <AppContent />
        </div>
      </div>
    </AuthProvider>
  );
}