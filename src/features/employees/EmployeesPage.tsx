// ============================================================
// ForgeMES — Employees Page (Deep Workflow)
// ============================================================

import { useState } from "react";
import { useEmployeeStore } from "./store/useEmployeeStore";
import { useWorkflowStore } from "@/store/useWorkflowStore";
import {
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  ShieldAlert,
} from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import EmployeeOnboardingWizard from "./components/EmployeeOnboardingWizard";
import EmployeeDetailSheet from "./components/EmployeeDetailSheet";
import type { Employee } from "@/types";

export default function EmployeesPage() {
  const employees = useEmployeeStore((s) => s.employees);
  const deleteEmployee = useEmployeeStore((s) => s.deleteEmployee);
  const { currentUser, canOnboardEmployees } = useWorkflowStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-xl lg:text-2xl font-bold transition-all"
            style={{ color: "var(--text-primary)" }}
          >
            Employee Directory
          </h1>
          <p
            className="text-[13px] lg:text-[14px] mt-0.5 transition-all"
            style={{ color: "var(--text-tertiary)" }}
          >
            Manage staff, certifications, and shift schedules
          </p>
        </div>
        <div className="flex items-center gap-3">
          {canOnboardEmployees() ? (
            <button
              onClick={() => setWizardOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors cursor-pointer shadow-sm"
            >
              <UserPlus className="w-5 h-5" /> Onboard Employee
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-secondary border border-subtle rounded-lg text-[11px] text-tertiary cursor-not-allowed">
              <ShieldAlert className="w-5 h-5 text-warning-500" /> Insufficient
              Permissions
            </div>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
          <input
            type="text"
            placeholder="Search employees by name, role, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-[13px] bg-surface text-primary focus:border-primary-500 outline-none transition-colors"
            style={{ borderColor: "var(--border-default)" }}
          />
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 border rounded-lg text-[13px] font-medium text-secondary hover:bg-surface-secondary transition-colors cursor-pointer bg-surface"
          style={{ borderColor: "var(--border-default)" }}
        >
          <Filter className="w-5 h-5" /> Filter by Shift
        </button>
      </div>

      {/* Data Table */}
      <div className="card-elevated overflow-hidden border border-subtle">
        <div className="table-container">
          <table className="enterprise-table w-full text-left border-collapse">
            <thead>
              <tr
                className="border-b bg-surface-secondary"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <th className="px-6 py-3 text-[11px] font-bold text-tertiary uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-[11px] font-bold text-tertiary uppercase tracking-wider">
                  Department & Role
                </th>
                <th className="px-6 py-3 text-[11px] font-bold text-tertiary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-[11px] font-bold text-tertiary uppercase tracking-wider">
                  Shift
                </th>
                <th className="px-6 py-3 text-[11px] font-bold text-tertiary uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-[11px] font-bold text-tertiary uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className="divide-y bg-surface"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-[var(--bg-surface-hover)] transition-colors group"
                >
                  <td data-label="Employee" className="px-6 py-4">
                    <div className="flex items-center gap-12">
                      <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold shrink-0">
                        {emp.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-bold text-[13px] text-primary">
                          {emp.name}
                        </div>
                        <div className="text-[11px] text-tertiary">
                          {emp.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Department & Role" className="px-6 py-4">
                    <div className="font-medium text-[13px] text-primary capitalize">
                      {emp.role}
                    </div>
                    <div className="text-[11px] text-tertiary">
                      {emp.department}
                    </div>
                  </td>
                  <td data-label="Status" className="px-6 py-4">
                    <StatusBadge status={emp.status} />
                  </td>
                  <td data-label="Shift" className="px-6 py-4">
                    <span className="capitalize text-[12px] font-medium text-secondary">
                      {emp.shift}
                    </span>
                  </td>
                  <td
                    data-label="Join Date"
                    className="px-6 py-4 text-[12px] text-secondary"
                  >
                    {new Date(emp.joinDate).toLocaleDateString()}
                  </td>
                  <td data-label="Actions" className="px-6 py-4 text-right">
                    <div className="flex items-center md:justify-end gap-2">
                      <button
                        onClick={() => setSelectedEmployeeId(emp.id)}
                        className="px-3 py-1.5 bg-surface-secondary text-primary font-medium text-[12px] rounded border border-subtle hover:bg-surface-hover transition-colors cursor-pointer"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this employee?",
                            )
                          ) {
                            deleteEmployee(
                              emp.id,
                              currentUser?.name || "System",
                            );
                          }
                        }}
                        className="p-1.5 text-tertiary hover:text-danger-600 rounded transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-tertiary text-[13px]"
                  >
                    No employees found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EmployeeOnboardingWizard
        open={wizardOpen}
        onOpenChange={setWizardOpen}
      />
      <EmployeeDetailSheet
        employeeId={selectedEmployeeId}
        open={!!selectedEmployeeId}
        onOpenChange={(open) => !open && setSelectedEmployeeId(null)}
      />
    </div>
  );
}
