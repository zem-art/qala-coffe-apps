"use client";
import React from "react";
import { IconRenderer } from "../IconRenderer";
import ThemeToggle from "../theme_toggle";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function HeaderDashboard({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const handleLogout = async () => {
    if(window.confirm('Are you sure you want to log out ?.')){
      signOut({ callbackUrl: '/auth/sign-in' })
    }
  }
  return (
    <header className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-4 shadow border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu */}
        <button
          className="md:hidden text-gray-600 dark:text-white focus:outline-none cursor-pointer"
          onClick={onToggleSidebar}
        >
          <IconRenderer
            name="MdMenu"
            lib="md"
            size={24}
            className="text-gray-600 dark:text-white"
          />
        </button>

        {/* <input
          type="text"
          placeholder="Search or type command..."
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button
          className="rounded-full p-2.5 items-center dark:bg-gray-700 text-sm dark:border-none cursor-pointer border-2 border-gray-300"
        >
          <IconRenderer
            name="FaUserCircle"
            className="text-gray-800 dark:text-white"
            lib="fa"
            size={17}
            />
        </button>
        <button
          className="rounded-full p-2.5 items-center dark:bg-gray-700 text-sm dark:border-none cursor-pointer border-2 border-gray-300"
          onClick={handleLogout}
        >
          <IconRenderer
            name="FaDoorOpen"
            className="text-gray-800 dark:text-white"
            lib="fa"
            size={17}
          />
        </button>
       
      </div>
    </header>
  );
}
