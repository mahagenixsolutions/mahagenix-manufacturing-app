// ============================================================
// ForgeMES — Inventory Page
// ============================================================

import { useState } from 'react';
import { inventoryItems } from '@/mock/data';
import StatusBadge from '@/components/common/StatusBadge';
import {
  Search,
  Filter,
  Download,
  Plus,
  Package,
  AlertTriangle,
  TrendingDown,
  Warehouse,
  ChevronRight,
} from 'lucide-react';

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [...new Set(inventoryItems.map((i) => i.category))].sort();
  
  const stats = {
    total: inventoryItems.length,
    lowStock: inventoryItems.filter(i => i.status === 'low' || i.status === 'critical').length,
    outOfStock: inventoryItems.filter(i => i.status === 'out-of-stock').length,
    totalValue: inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0),
  };

  const filtered = inventoryItems.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return item.sku.toLowerCase().includes(q) || item.name.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Inventory</h1>
          <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            Warehouse dashboard & stock tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[12px] font-medium cursor-pointer" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium text-white bg-primary-600 cursor-pointer">
            <Plus className="w-3.5 h-3.5" /> Receive Stock
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: stats.total.toLocaleString(), icon: Package, color: 'var(--color-primary-500)' },
          { label: 'Low/Critical Stock', value: stats.lowStock.toLocaleString(), icon: AlertTriangle, color: 'var(--color-warning-500)' },
          { label: 'Out of Stock', value: stats.outOfStock.toLocaleString(), icon: TrendingDown, color: 'var(--color-danger-500)' },
          { label: 'Total Value', value: `₹${(stats.totalValue / 1000000).toFixed(2)}M`, icon: Warehouse, color: 'var(--color-success-500)' },
        ].map((kpi) => (
          <div key={kpi.label} className="card-elevated p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${kpi.color}15` }}>
                <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
              </div>
            </div>
            <p className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>{kpi.label}</p>
            <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Search SKU or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-lg border text-[12px] w-56"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-lg border text-[12px] cursor-pointer appearance-none"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
          >
            <option value="all">All Status</option>
            <option value="adequate">Adequate</option>
            <option value="low">Low</option>
            <option value="critical">Critical</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg border text-[12px] cursor-pointer appearance-none"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <span className="text-[12px] ml-auto" style={{ color: 'var(--text-tertiary)' }}>
          Showing {filtered.length} of {inventoryItems.length}
        </span>
      </div>

      {/* Table */}
      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Current Stock</th>
                <th>Min/Max</th>
                <th>Location</th>
                <th>Supplier</th>
                <th>Last Restocked</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.sku} className="cursor-pointer">
                  <td><span className="font-mono font-bold text-[12px]" style={{ color: 'var(--color-primary-600)' }}>{item.sku}</span></td>
                  <td><span className="font-medium text-[12px]">{item.name}</span></td>
                  <td className="text-[12px]">{item.category}</td>
                  <td><StatusBadge status={item.status as any} /></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface-secondary)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%`,
                            background: item.status === 'out-of-stock' ? 'var(--color-danger-500)' : item.status === 'critical' ? 'var(--color-danger-400)' : item.status === 'low' ? 'var(--color-warning-500)' : 'var(--color-success-500)',
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-mono font-medium">
                        {item.currentStock.toLocaleString()} {item.unit}
                      </span>
                    </div>
                  </td>
                  <td className="text-[12px] font-mono" style={{ color: 'var(--text-secondary)' }}>
                    {item.minStock.toLocaleString()} / {item.maxStock.toLocaleString()}
                  </td>
                  <td className="text-[12px]">{item.location}</td>
                  <td className="text-[12px]">{item.supplier}</td>
                  <td className="text-[12px] font-mono">{item.lastRestocked}</td>
                  <td><ChevronRight className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
