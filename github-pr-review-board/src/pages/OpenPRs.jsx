import { useState } from "react";
import { getPullRequests, getRepos } from "../api/githubAPI";
import { Icon } from "@iconify/react";

export default function OpenedPRs() {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const org = import.meta.env.VITE_GITHUB_ORG;
  const repo = import.meta.env.VITE_GITHUB_REPO;
  const state = "all";
  const [prList, setPrList] = useState([]);

  //Load PR List
  const loadPRs = async () => {
    try {
      const info = await getPullRequests(org, repo, token, state);

      const formattedPRList = info.map((pr) => ({
        number: pr.number,
        created_at: new Date(pr.created_at).toLocaleString(),
        author: pr.user.login,
        fromBranch: pr.head.ref,
        toBranch: pr.base.ref,
        orgName: pr.base.repo.owner.login,
        repoName: pr.base.repo.name,
        reviewers: pr.requested_reviewers?.length
          ? pr.requested_reviewers.map((user) => user.login).join(", ")
          : "None",
      }));

      //Save PRs into prInfo
      setPrList(formattedPRList);
    } catch (err) {
      console.error("Error get PullRequests:", err);
    }
  };

  return (
    <section className='w-full space-y-6 px-6 md:px-30 py-8'>
      <div className='p-6 bg-card border border-brand-primary/20'>
        <h2 className='text-white uppercase'>Open pull requests</h2>
        {/* Title */}
        <div className='flex justify-between gap-3 flex-wrap'>
          <div className=' flex gap-3 text-brand'>
            <a
              href='#'
              className='flex items-center gap-2'
            >
              <Icon
                icon='solar:link-minimalistic-2-outline'
                className='w-5 h-5'
              />
              {org} / {repo}
            </a>
            <button className='flex items-center gap-2 px-3 py-2 border-2 border-brand/30'>
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

        {prList.map((pr) => (
          <div
            key={pr.number}
            className='mt-6 text-center text-white'
          >
            <p className='text-2xl font-bold'>PR Number: {pr.number}</p>
            <p className='text-lg'>Created at: {pr.created_at}</p>
            <p className='text-lg'>Author: {pr.author}</p>
            <p className='text-lg'>From branch: {pr.fromBranch}</p>
            <p className='text-lg'>To branch: {pr.toBranch}</p>
            <p className='text-lg'>Organization: {pr.orgName}</p>
            <p className='text-lg'>Repository: {pr.repoName}</p>
            <p className='text-lg'>Reviewers: {pr.reviewers}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
