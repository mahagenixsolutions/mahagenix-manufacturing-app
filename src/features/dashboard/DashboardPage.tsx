// ============================================================
// ForgeMES — Dashboard Page (Enterprise Command Center)
// ============================================================

import React, { useState, useEffect, useRef } from "react";
// @ts-ignore
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import KPICards from "@/components/dashboard/KPICards";
import FactoryFloorMap from "@/components/dashboard/FactoryFloorMap";
import ProductionTimeline from "@/components/dashboard/ProductionTimeline";
import ProductionTrendCharts from "@/components/dashboard/ProductionTrendCharts";
import ShiftSummary from "@/components/dashboard/ShiftSummary";
import ActiveWorkOrders from "@/components/dashboard/ActiveWorkOrders";
import RecentAlerts from "@/components/dashboard/RecentAlerts";
import AIInsights from "@/components/dashboard/AIInsights";
import DashboardFilterBar from "./components/DashboardFilterBar";
import WidgetContainer from "./components/WidgetContainer";
import QuickActionCenter from "@/components/dashboard/QuickActionCenter";
import FactoryHealth from "@/components/dashboard/FactoryHealth";
import ResourceMonitoring from "@/components/dashboard/ResourceMonitoring";
import PendingApprovals from "@/components/dashboard/PendingApprovals";
import TodaySchedule from "@/components/dashboard/TodaySchedule";
import ProductionLeaderboards from "@/components/dashboard/ProductionLeaderboards";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import {
  CalendarDays,
  Maximize,
  Minimize,
  Settings2,
  ShieldAlert,
  Zap,
  Calendar,
  Trophy,
  ListTodo,
  ActivitySquare,
  Radio,
} from "lucide-react";

const INITIAL_LAYOUT = [
  { i: 'kpi', x: 0, y: 0, w: 12, h: 2, static: false },
  { i: 'quick-actions', x: 0, y: 2, w: 6, h: 4, minW: 3, minH: 2 },
  { i: 'health', x: 6, y: 2, w: 6, h: 4, minW: 4, minH: 3 },
  { i: 'map', x: 0, y: 6, w: 8, h: 5, minW: 4, minH: 4 },
  { i: 'shift', x: 8, y: 6, w: 4, h: 5, minW: 3, minH: 3 },
  { i: 'resource', x: 0, y: 11, w: 4, h: 4, minW: 3, minH: 3 },
  { i: 'approvals', x: 4, y: 11, w: 4, h: 4, minW: 3, minH: 3 },
  { i: 'schedule', x: 8, y: 11, w: 4, h: 4, minW: 3, minH: 3 },
  { i: 'timeline', x: 0, y: 15, w: 6, h: 5, minW: 4, minH: 3 },
  { i: 'trends', x: 6, y: 15, w: 6, h: 5, minW: 4, minH: 3 },
  { i: 'orders', x: 0, y: 20, w: 8, h: 5, minW: 4, minH: 4 },
  { i: 'leaderboard', x: 8, y: 20, w: 4, h: 5, minW: 3, minH: 4 },
  { i: 'alerts', x: 0, y: 25, w: 4, h: 5, minW: 3, minH: 4 },
  { i: 'insights', x: 4, y: 25, w: 4, h: 5, minW: 3, minH: 4 },
  { i: 'feed', x: 8, y: 25, w: 4, h: 5, minW: 3, minH: 4 },
];

