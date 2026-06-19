"use client";

import { useEffect, useRef, useState } from "react";

export type RevenuePoint = { date: string; revenue: number; count: number };

type Period = "today" | "week" | "month";

export function RevenueTrendChart({
  points,
  period,
  height = 200,
}: {
  points: RevenuePoint[];
  period: Period;
  height?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);

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
  const padX = 8, padT = 12, padB = 22;
  const innerW = Math.max(0, w - padX * 2);
  const innerH = H - padT - padB;

  const n = points.length;
  const max = Math.max(...points.map((p) => p.revenue), 1);

  const xAt = (i: number) => (n <= 1 ? padX + innerW / 2 : padX + (i / (n - 1)) * innerW);
  const yAt = (v: number) => padT + innerH - (v / max) * innerH;

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(1)} ${yAt(p.revenue).toFixed(1)}`)
    .join(" ");

  const labelStep = Math.max(1, Math.ceil(n / 6));

  if (w === 0) return <div ref={wrapRef} style={{ height: H }} />;

  return (
    <div ref={wrapRef} className="relative" style={{ height: H }}>
      <svg width={w} height={H}>
        <path
          d={linePath} fill="none"
          className="stroke-emerald-500"
          strokeWidth={2} strokeLinejoin="round" strokeLinecap="round"
        />
        {points.map((p, i) =>
          i % labelStep === 0 || i === n - 1 ? (
            <text
              key={i} x={xAt(i)} y={H - 6} textAnchor="middle"
              className="fill-muted-foreground" style={{ fontSize: 10 }}
            >
              {fmtDate(p.date)}
            </text>
          ) : null
        )}
      </svg>
    </div>
  );
}
