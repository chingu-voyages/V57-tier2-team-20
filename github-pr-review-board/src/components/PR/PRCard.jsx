import { Icon } from "@iconify/react/dist/iconify.js";

export default function PRCard({ pr }) {

  function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // seconds

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
  return (
    <div className='p-6 bg-card border border-brand-primary/20 space-y-3 flex-col items-center justify-center'>
      <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-center gap-2">
          <Icon
                    icon='solar:document-add-outline' width="28" height="28"
                    className='text-white border self-start border-white p-1 bg-brand-primary/10'
          />
          <div className="flex flex-col items-start justify-center">
            <div className="flex items-center justify-center gap-2 text-brand-primary">
              <h2 className="uppercase text-lg font-normal ">open pull requests</h2>
              <Icon
                icon='solar:square-bottom-up-outline' 
                width="18" height="18"
              />
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-brand">
              <p>{pr.head.ref}</p>
              <Icon
                icon='solar:play-outline' width="14" height="14"
              />
              <p>{pr.base.ref}</p>
            </div>
          </div>
        </div>
        <div className="border border-brand-primary bg-brand-primary/20 self-start text-brand-primary text-sm px-4 py-2">
          <p>PR # {pr.number}</p>
        </div>
      </div>

     
{/*        Title 
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

          {/* Branch from / to 
          <div className='flex items-center gap-2 text-brand'>
            {pr.fromBranch}
            <Icon
              icon='solar:play-outline'
              className='w-4 h-4'
            ></Icon>
            {pr.toBranch}
          </div>
        </div>

        /* PR number 
        <div className='bg-brand-primary/20 border border-brand-primary text-brand-primary px-4 py-2 h-full'>
          PR #{pr.number}
        </div>
      </div> */}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-left'>
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
              <div className='flex items-center gap-1 text-sm text-text lowercase'>
                <Icon
                  icon='solar:history-linear'
                  className='w-4 h-4'
                />
                {timeAgo(pr.created_at)}
              </div>
            </div>

            {/* Author */}
            <p className="text-xs text-gray-400">
      <a
        href={pr.user.html_url}
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        {pr.user.login}
      </a>
    </p>

          </div>

          {/* Reviewers section */}
          <div className='p-4 border border-brand/30 text-brand'>
            Reviewers{" "}
{/* Reviewers */}
{pr.requested_reviewers.length > 0 && (
  <div className="mt-2 text-sm text-gray-300">
    {pr.requested_reviewers.map((r) => (
      <a
        key={r.id}
        href={r.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text hover:underline mr-2"
      >
        {r.login}
      </a>
    ))}
  </div>
)}
          </div>
        </div>

        {/* Activities section */}
        <div className='p-4 border border-text/20 text-text '>
          <p className="uppercase">Recent Activities</p>
          {/* PR opened */}
  <div className="flex items-center gap-2 text-sm mb-1">
    <span>Opened: {timeAgo(pr.created_at)}</span>
  </div>
          {/* Latest comment */}
  {pr.comments && pr.comments.length > 0 ? (
    <div className="flex items-center gap-2 text-sm">
      <span>
        Commented: {timeAgo(pr.comments[pr.comments.length - 1].created_at)} by{" "}
        <a
          href={pr.comments[pr.comments.length - 1].user.html_url}
          target="_blank"
          rel="noreferrer"
          className="hover:underline text-brand-primary"
        >
          {pr.comments[pr.comments.length - 1].user.login}
        </a>
      </span>
    </div>
  ) : (
    <p className="text-xs text-gray-500">No recent comments</p>
  )}
        </div>
      </div>
    </div>
  );
}
