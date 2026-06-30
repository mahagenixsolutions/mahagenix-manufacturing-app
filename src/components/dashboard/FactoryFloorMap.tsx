// ============================================================
// ForgeMES — Factory Floor Map (Interactive SVG)
// ============================================================

import { useState } from 'react';
import { productionLines } from '@/mock/data';
import type { ProductionLine } from '@/types';

const statusColors = {
  running: { fill: '#22c55e', stroke: '#16a34a', label: 'Running' },
  idle: { fill: '#f59e0b', stroke: '#d97706', label: 'Idle' },
  stopped: { fill: '#ef4444', stroke: '#dc2626', label: 'Stopped' },
  maintenance: { fill: '#3b82f6', stroke: '#2563eb', label: 'Maintenance' },
};

// Layout positions for production lines on the floor map
const linePositions = [
  { x: 40, y: 30, w: 200, h: 70 },
  { x: 280, y: 30, w: 200, h: 70 },
  { x: 520, y: 30, w: 200, h: 70 },
  { x: 40, y: 140, w: 200, h: 70 },
  { x: 280, y: 140, w: 200, h: 70 },
  { x: 520, y: 140, w: 200, h: 70 },
];

function Tooltip({ line, position }: { line: ProductionLine; position: { x: number; y: number } }) {
  const sc = statusColors[line.status];
  return (
    <div
      className="absolute z-30 rounded-lg border p-3 pointer-events-none"
      style={{
        left: position.x,
        top: position.y - 120,
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-default)',
        boxShadow: 'var(--shadow-dropdown)',
        animation: 'var(--animate-scale-in)',
        minWidth: 200,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full" style={{ background: sc.fill }} />
        <span className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>
          {line.name}
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${sc.fill}20`, color: sc.fill }}>
          {sc.label}
        </span>
      </div>
      <div className="space-y-1 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
        <div className="flex justify-between">
          <span>Output</span>
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{line.currentOutput}/{line.targetOutput}</span>
        </div>
        <div className="flex justify-between">
          <span>Efficiency</span>
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{line.efficiency}%</span>
        </div>
        <div className="flex justify-between">
          <span>Machines</span>
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{line.machines.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Operators</span>
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{line.activeOperators}</span>
        </div>
      </div>
      {/* Progress bar */}
      <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-secondary)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${line.efficiency}%`, background: sc.fill }}
        />
      </div>
    </div>
  );
}

export default function FactoryFloorMap() {
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          {Object.entries(statusColors).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: val.fill }} />
              <span className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                {val.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox="0 0 760 240"
          className="w-full"
          style={{ minHeight: 200 }}
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border-subtle)" strokeWidth="0.3" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="760" height="240" fill="url(#grid)" rx="8" />

          {/* Production lines */}
          {productionLines.map((line, i) => {
            const pos = linePositions[i];
            const sc = statusColors[line.status];
            const isHovered = hoveredLine === line.id;

            return (
              <g
                key={line.id}
                className="cursor-pointer"
                onMouseEnter={(e) => {
                  setHoveredLine(line.id);
                  const rect = (e.target as SVGElement).closest('svg')?.getBoundingClientRect();
                  if (rect) {
                    setTooltipPos({
                      x: pos.x + pos.w / 2,
                      y: pos.y,
                    });
                  }
                }}
                onMouseLeave={() => setHoveredLine(null)}
              >
                {/* Line background */}
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={pos.w}
                  height={pos.h}
                  rx="6"
                  fill={isHovered ? `${sc.fill}30` : `${sc.fill}15`}
                  stroke={sc.stroke}
                  strokeWidth={isHovered ? 2 : 1}
                  style={{ transition: 'all 0.2s ease' }}
                />

                {/* Status indicator */}
                <circle cx={pos.x + 16} cy={pos.y + 16} r="4" fill={sc.fill}>
                  {line.status === 'running' && (
                    <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
                  )}
                </circle>

                {/* Line name */}
                <text
                  x={pos.x + 28}
                  y={pos.y + 20}
                  fill="var(--text-primary)"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="var(--font-sans)"
                >
                  {line.name}
                </text>

                {/* Efficiency */}
                <text
                  x={pos.x + pos.w - 12}
                  y={pos.y + 20}
                  fill={sc.fill}
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="var(--font-sans)"
                  textAnchor="end"
                >
                  {line.efficiency}%
                </text>

                {/* Output */}
                <text
                  x={pos.x + 16}
                  y={pos.y + 42}
                  fill="var(--text-secondary)"
                  fontSize="10"
                  fontFamily="var(--font-sans)"
                >
                  Output: {line.currentOutput}/{line.targetOutput}
                </text>

                {/* Progress bar */}
                <rect x={pos.x + 16} y={pos.y + 52} width={pos.w - 32} height="4" rx="2" fill="var(--border-default)" />
                <rect
                  x={pos.x + 16}
                  y={pos.y + 52}
                  width={(pos.w - 32) * (line.efficiency / 100)}
                  height="4"
                  rx="2"
                  fill={sc.fill}
                  style={{ transition: 'width 0.5s ease' }}
                />

                {/* Machine count */}
                <text
                  x={pos.x + 16}
                  y={pos.y + 66}
                  fill="var(--text-tertiary)"
                  fontSize="9"
                  fontFamily="var(--font-sans)"
                >
                  {line.machines.length} machines · {line.activeOperators} operators
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip overlay */}
        {hoveredLine && (
          <Tooltip
            line={productionLines.find((l) => l.id === hoveredLine)!}
            position={tooltipPos}
          />
        )}
      </div>
    </div>
  );
}
