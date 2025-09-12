import { Icon } from "@iconify/react";

export default function BuiltForItem({ icon, text, color }) {
  return (
    <div className='p-2 bg-card border border-brand-primary/30 flex gap-2 items-center'>
      <div
        className={`w-6.5 h-6.5 flex justify-center items-center shrink-0 text-${color} border border-${color}`}
      >
        <Icon
          icon={icon}
          className={`w-3.5 h-3.5`}
        />
      </div>
      {text}
    </div>
  );
}
