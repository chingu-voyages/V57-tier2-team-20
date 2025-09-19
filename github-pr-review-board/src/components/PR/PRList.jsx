import PRCard from "./PRCard";
import { Icon } from "@iconify/react";

export default function PRList({ prs }) {
  console.log(prs)
  return (
    <section className="z-[9999] flex flex-col gap-6 ">
          <div className="flex items-center justify-between gap-4 border p-6 border-brand-primary/20 bg-card ">
            <div className="flex flex-col items-start justify-center gap-2">
              <h1 className="text-5xl text-white font-bold uppercase">Open PULL requests</h1>
              <div className="flex items-center justify-between gap-2 text-brand">
                <Icon icon="solar:link-minimalistic-2-outline" width="24" height="24" />
                <p className="text-sm">{prs[0].base.repo.full_name}</p>
                <button className="flex items-center ml-1 jutify-center text-xs gap-1 border border-brand/30 py-1 px-2 hover:bg-brand/20 hover:text-white">
                  <Icon icon="solar:sort-vertical-outline" width="22" height="22" />
                  Change Repo
                </button>
              </div>
            </div>
            <button className="flex items-center jutify-center gap-2 text-sm text-black bg-brand-primary p-2 px-3 hover:bg-brand-primary/50 hover:text-white"> 
              <Icon icon="solar:refresh-square-outline" width="24" height="24" />
              Refresh
            </button>
          </div>
      {prs.map((pr) => (
          <div
            key={pr.number}
            className='text-center text-white space-y-3'
          >
              <PRCard pr={pr} />
          </div>

        
      ))}
    </section>

  )
}
