import Hero from "./components/sections/Hero";
import TrustMarquee from "./components/sections/TrustMarquee";
import Services from "./components/sections/Services";
import Interlude from "./components/sections/Interlude";
import Products from "./components/sections/Products";
import Work from "./components/sections/Work";
import Process from "./components/sections/Process";
import WhyRosmox from "./components/sections/WhyRosmox";
import Testimonials from "./components/sections/Testimonials";
import Contact from "./components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustMarquee />
      <Services />
      <Interlude />
      <Products />
      <Work />
      <Process />
      <WhyRosmox />
      <Testimonials />
      <Contact />
    </main>
  );
}
