

import React from "react";
import { Icon } from "@iconify/react";

export default function SolutionBenefits() {
  return (
    <section className="flex flex-col items-center justify-center gap-12 bg-[#0A0A0F] bg-[linear-gradient(135deg,rgba(1,255,255,0.05)_0%,rgba(1,255,255,0)_50%,rgba(138,43,226,0.05)_100%)] text-white py-15 px-6 md:px-25 lg:px-35 xl:px-50">
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-4 w-full ">
        <div className="flex items-center justify-between gap-4 text-brand-primary w-full">
          <div className="flex-1 border-t border-brand-primary"></div>
          <Icon icon="solar:course-up-outline" width="40" height="40" color="#0A0A0F" className="p-2 bg-brand-primary"/>
          <div className="flex-1 border-t border-brand-primary"></div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
          SOLUTION BENEFITS
        </h2>
        
        <p className='bg-[#1E232D33] p-5 text-sm border-l-4 border-[#00FFFF] leading-relaxed text-[#9696AA] md:max-w-[550px]'>
            Transform your development workflow with comprehensive PR tracking
          and team insights.
          </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  mx-auto items-stretch justify-center">
        {/* Card 1 */}
        <div className="transition-all duration-500 hover:scale-105 group relative bg-[#01FFFF0D] flex flex-col items-start justify-center gap-4 p-8 border border-brand-primary">
        <span className="absolute top-0 right-0 
            border-t-[20px] border-l-[20px] 
            border-t-brand-primary border-l-transparent"></span>
          <Icon icon="solar:bolt-outline" width="40" height="40" className="transform group-hover:rotate-6 transition-transform duration-300 text-brand-primary border-1 p-2 bg-[#01FFFF1A] border-brand-primary"/>            
          <h3 className="text-white tracking-wide text-lg font-semibold uppercase">
            real-time pr tracking
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-[224px]">
            Monitor current PRs awaiting for review with live status updates
            and automated notifications.
          </p>
        </div>

        {/* Card 2 */}
        <div className="duration-500 hover:scale-105 group relative bg-[#141923] flex flex-col items-start justify-center gap-4  transition-all p-8 border border-brand ">
        <span className="absolute top-0 right-0 
            border-t-[20px] border-l-[20px] 
            border-t-brand border-l-transparent"></span>
          <Icon icon="solar:chart-2-outline" width="40" height="40" className="transform group-hover:rotate-6 transition-transform duration-300 text-brand border-1 p-2 bg-[#8A2BE21A] border-brand"/>            
          <h3 className="text-white tracking-wide text-lg font-semibold uppercase">
            historical insights          
            </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-[224px]">
            Track completed PR history and
            team performance metrics to
            identify bottlenecks and optimize
            workflow.
          </p>
        </div>
        
         
        {/* Card 3 */}
        <div className="transition-all duration-500 hover:scale-105 group relative bg-[#FF00800D] flex flex-col items-start justify-center gap-4  p-8 border border-brand-secondary ">
        <span className="absolute top-0 right-0 
            border-t-[20px] border-l-[20px] 
            border-t-brand-secondary border-l-transparent"></span>
          <Icon icon="solar:users-group-rounded-outline" width="40" height="40" className="transform group-hover:rotate-6 transition-transform duration-300 text-brand-secondary border-1 p-2 bg-[#FF00801A] border-brand-secondary"/>            
          <h3 className="text-white tracking-wide text-lg font-semibold uppercase">
            team dashboard
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-[224px]">
            Customized views for GitHub repositories with role-based access
            and team-specific metrics.
          </p>
        </div>
        
      </div>
    </section>
  );
}
