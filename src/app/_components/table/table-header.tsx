import React from "react";

export function renderTableHeader(headers: string[]) {
  return (
    <thead className="bg-gray-100 dark:bg-gray-800 h-15">
      <tr>
        {headers.map((val, idx) => (
          <th
            key={idx}
            className="px-4 py-2 border-b dark:border-gray-700 text-left dark:text-background uppercase"
          >
            {val}
          </th>
        ))}
      </tr>
    </thead>
  );
}