import { auth0 } from "@/lib/auth0";
import Header from "./components/header/Header";
import HeroBanner from "./components/herobanner/HeroBanner";
import Features from "./components/features/Features";
import AskOurAI from "./components/askOurAI/AskOurAI";
import TestimonialsPricing from "./components/testimonials-pricing/TestimonialsPricing";
import Dashboard from "./pages/dashboard/Dashboard";

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();
  console.log("Session:", session);

  if (!session) {
    return (
      <div className="h-screen overflow-y-scroll scrollbar-none">
        <Header />
        <hr className="border-0 h-[2px] bg-feijoa-800 opacity-50 w-full" />
        <HeroBanner />
        <Features />
        <AskOurAI />
        <TestimonialsPricing />
      </div>
    );
  }

  return (
    <main>
      <Dashboard session={session} />
    </main>
  );
}
