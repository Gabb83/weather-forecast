import Image from "next/image";

type CardHourlyForecastProps = {
  icon?: string | any;
  hora: string;
  temperatura: string;
}

export default function CardHourlyForecast({
  icon, hora, temperatura
} : CardHourlyForecastProps) {
  return (
    <div className="bg-[#302F4A] flex flex-row justify-between items-center border border-[#3C3B5E] rounded-md px-2">
      <figure className="flex flex-row items-center gap-3">
        <Image
          alt="dados do clima"
          src={icon}
          width={50}
          height={50}
        />
        <p className="text-center">{hora}h</p>
      </figure>
      <p>{temperatura}</p>
    </div>
  );
}