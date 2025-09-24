import CardDailyForecast from "./CardDailyForecast";
import getClimaIcon from "../../utils/getClimaIcon";

interface DailyForecastProps {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
}

export default function DailyForecast({
  daily
} : DailyForecastProps) {

  if (!daily || !daily.weathercode || daily.weathercode.length === 0) {
    return null; // Retorna nulo para não renderizar nada enquanto os dados não chegam
  }

  return (
    <div>
      <p className="text-white font-semibold">Daily forecast</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-4">
        {daily.time.map((day, idx) =>(
          <CardDailyForecast
            key="{idx}"
            diaSemana={new Date(day).toLocaleDateString("pt-BR", { weekday: "short" })}
            icone={getClimaIcon(daily.weathercode[idx])}
            tempMaxima={daily.temperature_2m_max[idx] + "°C"}
            tempMinima={daily.temperature_2m_min[idx] + "°C"}
          />
        ))}
      </div>
    </div>
  );
}