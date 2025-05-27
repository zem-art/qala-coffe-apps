"use client";
import { useEffect, useState } from "react";
import { IconRenderer } from "./IconRenderer";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDarkMode(isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-2.5 items-center dark:bg-gray-700 text-sm dark:border-none cursor-pointer border-2 border-gray-300"
    >
      <IconRenderer
        name={darkMode ? "FaSun" : "FaMoon"}
        className={darkMode ? "text-yellow-500" : "text-gray-800"}
        lib="fa"
        size={17}
        />
    </button>
  );
}
