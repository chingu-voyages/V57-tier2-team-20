import { useEffect, useState, useMemo, useCallback } from "react";
import { Icon } from "@iconify/react";


export default function Pagination({ page, setPage, perPage, totalCount }) {

  const groupSize = 3;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  if (totalPages <= 1) return null;

  const initialGroup = Math.floor((page - 1) / groupSize) + 1;
  const [visibleGroup, setVisibleGroup] = useState(initialGroup);

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
    <div className="flex items-center justify-between border bg-card border-brand-primary/20 text-text p-6 text-sm">
      <span>
        Showing {startItem} to {endItem} of {totalCount} PR
      </span>

      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={goPrev}
          className={`px-3 py-2 border border-brand-primary ${
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
              className={`px-4 py-2 cursor-pointer hover:bg-brand-primary hover:border hover:border-brand-primary hover:text-mutted ${
                page === p ? "text-brand-primary border border-brand-primary bg-brand-primary/10" : ""
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
          className={`px-3 py-2 border border-brand-primary ${
            page === totalPages
              ? "border-brand-primary/20 text-brand-primary/20"
              : "text-brand-primary cursor-pointer"
          }`}
          aria-label="Next page"
        >
          <Icon icon="solar:arrow-right-outline" width="20" height="20" />
        </button>
      </div>

      <span>
        Page {page} of {totalPages}
      </span>
    </div>
  );
}
