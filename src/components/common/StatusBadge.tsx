// ============================================================
// ForgeMES — Status Badge
// ============================================================

import type { MachineStatus, WorkOrderStatus, Priority, InspectionStatus, MaintenanceStatus, EmployeeStatus } from '@/types';

type BadgeVariant = MachineStatus | WorkOrderStatus | Priority | InspectionStatus | MaintenanceStatus | EmployeeStatus | 'adequate' | 'low' | 'critical' | 'out-of-stock' | 'valid' | 'expiring' | 'expired';

const variantStyles: Record<string, { bg: string; text: string; dot: string }> = {
  // Machine / general
  running:       { bg: 'bg-success-50 dark:bg-success-500/10', text: 'text-success-700 dark:text-success-400', dot: 'bg-success-500' },
  idle:          { bg: 'bg-warning-50 dark:bg-warning-500/10', text: 'text-warning-700 dark:text-warning-400', dot: 'bg-warning-500' },
  stopped:       { bg: 'bg-danger-50 dark:bg-danger-500/10', text: 'text-danger-700 dark:text-danger-400', dot: 'bg-danger-500' },
  maintenance:   { bg: 'bg-primary-50 dark:bg-primary-500/10', text: 'text-primary-700 dark:text-primary-400', dot: 'bg-primary-500' },

  // Work order
  'queued':        { bg: 'bg-surface-100 dark:bg-surface-700', text: 'text-surface-600 dark:text-surface-300', dot: 'bg-surface-400' },
  'in-progress':   { bg: 'bg-primary-50 dark:bg-primary-500/10', text: 'text-primary-700 dark:text-primary-400', dot: 'bg-primary-500' },
  'quality-check': { bg: 'bg-warning-50 dark:bg-warning-500/10', text: 'text-warning-700 dark:text-warning-400', dot: 'bg-warning-500' },
  'completed':     { bg: 'bg-success-50 dark:bg-success-500/10', text: 'text-success-700 dark:text-success-400', dot: 'bg-success-500' },
  'delayed':       { bg: 'bg-danger-50 dark:bg-danger-500/10', text: 'text-danger-700 dark:text-danger-400', dot: 'bg-danger-500' },
  'cancelled':     { bg: 'bg-surface-100 dark:bg-surface-700', text: 'text-surface-500 dark:text-surface-400', dot: 'bg-surface-400' },
  'pending-onboarding': { bg: 'bg-surface-100 dark:bg-surface-700', text: 'text-surface-600 dark:text-surface-300', dot: 'bg-surface-400' },
  'off-boarded':   { bg: 'bg-danger-50 dark:bg-danger-500/10', text: 'text-danger-700 dark:text-danger-400', dot: 'bg-danger-500' },

  // Priority
  critical: { bg: 'bg-danger-50 dark:bg-danger-500/10', text: 'text-danger-700 dark:text-danger-400', dot: 'bg-danger-500' },
  high:     { bg: 'bg-warning-50 dark:bg-warning-500/10', text: 'text-warning-700 dark:text-warning-400', dot: 'bg-warning-500' },
  medium:   { bg: 'bg-primary-50 dark:bg-primary-500/10', text: 'text-primary-700 dark:text-primary-400', dot: 'bg-primary-500' },
  low:      { bg: 'bg-surface-100 dark:bg-surface-700', text: 'text-surface-600 dark:text-surface-300', dot: 'bg-surface-400' },

  // Inspection
  pending:    { bg: 'bg-warning-50 dark:bg-warning-500/10', text: 'text-warning-700 dark:text-warning-400', dot: 'bg-warning-500' },
  passed:     { bg: 'bg-success-50 dark:bg-success-500/10', text: 'text-success-700 dark:text-success-400', dot: 'bg-success-500' },
  failed:     { bg: 'bg-danger-50 dark:bg-danger-500/10', text: 'text-danger-700 dark:text-danger-400', dot: 'bg-danger-500' },
  'in-review': { bg: 'bg-primary-50 dark:bg-primary-500/10', text: 'text-primary-700 dark:text-primary-400', dot: 'bg-primary-500' },

  // Maintenance
  scheduled:  { bg: 'bg-primary-50 dark:bg-primary-500/10', text: 'text-primary-700 dark:text-primary-400', dot: 'bg-primary-500' },
  overdue:    { bg: 'bg-danger-50 dark:bg-danger-500/10', text: 'text-danger-700 dark:text-danger-400', dot: 'bg-danger-500' },

  // Inventory
  adequate:      { bg: 'bg-success-50 dark:bg-success-500/10', text: 'text-success-700 dark:text-success-400', dot: 'bg-success-500' },
  'out-of-stock': { bg: 'bg-danger-50 dark:bg-danger-500/10', text: 'text-danger-700 dark:text-danger-400', dot: 'bg-danger-500' },

  // Certification
  valid:     { bg: 'bg-success-50 dark:bg-success-500/10', text: 'text-success-700 dark:text-success-400', dot: 'bg-success-500' },
  expiring:  { bg: 'bg-warning-50 dark:bg-warning-500/10', text: 'text-warning-700 dark:text-warning-400', dot: 'bg-warning-500' },
  expired:   { bg: 'bg-danger-50 dark:bg-danger-500/10', text: 'text-danger-700 dark:text-danger-400', dot: 'bg-danger-500' },
};

interface StatusBadgeProps {
  status: BadgeVariant;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export default function StatusBadge({ status, size = 'sm', showDot = true }: StatusBadgeProps) {
  const styles = variantStyles[status] || variantStyles.idle;
  const label = status
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full whitespace-nowrap
        ${styles.bg} ${styles.text}
        ${size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />}
      {label}
    </span>
  );
}
