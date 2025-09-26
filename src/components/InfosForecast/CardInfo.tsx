type CardInfoProps = {
  titulo: string | any;
  dado: string | any;
}

export default function CardInfo({
  titulo, dado
} : CardInfoProps) {
  return (
    <div className="w-full bg-[#262540] text-[#ffffff] border border-[#3C3B5E] rounded-md py-4 px-2">
      <p>{titulo}</p>
      <p>{dado}</p>
    </div>
  );
}