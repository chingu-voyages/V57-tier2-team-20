import { Icon } from "@iconify/react";

export default function BuiltForItem({ icon, text, color, bgColor }) {
  return (
    <div className='p-2 bg-card border border-brand-primary/30 flex gap-2 items-center text-sm'>
      <div
        className={`p-1 flex justify-center items-center  shrinks-0 border text-${color}  border-${color} ${bgColor}`}
       

      >
        <Icon
          icon={icon}
          className={`w-3.5 h-3.5 text-${color}`}
        />
      </div>
      {text}
    </div>
  );
}
