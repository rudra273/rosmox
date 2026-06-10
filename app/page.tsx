import Hero from "./components/sections/Hero";
import TrustMarquee from "./components/sections/TrustMarquee";
import Services from "./components/sections/Services";
import AgentFlow from "./components/sections/AgentFlow";
import Products from "./components/sections/Products";
import Work from "./components/sections/Work";
import Process from "./components/sections/Process";
import WhyRosmox from "./components/sections/WhyRosmox";
import Testimonials from "./components/sections/Testimonials";
import Contact from "./components/sections/Contact";
import JsonLd, { servicesJsonLd } from "./components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <Hero />
      <TrustMarquee />
      <Services />
      <AgentFlow />
      <Products />
      <Work />
      <Process />
      <WhyRosmox />
      <Testimonials />
      <Contact />
    </>
  );
}
