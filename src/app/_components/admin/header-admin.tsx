import ThemeToggle from "../theme_toggle";

export default function HeaderDashboard() {
  return (
    <header className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-4 shadow">
      <input
        type="text"
        placeholder="Search or type command..."
        className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex items-center space-x-4">
        <ThemeToggle/>
        <button className="w-8 h-8 bg-gray-200 rounded-full" />
        <div className="w-8 h-8 bg-blue-500 rounded-full" />
      </div>
    </header>
  );
}