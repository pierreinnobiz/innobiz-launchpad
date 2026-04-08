import type { ReactNode } from 'react';

/** Trilingual helper – returns content for the active language */
export function t3(language: string, fr: string, en: string, es: string): string;
export function t3(language: string, fr: ReactNode, en: ReactNode, es: ReactNode): ReactNode;
export function t3(language: string, fr: any, en: any, es: any): any {
  if (language === 'es') return es;
  if (language === 'en') return en;
  return fr;
}
