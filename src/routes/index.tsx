// ============================================================
// ForgeMES — Route Definitions
// ============================================================

import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import DashboardPage from '@/features/dashboard/DashboardPage';
import ProductionPage from '@/features/production/ProductionPage';
import MachinesPage from '@/features/machines/MachinesPage';
import WorkOrdersPage from '@/features/work-orders/WorkOrdersPage';
import QualityPage from '@/features/quality/QualityPage';
import InventoryPage from '@/features/inventory/InventoryPage';
import MaintenancePage from '@/features/maintenance/MaintenancePage';
import EmployeesPage from '@/features/employees/EmployeesPage';
import AnalyticsPage from '@/features/analytics/AnalyticsPage';
import ReportsPage from '@/features/reports/ReportsPage';
import SettingsPage from '@/features/settings/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'production', element: <ProductionPage /> },
      { path: 'machines', element: <MachinesPage /> },
      { path: 'work-orders', element: <WorkOrdersPage /> },
      { path: 'quality', element: <QualityPage /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'maintenance', element: <MaintenancePage /> },
      { path: 'employees', element: <EmployeesPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
