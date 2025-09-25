import { Icon } from "@iconify/react";

export default function PRCardTitle({ pr }) {
  return (
    <div className='flex flex-wrap gap-3'>
      <div>
        <div className='flex items-center gap-3 text-white group cursor-pointer '>
          <Icon
            icon='solar:document-add-outline'
            className='w-6.5 h-6.5 border border-white shrink-0 p-1'
          />
          <h3 className='text-lg uppercase transition duration-300 group-hover:text-brand-primary '>
            <a
              href={pr.pr_url}
              target='__blank'
              rel='noopener noreferrer'
            >
              {pr.title}
            </a>
          </h3>
          <Icon
            icon='solar:square-bottom-up-outline'
            className='hidden w-4 h-4 shrink-0 text-brand-primary group-hover:flex'
          />
        </div>

        {/* Branch from / to */}
        <div className='flex items-center flex-wrap gap-2 text-brand'>
          <a
            href={pr.fromBranchUrl}
            target='__blank'
            rel='noopener noreferrer'
          >
            {pr.fromBranch}
          </a>
          <Icon
            icon='solar:play-linear'
            className='w-3 h-3 text-brand/30'
          />
          <a
            href={pr.toBranchUrl}
            target='__blank'
            rel='noopener noreferrer'
          >
            {pr.toBranch}
          </a>
        </div>
      </div>

      {/* PR number */}
      <a
        href={pr.pr_url}
        target='__blank'
        rel='noopener noreferrer'
        className='ml-auto bg-brand-primary/20 border border-brand-primary text-brand-primary px-4 py-2 h-full cursor-pointer'
      >
        PR #{pr.number}
      </a>
    </div>
  );
}
