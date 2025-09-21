import Image from "next/image";

export default function Header() {
  return(
    <header className="flex flex-row justify-between items-center">
      <Image
        alt="logo app"
        src="/assets/logo.svg"
        width={150} height={100}
      />
      <button className="bg-[#262540] flex flex-row items-center gap-3 border-none rounded-md p-2">
        <Image
          alt="logo app"
          src="/assets/icon-units.svg"
          width={20} height={20}
        />
        <p>Units</p>
        <Image
          alt="logo app"
          src="/assets/icon-dropdown.svg"
          width={20} height={20}
        />
      </button>
    </header>
  );
}