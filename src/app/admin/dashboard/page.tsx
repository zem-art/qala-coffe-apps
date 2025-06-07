'use client';
import { useState } from "react";
import StatsCard from "~/app/_components/admin/statscard";
import ChartWrapper from "~/app/_components/rechart/chartWrapper";
import { api } from "~/trpc/react";

export default function DashboardPage() {
  const { data, isLoading } = api.dashboard.getCounts.useQuery();
  const { data: dataReview, isLoading: isLoadingReview } = api.dashboard.getStatisticsReview.useQuery({
    startDate: "2025-05-01",
    endDate: "2025-05-31",
  });
  const [selectedTab, setSelectedTab] = useState("Monthly");
  const [selectedTabChart, setSelectedTabChart] = useState("line_chart");
  const tabs = ["Monthly", "Quarterly", "Annually"];
  const exampleChart = ["line_chart", "pie_chart", "bar_chart"];

  const exampleLineChartData = [
    { date: "2025-01-01", totalReviews: 5 },
    { date: "2025-02-02", totalReviews: 8 },
    { date: "2025-03-02", totalReviews: 2 },
    { date: "2025-04-02", totalReviews: 4 },
    { date: "2025-05-02", totalReviews: 4 },
    { date: "2025-06-02", totalReviews: 6 },
    { date: "2025-07-02", totalReviews: 2 },
    { date: "2025-08-02", totalReviews: 7 },
    { date: "2025-09-02", totalReviews: 5 },
    { date: "2025-10-02", totalReviews: 3 },
    { date: "2025-11-02", totalReviews: 1 },
    { date: "2025-12-02", totalReviews: 6 },
  ]

  const examplePieChartData = [
    { label: "⭐ 1", value: 2 },
    { label: "⭐ 2", value: 4 },
    { label: "⭐ 3", value: 6 },
    { label: "⭐ 4", value: 3 },
    { label: "⭐ 5", value: 7 },
  ]

  const exampleBarChartData = [
    { month: "Jan", visitors: 120 },
    { month: "Feb", visitors: 90 },
    { month: "Mar", visitors: 150 },
    { month: "Apr", visitors: 100 },
    { month: "May", visitors: 170 },
    { month: "Jun", visitors: 130 },
    { month: "Jul", visitors: 180 },
    { month: "Aug", visitors: 160 },
    { month: "Sep", visitors: 140 },
    { month: "Oct", visitors: 200 },
    { month: "Nov", visitors: 175 },
    { month: "Dec", visitors: 190 },
  ];


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
            <StatsCard title="Customers" value={String(data?.userCount)} change="+0%" positive />
            <StatsCard title="Product" value={String(data?.productCount)} change="+0%" positive />
            <StatsCard title="category" value={String(data?.categoryCount)} change="0%" positive/>
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Review Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Monthly Sales</h3>
          {isSkeleton ? (
            <div className="h-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <div className="h-auto p-3 bg-blue-100 dark:bg-blue-300/20 rounded flex items-center justify-center text-sm text-blue-800 dark:text-blue-200">
              <ChartWrapper
                type="line"
                data={exampleLineChartData}
                dataKey="totalReviews"
                xKey="date"
              />
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
            <div className="h-auto bg-indigo-100 dark:bg-indigo-300/20 rounded flex items-center justify-center text-sm text-indigo-800 dark:text-indigo-200">
              {selectedTab == "Monthly" ? 
                <ChartWrapper
                  type="pie"
                  data={[
                    { label: "⭐ 1", value: 2 },
                    { label: "⭐ 2", value: 4 },
                    { label: "⭐ 3", value: 6 },
                    { label: "⭐ 4", value: 3 },
                    { label: "⭐ 5", value: 7 },
                  ]}
                  dataKey="value"
                  nameKey="label"
                />            
              : selectedTab == "Quarterly" ? 
                <ChartWrapper
                    type="pie"
                    data={[
                      { label: "⭐ 1", value: 2 },
                      { label: "⭐ 2", value: 4 },
                      { label: "⭐ 3", value: 6 },
                      { label: "⭐ 4", value: 3 },
                      { label: "⭐ 5", value: 7 },
                    ]}
                    dataKey="value"
                    nameKey="label"
                  />     
                : 
                <ChartWrapper
                    type="pie"
                    data={[
                      { label: "⭐ 1", value: 2 },
                      { label: "⭐ 2", value: 4 },
                      { label: "⭐ 3", value: 6 },
                      { label: "⭐ 4", value: 3 },
                      { label: "⭐ 5", value: 7 },
                    ]}
                    dataKey="value"
                    nameKey="label"
                  />     
                }
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-6">
        {/* Example Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white capitalize">example chart</h3>
          <div className="flex space-x-2 mb-4">
            {exampleChart.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTabChart(tab)}
                disabled={isSkeleton}
                className={`px-4 py-2 rounded-full text-sm transition cursor-pointer ${
                  selectedTabChart === tab
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {tab?.replace("_", " ")}
              </button>
            ))}
          </div>
          {isSkeleton ? (
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <div className="h-auto bg-indigo-100 dark:bg-indigo-300/20 rounded flex items-center justify-center text-sm text-indigo-800 dark:text-indigo-200">
              {selectedTabChart == "line_chart" ? 
                <ChartWrapper
                  type="line"
                  data={exampleLineChartData}
                  dataKey="totalReviews"
                  xKey="date"
                />
              : selectedTabChart == "pie_chart" ? 
                <ChartWrapper
                    type="pie"
                    data={examplePieChartData}
                    dataKey="value"
                    nameKey="label"
                  />     
                : 
                <ChartWrapper
                  type="bar"
                  data={exampleBarChartData}
                  dataKey="visitors"
                  xKey="rating"
                /> 
                }
            </div>
          )}
        </div>
      </div>
    </>
  );
}
