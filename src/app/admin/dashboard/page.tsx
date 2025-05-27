"use client";
import React from 'react';

export default function DashboardPage() {
  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <StatsCard title="Customers" value="3,782" change="↑ 11.01%" positive />
            <StatsCard title="Orders" value="5,359" change="↓ 9.05%" />
            <StatsCard title="Monthly Target" value="75.55%" change="+10%" positive /> */}
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-2">Monthly Sales</h3>
            <div className="h-48 bg-blue-100 rounded"></div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-2">Statistics</h3>
            <div className="flex space-x-2 mb-4">
                {['Monthly', 'Quarterly', 'Annually'].map((tab) => (
                <button
                    key={tab}
                    className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700"
                >
                    {tab}
                </button>
                ))}
            </div>
            <div className="h-48 bg-indigo-100 rounded"></div>
            </div>
        </div>
    </>
  );
}
