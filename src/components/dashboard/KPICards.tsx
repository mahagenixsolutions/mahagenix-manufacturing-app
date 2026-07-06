// ============================================================
// ForgeMES — KPI Hero Cards
// ============================================================

import { useEffect, useState, useRef } from "react";
import { dashboardKPIs } from "@/mock/data";
import {
  Package,
  Target,
  Gauge,
  Cog,
  Clock,
  XCircle,
  ShieldCheck,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Minus,
  Maximize2,
} from "lucide-react";
import type { KPI } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/Sheet";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Package,
  Target,
  Gauge,
  Cog,
  Clock,
  XCircle,
  ShieldCheck,
  IndianRupee,
};

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} className="opacity-50">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnimatedValue({
  target,
  unit,
  prefix,
}: {
  target: number;
  unit: string;
  prefix?: string;
}) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();
    const startVal = 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = startVal + (target - startVal) * eased;
      setCurrent(val);
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    };

    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [target]);

  const formatted =
    target >= 100 ? Math.round(current).toLocaleString() : current.toFixed(1);

  return (
    <span>
      {prefix}
      {formatted}
      {unit && (
        <span
          className="text-[13px] font-normal ml-0.5"
          style={{ color: "var(--text-tertiary)" }}
        >
          {unit}
        </span>
      )}
    </span>
  );
}

function KPICard({ kpi, onClick }: { kpi: KPI; onClick: () => void }) {
  const IconComp = iconMap[kpi.icon] || Package;
  const isPositive = kpi.trendDirection === "up";
  const isNegative = kpi.trendDirection === "down";

  // Determine if trend is good or bad
  const isGoodTrend =
    kpi.id === "kpi-downtime" || kpi.id === "kpi-rejected"
      ? isNegative
      : isPositive;

  const trendColor = isGoodTrend
    ? "var(--color-success-600)"
    : kpi.trendDirection === "flat"
      ? "var(--text-tertiary)"
      : "var(--color-danger-600)";

  const sparkColor = isGoodTrend
    ? "var(--color-success-500)"
    : "var(--color-danger-500)";

  return (
    <div
      className="card-elevated p-3 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:border-primary-300 transition-colors min-h-[120px]"
      onClick={onClick}
    >
      <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <Maximize2 className="w-3.5 h-3.5 text-tertiary hover:text-primary transition-colors" />
      </div>

      {/* Sparkline background */}
      <div className="absolute bottom-0 right-0 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
        <MiniSparkline data={kpi.sparklineData} color={sparkColor} />
      </div>

      {/* Top row: Icon and Trend */}
      <div className="flex items-start justify-between relative z-10 mb-1.5">
        <div
          className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center shrink-0 transition-all"
          style={{ background: "var(--color-primary-50)" }}
        >
          <IconComp className="w-5 h-5 lg:w-5 lg:h-5 text-primary-600 transition-all" />
        </div>

        {/* Trend */}
        <div
          className="flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.5 rounded shrink-0 bg-surface/50 backdrop-blur-sm"
          style={{ color: trendColor }}
        >
          {isPositive && <TrendingUp className="w-4 h-4 stroke-[2.5]" />}
          {isNegative && <TrendingDown className="w-4 h-4 stroke-[2.5]" />}
          {kpi.trendDirection === "flat" && (
            <Minus className="w-4 h-4 stroke-[2.5]" />
          )}
          {kpi.trend !== 0 && `${Math.abs(kpi.trend)}%`}
        </div>
      </div>

      {/* Bottom row: Value and Label */}
      <div className="relative z-10 mt-auto">
        <div className="flex items-baseline gap-1 mb-0.5 mt-1 sm:mt-0">
          <p
            className="text-xl lg:text-3xl font-bold tracking-tight leading-none transition-all"
            style={{ color: "var(--text-primary)" }}
          >
            <AnimatedValue
              target={kpi.value}
              unit={
                kpi.unit === "units" ||
                kpi.unit === "min" ||
                kpi.unit === "machines"
                  ? ""
                  : kpi.unit === "₹M"
                    ? ""
                    : kpi.unit
              }
              prefix={kpi.unit === "₹M" ? "₹" : ""}
            />
          </p>
          {(kpi.unit === "units" ||
            kpi.unit === "min" ||
            kpi.unit === "machines" ||
            kpi.unit === "₹M") && (
            <span
              className="text-[12px] font-medium"
              style={{ color: "var(--text-tertiary)" }}
            >
              {kpi.unit === "₹M" ? "M" : kpi.unit}
            </span>
          )}
        </div>
        <p
          className="text-[11px] lg:text-[13px] font-semibold leading-tight line-clamp-1 transition-all mt-1"
          style={{ color: "var(--text-tertiary)" }}
          title={kpi.label}
        >
          {kpi.label}
        </p>
      </div>
    </div>
  );
}

export default function KPICards() {
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        {dashboardKPIs.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} onClick={() => setSelectedKPI(kpi)} />
        ))}
      </div>

      <Sheet
        open={!!selectedKPI}
        onOpenChange={(open) => !open && setSelectedKPI(null)}
      >
        <SheetContent className="w-[400px] sm:w-[540px] p-0 flex flex-col h-full bg-surface">
          {selectedKPI && (
            <>
              <SheetHeader className="p-6 pb-4 border-b border-subtle bg-surface-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-100 text-primary-600">
                    {(() => {
                      const Icon = iconMap[selectedKPI.icon] || Package;
                      return <Icon className="w-5 h-5" />;
                    })()}
                  </div>
                  <div>
                    <SheetTitle className="text-lg font-bold text-primary">
                      {selectedKPI.label}
                    </SheetTitle>
                    <SheetDescription className="text-secondary text-sm">
                      Real-time analytics & historical trends
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Detail content */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-subtle bg-surface-secondary/30">
                    <div className="text-[12px] font-semibold text-secondary mb-1">
                      Current Value
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {selectedKPI.value.toLocaleString()}{" "}
                      <span className="text-lg text-tertiary font-normal">
                        {selectedKPI.unit}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-subtle bg-surface-secondary/30">
                    <div className="text-[12px] font-semibold text-secondary mb-1">
                      Target Value
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {selectedKPI.target?.toLocaleString() || "N/A"}{" "}
                      <span className="text-lg text-tertiary font-normal">
                        {selectedKPI.unit}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-subtle">
                  <div className="text-[14px] font-bold text-primary mb-4">
                    7-Day Trend
                  </div>
                  <div className="h-32 flex items-end gap-2 justify-between">
                    {selectedKPI.sparklineData.map((val, i) => {
                      const max = Math.max(...selectedKPI.sparklineData);
                      const height = `${(val / max) * 100}%`;
                      return (
                        <div
                          key={i}
                          className="w-full bg-primary-100 rounded-t-sm relative group cursor-pointer transition-all hover:bg-primary-300"
                          style={{ height }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-inverse text-primary-inverse text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            {val}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
