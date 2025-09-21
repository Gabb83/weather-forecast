"use client"

import { useState } from "react";
import CardHourlyForecast from "./CardHourlyForecast";

interface HourlyForecastProps {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

export default function HourlyForecast({
  hourly 
} : HourlyForecastProps) {

  const [pagina, setPagina] = useState(0);
  const itensPorPagina = 6;

  const startIdx = pagina * itensPorPagina;
  const endIdx = startIdx + itensPorPagina;

  const totalPaginas = Math.ceil(hourly.time.length / itensPorPagina);

  return (
    <div className="block bg-[#262540] border-none rounded-md p-5 text-white">
      <div className="flex flex-row items-center justify-around gap-10">
        <p className="font-semibold">Hourly Forecast</p>
        <select
          name=""
          id=""
          className="bg-[#3C3B5E] border-none rounded-md p-2"
        >
          <option value="">Segunda-feira</option>
          <option value="">Terça-feira</option>
        </select>
      </div>
      <div className="flex flex-col gap-3 my-5">
        {hourly.time.slice(startIdx, endIdx).map((time, idx) => (
          <CardHourlyForecast
            key={startIdx + idx}
            icon="/assets/icon-sunny.webp"
            hora={new Date(time).toLocaleTimeString("pt-BR", {
              hour: '2-digit', minute: '2-digit' 
            },)}
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
          Anterior
        </button>
        <button
          disabled={pagina === totalPaginas-1}
          onClick={() => setPagina(pagina+1)}
          className="w-[120px] h-[35px] bg-[#4658D9] border-none rounded-md p-1 cursor-pointer hover:bg-[#4657d9ad] transition-all duration-300 ease-in-out"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}