import { Icon } from "@iconify/react";

export default function PRCardTitle({ pr }) {
  // Determine PR status
  let status = "";
  if (pr.state === "open") status = "Open";
  else if (pr.state === "closed" && pr.merged) status = "Merged";
  else status = "Unmerged"; // closed but not merged
  const statusColors = {
    Open: "bg-brand-primary/20 text-brand-primary",
    Merged: "bg-brand-primary/20 text-brand-primary",
    Unmerged: "bg-brand-secondary/20 text-brand-secondary",
  }
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
        <div className='flex items-center flex-wrap gap-2 text-brand px-9'>
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
     <div className="ml-auto flex items-center gap-2 h-fit">

      {(status === "Merged" || status === "Unmerged") &&(
          <a
            href={pr.pr_url}
            target='__blank'
            rel='noopener noreferrer'
            className={`ml-auto border px-4 py-2 h-full cursor-pointer  ${statusColors[status]}`}
          >
            {status}
          </a>
        )}
      {/* PR number */}
      <a
        href={pr.pr_url}
        target='__blank'
        rel='noopener noreferrer'
        className={`ml-auto border px-4 py-2 h-full cursor-pointer  ${statusColors[status]}`}
      >
        PR #{pr.number}
      </a>
      </div>
    </div>
  );
}
