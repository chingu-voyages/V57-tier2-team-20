import { useState, useEffect } from "react";
 import { useSearchParams } from "react-router-dom";
import { getPullRequests } from "../api/githubAPI";
import PRList from "../components/PR/PRList";
import PRErrors from "../components/PR/PRErrors";
import Title from "../components/PR/PRTitle";
import PRnoData from "../components/PR/PRnoData";
import PRAnimationGrid from "../components/PR/PRAnimationGrid";
import Pagination from "../components/PR/Pagination"
import PRFilter from "../components/PR/PRFilter";

export default function OpenedPRs({ org, repo }) {
  const state = "open";
  const [allPRs, setAllPRs] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [searchParams, setSearchParams] = useSearchParams();
  const authorFilter = searchParams.get("author") || "";

  
  useEffect(() => {
    if (!org || !repo) return;
    loadPRs();
  }, [org, repo, page]);

  const handleAuthorChange = (value) => {
    if (value) {
      setSearchParams({ author: value });
    } else {
      setSearchParams({});
    }
    setPage(1);
  };

  const filteredPRs = authorFilter
    ? allPRs?.filter((pr) => pr.user?.login === authorFilter)
    : allPRs;


  //Load PR List
  const loadPRs = async () => {
    try {
      const prs = await getPullRequests(org, repo, state);
      setAllPRs(prs);
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
        title='open pr requests'
      />

      {error ? (
        <PRErrors err={error} />
      ) : allPRs === null ? (
        <PRAnimationGrid />
      ) : prList && prList.length === 0 ? (
        <PRnoData />
      ) : (
        <>
        <PRFilter
          allPRs={allPRs}
          authorFilter={authorFilter}
          onAuthorChange={handleAuthorChange}
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
