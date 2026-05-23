// Static markup. The progress bar (--p) and the #interludePct counter are
// driven by NeuralBackground's scroll handler via shared ids, matching draft1.
// The ids `interlude` and `interludePct` MUST stay so that handler can find them.
export default function Interlude() {
  return (
    <section className="interlude" id="interlude">
      <div className="interlude-sticky">
        <div className="interlude-content">
          <div className="interlude-line">
            We don&apos;t bolt AI <span className="dim">onto</span>
            <br />
            finished products.
            <br />
            We <span className="serif">build</span> <span className="dim">around</span> it.
          </div>
        </div>
        <div className="interlude-progress">
          <div className="bar" />
          <span id="interludePct">00</span>
        </div>
      </div>
    </section>
  );
}
