// app/(admin)/_components/dashboard-shell.tsx
"use client";
import React, { useState } from "react";
import SidebarDashboard from "../_components/admin/sidebar-admin";
import HeaderDashboard from "../_components/admin/header-admin";

export default function DashboardShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  console.log("DashboardShell session:", session.user.email);

  return (
    <div className="flex min-h-screen">
      <SidebarDashboard isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 md:ml-64">
        <HeaderDashboard onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6 bg-gray-200 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  );
}
