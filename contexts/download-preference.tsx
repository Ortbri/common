'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type DownloadType = 'svg' | 'jpg' | 'dwg-ft' | 'dwg-m';

interface DownloadPreferenceContextType {
  preferredType: DownloadType;
  setPreferredType: (type: DownloadType) => void;
}

const DownloadPreferenceContext = createContext<DownloadPreferenceContextType | undefined>(
  undefined
);

export function DownloadPreferenceProvider({ children }: { children: React.ReactNode }) {
  const [preferredType, setPreferredType] = useState<DownloadType>('svg');
  // should we just turn this into

  // Load preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('downloadPreference') as DownloadType | null;
    if (saved) {
      setPreferredType(saved);
    }
  }, []);

  // Save preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('downloadPreference', preferredType);
  }, [preferredType]);

  return (
    <DownloadPreferenceContext.Provider value={{ preferredType, setPreferredType }}>
      {children}
    </DownloadPreferenceContext.Provider>
  );
}

export function useDownloadPreference() {
  const context = useContext(DownloadPreferenceContext);
  if (context === undefined) {
    throw new Error('useDownloadPreference must be used within a DownloadPreferenceProvider');
  }
  return context;
}
