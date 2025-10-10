import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function PRFilter({ allPRs, currentFilters, onFilterChange }) {
  const [authors, setAuthors] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [branches, setBranches] = useState([]);

  const [searchAuthor, setSearchAuthor] = useState(currentFilters.author || "");
  const [searchReviewer, setSearchReviewer] = useState(currentFilters.reviewer || "");
  const [searchBranch, setSearchBranch] = useState(currentFilters.branch || "");

  const [showAuthors, setShowAuthors] = useState(false);
  const [showReviewers, setShowReviewers] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedReviewer, setSelectedReviewer] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");




  useEffect(() => {
    if (allPRs?.length) {
      setAuthors([...new Set(allPRs.map((pr) => pr.author).filter(Boolean))]);
      setReviewers([
        ...new Set(
          allPRs
            .flatMap((pr) => pr.reviewers?.map((rev) => rev.login) || [])
            .filter(Boolean)
        ),
]);
      setBranches([...new Set(allPRs.map((pr) => pr.fromBranch).filter(Boolean))]);
    }
  }, [allPRs]);
  
useEffect(() => {
  // If there are filters in URL, mark as applied
  if (currentFilters.author || currentFilters.reviewer || currentFilters.branch) {
    setFiltersApplied(true);
  }
}, [currentFilters]);

