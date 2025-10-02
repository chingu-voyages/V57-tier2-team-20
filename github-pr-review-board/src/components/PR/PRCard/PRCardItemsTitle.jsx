import { Icon } from "@iconify/react";

export default function PRCardItemsTitle({ text }) {
  return (
    <div className='flex items-center gap-2'>
      <Icon
        icon='solar:user-outline'
        className='w-6.5 h-6.5 border p-1'
      />
      <h3 className='text-base uppercase'>{text}</h3>
    </div>
  );
}
