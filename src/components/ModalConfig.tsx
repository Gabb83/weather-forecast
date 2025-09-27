import { translations } from "@/utils/translations";
import ButtonModalConfig from "./ButtonModalConfig";
import { useLanguage } from "@/context/LanguageContext";

export default function ModalConfig() {
  // pega o idioma do contexto global
  const { idioma, setIdioma } = useLanguage();
  const opcoesIdiomas = ["português", "inglês"] as const;

  return (
    <div className="bg-[#262540] w-[200px] h-[140px] flex flex-col border border-[#3C3B5E] rounded-md p-2 absolute top-12 right-0 z-10 overflow-y-auto">
      {/* Idiomas */}
      <div className="flex flex-col gap-2">
        <p className="text-[#ACACB7]">{translations[idioma].language}</p>
        {opcoesIdiomas.map((lang) => (
          <ButtonModalConfig
            key={lang}
            label={lang === "português" ? "Português" : "Inglês"}
            isActive={lang === idioma}
            onClick={() => setIdioma(lang)}
          />
        ))}
      </div>
    </div>
  );
}
