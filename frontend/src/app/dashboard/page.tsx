import { redirect } from "next/navigation";
import Dashboard from "../pages/dashboard/Dashboard";
import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <Dashboard session={session} />
    </main>
  );
}
