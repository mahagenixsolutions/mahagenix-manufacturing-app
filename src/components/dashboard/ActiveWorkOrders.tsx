// ============================================================
// ForgeMES — Active Work Orders Table
// ============================================================

import { workOrders } from '@/mock/data';
import StatusBadge from '@/components/common/StatusBadge';

export default function ActiveWorkOrders() {
  const activeOrders = workOrders
    .filter((wo) => wo.status !== 'completed' && wo.status !== 'cancelled')
    .slice(0, 10);

  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <table className="enterprise-table">
        <thead>
          <tr>
            <th className="py-3 px-4">WO #</th>
            <th className="py-3 px-4">Product</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Progress</th>
            <th className="py-3 px-4">Priority</th>
            <th className="py-3 px-4">Line</th>
            <th className="py-3 px-4">Operator</th>
            <th className="py-3 px-4">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {activeOrders.map((wo) => (
            <tr key={wo.id} className="cursor-pointer">
              <td className="py-4 px-4">
                <span className="font-mono font-medium text-[12px]" style={{ color: 'var(--color-primary-600)' }}>
                  {wo.id}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="font-medium">{wo.product}</span>
              </td>
              <td className="py-4 px-4">
                <StatusBadge status={wo.status} size="md" />
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-24 h-2 rounded-full overflow-hidden bg-surface-secondary"
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${wo.progress}%`,
                        background:
                          wo.progress >= 75
                            ? 'var(--color-success-500)'
                            : wo.progress >= 40
                            ? 'var(--color-primary-500)'
                            : 'var(--color-warning-500)',
                      }}
                    />
                  </div>
                  <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {wo.progress}%
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">
                <StatusBadge status={wo.priority} size="md" />
              </td>
              <td className="py-4 px-4">
                <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
                  {wo.line}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
                  {wo.operator}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="text-[12px] font-mono" style={{ color: 'var(--text-secondary)' }}>
                  {wo.deadline}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
