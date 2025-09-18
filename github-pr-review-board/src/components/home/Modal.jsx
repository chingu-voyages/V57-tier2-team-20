import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Modal({ showModal, setShowModal }) {
  const [orgName, setOrgName] = useState("");
  const [repoName, setRepoName] = useState("");

  const [newPrDetails, setNewPrDetails] = useState({});

  const handleNewPrDetails = (details) => {
    setNewPrDetails(details);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setOrgName("");
    setRepoName("");
  };

  console.log(newPrDetails);

  const pattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  const isValid = (value) => pattern.test(value);

  const isFormValid = isValid(orgName) && isValid(repoName);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!orgName || !repoName) return;
    if (!isValid(orgName) || !isValid(repoName)) return;

    const prDetails = { orgName, repoName };

    handleNewPrDetails(prDetails);

    setOrgName("");
    setRepoName("");
  };

  return (
    <>
      {showModal && (
        <div className="md:w-[400px] z-[50] md:m-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center justify-between border border-[var(--color-brand-primary)] bg-[var(--color-card)] p-[16px]">
            <h3 className="text-white uppercase font-bold text-[18px]">
              Initialize Repository
            </h3>

            <button onClick={handleCloseModal} className="cursor-pointer">
              <Icon
                icon="solar:close-circle-outline"
                className="text-[var(--color-text)] h-[24px] w-[24px] hover:text-white"
              />
            </button>
          </div>
          <div className="bg-[var(--color-card)] p-[16px] border border-t-0 border-[var(--color-brand-primary)]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 modal"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-[8px]">
                  <label className="text-white uppercase text-[12px]">
                    github_org
                  </label>

                  <input
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    type="text"
                    placeholder="ENTER VALID ORG NAME..."
                    className={`p-[10px] text-white text-[14px] placeholder:text-[var(--color-text)] ${
                      orgName && !isValid(orgName) ? "border-[#ff00804d]" : ""
                    }`}
                  />

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

                <div className="flex flex-col gap-[8px]">
                  <label className="text-white uppercase text-[12px]">
                    github_repo_name
                  </label>

                  <input
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    type="text"
                    placeholder="ENTER VALID REPO NAME..."
                    className={`p-[10px] text-white text-[14px] placeholder:text-[var(--color-text)] ${
                      repoName && !isValid(repoName) ? "border-[#ff00804d]" : ""
                    }`}
                  />
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
                    onClick={handleCloseModal}
                    className="shadow-[inset_0_0_0_1px_#00ffff] px-[16px] text-[14px] py-[8px] text-[var(--color-text)] cursor-pointer hover:shadow-none delay-75 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!isFormValid}
                    className={`bg-[var(--color-brand-primary)] text-[#1E232D] text-[14px] px-[16px] py-[8px] cursor-pointer${
                      isFormValid
                        ? "bg-[var(--color-brand-primary)] text-[#1E232D] hover:opacity-90"
                        : "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
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
      {showModal && (
        <div
          onClick={handleCloseModal}
          className={`absolute z-[45] top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.6)] backdrop-blur-[3px]`}
        ></div>
      )}
    </>
  );
}
