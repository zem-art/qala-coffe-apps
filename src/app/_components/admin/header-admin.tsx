"use client";
import React from "react";
import { IconRenderer } from "../IconRenderer";
import ThemeToggle from "../theme_toggle";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function HeaderDashboard({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const handleLogout = async () => {
    if(window.confirm('Apakah Anda yakin ingin keluar?')){
      signOut({ callbackUrl: '/auth/sign-in' })
    }
  }
  return (
    <header className="sticky top-0 z-30 flex justify-between items-center bg-white/80 backdrop-blur-md dark:bg-gray-900/80 px-6 py-4 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none cursor-pointer"
          onClick={onToggleSidebar}
        >
          <IconRenderer
            name="MdMenu"
            lib="md"
            size={24}
          />
        </button>
      </div>

      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <button
          className="flex items-center justify-center rounded-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all cursor-pointer shadow-sm"
          title="Profil"
        >
          <IconRenderer
            name="FaUserCircle"
            lib="fa"
            size={18}
            />
        </button>
        <button
          className="flex items-center justify-center rounded-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-red-50 hover:text-red-500 hover:border-red-200 dark:hover:bg-red-900/30 dark:hover:text-red-400 dark:hover:border-red-800 text-gray-600 dark:text-gray-300 transition-all cursor-pointer shadow-sm"
          onClick={handleLogout}
          title="Keluar"
        >
          <IconRenderer
            name="FaDoorOpen"
            lib="fa"
            size={18}
          />
        </button>
      </div>
    </header>
  );
}
