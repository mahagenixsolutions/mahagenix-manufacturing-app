import React, { useState } from "react";
import { Search, Eye, Filter, ChevronDown, ChevronUp, User } from "lucide-react";
import { workOrders } from "@/mock/data";
import StatusBadge from "@/components/common/StatusBadge";
import type { WorkOrder } from "@/types";

export default function WorkOrdersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const filteredOrders = workOrders
    .filter((wo) => {
      const matchesSearch = wo.product.toLowerCase().includes(searchTerm.toLowerCase()) || wo.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || wo.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .slice(0, 5);

  const toggleRow = (id: string) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filters row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-tertiary" />
          <input
            type="text"
            placeholder="Search work orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-[12px] bg-surface-secondary/40 border border-subtle focus:outline-none focus:border-primary-400 text-primary font-medium"
          />
        </div>

        {/* Status filters selection */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-tertiary" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface border border-subtle rounded-xl px-3 py-1.5 text-[12px] text-secondary font-semibold cursor-pointer focus:outline-none focus:border-primary-400"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="scroll-shadow-right overflow-x-auto w-full border border-subtle rounded-xl">
        <table className="enterprise-table w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-subtle bg-surface-secondary/20">
              <th className="py-3 px-4 text-[11px] font-bold text-tertiary uppercase">WO #</th>
              <th className="py-3 px-4 text-[11px] font-bold text-tertiary uppercase">Product</th>
              <th className="py-3 px-4 text-[11px] font-bold text-tertiary uppercase">Status</th>
              <th className="py-3 px-4 text-[11px] font-bold text-tertiary uppercase">Progress</th>
              <th className="py-3 px-4 text-[11px] font-bold text-tertiary uppercase">Priority</th>
              <th className="py-3 px-4 text-[11px] font-bold text-tertiary uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((wo) => {
              const isExpanded = expandedRowId === wo.id;
              return (
                <React.Fragment key={wo.id}>
                  <tr 
                    onClick={() => toggleRow(wo.id)} 
                    className="border-b border-subtle hover:bg-surface-secondary/10 cursor-pointer transition-colors"
                  >
                    <td data-label="WO #" className="py-3.5 px-4 font-mono font-bold text-[12px] text-primary-600 dark:text-primary-400">
                      {wo.id}
                    </td>
                    <td data-label="Product" className="py-3.5 px-4 font-bold text-primary text-[13px]">{wo.product}</td>
                    <td data-label="Status" className="py-3.5 px-4">
                      <StatusBadge status={wo.status} size="md" />
                    </td>
                    <td data-label="Progress" className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-1.5 rounded-full overflow-hidden bg-surface-secondary">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${wo.progress}%`,
                              background:
                                wo.progress >= 75
                                  ? "var(--color-success-500)"
                                  : wo.progress >= 40
                                    ? "var(--color-primary-500)"
                                    : "var(--color-warning-500)",
                            }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-secondary">
                          {wo.progress}%
                        </span>
                      </div>
                    </td>
                    <td data-label="Priority" className="py-3.5 px-4">
                      <StatusBadge status={wo.priority} size="md" />
                    </td>
                    <td data-label="Actions" className="py-3.5 px-4 text-right">
                      {isExpanded ? <ChevronUp className="w-5 h-5 inline text-tertiary" /> : <ChevronDown className="w-5 h-5 inline text-tertiary" />}
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {isExpanded && (
                    <tr className="bg-surface-secondary/10">
                      <td colSpan={6} className="py-4 px-6 border-b border-subtle before:hidden !block">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[12px] text-secondary">
                          <div className="space-y-1">
                            <span className="text-tertiary font-bold uppercase text-[9px] block">Assigned Line</span>
                            <span className="font-semibold text-primary">{wo.line || "Line A1"}</span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-tertiary font-bold uppercase text-[9px] block">Supervisor Operator</span>
                            <span className="font-semibold text-primary flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-tertiary" />
                              {wo.operator || "None"}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-tertiary font-bold uppercase text-[9px] block">Delivery Target Deadline</span>
                            <span className="font-mono font-semibold text-primary">{wo.deadline}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-secondary text-[12px] font-semibold">
                  No matching work orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
