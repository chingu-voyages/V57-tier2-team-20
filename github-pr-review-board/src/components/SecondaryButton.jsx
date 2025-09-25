import { Icon } from "@iconify/react";

export default function Button2({ icon, text, onClick }) {
  return (
    <button
      className='flex items-center gap-2 text-brand border-2 border-brand/30 px-3 py-1.5 cursor-pointer transition duration-500 hover:bg-brand/20 hover:text-white hover:border-brand/30'
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
