import axios from "axios";

export async function getWeather(latitude: number, longitude: number) {
  const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude,
      longitude,
      current_weather: true,
    },
  });

  return response.data.current_weather;
}

export async function getGeo(cidade: string) {
  const res = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
    params: {
      name: cidade,
      count: 1,
      language: "pt",
      format: "json",
    },
  });

  const data = res.data;

  if (!data.results || data.results.length === 0) {
    throw new Error("Cidade não encontrada");
  }

  return {
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude,
    name: data.results[0].name,
    country: data.results[0].country,
  };
}