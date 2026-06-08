"use client";

import { useEffect, useRef, useState } from "react";

export type RevenuePoint = { date: string; revenue: number; count: number };

type Period = "today" | "week" | "month";

// Round a value up to a "nice" axis ceiling (1, 2, 2.5, 5, 10 × 10ⁿ) so the
// Y-axis lands on readable numbers instead of arbitrary maxima.
function niceCeil(v: number): number {
  if (v <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / pow;
  const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return nice * pow;
}

function fmtMoney(v: number): string {
  if (v >= 1000) {
    const k = v / 1000;
    return `$${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`;
  }
  return `$${Math.round(v)}`;
}

/**
 * Auto-scaling revenue line/area chart. Measures its own width so the SVG is
 * pixel-perfect (crisp text, accurate tooltips) and scales the Y-axis to the
 * data with headroom. Empty days sit on the baseline; days with revenue get a
 * dot + hover tooltip.
 */
export function RevenueTrendChart({
  points,
  period,
  height = 220,
}: {
  points: RevenuePoint[];
  period: Period;
  height?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => setW(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    if (period === "today") return d.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });
    if (period === "week")  return d.toLocaleDateString("en-AU", { weekday: "short" });
    return d.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
  };

  const H = height;
  const padL = 46, padR = 16, padT = 16, padB = 26;
  const innerW = Math.max(0, w - padL - padR);
  const innerH = H - padT - padB;

  const n = points.length;
  const maxRevenue = Math.max(...points.map((p) => p.revenue), 0);
  const niceMax = niceCeil(maxRevenue * 1.1);

  const xAt = (i: number) => (n <= 1 ? padL + innerW / 2 : padL + (i / (n - 1)) * innerW);
  const yAt = (v: number) => padT + innerH - (v / niceMax) * innerH;

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(1)} ${yAt(p.revenue).toFixed(1)}`)
    .join(" ");
  const areaPath = n > 0
    ? `${linePath} L ${xAt(n - 1).toFixed(1)} ${(padT + innerH).toFixed(1)} L ${xAt(0).toFixed(1)} ${(padT + innerH).toFixed(1)} Z`
    : "";

  const ySteps = 4;
  const gridVals = Array.from({ length: ySteps + 1 }, (_, i) => (niceMax / ySteps) * i);
  const labelStep = Math.max(1, Math.ceil(n / 6));

  const bandBounds = (i: number) => {
    const left  = i === 0     ? padL          : (xAt(i - 1) + xAt(i)) / 2;
    const right = i === n - 1 ? padL + innerW : (xAt(i) + xAt(i + 1)) / 2;
    return { left, width: Math.max(0, right - left) };
  };

  // First paint: reserve space so the ResizeObserver can measure.
  if (w === 0) return <div ref={wrapRef} style={{ height: H }} />;

  const hp = hover != null ? points[hover] : null;

  return (
    <div ref={wrapRef} className="relative" style={{ height: H }}>
      <svg width={w} height={H} className="overflow-visible">
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#10b981" stopOpacity="0.38" />
            <stop offset="55%"  stopColor="#10b981" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y grid + labels */}
        {gridVals.map((v, i) => {
          const y = yAt(v);
          return (
            <g key={i}>
              <line
                x1={padL} y1={y} x2={padL + innerW} y2={y}
                className="stroke-border" strokeWidth={1}
                strokeDasharray={i === 0 ? undefined : "3 4"}
                opacity={i === 0 ? 0.8 : 0.4}
              />
              <text
                x={padL - 8} y={y} textAnchor="end" dominantBaseline="middle"
                className="fill-muted-foreground" style={{ fontSize: 10 }}
              >
                {fmtMoney(v)}
              </text>
            </g>
          );
        })}

        {/* Area + line */}
        {areaPath && <path d={areaPath} fill="url(#revGrad)" />}
        <path
          d={linePath} fill="none"
          className="stroke-emerald-500"
          strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round"
        />

        {/* Dots on days with revenue */}
        {points.map((p, i) =>
          p.revenue > 0 ? (
            <circle
              key={i} cx={xAt(i)} cy={yAt(p.revenue)} r={hover === i ? 5 : 3.5}
              className="fill-emerald-400 stroke-background" strokeWidth={2}
            />
          ) : null
        )}

        {/* X labels */}
        {points.map((p, i) =>
          i % labelStep === 0 || i === n - 1 ? (
            <text
              key={i} x={xAt(i)} y={H - 8} textAnchor="middle"
              className="fill-muted-foreground" style={{ fontSize: 10 }}
            >
              {fmtDate(p.date)}
            </text>
          ) : null
        )}

        {/* Hover guide line */}
        {hp && (
          <line
            x1={xAt(hover!)} y1={padT} x2={xAt(hover!)} y2={padT + innerH}
            className="stroke-emerald-500" strokeWidth={1} opacity={0.4}
          />
        )}

        {/* Invisible hover bands */}
        {points.map((p, i) => {
          const { left, width } = bandBounds(i);
          return (
            <rect
              key={i} x={left} y={padT} width={width} height={innerH} fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover((h) => (h === i ? null : h))}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {hp && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full"
          style={{ left: xAt(hover!), top: yAt(hp.revenue) - 10 }}
        >
          <div className="rounded-lg border border-border bg-popover px-2.5 py-1.5 shadow-lg whitespace-nowrap">
            <p className="text-[11px] font-bold text-foreground tabular-nums">
              ${hp.revenue.toLocaleString()}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {fmtDate(hp.date)} · {hp.count} sale{hp.count !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
