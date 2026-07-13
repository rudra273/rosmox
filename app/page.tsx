import Hero from "./components/sections/Hero";
import Products from "./components/sections/Products";
import Services from "./components/sections/Services";
import AgentFlow from "./components/sections/AgentFlow";
import Principles from "./components/sections/Principles";
import Contact from "./components/sections/Contact";
import JsonLd, { servicesJsonLd } from "./components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <Hero />
      <Products />
      <Services />
      <AgentFlow />
      <Principles />
      <Contact />
    </>
  );
}
