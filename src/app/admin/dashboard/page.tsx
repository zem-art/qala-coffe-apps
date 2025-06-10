'use client';
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import StatsCard from "~/app/_components/admin/statscard";
import ChartWrapper from "~/app/_components/rechart/chartWrapperOneData";
import ChartWrapperMulti from "~/app/_components/rechart/chartWrapperTwoData ";
import { exampleBarChartData, exampleLineChartData, examplePieChartData } from "~/utils/sample/data";
import DateRangePicker, { type DateRangeValue } from "~/app/_components/date/DateRangePicker";
import { format, parseISO, startOfMonth } from "date-fns";

export default function DashboardPage() {
  const { data: dataCount, isLoading } = api.dashboard.getCounts.useQuery();
  const [selectedTab, setSelectedTab] = useState<string>("Monthly");
  const [selectedTabChart, setSelectedTabChart] = useState<string>("line_chart");
  const tabs = ["Monthly"];
  // const tabs = ["Monthly", "Quarterly", "Annually"];
  const exampleChart = ["line_chart", "pie_chart", "bar_chart"];
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    startDate: "",
    endDate: "",
  });
  const { data: dataReview, refetch, isLoading: isLoadingReview, isFetching } = api.dashboard.getStatisticsReview.useQuery({
      startDate: dateRange.startDate || "2025-01-01",
      endDate: dateRange.endDate || "2025-01-31",
    },
    /**
     * hanya fetch ketika Apply ditekan.
     * Nilai awal dari isLoadingReview dan isFetching adalah false karena kamu mengatur enabled: false di dalam useQuery
     * Karena enabled: false, query tidak dijalankan secara otomatis saat komponen dimount.
     * Maka React Query tidak memulai proses fetch → artinya isLoadingReview dan isFetching tetap false.
     * Status baru berubah setelah kamu memanggil refetch().
     */
    // {
    //   enabled: false,
    // }
  );
  
  const pieChartResult = Object.entries(dataReview?.ratingsCount || {})?.map(([key, value]) => ({ label : `⭐ ${key}` , value}))
  const lineChartResult = Object.entries(dataReview?.dailyReviews || {})?.map(([key, value]) => ({ date: `${key}`, totalReviews: value }))
  const isSkeletonCount = isLoading || !dataCount;
  const isSkeletonReview = isLoadingReview || isFetching;
  const isValid = dateRange.startDate !== "" && dateRange.endDate !== "";
  
  const handleApplyDateRange = (range: DateRangeValue) => {
    if (range.startDate === range.endDate) {
      const date = parseISO(range.startDate);
      setDateRange({
        ...range,
        startDate : format(startOfMonth(date), 'yyyy-MM-dd')
      });

      // Jika perlu refetch juga:
      setTimeout(() => {
        refetch().catch(console.error);
      }, 0);
      return;
    }

    setDateRange(range);
    // tunggu state update, lalu refetch
    setTimeout(() => {
      refetch().catch(console.error);
    }, 0);
  };

  useEffect(() => {
    if (isValid) {
      refetch();
    }
  }, [dateRange]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-background">Welcome</h1>
        <div className="absolute right-5 top-20 z-50">
          <DateRangePicker onApply={handleApplyDateRange}/>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isSkeletonCount ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow animate-pulse">
              <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
              <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
          ))
        ) : (
          <>
            <StatsCard title="Customers" value={String(dataCount?.userCount)} change="+0%" positive />
            <StatsCard title="Product" value={String(dataCount?.productCount)} change="+0%" positive />
            <StatsCard title="category" value={String(dataCount?.categoryCount)} change="0%" positive/>
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Review Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Monthly Reviews</h3>
          {isSkeletonReview ? (
            <div className="h-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <div className="h-auto p-3 bg-blue-100 dark:bg-blue-300/20 rounded flex items-center justify-center text-sm text-blue-800 dark:text-blue-200">
              <ChartWrapper
                type="line"
                data={lineChartResult}
                dataKey="totalReviews"
                xKey="date"
              />
            </div>
          )}
        </div>

        {/* Statistics Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Statistics Review</h3>
          <div className="flex space-x-2 mb-4 justify-between">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                disabled={isSkeletonReview}
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
          {isSkeletonReview ? (
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <div className="h-auto bg-indigo-100 dark:bg-indigo-300/20 rounded flex items-center justify-center text-sm text-indigo-800 dark:text-indigo-200">
              {selectedTab == "Monthly" ? 
                <ChartWrapper
                  type="pie"
                  data={pieChartResult || []}
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
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white capitalize">example chart simplify usage</h3>
          <div className="flex space-x-2 mb-4">
            {exampleChart.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTabChart(tab)}
                disabled={isSkeletonReview}
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
          {isSkeletonReview ? (
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

      <div className="mt-6 grid gap-6">
        {/* Example Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white capitalize">example multi chart</h3>
          <div className="flex space-x-2 mb-4">
            {exampleChart.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTabChart(tab)}
                disabled={isSkeletonReview}
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
          {isSkeletonReview ? (
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <div className="h-auto bg-indigo-100 dark:bg-indigo-300/20 rounded flex items-center justify-center text-sm text-indigo-800 dark:text-indigo-200">
              {selectedTabChart == "line_chart" ? 
                <ChartWrapperMulti
                  type="line"
                  data={exampleLineChartData}
                  dataKeys={[
                    { key: "totalReviews", name: "Review" },
                    { key: "totalUsers", name: "User" },
                  ]}
                  xKey="date"
                />
              : selectedTabChart == "pie_chart" ? 
                <ChartWrapperMulti
                    type="pie"
                    data={examplePieChartData}
                    dataKeys={[{ key: "value" }]}
                    nameKey="label"
                  />     
                : 
                <ChartWrapperMulti
                  type="bar"
                  data={exampleBarChartData}
                  dataKeys={[
                    { key: "visitors", name: "Pengunjung" },
                    { key: "sales", name: "Penjualan" },
                  ]}
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
