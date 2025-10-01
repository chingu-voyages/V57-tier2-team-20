import { Icon } from "@iconify/react";

export default function Button1({
  icon,
  text,
  color,
  onClick,
  className = "",
}) {
  return (
    <button
      className={`flex items-center gap-2 ${color} text-mutted px-4 py-2.5 cursor-pointer transition duration-500 hover:bg-background hover:text-brand-primary border hover:border-brand-primary ${className} `}
      onClick={onClick}
    >
      <Icon
        icon={icon}
        className='w-5 h-5'
      />
      {text}
    </button>
  );
}
