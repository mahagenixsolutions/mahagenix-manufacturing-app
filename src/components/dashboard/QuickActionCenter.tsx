import React from "react";
import {
  PlusCircle,
  Wrench,
  UserPlus,
  ClipboardCheck,
  Play,
  ShoppingCart,
} from "lucide-react";

export default function QuickActionCenter() {
  const actions = [
    {
      icon: Play,
      label: "Start Production",
      color: "text-success-600",
      bg: "bg-success-100",
    },
    {
      icon: PlusCircle,
      label: "New Work Order",
      color: "text-primary-600",
      bg: "bg-primary-100",
    },
    {
      icon: Wrench,
      label: "Raise Ticket",
      color: "text-warning-600",
      bg: "bg-warning-100",
    },
    {
      icon: ClipboardCheck,
      label: "Log Inspection",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      icon: UserPlus,
      label: "Add Employee",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: ShoppingCart,
      label: "Purchase Request",
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 h-full items-center">
      {actions.map((action, i) => (
        <button
          key={i}
          className="flex flex-col items-center justify-center p-4 h-[88px] lg:h-[110px] rounded-xl border border-subtle bg-surface hover:bg-surface-hover hover:border-primary-300 transition-all cursor-pointer group text-center"
        >
          <div
            className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mb-2.5 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}
          >
            <action.icon className="w-5 h-5 lg:w-6 lg:h-6" />
          </div>
          <span className="text-[11px] lg:text-[13px] font-bold text-secondary group-hover:text-primary leading-tight transition-all">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}
