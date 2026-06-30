// ============================================================
// ForgeMES — Employee Store (CRUD & Audit Logs)
// ============================================================

import { create } from 'zustand';
import type { Employee, AuditLog, EmployeeStatus, ShiftType } from '@/types';
import { employees as initialEmployees } from '@/mock/data';

interface EmployeeState {
  employees: Employee[];
  auditLogs: AuditLog[];
  
  // Actions
  addEmployee: (employee: Omit<Employee, 'id'>, performedBy: string) => string;
  updateEmployee: (id: string, updates: Partial<Employee>, performedBy: string) => void;
  deleteEmployee: (id: string, performedBy: string) => void;
  
  // Workflow Actions
  changeStatus: (id: string, newStatus: EmployeeStatus, performedBy: string, reason: string) => void;
  assignShift: (id: string, shift: ShiftType, performedBy: string) => void;
  
  // Queries
  getEmployeeLogs: (employeeId: string) => AuditLog[];
}

// Generate some initial audit logs for the mock data
const generateInitialLogs = (): AuditLog[] => {
  return initialEmployees.map((emp) => ({
    id: `LOG-${Math.random().toString(36).substr(2, 9)}`,
    entityId: emp.id,
    entityType: 'employee',
    action: 'created',
    description: 'Initial employee record created during system migration.',
    performedBy: 'System',
    timestamp: emp.joinDate,
  }));
};

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: [...initialEmployees],
  auditLogs: generateInitialLogs(),

  addEmployee: (employee, performedBy) => {
    const id = `EMP-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    const newEmployee: Employee = { ...employee, id };
    
    const newLog: AuditLog = {
      id: `LOG-${Math.random().toString(36).substr(2, 9)}`,
      entityId: id,
      entityType: 'employee',
      action: 'created',
      description: 'Employee onboarded via application wizard.',
      performedBy,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      employees: [...state.employees, newEmployee],
      auditLogs: [newLog, ...state.auditLogs],
    }));

    return id;
  },

  updateEmployee: (id, updates, performedBy) => {
    set((state) => {
      const newLogs: AuditLog[] = [];
      const updatedEmployees = state.employees.map((emp) => {
        if (emp.id === id) {
          const changedKeys = Object.keys(updates);
          if (changedKeys.length > 0) {
            newLogs.push({
              id: `LOG-${Math.random().toString(36).substr(2, 9)}`,
              entityId: id,
              entityType: 'employee',
              action: 'updated',
              description: `Updated profile fields: ${changedKeys.join(', ')}`,
              performedBy,
              timestamp: new Date().toISOString(),
              metadata: { updates },
            });
          }
          return { ...emp, ...updates };
        }
        return emp;
      });

      return {
        employees: updatedEmployees,
        auditLogs: [...newLogs, ...state.auditLogs],
      };
    });
  },

  deleteEmployee: (id, performedBy) => {
    set((state) => {
      const newLog: AuditLog = {
        id: `LOG-${Math.random().toString(36).substr(2, 9)}`,
        entityId: id,
        entityType: 'employee',
        action: 'deleted',
        description: 'Employee record was permanently deleted.',
        performedBy,
        timestamp: new Date().toISOString(),
      };

      return {
        employees: state.employees.filter((emp) => emp.id !== id),
        auditLogs: [newLog, ...state.auditLogs],
      };
    });
  },

  changeStatus: (id, newStatus, performedBy, reason) => {
    set((state) => {
      let oldStatus = '';
      const updatedEmployees = state.employees.map((emp) => {
        if (emp.id === id) {
          oldStatus = emp.status;
          return { ...emp, status: newStatus };
        }
        return emp;
      });

      const newLog: AuditLog = {
        id: `LOG-${Math.random().toString(36).substr(2, 9)}`,
        entityId: id,
        entityType: 'employee',
        action: 'status-changed',
        description: `Status changed from '${oldStatus}' to '${newStatus}'. Reason: ${reason}`,
        performedBy,
        timestamp: new Date().toISOString(),
      };

      return {
        employees: updatedEmployees,
        auditLogs: [newLog, ...state.auditLogs],
      };
    });
  },

  assignShift: (id, shift, performedBy) => {
    set((state) => {
      let oldShift = '';
      const updatedEmployees = state.employees.map((emp) => {
        if (emp.id === id) {
          oldShift = emp.shift;
          return { ...emp, shift };
        }
        return emp;
      });

      const newLog: AuditLog = {
        id: `LOG-${Math.random().toString(36).substr(2, 9)}`,
        entityId: id,
        entityType: 'employee',
        action: 'shift-assigned',
        description: `Shift changed from '${oldShift}' to '${shift}'.`,
        performedBy,
        timestamp: new Date().toISOString(),
      };

      return {
        employees: updatedEmployees,
        auditLogs: [newLog, ...state.auditLogs],
      };
    });
  },

  getEmployeeLogs: (employeeId) => {
    return get().auditLogs.filter(log => log.entityId === employeeId).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },
}));
