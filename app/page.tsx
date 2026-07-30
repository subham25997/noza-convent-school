"use client";
import Hero from "@/components/home/Hero"
import Highlights from "@/components/home/Highlights"
import LeadershipMessages from "@/components/home/LeadershipMessages"
import CTASection from "@/components/home/CTASection"
import AboutUs from "@/components/home/AboutUs"
import FAQs from "@/components/home/FAQs"
import MomentsSection from "@/components/shared/MomentsSection"
import { HorizontalBox } from "@/components/home/HorizontalBox"
import Infrastructure from "@/components/home/Infrastructure";

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <HorizontalBox />
      <AboutUs />
      <Infrastructure />
      <MomentsSection />
      <Highlights />
      <LeadershipMessages />
      <FAQs />
      <CTASection />
    </main>
  )
}
