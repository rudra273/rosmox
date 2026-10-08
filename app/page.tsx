import type { Metadata } from "next";

import About from "@/components/About";
import Contact from "@/components/Contact";
import DiscussProjectButton from "@/components/DiscussProjectButton";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
// import Work from "@/components/Work";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

/* Navbar, <main> and Footer live in app/layout.tsx.
   Every section sets data-theme="dark|light" — the navbar reads
   it to restyle itself over light vs dark surfaces. */
export default function Home() {
  return (
    <>
      <DiscussProjectButton />

      {/* Hero — dark, one screen, signal horizon */}
      <Hero />

      <About />

      {/* Services — dark, scroll timeline */}
      <Services />

      {/* Products — light, card grid */}
      <Products />

      {/* Work — dark, scroll-stacked deck of client projects.
          Keep Contact directly after it: Contact slides over the
          pinned deck (see "Pin hold" in Work.tsx). */}
      {/* <Work /> */}

      {/* Contact — light, slides over the pinned Work deck */}
      <Contact />
    </>
  );
}