export default function DashboardPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [layouts, setLayouts] = useState({ lg: INITIAL_LAYOUT });
  const [width, setWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onLayoutChange = (layout: any, allLayouts: any) => {
    setLayouts(allLayouts);
  };

  return (
    <div
      className={`flex flex-col space-y-4 ${isFullscreen ? "bg-surface-secondary min-h-screen p-6 overflow-y-auto" : ""}`}
    >
      {/* Page Header */}
      {!isFullscreen && (
        <div className="flex items-center justify-between px-2 mb-5">
          <div>
            <h1
              className="text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Operations Command Center
            </h1>
            <p
              className="text-[13px] mt-2"
              style={{ color: "var(--text-tertiary)" }}
            >
              Real-time factory telemetry and active incident tracking
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] bg-surface-secondary text-secondary">
              <CalendarDays className="w-3.5 h-3.5" />
              {today}
            </div>
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors border border-primary-200 cursor-pointer"
            >
              <Maximize className="w-3.5 h-3.5" /> TV Mode
            </button>
            <button className="p-1.5 text-secondary hover:text-primary rounded-md transition-colors cursor-pointer bg-surface border border-subtle">
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="mb-6">
        <DashboardFilterBar />
      </div>

      {isFullscreen && (
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-primary">
            ForgeMES Command Center
          </h1>
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold bg-surface text-secondary hover:text-primary transition-colors border border-subtle cursor-pointer shadow-sm"
          >
            <Minimize className="w-4 h-4" /> Exit TV Mode
          </button>
        </div>
      )}

      <div className="-mx-2" ref={containerRef}>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          width={width}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={80}
          onLayoutChange={onLayoutChange}
          margin={[20, 24]}
          {...{ draggableHandle: ".drag-handle" }}
        >
          <div key="kpi">
            <WidgetContainer
              title="Plant Performance Overview"
              className="h-full"
              hideFooter
            >
              <KPICards />
            </WidgetContainer>
          </div>

          <div key="quick-actions">
            <WidgetContainer
              title="Quick Actions"
              icon={<ListTodo className="w-4 h-4" />}
              className="h-full"
            >
              <QuickActionCenter />
            </WidgetContainer>
          </div>

          <div key="health">
            <WidgetContainer
              title="Factory Health Status"
              icon={<ActivitySquare className="w-4 h-4" />}
              className="h-full"
            >
              <FactoryHealth />
            </WidgetContainer>
          </div>

          <div key="map">
            <WidgetContainer
              title="Factory Floor Layout"
              subtitle="Real-time machine status"
              className="h-full"
            >
              <FactoryFloorMap />
            </WidgetContainer>
          </div>

          <div key="shift">
            <WidgetContainer title="Active Shift Details" className="h-full">
              <ShiftSummary />
            </WidgetContainer>
          </div>

          <div key="resource">
            <WidgetContainer
              title="Resource Monitoring"
              icon={<Zap className="w-4 h-4" />}
              className="h-full"
            >
              <ResourceMonitoring />
            </WidgetContainer>
          </div>

          <div key="approvals">
            <WidgetContainer
              title="Pending Approvals"
              icon={<ShieldAlert className="w-4 h-4" />}
              className="h-full"
            >
              <PendingApprovals />
            </WidgetContainer>
          </div>

          <div key="schedule">
            <WidgetContainer
              title="Today's Schedule"
              icon={<Calendar className="w-4 h-4" />}
              className="h-full"
            >
              <TodaySchedule />
            </WidgetContainer>
          </div>

          <div key="timeline">
            <WidgetContainer title="Production Timeline" className="h-full">
              <ProductionTimeline />
            </WidgetContainer>
          </div>

          <div key="trends">
            <WidgetContainer title="OEE Trend Analysis" className="h-full">
              <ProductionTrendCharts />
            </WidgetContainer>
          </div>

          <div key="orders">
            <WidgetContainer 
              title="Active Work Orders" 
              className="h-full"
              headerAction={
                <button
                  className="text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-200"
                >
                  View All
                </button>
              }
            >
              <ActiveWorkOrders />
            </WidgetContainer>
          </div>

          <div key="leaderboard">
            <WidgetContainer
              title="Leaderboards"
              icon={<Trophy className="w-4 h-4" />}
              className="h-full"
            >
              <ProductionLeaderboards />
            </WidgetContainer>
          </div>

          <div key="alerts">
            <WidgetContainer title="Incident Center" className="h-full">
              <RecentAlerts />
            </WidgetContainer>
          </div>

          <div key="insights">
            <WidgetContainer title="AI Predictive Insights" className="h-full">
              <AIInsights />
            </WidgetContainer>
          </div>

          <div key="feed">
            <WidgetContainer
              title="Activity Feed"
              icon={<Radio className="w-4 h-4" />}
              className="h-full"
            >
              <ActivityFeed />
            </WidgetContainer>
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
