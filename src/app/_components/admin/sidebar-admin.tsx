import { useState } from "react";
import { IconRenderer } from "../IconRenderer";
import type { IconLibrary } from "~/utils/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items: { name: string; icon: string; lib: IconLibrary; url: string }[] = [
  { name: "Dashboard", icon: "MdDashboard", lib: "md", url : "/admin/dashboard" },
  { name: "User", icon: "FaUser", lib: "fa", url: "/admin/users" },
  { name: "Product", icon: "FaCoffee", lib: "fa", url: "/admin/products" },
  { name: "Booking", icon: "RiCalendarScheduleLine", lib: "ri", url: "/admin/booking" },
  { name: "Review", icon: "BsBarChartLineFill", lib: "bs", url: "/admin/review" },
];

export default function SidebarDashboard({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl border-r-0 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 pt-12 text-2xl font-bold text-gray-800 dark:text-white uppercase relative flex items-center">
          <img
            src="/icons/logo.png"
            alt="Logo"
            className="w-12 h-12 mr-2 inline-block drop-shadow-md"
          />
          <span className="tracking-wide">admin</span>
          <button
            type="button"
            className="absolute top-7 right-4 cursor-pointer md:hidden bg-transparent border-none p-0"
            onClick={onClose}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            <IconRenderer
              name={isOpen ? "MdClose" : "MdMenu"}
              lib="md"
              size={24}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            />
          </button>
        </div>
        <div className="px-4 py-2 mt-2 text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-wider">
          Menu
        </div>
        <nav className="mt-2 space-y-1.5 px-4">
          {items.map((item, index) => {
            const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
            return (
              <Link
                key={index}
                href={item.url}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-main text-white shadow-md shadow-main/20"
                    : "text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-main dark:hover:text-white"
                }`}
              >
                <IconRenderer name={item.icon} lib={item.lib} size={20} className={isActive ? "text-white" : "opacity-80"} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}
