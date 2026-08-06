import Link from "next/link";

type Bar = {
  color?: "yellow" | "green" | "ink";
  width?: string;
};

type ContentCardProps = {
  href: string;
  label: "Article" | "White paper";
  title: string;
  bars: Bar[];
  author?: string;
  date?: string;
};

export function formatContentDate(date?: string) {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function ContentCard({ href, label, title, bars, author, date }: ContentCardProps) {
  const formattedDate = formatContentDate(date);

  return (
    <Link className="bcard" href={href}>
      <div className="bthumb" aria-hidden="true">
        <div className="mini-ui">
          {bars.map((bar, index) => (
            <div
              className={`mbar${bar.color ? ` ${bar.color}` : ""}`}
              key={`${bar.color ?? "plain"}-${index}`}
              style={bar.width ? { width: bar.width } : undefined}
            />
          ))}
        </div>
      </div>
      <div className="binfo">
        <span className="btag">{label}</span>
        <span className="btitle">{title}</span>
        {author || formattedDate ? (
          <span className="btag">
            {author ? `By ${author}` : null}
            {author && formattedDate ? " · " : null}
            {formattedDate}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
