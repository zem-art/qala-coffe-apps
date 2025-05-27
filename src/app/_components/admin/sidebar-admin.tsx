import { IconRenderer } from "../IconRenderer";

const items: { name: string; icon: string; lib: "fa" | "md" | "ai" | "bs" }[] = [
  { name: "Dashboard", icon : "MdDashboard", lib : "md" },
  { name: "Users", icon : "FaUser", lib : "fa" },
  { name: "Settings", icon : "MdOutlineSettings", lib : "md" },
  { name: "Reports", icon : "FaTasks", lib : "fa" },
];

export default function SidebarDashboard() {
  return (
    <aside className="w-64 h-screen bg-white border-2 border-gray-200 dark:border-r dark:bg-gray-900 dark:border-gray-800">
      <div className="p-8 text-xl font-bold dark:text-background">TailAdmin</div>
      <nav className="mt-4 space-y-2 px-4">
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-background"
          >
            <IconRenderer
              name={item.icon}
              lib={item.lib}
              className="inline-block mr-2 "
              size={20}
              />
            {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
}