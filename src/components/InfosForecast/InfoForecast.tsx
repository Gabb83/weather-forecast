import Image from "next/image";
import CardInfo from "./CardInfo";
import getClimaIcon from "@/utils/getClimaIcon";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/utils/translations";

interface InfoForecastProps {
  weather: {
    current: {
      temperature: number;
      windspeed: number;
      weathercode: number;
      time: string;
    };
    hourly:{
      relative_humidity_2m: number[];
      precipitation: number[];
    }
    name: string;
    country: string;
  };
}

export default function InfoForecast({
  weather
} : InfoForecastProps) {

  const { idioma } = useLanguage();
  const today = new Date();
  const formattedDate = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const infos = weather ? [
    { titulo: translations[idioma].temperature, dado: weather.current.temperature + "°C" },
    { titulo: translations[idioma].windspeed, dado: weather.current.windspeed + " km/h" },
    { titulo: translations[idioma].humidity, dado: weather.hourly.relative_humidity_2m[0] + "%" },
    { titulo: translations[idioma].precipitation, dado: weather.hourly.precipitation[0] + "mm" },
  ] : [];

  return (
    <div>
      <div className="relative rounded-md overflow-hidden">
        <Image
          src="/assets/bg-today-large.svg"
          alt="Weather Background"
          fill
          className="object-cover z-0"
        />
        <div className="relative z-10 w-full h-full flex flex-col sm:flex-row justify-center sm:justify-between items-center p-5 text-white gap-3">
          <div>
            <p className="text-center sm:text-start text-md sm:text-lg font-semibold">
              {weather.name}, {weather.country}
            </p>
            <p className="text-sm">{formattedDate}</p>
          </div>
          <div className="flex flex-row items-center gap-3">
            <Image
              alt="weather icon"
              src={getClimaIcon(weather.current.weathercode)}
              width={100}
              height={100}
            />
            <p className="text-[30px] sm:text-[40px]">{weather.current.temperature}</p>
          </div>
        </div>
      </div>
      {/* INFOS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-2 py-10 text-white">
        {infos.map((info, idx) => (
          <CardInfo key={idx} titulo={info.titulo} dado={info.dado} />
        ))}
      </div>
    </div>
  );
}