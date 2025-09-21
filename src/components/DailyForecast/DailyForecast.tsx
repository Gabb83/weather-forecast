import CardDailyForecast from "./CardDailyForecast";

interface DailyForecastProps {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export default function DailyForecast({
  daily
} : DailyForecastProps) {
  return (
    <div>
      <p className="text-white">Daily forecast</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-4">
        {daily.time.map((day, idx) =>(
          <CardDailyForecast
            key="{idx}"
            diaSemana={new Date(day).toLocaleDateString("pt-BR", { weekday: "short" })}
            icone={'/assets/icon-sunny.webp'}
            tempMaxima={daily.temperature_2m_max[idx] + "°C"}
            tempMinima={daily.temperature_2m_min[idx] + "°C"}
          />
        ))}
      </div>
    </div>
  );
}