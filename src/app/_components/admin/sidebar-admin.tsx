import { useState } from "react";
import { IconRenderer } from "../IconRenderer";

const items: { name: string; icon: string; lib: "fa" | "md" | "ai" | "bs"; url?: string }[] = [
  { name: "Dashboard", icon: "MdDashboard", lib: "md", url : "/admin/dashboard" },
  { name: "Admin", icon: "FaUser", lib: "fa", url: "/admin/users" },
  { name: "Product", icon: "FaCoffee", lib: "fa", url: "/admin/products" },
  { name: "Reports", icon: "FaTasks", lib: "fa", url: "/admin/reports" },
];

export default function SidebarDashboard({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 pt-12 text-2xl font-bold text-gray-800 dark:text-white uppercase relative flex items-center">
          <img
            src="/icons/logo.png"
            alt="Logo"
            className="w-12 h-12 mr-2 inline-block"
          />
          admin
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
              className=""
            />
          </button>
        </div>
        <a className="px-4 py-2 text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase">
          Menu
        </a>
        <nav className="mt-4 space-y-2 px-4">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.url || "#"}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <IconRenderer name={item.icon} lib={item.lib} size={20} />
              {item.name}
            </a>
          ))}
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
