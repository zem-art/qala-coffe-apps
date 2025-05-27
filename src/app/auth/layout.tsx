// src/app/auth/layout.tsx
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "~/server/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is used for the authentication pages (login, register, etc.).
  const session = await auth(); // ✅ panggil dulu
  // console.log("AuthLayout session ==> : ", session);
  
  if (session?.user) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">{children}</div>
  );
}
