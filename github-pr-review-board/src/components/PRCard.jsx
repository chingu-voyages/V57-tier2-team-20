import { Icon } from "@iconify/react/dist/iconify.js";

export default function PRCard({ pr }) {
  return (
    <div className='p-6 bg-card border border-brand-primary/20 space-y-3'>
      {/* Title */}
      <div className='flex justify-between flex-wrap'>
        <div>
          <div className=' flex items-center gap-3 text-brand-primary'>
            <Icon
              icon='solar:document-add-outline'
              className='w-7 h-7 text-white border border-white p-1'
            />
            <h3 className=''>OPEN PULL REQUESTS</h3>
            <Icon
              icon='solar:square-bottom-up-outline'
              className='w-5 h-5'
            />
          </div>

          {/* Branch from / to */}
          <div className='flex items-center gap-2 text-brand'>
            {pr.fromBranch}
            <Icon
              icon='solar:play-outline'
              className='w-4 h-4'
            ></Icon>
            {pr.toBranch}
          </div>
        </div>

        {/* PR number */}
        <div className='bg-brand-primary/20 border border-brand-primary text-brand-primary px-4 py-2 h-full'>
          PR #{pr.number}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-left'>
        <div className='space-y-3 uppercase'>
          {/* Created section */}
          <div className='p-4 border border-primary/20 text-brand-primary/20 space-y-3'>
            <div className='flex justify-between items-center'>
              <p className='flex items-center gap-2'>
                <Icon
                  icon='solar:user-outline'
                  className='w-7 h-7  border border-brand-primary/20 p-1'
                />
                Created By
              </p>
              <div className='flex items-center gap-1 text-text'>
                <Icon
                  icon='solar:history-linear'
                  className='w-4 h-4'
                />
                {pr.created_at}
              </div>
            </div>

            {/* Author */}
            <p className='bg-brand-primary/10 border border-brand-primary/20 text-white p-1 w-fit'>
              {pr.author}
            </p>
          </div>

          {/* Reviewers section */}
          <div className='p-4 border border-brand/30 text-brand'>
            Reviewers{" "}
            <p className='bg-brand/20 border border-brand/30 text-white p-1 w-fit'>
              {pr.reviewers}
            </p>
          </div>
        </div>

        {/* Activities section */}
        <div className='p-4 border border-text/20 text-text uppercase'>
          Recent Activities
        </div>
      </div>
    </div>
  );
}
