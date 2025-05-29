"use client";
import React, { useState } from "react";
import SidebarDashboard from "../_components/admin/sidebar-admin";
import HeaderDashboard from "../_components/admin/header-admin";
import { Spinner } from "../_components/spinner";
import { useSession } from "next-auth/react";

export default function DashboardShell({
  children,
  data_session,
}: {
  children: React.ReactNode;
  data_session: any;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: sessions, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    )
  }

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
