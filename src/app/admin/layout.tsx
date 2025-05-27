import DashboardShell from "./page";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // This layout is used for the admin dashboard.
  const session = await auth(); // ✅ panggil dulu
  console.log("AdminLayout session ==> : ", session);
  
  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return <DashboardShell session={session}>{children}</DashboardShell>;
}
