import { useState, useEffect } from "react";
import { getPullRequests } from "../api/githubAPI";
import PRList from "../components/PR/PRList";
import PRErrors from "../components/PR/PRErrors";
import Title from "../components/PR/PRTitle";

export default function ClosedPRs({ org, repo }) {
  const state = "close";
  const [prList, setPrList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!org || !repo) return;
    loadPRs();
  }, [org, repo]);

  //Load PR List
  const loadPRs = async () => {
    try {
      const formattedPRList = await getPullRequests(org, repo, state);

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
    <section className='w-full lg:px-22 space-y-6 text-sm z-10'>
      <Title
        org={org}
        repo={repo}
        orgUrl={prList[0]?.orgUrl}
        repoUrl={prList[0]?.repoUrl}
        onRefresh={loadPRs}
        title='closed pr requests'
        variant='close'
      />

      {/* PR List or Error screen */}
      {error ? <PRErrors err={error} /> : <PRList prList={prList} />}
    </section>
  );
}
