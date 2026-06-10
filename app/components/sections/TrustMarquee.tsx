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
  return (
    <section className="trust" aria-label="Teams we have worked with">
      <div className="container trust-inner">
        <div className="trust-label">Trusted by teams at</div>
        <div className="marquee">
          <div className="marquee-track">
            {companies.map((name) => (
              <div className="marquee-item" key={name}>
                {name} <span className="dot" aria-hidden="true" />
              </div>
            ))}
            {/* duplicated track (×2) so the -50% translateX loop is seamless */}
            {companies.map((name) => (
              <div className="marquee-item" key={`${name}-dup`} aria-hidden="true">
                {name} <span className="dot" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
