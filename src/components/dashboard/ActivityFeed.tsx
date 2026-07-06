import React, { useEffect, useState } from "react";
import { Package, Cog, Wrench, ShieldCheck, Zap } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Activity = {
  id: string;
  type: "production" | "maintenance" | "quality" | "system";
  message: string;
  time: Date;
  user?: string;
};

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      type: "production",
      message: "Work Order WO-1049 started",
      time: new Date(Date.now() - 120000),
      user: "Operator A",
    },
    {
      id: "2",
      type: "quality",
      message: "Inspection passed for batch B-882",
      time: new Date(Date.now() - 360000),
      user: "QA Lead",
    },
    {
      id: "3",
      type: "maintenance",
      message: "Routine check on CNC-4 completed",
      time: new Date(Date.now() - 900000),
      user: "Tech Support",
    },
    {
      id: "4",
      type: "system",
      message: "OEE calculation engine synced",
      time: new Date(Date.now() - 1400000),
    },
    {
      id: "5",
      type: "production",
      message: "Shift B handover initiated",
      time: new Date(Date.now() - 2800000),
      user: "Supervisor",
    },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Math.random().toString(),
        type: "production",
        message: `Pallet scanned at Station ${Math.floor(Math.random() * 10) + 1}`,
        time: new Date(),
        user: "Auto-Scanner",
      };
      setActivities((prev) => [newActivity, ...prev].slice(0, 10));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "production":
        return <Cog className="w-5 h-5 text-primary-500" />;
      case "quality":
        return <ShieldCheck className="w-5 h-5 text-success-500" />;
      case "maintenance":
        return <Wrench className="w-5 h-5 text-warning-500" />;
      case "system":
        return <Zap className="w-5 h-5 text-blue-500" />;
      default:
        return <Package className="w-5 h-5 text-secondary" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case "production":
        return "bg-primary-50";
      case "quality":
        return "bg-success-50";
      case "maintenance":
        return "bg-warning-50";
      case "system":
        return "bg-blue-50";
      default:
        return "bg-surface-secondary";
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
      <div className="space-y-0">
        {activities.map((activity, i) => (
          <div key={activity.id} className="flex gap-3 relative py-4">
            {i !== activities.length - 1 && (
              <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-subtle" />
            )}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${getBg(activity.type)} border border-white`}
            >
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-[12px] font-medium text-primary leading-tight">
                {activity.message}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-tertiary">
                  {formatDistanceToNow(activity.time, { addSuffix: true })}
                </span>
                {activity.user && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-subtle" />
                    <span className="text-[10px] text-secondary font-medium">
                      {activity.user}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
