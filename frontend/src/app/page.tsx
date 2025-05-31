import { auth0 } from "@/lib/auth0";
import Header from "./components/header/Header";
import HeroBanner from "./components/herobanner/HeroBanner";
import Features from "./components/features/Features";
import AskOurAI from "./components/askOurAI/AskOurAI";

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  // If no session, show sign-up and login buttons
  if (!session) {
    return (
      <>
        <Header />
        <hr className="border-0 h-[2px] bg-feijoa-800 opacity-50 w-full" />
        <HeroBanner />
        <Features />
        <AskOurAI />
      </>
    );
  }

  // If session exists, show a welcome message and logout button
  return (
    <main>
      <h1 className="text-5xl">Welcome, {session.user.name}!</h1>
      <p>
        <a href="/auth/logout">
          <button>Log out</button>
        </a>
      </p>
    </main>
  );
}
