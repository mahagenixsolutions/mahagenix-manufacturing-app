import React from "react";
import { CheckCircle, XCircle, FileText, Wrench, User } from "lucide-react";

export default function PendingApprovals() {
  const approvals = [
    {
      id: "APP-101",
      type: "Leave Request",
      requester: "John Smith",
      icon: User,
      urgent: false,
    },
    {
      id: "APP-102",
      type: "Maintenance Overtime",
      requester: "Sarah Jones",
      icon: Wrench,
      urgent: true,
    },
    {
      id: "APP-103",
      type: "PO: CNC Parts",
      requester: "Mike Brown",
      icon: FileText,
      urgent: false,
    },
  ];

  return (
    <div className="flex flex-col h-full divide-y divide-subtle -mx-5 px-5">
      {approvals.map((app) => (
        <div
          key={app.id}
          className="flex items-center justify-between py-4 px-5 hover:bg-surface-hover transition-colors"
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-2 rounded-lg shrink-0 ${app.urgent ? "bg-danger-100 text-danger-600" : "bg-surface-secondary text-secondary"}`}
            >
              <app.icon className="w-5 h-5 shrink-0 lg:w-5 lg:h-5 transition-all" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-bold text-primary">
                  {app.type}
                </span>
                {app.urgent && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-danger-100 text-danger-700 uppercase tracking-wider">
                    Urgent
                  </span>
                )}
              </div>
              <div className="text-[11px] text-tertiary mt-0.5">
                Req by {app.requester}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="p-1.5 text-danger-500 hover:bg-danger-50 rounded-md transition-colors cursor-pointer">
              <XCircle className="w-5 h-5 shrink-0 lg:w-5 lg:h-5 transition-all" />
            </button>
            <button className="p-1.5 text-success-500 hover:bg-success-50 rounded-md transition-colors cursor-pointer">
              <CheckCircle className="w-5 h-5 shrink-0 lg:w-5 lg:h-5 transition-all" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
