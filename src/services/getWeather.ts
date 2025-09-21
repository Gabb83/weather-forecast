import axios from "axios";

// Tipagem do retorno da API
interface WeatherAPIResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
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
    precipitation_sum: number[];
  };
}

export async function getWeather(latitude: number, longitude: number) {
  const response = await axios.get<WeatherAPIResponse>(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude,
        longitude,
        current_weather: true,
        hourly: ["temperature_2m", "relative_humidity_2m", "precipitation"].join(","),
        daily: ["temperature_2m_max", "temperature_2m_min", "precipitation_sum"].join(","),
        timezone: "auto",
      },
    }
  );

  const data = response.data;

  // Retorna os dados organizados
  return {
    current: data.current_weather,
    hourly: data.hourly,
    daily: data.daily,
  };
}