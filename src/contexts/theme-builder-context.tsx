
'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

const CUSTOM_THEME_STORAGE_KEY = 'custom-image-theme';

interface ThemeBuilderContextType {
  customThemeCss: string | null;
  setCustomThemeCss: (css: string) => void;
}

const ThemeBuilderContext = createContext<ThemeBuilderContextType | undefined>(undefined);

export const ThemeBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [customThemeCss, setCustomThemeCssState] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
    if (storedTheme) {
      setCustomThemeCssState(storedTheme);
    }
  }, []);

  const setCustomThemeCss = (css: string) => {
    localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, css);
    setCustomThemeCssState(css);
  };

  return (
    <ThemeBuilderContext.Provider value={{ customThemeCss, setCustomThemeCss }}>
      {children}
    </ThemeBuilderContext.Provider>
  );
};

export const useThemeBuilder = () => {
  const context = useContext(ThemeBuilderContext);
  if (context === undefined) {
    throw new Error('useThemeBuilder must be used within a ThemeBuilderProvider');
  }
  return context;
};
