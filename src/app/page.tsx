
import Hero from "@/components/sections/Hero";
import FeaturedCollection from "@/components/sections/FeaturedCollection";
import Editorial from "@/components/sections/Editorial";
import Benefits from "@/components/sections/Benefits";
import Testimonials from "@/components/sections/Testimonials";
import Marquee from "@/components/sections/Marquee";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
     
      <Hero />
      <Marquee />
      <FeaturedCollection />
      <Editorial />
      <Benefits />
      <Testimonials />
      <Newsletter />
    
    </main>
  );
}
