import React from 'react'
import { Icon } from "@iconify/react";

export default function PRFilterButtons({ canApply, onApply, onClear, isApplyActive}) {
  return (
    <div className="flex justify-end items-center w-full mt-6 gap-2">
        <div className={`flex items-center justify-center gap-2 px-2.5 py-[5.9px] border bg-brand-secondary/10 border-brand-secondary text-brand-secondary cursor-pointer hover:text-white hover:bg-brand-secondary
          ${isApplyActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} 
          onClick={onClear}>         
          <Icon icon="solar:close-circle-outline" width="24" height="24" />
          <span>Clear</span>
        </div>
        <div
          className={`flex items-center justify-center gap-2 px-4 py-2 text-background transition
            ${
              canApply
                ? "bg-brand hover:text-white cursor-pointer"
                : "bg-brand/20 cursor-not-allowed opacity-50"
            }`}
          onClick={() => canApply && onApply()}
        >
          <Icon icon="solar:filter-outline" width="24" height="24" />
          <span>Apply Filters</span>
        </div>

      </div>
  )
}
