import HeroAbout from "@/components/about/HeroAbout";
import OurMission from "@/components/about/OurMission";
import StorySection from "@/components/about/Story";
import CoreValues from "@/components/home/CoreValues";
import Achievements from "@/components/about/Achievements";

export default function About() {
  return (
    <main style={{ background: 'url("/images/bg_img1.jpg") no-repeat center/cover' }}>
      <HeroAbout />
      <StorySection />
      <OurMission />
      <CoreValues />
      <Achievements />
    </main>
  );
}