"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "inglês" | "português";

interface LanguageContextType {
  idioma: Language;
  setIdioma: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children 
}: { children: ReactNode }) {
  const [idioma, setIdioma] = useState<Language>("inglês");

  return (
    <LanguageContext.Provider value={{ idioma, setIdioma }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage deve ser usado dentro de LanguageProvider");
  }
  return context;
}
