import Hero from "./components/home/Hero";
import Ticker from "./components/home/Ticker";
import Services from "./components/home/Services";
import ProductDeck from "./components/home/ProductDeck";
import Work from "./components/home/Work";
import Process from "./components/home/Process";
import Numbers from "./components/home/Numbers";
import Testimonials from "./components/home/Testimonials";
import CtaBand from "./components/home/CtaBand";
import JsonLd, { servicesJsonLd } from "./components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <Hero />
      <Ticker />
      <Services />
      <ProductDeck />
      <Work />
      <Process />
      <Numbers />
      <Testimonials />
      <CtaBand />
    </>
  );
}
