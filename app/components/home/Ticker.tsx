const entries = [
  "AI SaaS",
  "Agentic systems",
  "Android apps",
  "Web platforms",
];

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {/* duplicated track (×2) so the -50% translateX loop is seamless */}
        {[0, 1].map((dup) => (
          <div className="ticker-half" key={dup}>
            {entries.map((entry) => (
              <span className="ticker-item display" key={`${dup}-${entry}`}>
                {entry}
                <span className="ticker-sep">✱</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
