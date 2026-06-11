import Hero from "./components/home/Hero";
import Services from "./components/home/Services";
import ProductsShowcase from "./components/home/ProductsShowcase";
import Work from "./components/home/Work";
import Process from "./components/home/Process";
import Stats from "./components/home/Stats";
import Testimonials from "./components/home/Testimonials";
import CtaSection from "./components/home/CtaSection";
import JsonLd, { servicesJsonLd } from "./components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <Hero />
      <Services />
      <ProductsShowcase />
      <Work />
      <Process />
      <Stats />
      <Testimonials />
      <CtaSection />
    </>
  );
}
