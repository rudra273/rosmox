const companies = [
  "Halden Labs",
  "North Atlas",
  "Sundra",
  "Verge & Co.",
  "Mirroir Studio",
  "Kindred Health",
  "Pace Ventures",
  "Lumen Edu",
];

export default function TrustMarquee() {
  // duplicated track (×2) so the -50% translateX loop is seamless
  const items = [...companies, ...companies];
  return (
    <section className="trust">
      <div className="container trust-inner">
        <div className="trust-label">Trusted by teams at</div>
        <div className="marquee">
          <div className="marquee-track">
            {items.map((name, i) => (
              <div className="marquee-item" key={`${name}-${i}`}>
                {name} <span className="dot" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
