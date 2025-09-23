import PRCardTitle from "./PRCardTitle";
import PRCardItemsTitle from "./PRCardItemsTitle";
import PRCardActivities from "./PRCardActivities";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function PRCard({ pr }) {
  return (
    <div className='p-6 bg-card border border-brand-primary/20 space-y-3'>
      <PRCardTitle pr={pr} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-left'>
        <div className='space-y-3 uppercase'>
          {/* Created section */}
          <div className='p-4 border border-primary/20 text-brand-primary/20'>
            <div className='flex justify-between items-center flex-wrap-reverse gap-2'>
              <PRCardItemsTitle text='Created By' />
              <div className='flex items-center gap-1 text-text text-xs'>
                <Icon
                  icon='solar:history-linear'
                  className='w-4 h-4 shrink-0'
                />
                {pr.created_at}
              </div>
            </div>

            {/* Author */}
            <div className='px-8 pt-3'>
              <p className='bg-brand-primary/10 border border-brand-primary/20 text-white p-1 w-fit'>
                {pr.author}
              </p>
            </div>
          </div>

          {/* Reviewers section */}
          <div className='p-4 border border-brand/30 text-brand'>
            <PRCardItemsTitle text='Reviewers' />
            <div className='px-8 pt-3'>
              <p className='bg-brand/20 border border-brand/30 text-white p-1 w-fit'>
                {pr.reviewers}
              </p>
            </div>
          </div>
        </div>
        <PRCardActivities activities={pr.activities} />
      </div>
    </div>
  );
}
