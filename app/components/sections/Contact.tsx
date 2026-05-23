"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import PrimaryBtn from "../ui/PrimaryBtn";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15, margin: "0px 0px -60px 0px" });

  return (
    <section id="contact">
      <div className="container">
        <div ref={ref} className={`cta-wrap${inView ? " in" : ""}`}>
          <h2>
            Let&apos;s build something <span className="serif">people use.</span>
          </h2>
          <p>Tell us about the project. We respond within one business day.</p>
          <div className="cta-actions">
            <PrimaryBtn href="mailto:hello@rosmox.com" variant="primary" arrow arrowSize={13}>
              hello@rosmox.com
            </PrimaryBtn>
            <PrimaryBtn href="/contact" variant="ghost">
              Book a call
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </section>
  );
}
