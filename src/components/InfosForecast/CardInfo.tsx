type CardInfoProps = {
  titulo: string;
  dado: string | any;
}

export default function CardInfo({
  titulo, dado
} : CardInfoProps) {
  return (
    <div className="w-[200px] bg-[#262540] text-[#ffffff] border border-[#3C3B5E] rounded-md p-4">
      <p>{titulo}</p>
      <p>{dado}</p>
    </div>
  );
}