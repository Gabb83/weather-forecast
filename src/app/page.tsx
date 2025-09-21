"use client";

import { useState } from "react";
import Image from "next/image";

import Header from "@/components/Header";
import { getGeo } from "@/services/getGeo";
import { getWeather } from "@/services/getWeather";
import HourlyForecast from "@/components/HourlyForecast/HourlyForecast";
import DailyForecast from "@/components/DailyForecast/DailyForecast";
import InfoForecast from "@/components/InfosForecast/InfoForecast";

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
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  name: string;
  country: string;
}

export default function Home() {
  const [cidade, setCidade] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  async function handleSearch() {
    try {
      setError("");
      setWeather(null);

      const { latitude, longitude, name, country } = await getGeo(cidade);
      const data = await getWeather(latitude, longitude);

      setWeather({ ...data, name, country });
    } catch (erro: any) {
      setError("Cidade não encontrada");
    }
  }

  return (
    <div className="bg-[#02012C] p-10 min-h-screen">
      <Header />
      <h1 className="text-center text-[40px] font-bold py-10 text-white">
        How's the sky looking today?
      </h1>

      <div className="flex flex-row items-center justify-center gap-5">
        <div className="relative w-[500px]">
          <input
            type="text"
            placeholder="Search for a place..."
            className="w-full h-[40px] bg-[#262540] border-none rounded-md pl-10 text-white"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
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
          className="w-[90px] h-[40px] bg-[#4658D9] font-medium border-none rounded-md cursor-pointer text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {weather && (
        <div className="grid grid-cols-3 gap-5 my-10">
          {/* COLUNA PRINCIPAL */}
          <div className="col-span-2">
            <InfoForecast weather={weather}/>
            <DailyForecast daily={weather.daily} />
          </div>

          {/* SIDEBAR HOURLY FORECAST */}
          <HourlyForecast hourly={weather.hourly} />
        </div>
      )}
    </div>
  );
}