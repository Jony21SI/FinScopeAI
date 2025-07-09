import { redirect } from "next/navigation";
import Header from "./components/header/Header";
import HeroBanner from "./components/herobanner/HeroBanner";
import Features from "./components/features/Features";
import AskOurAI from "./components/askOurAI/AskOurAI";
import TestimonialsPricing from "./components/testimonials-pricing/TestimonialsPricing";

export default async function Home() {
  // Render the page without session checks
  // Implement session management later
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
