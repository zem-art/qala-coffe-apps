// src/app/auth/layout.tsx
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Ini layout umum untuk semua halaman dalam /auth */}
        {children}
    </div>
  );
}
