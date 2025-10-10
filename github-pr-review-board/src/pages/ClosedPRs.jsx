import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import { getPullRequests } from "../api/githubAPI";
import PRList from "../components/PR/PRList";
import PRErrors from "../components/PR/PRErrors";
import Title from "../components/PR/PRTitle";
import PRnoData from "../components/PR/PRnoData";
import PRAnimationGrid from "../components/PR/PRAnimationGrid";
import Pagination from "../components/PR/Pagination";
import PRFilter from "../components/PR/PRFilter";

export default function ClosedPRs({ org, repo }) {
  // const org = import.meta.env.VITE_GITHUB_ORG;
  // const repo = import.meta.env.VITE_GITHUB_REPO;
  const state = "close";
  const [allPRs, setAllPRs] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  
  const [searchParams, setSearchParams] = useSearchParams();
  // Get all filter parameters from URL
  const authorFilter = searchParams.get("author") || "";
  const reviewerFilter = searchParams.get("reviewer") || "";
  const branchFilter = searchParams.get("branch") || "";
  const perPage = 5;


  useEffect(() => {
    if (!org || !repo) return;
    loadPRs();
  }, [org, repo]);

  const handleFilterChange = (filters) => {
    // filters = { author: "...", reviewer: "...", label: "...", branch: "..." }
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v)
    );
    setSearchParams(validFilters);
    setPage(1);
  };

  // Apply all filters
  const filteredPRs = allPRs?.filter((pr) => {
    let match = true;
    if (authorFilter) match = match && pr.author === authorFilter;

    if (reviewerFilter) {
      match =
        match &&
        pr.reviewers?.some((rev) => rev.login === reviewerFilter);
    }    
    if (branchFilter) match = match && pr.fromBranch === branchFilter;
    return match;
  });


  //Load PR List
  const loadPRs = async () => {
    try {
      const prs = await getPullRequests(org, repo, state);
      setAllPRs(prs);
      //Save PRs into prList
      //Clear errors
      setError(null);
    } catch (err) {
      console.error("Error get PullRequests:", err);
      //Add errors
      setError(err);
    }
  };
    // Slice PRs for current page
  const prList = filteredPRs?.slice((page - 1) * perPage, page * perPage) || [];
  const totalCount = filteredPRs?.length || 0;

  return (
    <section className='w-full lg:px-22 space-y-6 text-sm z-10'>
      <Title
        org={org}
        repo={repo}
        orgUrl={prList?.[0]?.orgUrl}
        repoUrl={prList?.[0]?.repoUrl}
        onRefresh={loadPRs}
        title='closed pr requests'
        variant='close'
      />

          {error ? (
              <PRErrors err={error} />
            ) : allPRs === null ? (
              <PRAnimationGrid state='close'/>
            ) : prList && prList.length === 0 ? (
              <PRnoData state='close'/>
            ) : (
              <>
              <PRFilter
                allPRs={allPRs}
                currentFilters={{
                author: authorFilter,
                reviewer: reviewerFilter,
                branch: branchFilter,
                }}
                onFilterChange={handleFilterChange}
              />
              <PRList prList={prList} />
              {totalCount > perPage && (
                      <Pagination
                        page={page}
                        setPage={setPage}
                        perPage={perPage}
                        totalCount={totalCount}
                      />
                    )}
              </>
            )}
    </section>
  );
}
