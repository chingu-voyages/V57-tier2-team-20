import { useState, useEffect } from "react";
import { getPullRequests } from "../api/githubAPI";
import PRList from "../components/PR/PRList";
import PRErrors from "../components/PR/PRErrors";
import Title from "../components/PR/PRTitle";
import PRnoData from "../components/PR/PRnoData";
import PRAnimationGrid from "../components/PR/PRAnimationGrid";
import Pagination from "../components/PR/Pagination"

export default function OpenedPRs({ org, repo }) {
  // const org = import.meta.env.VITE_GITHUB_ORG;
  // const repo = import.meta.env.VITE_GITHUB_REPO;
  const state = "open";
  const [prList, setPrList] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    loadPRs();
  }, [page]);

  //Load PR List
  const loadPRs = async () => {
    try {
      const { prs, totalCount } = await getPullRequests(org, repo, state, page, perPage);
      setPrList(prs);
      setTotalCount(totalCount);

      //Clear errors
      setError(null);
    } catch (err) {
      console.error("Error get PullRequests:", err);
      //Add errors
      setError(err);
    }
  };

  return (
    <section className="w-full lg:px-22 space-y-6 text-sm z-10">
      <Title
        org={org}
        repo={repo}
        orgUrl={prList?.[0]?.orgUrl}
        repoUrl={prList?.[0]?.repoUrl}
        onRefresh={loadPRs}
        title= "open pr requests"
      />

      {error ? (
        <PRErrors err={error} />
      ) : prList === null ? (
        <PRAnimationGrid />
      ) : prList && prList.length === 0 ? (
        <PRnoData />
      ) : (
        <>
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