// Check if any filter is applied
  const isApplyActive = selectedAuthor || selectedReviewer || selectedBranch || filtersApplied;

  const filteredAuthors = authors.filter((a) =>
    a.toLowerCase().startsWith(searchAuthor.toLowerCase())
  );

  const filteredReviewers = reviewers.filter((r) =>
    r.toLowerCase().startsWith(searchReviewer.toLowerCase())
  );

  const filteredBranches = branches.filter((b) =>
    b.toLowerCase().startsWith(searchBranch.toLowerCase())
  );


  const applyFilter = () => {
    onFilterChange({
      author: searchAuthor.trim(),
      reviewer: searchReviewer.trim(),
      branch: searchBranch.trim(),
    });
    setFiltersApplied(true); // mark filters as applied

  };

  const clearAll = () => {
    setSearchAuthor("");
    setSearchReviewer("");
    setSearchBranch("");
    onFilterChange({});
    setFiltersApplied(false)
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
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
      {/* Author Filter */}
      <div className="w-full relative ">
        <label className="text-xs text-white">Created By</label>
        <input
          type="text"
          value={searchAuthor}
          onChange={(e) => {
            setSearchAuthor(e.target.value);
            setShowAuthors(e.target.value.length > 0);
          }}
          placeholder="TYPE VALID USER NAME..."
          className={`mt-2 border px-4 py-3 text-sm w-full bg-transparent
                  ${searchAuthor.length > 0 ? "border-brand-primary text-white" : "border-brand-primary/20 text-white/50"}
                  focus:border-brand-primary focus:text-white outline-none`}
        />
        {showAuthors && (
          <ul className="absolute top-[80px] left-0 w-full bg-background border border-brand/30  max-h-40 overflow-y-auto z-20 p-4 space-y-2">
            {filteredAuthors.length > 0 ? (
              filteredAuthors.map((author) => (
                <li
                  key={author}
                  onClick={() => {
                    setSearchAuthor(author);
                    setSelectedAuthor(author);
                    setShowAuthors(false);
                  }}
                  className="border border-text/30 p-1 text-sm text-text hover:bg-brand-primary/10 hover:border-brand-primary/30 hover:text-brand-primary bg-text/20 cursor-pointer"
                >
                  {author}
                </li>
              ))
            ) : (
              <li className="border border-brand-secondary/30 p-1 text-sm text-brand-secondary  bg-brand-secondary/10">No authors found</li>
            )}
          </ul>
        )}
      </div>

      {/* Reviewer Filter */}
      <div className="w-full relative">
        <label className="text-xs text-white">Reviewer</label>
        <input
          type="text"
          value={searchReviewer}
          onChange={(e) => {
            setSearchReviewer(e.target.value);
            setShowReviewers(e.target.value.length > 0);
          }}
          placeholder="TYPE VALID USER NAME..."
          className={`mt-2 border px-4 py-3 text-sm w-full bg-transparent
                  ${searchReviewer.length > 0 ? "border-brand-primary text-white" : "border-brand-primary/20 text-white/50"}
                  focus:border-brand-primary focus:text-white outline-none`}
        />
        {showReviewers && (
          <ul className="absolute top-[80px] left-0 w-full bg-background border border-brand/30   max-h-40 overflow-y-auto z-20 p-4 space-y-2">
            {filteredReviewers.length > 0 ? (
              filteredReviewers.map((rev) => (
                <li
                  key={rev}
                  onClick={() => {
                    setSearchReviewer(rev);
                    setSelectedReviewer(rev)
                    setShowReviewers(false);
                  }}
                  className="border border-text/30 p-1 text-sm text-text hover:bg-brand-primary/10 hover:border-brand-primary/30 hover:text-brand-primary bg-text/20 cursor-pointer"
                >
                  {rev}
                </li>
              ))
            ) : (
              <li className="border border-brand-secondary/30 p-1 text-sm text-brand-secondary  bg-brand-secondary/10">No reviewers found</li>
            )}
          </ul>
        )}
      </div>

      {/* Branch Filter */}
      <div className="w-full relative">
        <label className="text-xs text-white">Branch</label>
        <input
          type="text"
          value={searchBranch}
          onChange={(e) => {
            setSearchBranch(e.target.value);
            setShowBranches(e.target.value.length > 0);
          }}
          placeholder="TYPE VALID BRANCHE NAME..."
          className={`mt-2 border px-4 py-3 text-sm w-full bg-transparent
                  ${searchBranch.length > 0 ? "border-brand-primary text-white" : "border-brand-primary/20 text-white/50"}
                  focus:border-brand-primary focus:text-white outline-none`}
        />
        {showBranches && (
          <ul className="absolute top-[80px] left-0 w-full bg-background border border-brand/30  max-h-40 overflow-y-auto z-20 p-4 space-y-2">
            {filteredBranches.length > 0 ? (
              filteredBranches.map((b) => (
                <li
                  key={b}
                  onClick={() => {
                    setSearchBranch(b);
                    setSelectedBranch(b);
                    setShowBranches(false);
                  }}
                  className="border border-text/30 p-1 text-sm text-text hover:bg-brand-primary/10 hover:border-brand-primary/30 hover:text-brand-primary bg-text/20 cursor-pointer"
                >
                  {b}
                </li>
              ))
            ) : (
              <li className="border border-brand-secondary/30 p-1 text-sm text-brand-secondary  bg-brand-secondary/10">No branches found</li>
            )}
          </ul>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end items-center w-full mt-6 gap-2">
      <div className={`flex items-center justify-center gap-2 px-2.5 py-[5.9px] border bg-brand-secondary/10 border-brand-secondary text-brand-secondary cursor-pointer hover:text-white hover:bg-brand-secondary
          ${isApplyActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} 
          onClick={() => {
                clearAll();
                setSelectedAuthor("");
                setSelectedReviewer("");
                setSelectedBranch("");
                setFiltersApplied(false);
              }}>          
          <Icon icon="solar:close-circle-outline" width="24" height="24" />
          <span>Clear</span>
        </div>
        
        <div className={`flex items-center justify-center gap-2 px-4 py-2 text-background cursor-pointer
                ${isApplyActive ? "bg-brand hover:bg-brand" : "bg-brand/20"}`}
              onClick={applyFilter}
        >
          <Icon icon="solar:filter-outline" width="24" height="24" />
          <span>Apply Filters</span>
        </div>
      </div>
      </div>
      }
    </div>
  );
}
