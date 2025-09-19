import React, { useState } from "react";
import { Icon } from "@iconify/react"; 
export default function RepoModal({ onClose , onSuccess}) {
  const [org, setOrg] = useState("");
  const [repo, setRepo] = useState("");
  const [orgMsg, setOrgMsg] = useState("");
  const [repoMsg, setRepoMsg] = useState("");
  const [prs, setPrs] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [message, setMessage] = useState("");

  const orgRegex = /^(?!.*--)[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
  const repoRegex = /^[a-zA-Z0-9._-]+$/;

  const handleOrgChange = (value) => {
    setOrg(value);
    if (!value) {
      setOrgMsg("Organization name is required");
    } else if (!orgRegex.test(value)) {
      setOrgMsg("Invalid organization name");
    } else {
      setOrgMsg("Valid organization name");
    }
  };

  const handleRepoChange = (value) => {
    setRepo(value);
    if (!value) {
      setRepoMsg("Repository name is required");
    } else if (!repoRegex.test(value)) {
      setRepoMsg("Invalid repository name");
    } else {
      setRepoMsg("Valid repository name");
    }
  };

    const handleSubmit = async () => {
  setStatus("idle");
  setMessage("");

  if (!org) {
    setOrgMsg("Organization name is required");
    return;
  }
  if (!repo) {
    setRepoMsg("Repository name is required");
    return;
  }
  if (orgMsg.includes("Invalid") || repoMsg.includes("Invalid")) {
    return;
  }

  try {
    // 1. Fetch open PRs
    const res = await fetch(
      `https://api.github.com/repos/${org}/${repo}/pulls?state=open`
    );

    if (!res.ok) {
      throw new Error("REPO NOT FOUND!");
    }

    const prs = await res.json();

    // 2. Fetch comments for each PR
    const prsWithComments = await Promise.all(
      prs.map(async (pr) => {
        const commentsRes = await fetch(
          `https://api.github.com/repos/${org}/${repo}/issues/${pr.number}/comments`
        );
        const comments = await commentsRes.json();
        return { ...pr, comments };
      })
    );

    setPrs(prsWithComments);
    setStatus("success");
    setMessage("SUCCESS");

    // ⏳ wait 2 seconds before sending data to parent
    setTimeout(() => {
      onSuccess(prsWithComments);
    }, 2000);
  } catch (err) {
    setStatus("error");
    setMessage(err.message);
  }
};


  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm flex-col py-6 ">
      <div className="bg-card border border-brand-primary/30  w-[400px] shadow-xl">
        <div className="flex items-center justify-between border-b border-brand-primary/30 p-6">
            <h2 className="text-lg tracking-wider font-bold uppercase text-white">Initialize Repository</h2>
             {/* Close button */}
            <button
            onClick={onClose}
            className="cursor-pointer text-white hover:text-brand-primary/30"
            >
            <Icon icon="solar:close-circle-outline" width="24" height="24"  />
            </button>
        </div>
        <div className="flex flex-col justify-center items-start p-6 gap-6 w-full">
            <div className="flex flex-col justify-center items-start gap-2 w-full">
                {/* Org Input */}
                <label className="text-xs text-white uppercase tracking-widest">GitHub_Org</label>
                <input
                type="text"
                value={org}
                onChange={(e) => handleOrgChange(e.target.value)}
                className="w-full text-text px-3 py-2.5  border border-brand-primary/30 focus:border-brand-primary focus:outline-none"
                placeholder="ENTER A VALID ORG NAME..."
                />
        {orgMsg && (
  <p
    className={`text-xs ${
      orgMsg.includes("Invalid")
        ? "text-brand-secondary" // error
        : orgMsg.includes("Valid")
        ? "text-brand-primary" // success
        : "text-brand-secondary" // required / neutral
    }`}
  >
    {orgMsg}
  </p>
)}
</div>
<div className="flex flex-col justify-center items-start gap-2 w-full">
        {/* Repo Input */}
        <label className="text-xs text-white uppercase tracking-widest">github_repo_name</label>
        <input
          type="text"
          value={repo}
          onChange={(e) => handleRepoChange(e.target.value)}
          className="w-full text-text px-3 py-2.5 border border-brand-primary/30 focus:border-brand-primary focus:outline-none"
          placeholder="ENTER VALID REPO NAME..."
        />
        {repoMsg && (
            <p
                className={`text-xs ${
                repoMsg.includes("Invalid")
                    ? "text-brand-secondary" // error
                    : repoMsg.includes("Valid")
                    ? "text-brand-primary" // success
                    : "text-brand-secondary" // required / neutral
                }`}
            >
            {repoMsg}
            </p>
            )}
        </div>

        <div className="p-3 border-l-6 border border-brand bg-[#1E232D33]">
            <p className="text-text">Enter the GitHub organization/username and repository name to track pull requests.
                 The repository must be publicly accessible.</p>
        </div>
        
        <div className="flex items-center justify-end gap-2 text-sm w-full">
          <button
            onClick={onClose}
            className="px-5 py-2  text-text border-2 border-brand-primary/30 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 border-2 cursor-pointer border-brand-primary bg-brand-primary text-[#1E232D] hover:bg-brand-primary/20 hover:text-white hover:border-brand-primary/20 transition"
          >
            GET PRs
          </button>
        </div>
    </div>
      </div>

        {/* Status banner */}
            {status !== "idle" && (() => {
            const isError = status === "error";
            const icon = isError
                ? "solar:close-circle-outline"
                : "solar:check-circle-outline";
            const bgIcon = isError
                ? "bg-brand-secondary/20 border border-brand-secondary p-1"
                : "bg-brand-primary/20 border border-brand-primary p-1"
            const bannerClasses = `
            mt-1 pt-[0.4px] p-0.5
                ${isError 
                ? "bg-card text-brand-secondary border border-brand-secondary/30 " 
                : "bg-card text-brand-primary border border-brand-primary/30"}
            `;
            const innerClass =  
                `
                 px-3 py-2 w-[400px] flex items-start justify-start gap-2  text-sm font-medium 
                border-t-3
                ${isError 
                ? "border-t-2 border-t-brand-secondary" 
                : "border-t-2 border-t-brand-primary"}`;
            const extraMessage = isError
                ? "Check your REPO NAME and ORG"
                : "Synchronizing Data...";

            return (
                <div className={bannerClasses}>
                    <div className={innerClass}>
                        <Icon icon={icon} width="26" height="26" className={bgIcon}/>
                        <div className="flex flex-col items-start justify-center gap-1">
                            <span>{message}</span>
                            <p className="text-xs text-text">{extraMessage}</p>
                        </div>
                    </div>
                </div>
            );
            })()}

    </div>
  );
}
