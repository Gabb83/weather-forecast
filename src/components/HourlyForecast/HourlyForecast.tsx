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

// Tipagem segura para os dias da semana
type DiasSemana = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export default function HourlyForecast({ hourly }: HourlyForecastProps) {
  const { idioma } = useLanguage();

  // Segurança: se não houver dados, não renderiza nada
  if (!hourly || !hourly.weathercode || hourly.weathercode.length === 0) return null;

  const [pagina, setPagina] = useState(0);
  const [diaSelecionado, setDiaSelecionado] = useState<DiasSemana>("monday"); // Estado do dia selecionado
  const itensPorPagina = 6;

  // Função para filtrar os dados por dia da semana
  const filtrarPorDia = (dia: DiasSemana) => {
    return hourly.time
      .map((time, idx) => ({
        time,
        temperature: hourly.temperature_2m[idx],
        weathercode: hourly.weathercode[idx]
      }))
      .filter(item => {
        const data = new Date(item.time);
        const dias = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        return dias[data.getDay()] === dia;
      });
  };

  const dadosDoDia = filtrarPorDia(diaSelecionado);
  const startIdx = pagina * itensPorPagina;
  const endIdx = startIdx + itensPorPagina;
  const totalPaginas = Math.ceil(dadosDoDia.length / itensPorPagina);

  return (
    <div className="block bg-[#262540] border-none rounded-md p-5 text-white">
      {/* Cabeçalho */}
      <div className="flex flex-row items-center justify-around gap-10">
        <p className="font-semibold">{translations[idioma].hourlyForecast}</p>
        <Select onValueChange={(value: DiasSemana) => { setDiaSelecionado(value); setPagina(0); }}>
          <SelectTrigger className="w-[180px] bg-[#3C3B5E] text-white border-none rounded-md">
            <SelectValue placeholder={translations[idioma][diaSelecionado]} />
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

      {/* Previsões do dia */}
      <div className="flex flex-col gap-3 my-5">
        {dadosDoDia.slice(startIdx, endIdx).map((item, idx) => (
          <CardHourlyForecast
            key={startIdx + idx}
            icon={getClimaIcon(item.weathercode)}
            hora={new Date(item.time).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
            temperatura={item.temperature + "° C"}
          />
        ))}
      </div>

      {/* Paginação */}
      <div className="flex flex-row items-center justify-around pt-3">
        <button
          disabled={pagina === 0}
          onClick={() => setPagina(pagina - 1)}
          className="w-[120px] h-[35px] bg-[#4658D9] border-none rounded-md p-1 cursor-pointer hover:bg-[#4657d9ad] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {translations[idioma].previus}
        </button>
        <button
          disabled={pagina === totalPaginas - 1 || totalPaginas === 0}
          onClick={() => setPagina(pagina + 1)}
          className="w-[120px] h-[35px] bg-[#4658D9] border-none rounded-md p-1 cursor-pointer hover:bg-[#4657d9ad] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {translations[idioma].next}
        </button>
      </div>
    </div>
  );
}
