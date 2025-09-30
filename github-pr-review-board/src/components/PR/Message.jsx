import { Icon } from "@iconify/react";
export default function Message({ title, text }) {
  return (
    <>
      <Icon
        icon='solar:folder-open-outline'
        className='w-16 h-16'
      />
      <div className='flex flex-col justify-center items-center gap-3'>
        <h1 className='capitalize text-3xl md:text-5xl font-bold'>{title}</h1>
        <p className='text-sm'>{text}</p>
      </div>
    </>
  );
}
