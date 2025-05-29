import DashboardShell from "./page";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // This layout is used for the admin dashboard.
  const session:any = await auth();
  // console.log("AdminLayout session ==> : ", session);

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  if(session.user.role === '1'){
    return <DashboardShell data_session={session}>{children}</DashboardShell>;
  } else {
    return redirect('/')
  }

}
