import Link from "next/link";

type LogoProps = {
  footer?: boolean;
};

export function Logo({ footer = false }: LogoProps) {
  return (
    <Link className={`logo${footer ? " logo-footer" : ""}`} aria-label="BuildWithBooz" href="/">
      <span aria-hidden="true">
        Bu<span className="ld">ı</span>ldW<span className="ld">ı</span>thBooz
      </span>
    </Link>
  );
}
