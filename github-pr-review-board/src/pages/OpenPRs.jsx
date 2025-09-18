import { useState, useEffect } from "react";
import { getPullRequests, getPullRequestEvents } from "../api/githubAPI";
import PRList from "../components/PR/PRList";
import PRErrors from "../components/PR/PRErrors";
import { Icon } from "@iconify/react";

export default function OpenedPRs() {
  const org = import.meta.env.VITE_GITHUB_ORG;
  const repo = import.meta.env.VITE_GITHUB_REPO;
  const state = "all";
  const [prList, setPrList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPRs();
  }, []);

  //Load PR List
  const loadPRs = async () => {
    try {
      const info = await getPullRequests(org, repo, state);

      //Get needed fields
      // const formattedPRList = info.map((pr) => ({
      //   title: pr.title,
      //   number: pr.number,
      //   pr_url: pr.html_url,
      //   created_at: new Date(pr.created_at).toLocaleString(),
      //   author: pr.user.login,
      //   fromBranch: pr.head.ref,
      //   toBranch: pr.base.ref,
      //   orgName: pr.base.repo.owner.login,
      //   repoName: pr.base.repo.name,
      //   reviewers: pr.requested_reviewers?.length
      //     ? pr.requested_reviewers.map((user) => user.login).join(", ")
      //     : "None",
      // }));

      const formattedPRList = await Promise.all(
        info.map(async (pr) => {
          return {
            title: pr.title,
            number: pr.number,
            pr_url: pr.html_url,
            created_at: new Date(pr.created_at).toLocaleString(),
            author: pr.user.login,
            fromBranch: pr.head.ref,
            toBranch: pr.base.ref,
            orgName: pr.base.repo.owner.login,
            orgUrl: pr.base.repo.owner.html_url,
            repoName: pr.base.repo.name,
            repoUrl: pr.base.repo.html_url,
            reviewers: pr.requested_reviewers?.length
              ? pr.requested_reviewers.map((user) => user.login).join(", ")
              : "None",
            activities: await getPullRequestEvents(org, repo, pr.number),
          };
        })
      );

      //Save PRs into prList
      setPrList(formattedPRList);
      //Clear errors
      setError(null);
    } catch (err) {
      console.error("Error get PullRequests:", err);
      //Add errors
      setError(err);
    }
  };

  return (
    <section className='w-full px-6 lg:px-30 py-8'>
      <div className='p-6 bg-card border border-brand-primary/20'>
        <h2 className='text-white uppercase'>Open pull requests</h2>

        {/* Title */}
        <div className='flex justify-between gap-3 flex-wrap'>
          <div className=' flex items-center gap-3 flex-wrap text-brand'>
            <div className='flex items-center gap-2 flex-wrap'>
              <Icon
                icon='solar:link-minimalistic-2-outline'
                className='w-5 h-5'
              />
              <a
                href={prList[0]?.orgUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                {org}
              </a>{" "}
              /
              <a
                href={prList[0]?.repoUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                {repo}
              </a>
            </div>
            <button className='flex items-center gap-2 px-3 py-2 border-2 border-brand/30 cursor-pointer hover:text-white hover:bg-brand/20'>
              <Icon
                icon='solar:add-circle-outline'
                className='w-5 h-5'
              />
              Change repo
            </button>
          </div>
          <button
            className='flex items-center gap-2 flex-wrap bg-brand-primary px-4 py-2.5'
            onClick={loadPRs}
          >
            <Icon
              icon='solar:refresh-square-outline'
              className='w-5 h-5'
            />
            Refresh
          </button>
        </div>
      </div>

      {/* PR List or Error screen */}
      {error ? <PRErrors err={error} /> : <PRList prList={prList} />}
    </section>
  );
}
