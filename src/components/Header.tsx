"use client";

import { useState } from "react";
import Image from "next/image";
import ModalConfig from "./ModalConfig";

export default function Header() {
  const [openConfig, setOpenConfig] = useState(false);

  const handleOpenConfig = () => {
    setOpenConfig(!openConfig);
  }

  return(
    <header className="flex flex-row justify-between items-center">
      <Image
        alt="logo app"
        src="/assets/logo.svg"
        width={150} height={100}
      />
      <div>
        <button 
          className="bg-[#262540] flex flex-row items-center gap-3 border-none rounded-md p-2"
          onClick={handleOpenConfig}
        >
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
        
        {openConfig && (
          <ModalConfig />
        )}
      </div>
    </header>
  );
}