import { Icon } from "@iconify/react";

export default function Button1({ icon, text, onClick }) {
  return (
    <button
      className='flex items-center gap-2 bg-brand-primary text-mutted border border-background px-4 py-2.5 cursor-pointer transition duration-500 hover:bg-background hover:text-brand-primary hover:border-brand-primary'
      onClick={onClick}
    >
      <Icon
        icon={icon}
        className='w-4 h-4'
      />
      {text}
    </button>
  );
}
