import { IconRenderer } from "../IconRenderer";
import type { IconLibrary } from "~/utils/icon";

type StatsCardProps = {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  iconName?: string;
  iconLib?: IconLibrary;
};

export default function StatsCard({ title, value, change, positive, iconName, iconLib }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">{title}</h4>
        {iconName && iconLib && (
          <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-gray-800 text-main">
            <IconRenderer name={iconName} lib={iconLib} size={20} />
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
        <p className={`text-sm font-medium flex items-center gap-1 ${positive ? 'text-green-500' : 'text-red-500'}`}>
          <IconRenderer name={positive ? "MdTrendingUp" : "MdTrendingDown"} lib="md" size={16} />
          <span>{change} <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">vs bulan lalu</span></span>
        </p>
      </div>
    </div>
  );
}