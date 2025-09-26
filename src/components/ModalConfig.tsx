"use client";

import { useState } from "react";
import { translations } from "@/utils/translations";
import ButtonModalConfig from "./ButtonModalConfig";
import { useLanguage } from "@/context/LanguageContext";

export default function ModalConfig() {
  // pega o idioma do contexto global
  const { idioma, setIdioma } = useLanguage();

  const [temperatura, setTemperatura] = useState<"celsius" | "fahrenheit">("celsius");

  const temas = ["dark", "light"] as const;
  const opcoesIdiomas = ["português", "inglês"] as const; // usar nomes sem acento
  const temperaturas = ["celsius", "fahrenheit"] as const;

  return (
    <div className="bg-[#262540] w-[200px] h-[280px] flex flex-col border border-[#3C3B5E] rounded-md p-2 absolute top-12 left-[-85px] z-10 overflow-y-auto">
      {/* Idiomas */}
      <div className="flex flex-col gap-2">
        <p className="text-[#ACACB7]">{translations[idioma].language}</p>
        {opcoesIdiomas.map((lang) => (
          <ButtonModalConfig
            key={lang}
            label={lang === "português" ? "Português" : "Inglês"}  // usa tradução correta
            isActive={lang === idioma}
            onClick={() => setIdioma(lang)}
          />
        ))}
      </div>

      {/* Temperaturas */}
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-[#ACACB7]">{translations[idioma].temperature}</p>
        {temperaturas.map((temp) => (
          <ButtonModalConfig
            key={temp}
            label={translations[idioma][temp]} // ex: "Celsius" ou "Fahrenheit"
            isActive={temp === temperatura}
            onClick={() => setTemperatura(temp)}
          />
        ))}
      </div>
    </div>
  );
}
