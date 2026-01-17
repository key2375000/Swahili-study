
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { UserData } from '../types';

interface AuthContextType {
  currentUser: UserData | null;
  updateUserData: (data: UserData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_DATA_KEY = 'naegongseuUserData';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    try {
      const storedData = localStorage.getItem(USER_DATA_KEY);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      localStorage.removeItem(USER_DATA_KEY);
      return null;
    }
  });

  useEffect(() => {
    if (!currentUser) {
      // Create a new user if none exists
      const today = new Date().toISOString().split('T')[0];
      const newUser: UserData = {
        username: 'Learner',
        completedDays: [],
        quizResults: {},
        unitTestResults: {},
        levelTestResults: {},
        vocabBook: [],
        totalLearningTime: 0,
        reviewDays: [],
        xp: 0,
        streak: 1,
        lastLoginDate: today,
      };
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser));
      setCurrentUser(newUser);
    } else {
      // Check and update streak for existing user
      const today = new Date().toISOString().split('T')[0];
      const lastLogin = currentUser.lastLoginDate;
      
      if (lastLogin !== today) {
        let newStreak = currentUser.streak || 0;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (lastLogin === yesterdayStr) {
          newStreak += 1; // Increment streak
        } else {
          newStreak = 1; // Reset streak
        }
        
        const updatedUser = { ...currentUser, lastLoginDate: today, streak: newStreak };
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
      }
    }
  }, []); // Run only once on initial mount

  const updateUserData = (data: UserData) => {
    // Ensure the username from the initial session is preserved.
    const finalData = { ...data, username: currentUser?.username || 'Learner' };
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(finalData));
    setCurrentUser(finalData);
  };

  const value = { currentUser, updateUserData };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};