'use client';

import { useEffect } from 'react';
import { setupMocks } from '@/mocks';

export function MocksProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupMocks();
  }, []);

  return <>{children}</>;
}