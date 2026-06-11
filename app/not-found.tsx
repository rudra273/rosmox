import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="container">
        <p className="mono notfound-eyebrow">Error — page not in the index</p>
        <h1 className="display notfound-code">404</h1>
        <p className="notfound-sub">
          This sheet doesn&apos;t exist. It may have been moved, renamed, or
          never printed in the first place.
        </p>
        <div className="notfound-actions">
          <Link href="/" className="btn btn-solid">
            Back to home <span className="arr">→</span>
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
