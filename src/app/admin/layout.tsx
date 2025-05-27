"use client";
import React from 'react';
import SidebarDashboard from "../_components/admin/sidebar-admin";
import HeaderDashboard from "../_components/admin/header-admin";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen">
      <SidebarDashboard />
      <div className="flex flex-col flex-1">
        <HeaderDashboard />
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  );
}
