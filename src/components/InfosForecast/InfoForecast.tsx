import Image from "next/image";
import CardInfo from "./CardInfo";

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

  const today = new Date();
  const formattedDate = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const infos = weather ? [
    { titulo: "Temperature:", dado: weather.current.temperature + "°C" },
    { titulo: "Wind Speed:", dado: weather.current.windspeed + " km/h" },
    { titulo: "Humidity:", dado: weather.hourly.relative_humidity_2m[0] + "%" },
    { titulo: "Precipitação:", dado: weather.hourly.precipitation[0] + "mm" },
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
        <div className="relative z-10 w-full h-full flex flex-row justify-between items-center p-5 text-white gap-3">
          <div>
            <p className="text-md sm:text-lg">
              {weather.name}, {weather.country}
            </p>
            <p className="text-sm">{formattedDate}</p>
          </div>
          <div className="flex flex-row items-center gap-3">
            <Image
              alt="weather icon"
              src="/assets/icon-sunny.webp"
              width={90}
              height={90}
              className="hidden sm:block"
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