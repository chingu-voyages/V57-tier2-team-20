import { Icon } from "@iconify/react";

export default function SecondaryButton({ error = false, onClick }) {
  return (
    <button
      className={`flex items-center gap-2 border-2 px-3 py-1.5 text-xs cursor-pointer transition duration-500 hover:text-white ${
        error
          ? "text-brand-secondary border-brand-secondary/30 hover:bg-brand-secondary/20 hover:border-brand-secondary/30"
          : "text-brand border-brand/30 hover:bg-brand/20 hover:border-brand/30"
      }`}
      onClick={onClick}
    >
      <Icon
        icon='solar:sort-vertical-outline'
        className='w-5 h-5'
      />
      Change repo
    </button>
  );
}
