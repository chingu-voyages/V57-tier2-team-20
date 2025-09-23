import PRCardItemsTitle from "./PRCardItemsTitle";
import { Icon } from "@iconify/react";

export default function PRCardActivities({ activities }) {
  return (
    <div className='p-4 border border-text/20 text-text'>
      <div className='flex items-center gap-2'>
        <PRCardItemsTitle text='Recent Activities' />
      </div>
      <div className='px-8 pt-3 space-y-2'>
        {activities &&
          activities.map((act, i) => (
            <div
              key={i}
              className='flex items-center gap-2 flex-wrap'
            >
              <Icon
                icon='solar:forward-2-bold'
                className='w-5 h-5'
              ></Icon>
              <span className='text-brand'> {act.type}</span>
              <Icon
                icon='solar:play-outline'
                className='w-3 h-3 text-brand/30'
              />
              {act.user}
              {new Date(act.created_at).toLocaleString()}
            </div>
          ))}
      </div>
    </div>
  );
}
