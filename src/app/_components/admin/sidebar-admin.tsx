import { useState } from "react";
import { IconRenderer } from "../IconRenderer";
import { MdMenu, MdClose } from "react-icons/md";

const items: { name: string; icon: string; lib: "fa" | "md" | "ai" | "bs" }[] = [
  { name: "Dashboard", icon: "MdDashboard", lib: "md" },
  { name: "Users", icon: "FaUser", lib: "fa" },
  { name: "Settings", icon: "MdOutlineSettings", lib: "md" },
  { name: "Reports", icon: "FaTasks", lib: "fa" },
];

export default function SidebarDashboard({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        onClick={onClose}
      >
        <div className="p-6 text-2xl font-bold text-gray-800 dark:text-white">
          TailAdmin
        </div>
        <nav className="mt-4 space-y-2 px-4">
          {items.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <IconRenderer name={item.icon} lib={item.lib} size={20} />
              {item.name}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
