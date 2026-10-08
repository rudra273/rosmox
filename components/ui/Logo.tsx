/* ROSMOX wordmark — the only way the logo is rendered.
   Single colour: `tone` picks white or ink for the surface it sits on. */

export default function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={`font-display font-bold tracking-tight transition-colors duration-300 ${
        tone === "dark" ? "text-white" : "text-ink"
      } ${className}`}
    >
      ROSMOX
    </span>
  );
}
