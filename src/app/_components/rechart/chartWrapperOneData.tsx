// this is a wrapper component for recharts to simplify usage
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
  
  type ChartWrapperProps = {
    type: ChartType;
    data: any[];
    dataKey: string; // nilai Y (ex: "totalReviews", "count")
    nameKey?: string; // untuk pie chart: nama kategori (ex: "label")
    xKey?: string; // untuk line/bar chart: nilai X (ex: "date")
    colors?: string[]; // optional custom warna
  };
  
  export default function ChartWrapper({
    type,
    data,
    dataKey,
    xKey = "name",
    nameKey = "name",
    colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"],
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
              <Line type="monotone" dataKey={dataKey} stroke={colors[1]} />
            </LineChart>
          ) : type === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey={dataKey} fill={colors[0]} />
            </BarChart>
          ) : (
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={data}
                dataKey={dataKey}
                nameKey={nameKey}
                outerRadius={100}
                label
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          )}
      </ResponsiveContainer>
    );
  }
  