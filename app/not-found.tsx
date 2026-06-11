import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="container notfound-inner">
        <p className="sec-chip mono">Signal lost</p>
        <h1 className="display notfound-code grad-text">404</h1>
        <p className="notfound-sub">
          This page drifted out of orbit. It may have been moved, renamed, or
          never existed.
        </p>
        <div className="notfound-actions">
          <Link href="/" className="btn btn-grad">
            Back to home <span className="arr">→</span>
          </Link>
          <Link href="/contact" className="btn btn-glass">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
