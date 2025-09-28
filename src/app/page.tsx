"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Header from "@/components/Header";
import { getGeo } from "@/services/getGeo";
import { getWeather } from "@/services/getWeather";
import HourlyForecast from "@/components/HourlyForecast/HourlyForecast";
import DailyForecast from "@/components/DailyForecast/DailyForecast";
import InfoForecast from "@/components/InfosForecast/InfoForecast";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/utils/translations";

interface WeatherData {
  current: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation: number[];
    weathercode: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
  name: string;
  country: string;
}

export default function Home() {

  const [cidade, setCidade] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  const { idioma } = useLanguage();

  async function handleSearch() {
    try {
      setError("");
      setWeather(null);

      const { latitude, longitude, name, country } = await getGeo(cidade);
      const data = await getWeather(latitude, longitude);

      setWeather({ ...data, name, country });
    } catch (error) {
      setError("Cidade não encontrada");
    }
  }

  return (
    <div className={`bg-[#02012C] text-white p-5 sm:p-10 min-h-screen`}>
      <Header />
      <h1 className="text-center text-[30px] sm:text-[40px] font-bold py-10">
        {translations[idioma].welcome}
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
        <div className="relative w-full sm:w-[500px]">
          <input
            type="text"
            placeholder={translations[idioma].searchPlaceholder}
            className="w-full h-[40px] bg-[#262540] border-none rounded-md pl-10 text-white"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Image
            alt="icon search"
            src="/assets/icon-search.svg"
            width={20}
            height={20}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
        </div>
        <button
          className="w-full sm:w-[90px] h-[40px] bg-[#4658D9] font-medium border-none rounded-md cursor-pointer text-white"
          onClick={handleSearch}
        >
          {translations[idioma].search}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {weather && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 md:gap-5 my-10">
          {/* COLUNA PRINCIPAL */}
          <div className="col-span-1 lg:col-span-2">
            <InfoForecast weather={weather}/>
            <DailyForecast daily={weather.daily} />
            
            <div className="block lg:hidden mt-5">
              <HourlyForecast hourly={weather.hourly} />
            </div>
          </div>

          {/* SIDEBAR HOURLY FORECAST */}
          <div className="hidden lg:block">
            <HourlyForecast hourly={weather.hourly} />
          </div>
        </div>
      )}
    </div>
  );
}