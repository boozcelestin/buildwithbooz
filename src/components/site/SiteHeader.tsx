"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";

type SiteHeaderProps = {
  active?: "insights" | "services" | "process" | "about";
};

const links = [
  { href: "/insights", label: "Insights", key: "insights" },
  { href: "/services", label: "Services", key: "services" },
  { href: "/process", label: "Process", key: "process" },
  { href: "/about", label: "About", key: "about" },
] as const;

export function SiteHeader({ active }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Primary">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              aria-current={active === link.key ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/gap-finder" size="sm" className="nav-cta">
          Run the Gap Finder
        </ButtonLink>
        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((current) => !current)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
      <nav
        aria-label="Mobile"
        className={`mobile-menu${mobileOpen ? " open" : ""}`}
        id="mobile-navigation"
      >
        {links.map((link) => (
          <Link
            aria-current={active === link.key ? "page" : undefined}
            href={link.href}
            key={link.href}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="mm-cta" onClick={() => setMobileOpen(false)}>
          <ButtonLink href="/gap-finder" size="md" block>
            Run the Gap Finder
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}
