"use client"

import { useState } from "react";
import CardHourlyForecast from "./CardHourlyForecast";
import getClimaIcon from "@/utils/getClimaIcon";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/utils/translations";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HourlyForecastProps {
  hourly: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
  };
}

export default function HourlyForecast({
  hourly 
} : HourlyForecastProps) {
  const { idioma } = useLanguage();
  // Verificação de segurança: se os dados não existirem, não renderize nada.
  if (!hourly || !hourly.weathercode || hourly.weathercode.length === 0) {
    return null; 
  }

  const [pagina, setPagina] = useState(0);
  const itensPorPagina = 6;

  const startIdx = pagina * itensPorPagina;
  const endIdx = startIdx + itensPorPagina;

  const totalPaginas = Math.ceil(hourly.time.length / itensPorPagina);

  return (
    <div className="block bg-[#262540] border-none rounded-md p-5 text-white">
      <div className="flex flex-row items-center justify-around gap-10">
        <p className="font-semibold">{translations[idioma].hourlyForecast}</p>
        <Select>
          <SelectTrigger className="w-[180px] bg-[#3C3B5E] text-white border-none rounded-md">
            <SelectValue placeholder={translations[idioma].monday} />
          </SelectTrigger>
          <SelectContent className="bg-[#3C3B5E] text-white border-none">
            <SelectGroup>
              <SelectLabel>{translations[idioma].days}</SelectLabel>
              <SelectItem value="monday">{translations[idioma].monday}</SelectItem>
              <SelectItem value="tuesday">{translations[idioma].tuesday}</SelectItem>
              <SelectItem value="wednesday">{translations[idioma].wednesday}</SelectItem>
              <SelectItem value="thursday">{translations[idioma].thursday}</SelectItem>
              <SelectItem value="friday">{translations[idioma].friday}</SelectItem>
              <SelectItem value="saturday">{translations[idioma].saturday}</SelectItem>
              <SelectItem value="sunday">{translations[idioma].sunday}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-3 my-5">
        {hourly.time.slice(startIdx, endIdx).map((time, idx) => (
          <CardHourlyForecast
            key={startIdx + idx}
            icon={getClimaIcon(hourly.weathercode[startIdx + idx])}
            hora={new Date(time).toLocaleTimeString("pt-BR", {
              hour: '2-digit', minute: '2-digit' 
            })}
            temperatura={hourly.temperature_2m[startIdx + idx] + "° C"}
          />
        ))}
      </div>
      <div className="flex flex-row items-center justify-around pt-3">
        <button
          disabled={pagina === 0}
          onClick={() => setPagina(pagina-1)}
          className="w-[120px] h-[35px] bg-[#4658D9] border-none rounded-md p-1 cursor-pointer hover:bg-[#4657d9ad] transition-all duration-300 ease-in-out"
        >
          {translations[idioma].previus}
        </button>
        <button
          disabled={pagina === totalPaginas-1}
          onClick={() => setPagina(pagina+1)}
          className="w-[120px] h-[35px] bg-[#4658D9] border-none rounded-md p-1 cursor-pointer hover:bg-[#4657d9ad] transition-all duration-300 ease-in-out"
        >
          {translations[idioma].next}
        </button>
      </div>
    </div>
  );
}