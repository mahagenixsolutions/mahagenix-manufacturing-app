import React from "react";
import {
  MoreHorizontal,
  GripHorizontal,
  Maximize2,
  RefreshCw,
  AlertTriangle,
  Package,
} from "lucide-react";

interface WidgetContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onDrillDown?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  lastUpdated?: string;
  className?: string;
  contentClassName?: string;
  hideFooter?: boolean;
  headerAction?: React.ReactNode;
}

export default function WidgetContainer({
  title,
  subtitle,
  children,
  icon,
  onDrillDown,
  isLoading,
  isError,
  isEmpty,
  lastUpdated = "Just now",
  className = "",
  contentClassName = "p-5",
  hideFooter = false,
  headerAction,
}: WidgetContainerProps) {
  return (
    <div
      className={`card-elevated flex flex-col h-full bg-surface border border-subtle overflow-hidden relative group ${className}`}
    >
      {/* Widget Header */}
      <div className="shrink-0 px-4 sm:px-6 py-3 sm:py-4 border-b border-subtle flex flex-col sm:flex-row sm:items-center justify-between bg-surface-secondary/50 gap-2">
        <div className="flex items-center gap-2">
          {/* Drag Handle (react-grid-layout uses this class) */}
          <div className="cursor-grab active:cursor-grabbing text-tertiary hover:text-primary transition-colors opacity-0 group-hover:opacity-100 drag-handle">
            <GripHorizontal className="w-5 h-5 lg:w-5 lg:h-5 transition-all" />
          </div>
          {icon && <div className="text-primary-600 transition-all shrink-0">{icon}</div>}
          <div>
            <h3 className="text-[14px] lg:text-[16px] font-bold text-primary leading-tight transition-all">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] lg:text-[12px] text-tertiary leading-none mt-1 transition-all">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {headerAction && <div className="flex items-center">{headerAction}</div>}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onDrillDown && (
              <button
                onClick={onDrillDown}
                className="p-1 text-tertiary hover:text-primary hover:bg-surface-hover rounded transition-colors"
                title="Expand / Drill down"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button className="p-1 text-tertiary hover:text-primary hover:bg-surface-hover rounded transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Widget Content Area */}
      <div className={`flex-1 overflow-auto relative min-h-0 ${contentClassName}`}>
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/80 backdrop-blur-sm z-10">
            <RefreshCw className="w-6 h-6 text-primary-500 animate-spin mb-2" />
            <span className="text-[12px] font-medium text-secondary">
              Loading data...
            </span>
          </div>
        ) : isError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-danger-50/50 z-10 p-6 text-center">
            <AlertTriangle className="w-8 h-8 text-danger-500 mb-2" />
            <span className="text-[13px] font-bold text-danger-700">
              Data Load Failed
            </span>
            <span className="text-[11px] text-danger-600 mt-1">
              Unable to connect to telemetry service.
            </span>
          </div>
        ) : isEmpty ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface z-10 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-surface-secondary flex items-center justify-center mb-3 text-tertiary">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-[13px] font-medium text-secondary">
              No data available
            </span>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Widget Footer (Timestamp) */}
      {!hideFooter && (
        <div className="shrink-0 px-4 sm:px-6 pt-3 sm:pt-4 pb-4 sm:pb-5 bg-surface-secondary/30 border-t border-subtle flex justify-end">
          <span className="text-[10px] font-medium text-tertiary flex items-center gap-1">
            <RefreshCw className="w-12 h-12 shrink-0" /> Updated {lastUpdated}
          </span>
        </div>
      )}
    </div>
  );
}
