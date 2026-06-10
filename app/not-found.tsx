import type { Metadata } from "next";
import PrimaryBtn from "./components/ui/PrimaryBtn";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for doesn't exist.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-code" aria-hidden="true">
        404
      </div>
      <div className="notfound-label">Signal lost</div>
      <h1>This page doesn&apos;t exist.</h1>
      <p>
        The address may have changed, or the link you followed is out of date.
        Let&apos;s get you back to solid ground.
      </p>
      <div className="notfound-actions">
        <PrimaryBtn href="/" variant="primary" arrow arrowSize={13}>
          Back to home
        </PrimaryBtn>
        <PrimaryBtn href="/contact" variant="ghost">
          Contact us
        </PrimaryBtn>
      </div>
    </div>
  );
}
