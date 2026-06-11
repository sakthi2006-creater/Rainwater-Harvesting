
'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import ta from '@/locales/ta.json';

type Language = 'en' | 'hi' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: { [key: string]: string }) => string;
}

const translations = { en, hi, ta };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('language') as Language;
      if (storedLanguage && ['en', 'hi', 'ta'].includes(storedLanguage)) {
        setLanguage(storedLanguage);
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string, replacements?: { [key: string]: string }) => {
    let translation = translations[language][key as keyof typeof en] || key;
    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            translation = translation.replace(`{{${rKey}}}`, replacements[rKey]);
        })
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
