// ============================================================
// ForgeMES — Workflow Store (RBAC & Active Context)
// ============================================================

import { create } from 'zustand';
import type { EmployeeRole } from '@/types';

interface UserContext {
  id: string;
  name: string;
  role: EmployeeRole;
  email: string;
}

interface WorkflowState {
  // Current logged in user
  currentUser: UserContext | null;
  setCurrentUser: (user: UserContext | null) => void;

  // RBAC Checks
  canApproveWorkflows: () => boolean;
  canAssignShifts: () => boolean;
  canOnboardEmployees: () => boolean;
}

// Mock initial user: Plant Manager
const MOCK_USER: UserContext = {
  id: 'EMP-001',
  name: 'Arvind Mehta',
  role: 'manager',
  email: 'arvind.mehta@forgemes.com',
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  currentUser: MOCK_USER,
  
  setCurrentUser: (user) => set({ currentUser: user }),

  canApproveWorkflows: () => {
    const role = get().currentUser?.role;
    return role === 'manager' || role === 'supervisor' || role === 'hr';
  },

  canAssignShifts: () => {
    const role = get().currentUser?.role;
    return role === 'manager' || role === 'supervisor';
  },

  canOnboardEmployees: () => {
    const role = get().currentUser?.role;
    return role === 'hr' || role === 'manager';
  },
}));
