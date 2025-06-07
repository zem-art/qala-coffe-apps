// this is a wrapper for recharts to support line, bar, and pie charts with multiline/multibar support
"use client";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type ChartType = "line" | "bar" | "pie";

type DataKeyConfig = {
  key: string;
  name?: string;
  color?: string;
};

type ChartWrapperProps = {
  type: ChartType;
  data: any[];
  dataKeys: DataKeyConfig[]; // multi-line/multi-bar support
  nameKey?: string; // untuk pie chart
  xKey?: string; // untuk bar/line
  colors?: string[];
};

const defaultColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

export default function ChartWrapperMulti({
  type,
  data,
  dataKeys,
  xKey = "name",
  nameKey = "name",
  colors = defaultColors,
}: ChartWrapperProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      {type === "line" ? (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          {dataKeys.map((item, index) => (
            <Line
              key={item.key}
              type="monotone"
              dataKey={item.key}
              stroke={item.color || colors[index % colors.length]}
              name={item.name || item.key}
            />
          ))}
        </LineChart>
      ) : type === "bar" ? (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          {dataKeys.map((item, index) => (
            <Bar
              key={item.key}
              dataKey={item.key}
              fill={item.color || colors[index % colors.length]}
              name={item.name || item.key}
            />
          ))}
        </BarChart>
      ) : (
        <PieChart>
          <Tooltip />
          <Legend />
          <Pie
            data={data}
            dataKey={dataKeys[0]?.key || "value"}
            nameKey={nameKey}
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      )}
    </ResponsiveContainer>
  );
}
