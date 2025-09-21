import Image from "next/image";

type CardDailyForecastProps = {
  tempMinima: string;
  tempMaxima: string;
  icone: string;
  diaSemana: string;
};

export default function CardDailyForecast({
  tempMinima, tempMaxima, icone, diaSemana
} : CardDailyForecastProps) {
  return (
    <div className="w-full bg-[#262540] flex flex-col items-center border border-[#3C3B5E] rounded-md p-2">
      <p>{diaSemana}</p>
      <Image
        alt="icone do clima"
        src={icone}
        width={50} height={50}   
      />
      <div className="flex flex-row items-center gap-8">
        <p>{tempMaxima}</p>
        <p>{tempMinima}</p>
      </div>
    </div>
  );
}