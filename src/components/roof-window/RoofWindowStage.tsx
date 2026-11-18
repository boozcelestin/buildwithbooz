"use client";

import { useState } from "react";

import { ROOF_WINDOW_DATA } from "@/src/features/roof-window/data";

import styles from "./roof-window.module.css";

// Geometry and rules ported unchanged from the approved page's script.
const C = 380;
const R0 = 96;
const R1 = 322;
const RW = (R1 - R0) / 12;

const fmtH = (h: number) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? " AM" : " PM"}`;
const pct = (v: number) => `${Math.round(v * 100)}%`;
const fmtCopy = (h: number) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? " a.m." : " p.m."}`;
const ang = (h: number) => ((h - 12) / 24) * Math.PI * 2;
const pt = (r: number, a: number): [number, number] => [C + r * Math.sin(a), C - r * Math.cos(a)];

function arc(r0: number, r1: number, a0: number, a1: number) {
  const [x0, y0] = pt(r1, a0);
  const [x1, y1] = pt(r1, a1);
  const [x2, y2] = pt(r0, a1);
  const [x3, y3] = pt(r0, a0);
  return `M${x0},${y0} A${r1},${r1} 0 0 1 ${x1},${y1} L${x2},${y2} A${r0},${r0} 0 0 0 ${x3},${y3} Z`;
}

type CellState = "night" | "open" | "caution" | "danger";

function state(c: [number, number, number, number]): CellState {
  const [day, , xc, dg] = c;
  if (day < 0.5) return "night";
  if (dg >= 0.1) return "danger";
  if (xc >= 0.5) return "caution";
  return "open";
}

const FILL: Record<CellState, string> = {
  night: "var(--rw-night)",
  open: "var(--rw-open)",
  caution: "var(--rw-caution)",
  danger: "var(--rw-danger)",
};

type Cell = {
  key: string;
  mi: number;
  h: number;
  d: string;
  fill: string;
  label: string;
};

type Dot = { key: string; cx: number; cy: number; r: number };
type Label = { key: string; x: number; y: number; text: string; className: string };
type Tick = { key: string; x1: number; y1: number; x2: number; y2: number };

const cells: Cell[] = [];
const dots: Dot[] = [];
const labels: Label[] = [];
const ticks: Tick[] = [];

ROOF_WINDOW_DATA.forEach((mo, mi) => {
  const r0 = R0 + mi * RW;
  const r1 = r0 + RW;
  mo.h.forEach((c, h) => {
    cells.push({
      key: `${mi}-${h}`,
      mi,
      h,
      d: arc(r0, r1, ang(h), ang(h + 1)),
      fill: FILL[state(c)],
      label: `${mo.m} ${fmtCopy(h)}: heat index 90 or more on ${pct(c[2])} of days, 103 or more on ${pct(c[3])}, rain on ${pct(c[1])}`,
    });
    if (c[0] >= 0.5 && c[1] >= 0.1) {
      const [x, y] = pt((r0 + r1) / 2, ang(h + 0.5));
      dots.push({ key: `${mi}-${h}`, cx: x, cy: y, r: Math.min(RW * 0.42, 1.6 + c[1] * 16) });
    }
  });
  const [lx, ly] = pt((r0 + r1) / 2, ang(0.5));
  labels.push({ key: `m${mi}`, x: lx, y: ly + 3.2, text: mo.m.toUpperCase(), className: styles.mlab });
});

for (let h = 0; h < 24; h += 3) {
  const [x, y] = pt(R1 + 22, ang(h));
  labels.push({ key: `h${h}`, x, y: y + 4, text: fmtH(h), className: styles.lab });
  const [ax, ay] = pt(R1 + 4, ang(h));
  const [bx, by] = pt(R1 + 10, ang(h));
  ticks.push({ key: `t${h}`, x1: ax, y1: ay, x2: bx, y2: by });
}

labels.push({ key: "jan", x: C, y: C - 4, text: "JAN inside", className: styles.lab });
labels.push({ key: "dec", x: C, y: C + 14, text: "DEC outside", className: styles.lab });

