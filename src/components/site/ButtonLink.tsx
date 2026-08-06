import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
  block?: boolean;
  wrap?: boolean;
  className?: string;
};

export function ButtonLink({
  children,
  href,
  size = "md",
  variant = "primary",
  block = false,
  wrap = false,
  className = "",
}: ButtonLinkProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    block ? "btn-block" : "",
    wrap ? "btn-wrap" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
