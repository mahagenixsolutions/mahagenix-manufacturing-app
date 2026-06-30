// ============================================================
// ForgeMES — Progress Ring (SVG Circular Progress)
// ============================================================

interface ProgressRingProps {
  value: number; // 0–100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
  label?: string;
}

export default function ProgressRing({
  value,
  size = 48,
  strokeWidth = 4,
  color = 'var(--color-primary-600)',
  trackColor = 'var(--border-default)',
  showLabel = true,
  label,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      {showLabel && (
        <span
          className="absolute text-[10px] font-bold"
          style={{ color: 'var(--text-primary)', fontSize: size < 40 ? '8px' : size < 60 ? '10px' : '12px' }}
        >
          {label ?? `${Math.round(value)}%`}
        </span>
      )}
    </div>
  );
}
