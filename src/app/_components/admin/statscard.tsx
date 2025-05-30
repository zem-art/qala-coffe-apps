 type StatsCardProps = {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
};

export default function StatsCard({ title, value, change, positive }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h4>
      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
      <p className={`text-sm ${positive ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
    </div>
  );
}