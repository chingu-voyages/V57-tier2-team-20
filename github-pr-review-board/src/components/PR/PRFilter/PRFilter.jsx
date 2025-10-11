import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import PRFilterInput from "./PRFilterInput";
import PRFilterButtons from "./PRFilterButtons";

export default function PRFilter({ allPRs, currentFilters, onFilterChange }) {
  const [authors, setAuthors] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(currentFilters.author || "");
  const [selectedReviewer, setSelectedReviewer] = useState(currentFilters.reviewer || "");
  const [selectedBranch, setSelectedBranch] = useState(currentFilters.branch || "");

  useEffect(() => {
    if (allPRs?.length) {
      setAuthors([...new Set(allPRs.map((pr) => pr.author).filter(Boolean))]);
      setReviewers([
        ...new Set(allPRs.flatMap((pr) => pr.reviewers?.map((rev) => rev.login) || []).filter(Boolean)),
      ]);
      setBranches([...new Set(allPRs.map((pr) => pr.fromBranch).filter(Boolean))]);
    }
  }, [allPRs]);
// if URL already had filters when component mounts, treat them as applied
  useEffect(() => {
    if (currentFilters.author || currentFilters.reviewer || currentFilters.branch) {
      setFiltersApplied(true);
    }
  }, [currentFilters]);

   const canApply = Boolean(
    selectedAuthor || selectedReviewer || selectedBranch
  );
 const applyFilter = () => {
    onFilterChange({
      author: selectedAuthor,
      reviewer: selectedReviewer,
      branch: selectedBranch,
    });
    setFiltersApplied(true);
  };

  const clearAll = () => {
    setSelectedAuthor("");
    setSelectedReviewer("");
    setSelectedBranch("");
    setFiltersApplied(false)
    onFilterChange({});
  };


  return (
    <div className="flex flex-col items-start gap-5 p-6 bg-card border border-brand-primary/20 w-full relative">
      <div className="flex items-center gap-1 w-full justify-between">
        <div className="flex items-center gap-2 text-text">
          <Icon icon="solar:filter-outline" width="24" height="24" />
          <h3 className="uppercase text-xs">Filter PRs</h3>
          {filtersApplied && (
          <span className="md:ml-2 px-3 py-2 text-sm bg-brand-primary/20 border border-brand-primary text-brand-primary ">Active</span>
          )}
        </div>
        <div className="flex items-center cursor-pointer justify-center gap-2 border border-brand/30 text-brand px-2 md:px-3 py-2"
              onClick={() => setCollapsed(!collapsed)}
              >
          {collapsed ? 
          <>            
            <span>Expand</span>
            <Icon icon="solar:play-linear" width="16" height="16" className="rotate-90"/>
          </>
          : 
          <>
            <span>Collapse</span>
            <Icon icon="solar:play-linear" width="16" height="16" className="-rotate-90"/>
          </>

          }
        </div>
      </div>
      { !collapsed &&
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full">
        <PRFilterInput label="Created By" selectedValue ={selectedAuthor} options={authors} onSelect={setSelectedAuthor}/>
        <PRFilterInput label="Reviewer" selectedValue ={selectedReviewer} options={reviewers} onSelect={setSelectedReviewer} />
        <PRFilterInput label="Branch" selectedValue ={selectedBranch} options={branches} onSelect={setSelectedBranch} />
        <PRFilterButtons 
          canApply ={ canApply}
          onApply = { applyFilter}
          onClear = { clearAll}
          isApplyActive = { filtersApplied || canApply}
        />
      </div>
      }
    </div>
  );
}
