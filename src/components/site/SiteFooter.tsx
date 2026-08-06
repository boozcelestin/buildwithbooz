import Link from "next/link";

import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Logo footer />
        <div className="footer-links">
          <Link href="/insights">Insights</Link>
          <Link href="/services">Services</Link>
          <Link href="/process">Process</Link>
          <Link href="/about">About</Link>
          {/* Point this to /tools once more tools are public. */}
          <Link href="/tools/missed-call-revenue-calculator">Free tools</Link>
        </div>
        <p className="footer-ent">
          Running something bigger than a local shop? BuildWithBooz also takes on custom and
          enterprise work by conversation. <Link href="/enterprise">Tell us what you are dealing with.</Link>
        </p>
        <p className="footer-note">© 2026 BuildWithBooz. Miami, FL.</p>
      </div>
    </footer>
  );
}
