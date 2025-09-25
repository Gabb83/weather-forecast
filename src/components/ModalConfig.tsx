"use client";

import { useState } from "react";
import ButtonModalConfig from "./ButtonModalConfig";

export default function ModalConfig() {
  
  const [openConfigTema, setOpenConfigTema] = useState<"escuro" | "claro">("escuro");
  const [openConfigIdioma, setOpenConfigIdioma] = useState<"inglês" | "português">("inglês");

  const temas = ["escuro", "claro"] as const;
  const idiomas = ["português", "inglês"] as const;

  return (
    <div className="bg-[#262540] w-[200px] flex flex-col border border-[#3C3B5E] rounded-md p-2 absolute top-12 left-[-85px] z-10">
      <div className="flex flex-col gap-2">
        <p className="text-[#ACACB7]">Temas</p>
        {temas.map((tema) => (
          <ButtonModalConfig
            key={tema}
            label={tema.charAt(0).toUpperCase() + tema.slice(1)} 
            isActive={tema === openConfigTema}
            onClick={() => setOpenConfigTema(tema)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-[#ACACB7]">Idioma</p>
        {idiomas.map((idioma) => (
          <ButtonModalConfig
            key={idioma}
            label={idioma.charAt(0).toUpperCase() + idioma.slice(1)} // Português / Inglês
            isActive={idioma === openConfigIdioma}
            onClick={() => setOpenConfigIdioma(idioma)}
          />
        ))}
      </div>
    </div>
  );
}