export function RoofWindowStage() {
  // Opens on Aug, 1 p.m., as the approved page does.
  const [selected, setSelected] = useState({ mi: 7, h: 13 });
  const month = ROOF_WINDOW_DATA[selected.mi];
  const c = month.h[selected.h];
  const selectedCell = cells.find((cell) => cell.mi === selected.mi && cell.h === selected.h);

  return (
    <section className={styles.stage} aria-label="Hour by hour chart">
      <div className={styles.clock}>
        <svg viewBox="-24 -12 808 784" role="img" aria-labelledby="rw-clock-title">
          <title id="rw-clock-title">
            Radial chart: 12 rings for the months, January inside and December outside, 24 wedges for
            the hours of the day with noon at the top.
          </title>
          <g>
            {cells.map((cell) => {
              const go = () => setSelected({ mi: cell.mi, h: cell.h });
              return (
                <path
                  aria-label={cell.label}
                  className={styles.cell}
                  d={cell.d}
                  fill={cell.fill}
                  key={cell.key}
                  onClick={go}
                  onFocus={go}
                  onMouseEnter={go}
                  tabIndex={0}
                />
              );
            })}
            {selectedCell ? <path aria-hidden="true" className={styles.sel} d={selectedCell.d} /> : null}
          </g>
          <g>
            {dots.map((dot) => (
              <circle cx={dot.cx} cy={dot.cy} fill="var(--rw-rain)" key={dot.key} pointerEvents="none" r={dot.r} />
            ))}
          </g>
          <g>
            {labels.map((label) => (
              <text className={label.className} key={label.key} textAnchor="middle" x={label.x} y={label.y}>
                {label.text}
              </text>
            ))}
            {ticks.map((tick) => (
              <line key={tick.key} stroke="var(--rw-muted)" x1={tick.x1} x2={tick.x2} y1={tick.y1} y2={tick.y2} />
            ))}
          </g>
        </svg>
      </div>
      <div className={styles.side}>
        <div className={styles.legend}>
          <div>
            <span className={styles.sw} style={{ background: "var(--rw-open)" }} />
            <span>
              <b>Under 90°F.</b> Daylight, and the heat index stayed under 90°F on most days at that hour.
            </span>
          </div>
          <div>
            <span className={styles.sw} style={{ background: "var(--rw-caution)" }} />
            <span>
              <b>Extreme Caution.</b> Heat index 90°F or more on most days at that hour.
            </span>
          </div>
          <div>
            <span className={styles.sw} style={{ background: "var(--rw-danger)" }} />
            <span>
              <b>Danger.</b> Heat index reached 103°F or more on at least 1 day in 10 at that hour.
            </span>
          </div>
          <div>
            <span className={styles.sw} style={{ background: "var(--rw-night)" }} />
            <span>
              <b>Dark.</b> Sun below the horizon.
            </span>
          </div>
          <div>
            <span className={`${styles.sw} ${styles.swDot}`}>
              <i />
            </span>
            <span>
              <b>Rain or thunder.</b> Dot size shows how often. Drawn when it happens on 1 day in 10 or more.
            </span>
          </div>
        </div>
        <div className={styles.read} aria-live="polite">
          <h3>Reading one hour</h3>
          <p className={styles.when}>{`${month.m}, ${fmtCopy(selected.h)}`}</p>
          <dl>
            <dt>Daylight</dt>
            <dd>{`${pct(c[0])} of days`}</dd>
            <dt>Heat index 90°F or more</dt>
            <dd>{`${pct(c[2])} of days`}</dd>
            <dt>Heat index 103°F or more</dt>
            <dd>{`${pct(c[3])} of days`}</dd>
            <dt>Rain or thunder</dt>
            <dd>{`${pct(c[1])} of days`}</dd>
          </dl>
        </div>
        <p className={styles.hint}>
          Tap or hover any wedge. Inner ring is January, outer ring is December. Noon sits at the top. Hours
          are local clock time, with daylight saving applied.
        </p>
      </div>
    </section>
  );
}
