'use client';
import { useState } from "react";
import StatsCard from "~/app/_components/admin/statscard";
import { api } from "~/trpc/react";

export default function DashboardPage() {
  const { data, isLoading } = api.dashboard.getCounts.useQuery();
  const [selectedTab, setSelectedTab] = useState("Monthly");
  const tabs = ["Monthly", "Quarterly", "Annually"];

  const isSkeleton = isLoading || !data;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isSkeleton ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow animate-pulse">
              <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
              <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
          ))
        ) : (
          <>
            <StatsCard title="Customers" value={String(data?.userCount)} change="+1%" positive />
            <StatsCard title="Product" value={String(data?.productCount)} change="+1%" positive />
            <StatsCard title="Orders" value="5,359" change="-9%" />
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Monthly Sales</h3>
          {isSkeleton ? (
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <div className="h-48 bg-blue-100 dark:bg-blue-300/20 rounded flex items-center justify-center text-sm text-blue-800 dark:text-blue-200">
              [Chart Placeholder]
            </div>
          )}
        </div>

        {/* Statistics Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Statistics</h3>
          <div className="flex space-x-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                disabled={isSkeleton}
                className={`px-4 py-2 rounded-full text-sm transition cursor-pointer ${
                  selectedTab === tab
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {isSkeleton ? (
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <div className="h-48 bg-indigo-100 dark:bg-indigo-300/20 rounded flex items-center justify-center text-sm text-indigo-800 dark:text-indigo-200">
              [Data: {selectedTab}]
            </div>
          )}
        </div>
      </div>
    </>
  );
}
