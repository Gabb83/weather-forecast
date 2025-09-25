type ButtonModalConfigProps = {
  label: string;
  onClick: () => void;
  isActive: boolean;
};

export default function ButtonModalConfig({
  label, onClick, isActive
} : ButtonModalConfigProps) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-3 py-2 rounded-md text-white transition-colors
        ${isActive ? "bg-[#0800ff]" : "bg-[#3C3B5E] hover:bg-[#4b4a6d]"} cursor-pointer`}
    >
      {label}
    </button>
  );
}