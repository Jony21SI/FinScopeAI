import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import Dashboard from "../pages/dashboard/Dashboard";

export default async function DashboardPage() {
  // Fetch the user session
  const session = await auth0.getSession();

  // If no session, redirect to home page
  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <Dashboard session={session} />
    </main>
  );
}
