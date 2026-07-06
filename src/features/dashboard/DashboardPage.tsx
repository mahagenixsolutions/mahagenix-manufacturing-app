import React from "react";
import DashboardFilterBar from "./components/DashboardFilterBar";
import WelcomeBanner from "./widgets/WelcomeBanner";
import ExecutiveKPIs from "./widgets/ExecutiveKPIs";
import LiveFactoryOverview from "./widgets/LiveFactoryOverview";
import ProductionAnalytics from "./widgets/ProductionAnalytics";
import MachineHealth from "./widgets/MachineHealth";
import QualityDashboard from "./widgets/QualityDashboard";
import MaintenanceCenter from "./widgets/MaintenanceCenter";
import InventoryOverview from "./widgets/InventoryOverview";
import WorkOrdersTable from "./widgets/WorkOrdersTable";
import EmployeePerformance from "./widgets/EmployeePerformance";
import EnergySustainability from "./widgets/EnergySustainability";
import ActivityFeed from "./widgets/ActivityFeed";
import CriticalAlerts from "./widgets/CriticalAlerts";
import WidgetContainer from "./components/WidgetContainer";

import {
  Activity,
  Cpu,
  CheckCircle2,
  Wrench,
  Package,
  ClipboardList,
  Users,
  Zap,
  Clock,
  AlertOctagon,
  BarChart3,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 relative min-h-screen">
      {/* Left/Main panel: stretches to full screen */}
      <div className="flex-1 flex flex-col gap-6 w-full">
        {/* Top Header controls */}
        <div className="flex flex-col gap-4 border-b border-subtle pb-4">
          <div>
            <h1 className="text-2xl font-black text-primary tracking-tight">
              Operations Command Center
            </h1>
            <p className="text-[13px] text-tertiary mt-1">
              Real-time shop floor telemetry and predictive insights
            </p>
          </div>

          <div className="w-full flex items-center">
            <DashboardFilterBar />
          </div>
        </div>

        {/* 12-Column Responsive CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 pb-20">
          {/* Welcome Banner */}
          <div className="col-span-1 md:col-span-6 lg:col-span-12">
            <WelcomeBanner />
          </div>

          {/* Section 2: Executive KPI Overview */}
          <div className="col-span-1 md:col-span-6 lg:col-span-12">
            <ExecutiveKPIs />
          </div>

          {/* Section 15: Critical Alerts */}
          <div className="col-span-1 md:col-span-6 lg:col-span-12">
            <WidgetContainer
              title="Critical Alarms & Approvals"
              icon={<AlertOctagon className="w-4.5 h-4.5 text-danger-500" />}
            >
              <CriticalAlerts />
            </WidgetContainer>
          </div>

          {/* Section 4: Live Factory Overview */}
          <div className="col-span-1 md:col-span-6 lg:col-span-12">
            <LiveFactoryOverview />
          </div>

          {/* Section 5: Production Analytics */}
          <div className="col-span-1 md:col-span-4 lg:col-span-8">
            <WidgetContainer
              title="OEE & Output Telemetry Analytics"
              icon={<BarChart3 className="w-4.5 h-4.5" />}
            >
              <ProductionAnalytics />
            </WidgetContainer>
          </div>

          {/* Section 14: Activity Feed */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <WidgetContainer
              title="Real-Time Event Feed"
              icon={<Clock className="w-4.5 h-4.5" />}
            >
              <ActivityFeed />
            </WidgetContainer>
          </div>

          {/* Section 6: Machine Health */}
          <div className="col-span-1 md:col-span-6 lg:col-span-12">
            <WidgetContainer
              title="Machine Health & Telemetry Sensors"
              icon={<Cpu className="w-5 h-5" />}
            >
              <MachineHealth />
            </WidgetContainer>
          </div>

          {/* Section 7: Quality Control Dashboard */}
          <div className="col-span-1 md:col-span-6 lg:col-span-12">
            <WidgetContainer
              title="Quality Control Analytics"
              icon={<CheckCircle2 className="w-5 h-5 text-success-600" />}
            >
              <QualityDashboard />
            </WidgetContainer>
          </div>

          {/* Section 8: Maintenance Center */}
          <div className="col-span-1 md:col-span-3 lg:col-span-6">
            <WidgetContainer
              title="Maintenance Command Center"
              icon={<Wrench className="w-4.5 h-4.5" />}
            >
              <MaintenanceCenter />
            </WidgetContainer>
          </div>

          {/* Section 9: Inventory Overview */}
          <div className="col-span-1 md:col-span-3 lg:col-span-6">
            <WidgetContainer
              title="Inventory Intelligence Hub"
              icon={<Package className="w-4.5 h-4.5" />}
            >
              <InventoryOverview />
            </WidgetContainer>
          </div>

          {/* Section 10: Work Orders */}
          <div className="col-span-1 md:col-span-6 lg:col-span-12">
            <WidgetContainer
              title="Work Order Execution Queue"
              icon={<ClipboardList className="w-4.5 h-4.5" />}
            >
              <WorkOrdersTable />
            </WidgetContainer>
          </div>

          {/* Section 11: Employee Performance */}
          <div className="col-span-1 md:col-span-3 lg:col-span-6">
            <WidgetContainer
              title="Workforce Attendance & Efficiency"
              icon={<Users className="w-4.5 h-4.5" />}
            >
              <EmployeePerformance />
            </WidgetContainer>
          </div>

          {/* Section 12: Energy & Sustainability */}
          <div className="col-span-1 md:col-span-3 lg:col-span-6">
            <WidgetContainer
              title="Energy Meters & Sustainability Index"
              icon={<Zap className="w-4.5 h-4.5 text-amber-500" />}
            >
              <EnergySustainability />
            </WidgetContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
