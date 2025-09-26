import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { usePrDetails } from "../../context/PrDetailsContext";

export default function Modal({ showModal, setShowModal }) {
  const [orgName, setOrgName] = useState("");
  const [repoName, setRepoName] = useState("");
  const { newPrDetails, setNewPrDetails } = usePrDetails();

  const [savedOrgs, setSavedOrgs] = useState([]);
  const [savedRepos, setSavedRepos] = useState([]);

  const [orgSuggestions, setOrgSuggestions] = useState([]);
  const [repoSuggestions, setRepoSuggestions] = useState([]);

  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showRepoDropdown, setShowRepoDropdown] = useState(false);

  const pattern = /^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*$/;
  const isValid = (value) => pattern.test(value);
  const isFormValid = isValid(orgName) && isValid(repoName);

  console.log(newPrDetails);

  useEffect(() => {
    if (!showModal) return;
    const orgs = JSON.parse(localStorage.getItem("orgs") || "[]");
    const repos = JSON.parse(localStorage.getItem("repos") || "[]");
    setSavedOrgs(orgs);
    setSavedRepos(repos);
  }, [showModal]);

  const handleOrgFocus = () => {
    setOrgSuggestions(savedOrgs);
    setShowOrgDropdown(savedOrgs.length > 0);
  };

  const handleOrgChange = (value) => {
    setOrgName(value);

    const q = value.trim().toLowerCase();
    if (!q) {
      setOrgSuggestions(savedOrgs);
      setShowOrgDropdown(savedOrgs.length > 0);
      return;
    }

    const filtered = savedOrgs.filter((s) => s.startsWith(q));
    setOrgSuggestions(filtered);
    setShowOrgDropdown(filtered.length > 0);
  };

  const handleOrgSelect = (value) => {
    setOrgName(value);
    setShowOrgDropdown(false);
  };

  const handleRepoFocus = () => {
    setRepoSuggestions(savedRepos);
    setShowRepoDropdown(savedRepos.length > 0);
  };

  const handleRepoChange = (value) => {
    setRepoName(value);

    const q = value.trim().toLowerCase();
    if (!q) {
      setRepoSuggestions(savedRepos);
      setShowRepoDropdown(savedRepos.length > 0);
      return;
    }

    const filtered = savedRepos.filter((s) => s.startsWith(q));
    setRepoSuggestions(filtered);
    setShowRepoDropdown(filtered.length > 0);
  };

  const handleRepoSelect = (value) => {
    setRepoName(value);
    setShowRepoDropdown(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setOrgName("");
    setRepoName("");
    setShowOrgDropdown(false);
    setShowRepoDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!orgName || !repoName) return;
    if (!isValid(orgName) || !isValid(repoName)) return;

    const prDetails = { orgName, repoName };
    setNewPrDetails(prDetails);

    const updatedOrgs = Array.from(new Set([...(savedOrgs || []), orgName]));
    const updatedRepos = Array.from(new Set([...(savedRepos || []), repoName]));

    localStorage.setItem("orgs", JSON.stringify(updatedOrgs));
    localStorage.setItem("repos", JSON.stringify(updatedRepos));

    setSavedOrgs(updatedOrgs);
    setSavedRepos(updatedRepos);

    setOrgName("");
    setRepoName("");
    setShowOrgDropdown(false);
    setShowRepoDropdown(false);
    setShowModal(false);
  };

  // Render
  return (
    <>
      {showModal && (
        <div className=" z-[9999] inset-0  flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm fixed">
          <div className="md:w-[400px] flex items-center justify-between border border-[var(--color-brand-primary)] bg-[var(--color-card)] p-[16px]">
            <h3 className="text-white uppercase font-bold text-[18px]">
              Initialize Repository
            </h3>
            <button
              onClick={handleCloseModal}
              className="cursor-pointer"
              type="button"
            >
              <Icon
                icon="solar:close-circle-outline"
                className="text-[var(--color-text)] h-[24px] w-[24px] hover:text-white"
              />
            </button>
          </div>

          <div className="md:w-[400px] bg-[var(--color-card)] p-[16px] border border-t-0 border-[var(--color-brand-primary)]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 modal"
            >
              <div className="flex flex-col gap-6">
                {/* ORG */}
                <div className="flex flex-col gap-[8px] relative">
                  <label className="text-white uppercase text-[12px]">
                    github_org
                  </label>

                  <input
                    value={orgName}
                    onChange={(e) => handleOrgChange(e.target.value)}
                    onFocus={handleOrgFocus}
                    onBlur={() =>
                      setTimeout(() => setShowOrgDropdown(false), 150)
                    }
                    type="text"
                    placeholder="ENTER VALID ORG NAME..."
                    className={`p-[10px] text-white text-[14px] placeholder:text-[var(--color-text)] ${
                      orgName && !isValid(orgName) ? "border-[#ff00804d]" : ""
                    }`}
                  />

                  {showOrgDropdown && orgSuggestions.length > 0 && (
                    <ul className="absolute top-full mt-1 bg-[var(--color-card)] border border-gray-600 max-h-32 overflow-y-auto w-full z-10">
                      {orgSuggestions.map((org, idx) => (
                        <li
                          key={idx}
                          className="p-2 text-sm text-white cursor-pointer hover:bg-gray-700"
                          onMouseDown={() => handleOrgSelect(org)} // onMouseDown so selection happens before blur
                        >
                          {org}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div>
                    {orgName ? (
                      !isValid(orgName) ? (
                        <div className="flex items-center gap-2 text-[var(--color-brand-secondary)] text-[12px]">
                          <Icon
                            icon="solar:danger-triangle-outline"
                            className="w-[16px] h-[16px]"
                          />
                          <p>Enter a valid organization name</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[var(--color-brand-primary)] text-[12px]">
                          <Icon
                            icon="solar:check-circle-outline"
                            className="w-[16px] h-[16px]"
                          />
                          <p>Valid organization name</p>
                        </div>
                      )
                    ) : null}
                  </div>
                </div>

                {/* REPO */}
                <div className="flex flex-col gap-[8px] relative">
                  <label className="text-white uppercase text-[12px]">
                    github_repo_name
                  </label>

                  <input
                    value={repoName}
                    onChange={(e) => handleRepoChange(e.target.value)}
                    onFocus={handleRepoFocus}
                    onBlur={() =>
                      setTimeout(() => setShowRepoDropdown(false), 150)
                    }
                    type="text"
                    placeholder="ENTER VALID REPO NAME..."
                    className={`p-[10px] text-white text-[14px] placeholder:text-[var(--color-text)] ${
                      repoName && !isValid(repoName) ? "border-[#ff00804d]" : ""
                    }`}
                  />

                  {showRepoDropdown && repoSuggestions.length > 0 && (
                    <ul className="absolute top-full mt-1 bg-[var(--color-card)] border border-gray-600 max-h-32 overflow-y-auto w-full z-10">
                      {repoSuggestions.map((repo, idx) => (
                        <li
                          key={idx}
                          className="p-2 text-sm text-white cursor-pointer hover:bg-gray-700"
                          onMouseDown={() => handleRepoSelect(repo)}
                        >
                          {repo}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div>
                    {repoName ? (
                      !isValid(repoName) ? (
                        <div className="flex items-center gap-2 text-[var(--color-brand-secondary)] text-[12px]">
                          <Icon
                            icon="solar:danger-triangle-outline"
                            className="w-[16px] h-[16px]"
                          />
                          <p>Enter a valid repository name</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[var(--color-brand-primary)] text-[12px]">
                          <Icon
                            icon="solar:check-circle-outline"
                            className="w-[16px] h-[16px]"
                          />
                          <p>Valid repository name</p>
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
              </div>

              <p className="text-[var(--color-text)] text-[13px] border border-[var(--color-brand)] border-l-[5px] p-[12px] pl-[16px]">
                Enter the GitHub organization/username and repository name to
                track pull requests. The repository must be publicly accessible.
              </p>

              <div className="place-self-end">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="shadow-[inset_0_0_0_1px_#00ffff] px-[16px] text-[14px] py-[8px] text-[var(--color-text)] cursor-pointer hover:shadow-none delay-75 transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`text-[14px] px-[16px] py-[8px] ${
                      isFormValid
                        ? "bg-[var(--color-brand-primary)] text-[#1E232D] cursor-pointer hover:opacity-90"
                        : "bg-[var(--color-brand-primary)] text-[#1E232D] cursor-not-allowed opacity-50"
                    }`}
                  >
                    GET PRS
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* backdrop */}
      {showModal && (
        <div
          onClick={handleCloseModal}
          className="absolute z-[45] top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.6)] backdrop-blur-[3px]"
        ></div>
      )}
    </>
  );
}
