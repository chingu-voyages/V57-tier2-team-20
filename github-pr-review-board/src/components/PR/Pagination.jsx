import { useEffect, useState, useMemo, useCallback } from "react";
import { Icon } from "@iconify/react";


export default function Pagination({ page, setPage, perPage, totalCount }) {
  const groupSize = 3;
  const initialGroup = Math.floor((page - 1) / groupSize) + 1;
  const [visibleGroup, setVisibleGroup] = useState(initialGroup);
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

  useEffect(() => {
    setVisibleGroup(Math.floor((page - 1) / groupSize) + 1);
  }, [page, groupSize]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const groupStart = (visibleGroup - 1) * groupSize + 1;
  const groupEnd = Math.min(visibleGroup * groupSize, totalPages);

  const getPages = useMemo(() => {
    const pages = [];
    if (totalPages <= groupSize) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (groupStart > 1) pages.push("left-ellipsis");
    for (let i = groupStart; i <= groupEnd; i++) pages.push(i);
    if (groupEnd < totalPages) pages.push("right-ellipsis");

    return pages;
  }, [groupStart, groupEnd, totalPages, groupSize]);

  const goToPage = useCallback(
    (p) => {
      const targetGroup = Math.floor((p - 1) / groupSize) + 1;
      setVisibleGroup(targetGroup);
      setPage(p);
      scrollToTop();
    },
    [setPage, scrollToTop, groupSize]
  );

  const goNext = useCallback(() => {
    const nextPage = Math.min(page + 1, totalPages);
    setPage(nextPage);
    setVisibleGroup(Math.floor((nextPage - 1) / groupSize) + 1);
    scrollToTop();
  }, [page, totalPages, setPage, scrollToTop, groupSize]);

  const goPrev = useCallback(() => {
    const prevPage = Math.max(page - 1, 1);
    setPage(prevPage);
    setVisibleGroup(Math.floor((prevPage - 1) / groupSize) + 1);
    scrollToTop();
  }, [page, setPage, scrollToTop, groupSize]);

  const onEllipsisClick = useCallback(
    (which) => {
      if (which === "left-ellipsis") {
        const prevGroup = Math.max(visibleGroup - 1, 1);
        const p = (prevGroup - 1) * groupSize + 1;
        setVisibleGroup(prevGroup);
        setPage(p);
      } else {
        const nextGroup = Math.min(visibleGroup + 1, Math.ceil(totalPages / groupSize));
        const p = (nextGroup - 1) * groupSize + 1;
        setVisibleGroup(nextGroup);
        setPage(p);
      }
    },
    [visibleGroup, totalPages, setPage, groupSize]
  );

  const startItem = (page - 1) * perPage + 1;
  const endItem = Math.min(page * perPage, totalCount);
return (
  <div className="border bg-card border-brand-primary/20 text-text p-3 md:p-6 text-sm flex flex-col items-center gap-4 md:grid md:grid-cols-3 md:items-center">
    
    {/* Left span (desktop) / top-left on mobile */}
    <div className="flex w-full justify-between md:justify-start items-center gap-2 md:col-start-1">
      <span className="whitespace-nowrap">
        Showing {startItem} to {endItem} of {totalCount} PR
      </span>
      <span className="whitespace-nowrap md:hidden">
        Page {page} of {totalPages}
      </span>
    </div>

    {/* Pagination Center */}
    <div className="flex w-full justify-center md:col-start-2">
      <div className="flex justify-between  items-center gap-1 md:gap-2">
        <button
          disabled={page === 1}
          onClick={goPrev}
          className={`px-2 py-2 md:px-3  border border-brand-primary ${
            page === 1
              ? "border-brand-primary/20 text-brand-primary/20"
              : "text-brand-primary cursor-pointer"
          }`}
          aria-label="Previous page"
        >
          <Icon icon="solar:arrow-left-outline" width="20" height="20" />
        </button>

        {getPages.map((p, idx) =>
          typeof p === "string" ? (
            <button
              key={p + idx}
              onClick={() => onEllipsisClick(p)}
              className="px-2 select-none"
              aria-label={p === "left-ellipsis" ? "Previous group" : "Next group"}
            >
              ...
            </button>
          ) : (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-3 py-2 md:px-4  cursor-pointer hover:bg-brand-primary hover:border hover:border-brand-primary hover:text-mutted ${
                page === p
                  ? "text-brand-primary border border-brand-primary bg-brand-primary/10"
                  : ""
              }`}
              aria-current={page === p ? "page" : undefined}
            >
              {String(p).padStart(2, "0")}
            </button>
          )
        )}

        <button
          disabled={page === totalPages}
          onClick={goNext}
          className={`px-2 md:px-3 py-2 border border-brand-primary ${
            page === totalPages
              ? "border-brand-primary/20 text-brand-primary/20"
              : "text-brand-primary cursor-pointer"
          }`}
          aria-label="Next page"
        >
          <Icon icon="solar:arrow-right-outline" width="20" height="20" />
        </button>
      </div>
    </div>

    {/* Right span (desktop only) */}
    <div className="hidden md:flex justify-end md:col-start-3">
      <span>Page {page} of {totalPages}</span>
    </div>
  </div>
);



}
