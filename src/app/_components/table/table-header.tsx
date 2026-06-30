import React from "react";

export function renderTableHeader(headers: string[]) {
  return (
    <thead className="bg-gray-50/50 dark:bg-gray-800/50">
      <tr>
        {headers.map((val, idx) => (
          <th
            key={idx}
            className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            {val}
          </th>
        ))}
      </tr>
    </thead>
  );
}