import PRCardTitle from "./PRCardTitle";
import PRCardItemsTitle from "./PRCardItemsTitle";
import PRCardActivities from "./PRCardActivities";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function PRCard({ pr }) {
  // Determine PR status
  // let status = "";
  // if (pr.state === "open") status = "Open";
  // else if (pr.state === "closed" && pr.merged) status = "Merged";
  // else status = "Unmerged"; // closed but not merged
  // const cardColors = {
  //   Open: "bg-card border-brand-primary/20",
  //   Merged: "bg-card border-brand-primary/20",
  //   Unmerged: "bg-card border-brand-secondary/20",
  // };
  return (
    // <div className={`p-6 bg-card border ${cardColors[status]} space-y-3`}>
    <div
      className={`p-6 bg-card border space-y-3 ${
        pr.state === "closed"
          ? "border-brand-secondary/20"
          : "border-brand-primary/20"
      }`}
    >
      <PRCardTitle pr={pr} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-left'>
        <div className='space-y-3 uppercase'>
          {/* Created section */}
          <div className='p-4 border border-primary/20 text-brand-primary/20'>
            <div className='flex justify-between items-center flex-wrap-reverse gap-2'>
              <PRCardItemsTitle text='Created By' />
              <div className='flex items-center gap-1 text-text text-xs lowercase'>
                <Icon
                  icon='solar:history-linear'
                  className='w-4 h-4 shrink-0'
                />
                {pr.created_at}
              </div>
            </div>

            {/* Author */}
            <div className='px-8 pt-3'>
              <a
                href={pr.authorUrl}
                target='__blank'
                rel='noopener noreferrer'
                className='block bg-brand-primary/10 border border-brand-primary/20 text-white p-1 w-fit'
              >
                {pr.author}
              </a>
            </div>
          </div>

          {/* Reviewers section */}
          <div className='p-4 border border-brand/30 text-brand'>
            <PRCardItemsTitle text='Reviewers' />
            <div className='flex flex-wrap gap-2 px-8 pt-3 text-white'>
              {pr.reviewers.length ? (
                pr.reviewers.map((rev) => (
                  <a
                    key={rev.login}
                    href={rev.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block bg-brand/20 border border-brand/30 p-1 w-fit whitespace-nowrap'
                  >
                    {rev.login}
                  </a>
                ))
              ) : (
                <span className='bg-brand/20 border border-brand/30 p-1 w-fit'>
                  None
                </span>
              )}
            </div>
          </div>
        </div>
        <PRCardActivities activities={pr.activities} />
      </div>
    </div>
  );
}
