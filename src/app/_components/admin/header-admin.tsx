import ThemeToggle from "../theme_toggle";

export default function HeaderDashboard({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-4 shadow">
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu */}
        <button
          className="md:hidden text-gray-600 dark:text-white focus:outline-none"
          onClick={onToggleSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <input
          type="text"
          placeholder="Search or type command..."
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button className="w-8 h-8 bg-gray-200 rounded-full" />
        <div className="w-8 h-8 bg-blue-500 rounded-full" />
      </div>
    </header>
  );
}
