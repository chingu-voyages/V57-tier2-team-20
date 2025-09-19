import { Icon } from "@iconify/react";

export default function PRCardItemsTitle({ text, color, time }) {
  return (
    <div className='flex items-center gap-2 pb-3'>
      <Icon
        icon='solar:user-outline'
        className='w-7 h-7 border p-1'
      />
      <h3 className='uppercase'>{text}</h3>
    </div>
  );
}
