

import React from "react";
import { Icon } from "@iconify/react";

export default function SolutionBenefits() {
  return (
    <section className="w-full bg-gradient-to-b from-[#0c0f17] to-[#0d0f1c] text-white py-16 px-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#1d2433]">
            <Icon icon="solar:document-text-bold-duotone" className="text-cyan-400 text-xl" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
          SOLUTION BENEFITS
        </h2>
        <p className="text-gray-400 mt-4 text-sm md:text-base max-w-2xl mx-auto">
          Transform your development workflow with comprehensive PR tracking
          and team insights.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-[#111827] border border-cyan-500/50 rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all p-10">
          <div className="mb-4 ">
            <div className="w-12 h-12 flex items-center justify-center border-2 border-cyan-400">
              <Icon icon="solar:calendar-outline" className="text-cyan-400 text-xl" />
            </div>
          </div>
          <h3 className="text-cyan-400 text-lg font-semibold my-2">
            REAL-TIME PR TRACKING
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Monitor current PRs awaiting for review with live status updates
            and automated notifications.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#111827] border border-purple-500/50 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all p-10">
          <div className="mb-4 ">
            <div className="w-12 h-12 flex items-center justify-center  border-2 border-purple-400">
              <Icon icon="solar:chart-outline" className="text-purple-400 text-xl" />
            </div>
          </div>
          <h3 className="text-purple-400 text-lg font-semibold my-2">
            HISTORICAL INSIGHTS
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Track completed PR history and team performance metrics to
            identify bottlenecks and optimize workflows.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#111827] border border-pink-500/50 rounded-xl shadow-lg hover:shadow-pink-500/30 transition-all p-10">
          <div className="mb-4">
            <div className="w-12 h-12 flex items-center justify-center border-2 border-pink-400">
              <Icon icon="solar:monitor-outline" className="text-pink-400 text-xl" />
            </div>
          </div>
          <h3 className="text-pink-400 text-lg font-semibold my-2">
            TEAM DASHBOARD
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Customized views for GitHub repositories with role-based access
            and team-specific metrics.
          </p>
        </div>
      </div>
    </section>
  );
}
