import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/Sheet';
import { useEmployeeStore } from '../store/useEmployeeStore';
import { useWorkflowStore } from '@/store/useWorkflowStore';
import type { Employee } from '@/types';
import { Mail, Phone, Calendar, MapPin, Briefcase, Award, Clock, History, FileText, CheckCircle } from 'lucide-react';
import StatusBadge from '@/components/common/StatusBadge';

interface Props {
  employeeId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EmployeeDetailSheet({ employeeId, open, onOpenChange }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'documents'>('overview');
  
  const employees = useEmployeeStore((s) => s.employees);
  const getEmployeeLogs = useEmployeeStore((s) => s.getEmployeeLogs);
  const changeStatus = useEmployeeStore((s) => s.changeStatus);
  const currentUser = useWorkflowStore((s) => s.currentUser);
  const canApprove = useWorkflowStore((s) => s.canApproveWorkflows());

  const employee = employees.find(e => e.id === employeeId);
  const logs = employeeId ? getEmployeeLogs(employeeId) : [];

  if (!employee) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl bg-surface p-0 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          {/* Header Profile Section */}
          <div className="bg-surface-secondary px-6 py-8 border-b border-subtle">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-2xl font-bold">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">{employee.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[13px] text-tertiary capitalize">{employee.role}</span>
                    <span className="text-tertiary">•</span>
                    <span className="text-[13px] text-tertiary">{employee.department}</span>
                  </div>
                </div>
              </div>
              <StatusBadge status={employee.status} />
            </div>

            {/* Quick Actions (RBAC) */}
            {employee.status === 'pending-onboarding' && canApprove && (
              <div className="mt-6 flex gap-3 p-4 bg-primary-50 rounded-lg border border-primary-100">
                <div className="flex-1">
                  <h4 className="text-[13px] font-bold text-primary-900">Pending Onboarding Approval</h4>
                  <p className="text-[12px] text-primary-700">Review details and approve to activate employee.</p>
                </div>
                <button
                  onClick={() => changeStatus(employee.id, 'active', currentUser?.name || 'System', 'Completed HR Verification')}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg text-[13px] font-bold hover:bg-primary-700 cursor-pointer transition-colors"
                >
                  Approve
                </button>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-subtle px-6 pt-4 gap-6 bg-surface-secondary sticky top-0 z-10">
            {[
              { id: 'overview', label: 'Overview', icon: Briefcase },
              { id: 'timeline', label: 'Audit Timeline', icon: History },
              { id: 'documents', label: 'Documents & Certs', icon: FileText },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 pb-3 text-[13px] font-semibold border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-secondary hover:text-primary'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-[13px] text-secondary">
                    <Mail className="w-5 h-5 text-tertiary" />
                    {employee.email}
                  </div>
                  <div className="flex items-center gap-3 text-[13px] text-secondary">
                    <Phone className="w-5 h-5 text-tertiary" />
                    {employee.phone}
                  </div>
                  <div className="flex items-center gap-3 text-[13px] text-secondary">
                    <Calendar className="w-5 h-5 text-tertiary" />
                    Joined {new Date(employee.joinDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-3 text-[13px] text-secondary">
                    <Clock className="w-5 h-5 text-tertiary" />
                    Shift: <span className="capitalize font-medium text-primary">{employee.shift}</span>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-[14px] font-bold text-primary mb-3">Core Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-surface-secondary rounded-full text-[12px] font-medium text-secondary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Emergency Contact */}
                {employee.emergencyContacts && employee.emergencyContacts.length > 0 && (
                  <div>
                    <h3 className="text-[14px] font-bold text-primary mb-3">Emergency Contact</h3>
                    <div className="p-4 rounded-xl border border-subtle bg-surface-secondary/50">
                      <div className="font-semibold text-[13px] text-primary">{employee.emergencyContacts[0].name}</div>
                      <div className="text-[12px] text-tertiary">{employee.emergencyContacts[0].relationship}</div>
                      <div className="text-[12px] text-primary mt-1 font-medium">{employee.emergencyContacts[0].phone}</div>
                    </div>
                  </div>
                )}

                {/* Shift & Role Assignment */}
                {canApprove && (
                  <div>
                    <h3 className="text-[14px] font-bold text-primary mb-3">Workflow Assignments</h3>
                    <div className="p-4 rounded-xl border border-subtle bg-surface-secondary/50 space-y-4">
                      <div>
                        <label className="text-[12px] font-semibold text-secondary block mb-1.5">Change Shift</label>
                        <select
                          value={employee.shift}
                          onChange={(e) => useEmployeeStore.getState().assignShift(employee.id, e.target.value as any, currentUser?.name || 'System')}
                          className="w-full px-3 py-2 rounded-lg border border-subtle bg-surface text-[13px] text-primary focus:border-primary-500 outline-none"
                        >
                          <option value="morning">Morning (06:00 - 14:00)</option>
                          <option value="evening">Evening (14:00 - 22:00)</option>
                          <option value="night">Night (22:00 - 06:00)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[12px] font-semibold text-secondary block mb-1.5">Change Status</label>
                        <select
                          value={employee.status}
                          onChange={(e) => changeStatus(employee.id, e.target.value as any, currentUser?.name || 'System', 'Manager action via Profile Panel')}
                          className="w-full px-3 py-2 rounded-lg border border-subtle bg-surface text-[13px] text-primary focus:border-primary-500 outline-none"
                        >
                          <option value="pending-onboarding">Pending Onboarding</option>
                          <option value="active">Active</option>
                          <option value="on-leave">On Leave</option>
                          <option value="off-boarded">Off-boarded</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-subtle before:to-transparent">
                  {logs.map((log, i) => (
                    <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-surface bg-primary-100 text-primary-600 absolute left-0 md:left-1/2 -translate-x-1/2 -ml-3 md:ml-0 z-10 shadow">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-subtle bg-surface shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[13px] text-primary capitalize">{log.action.replace('-', ' ')}</span>
                          <span className="text-[11px] text-tertiary">{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-[12px] text-secondary mt-1">{log.description}</p>
                        <div className="text-[11px] text-tertiary mt-3 font-medium">By {log.performedBy}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="flex flex-col items-center justify-center py-16 animate-in fade-in slide-in-from-bottom-4 text-center">
                <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mb-4 text-tertiary">
                  <Award className="w-8 h-8 opacity-50" />
                </div>
                <h3 className="text-[15px] font-bold text-primary mb-2">No Documents Yet</h3>
                <p className="text-[13px] text-tertiary max-w-sm mb-6">
                  Upload certifications, training records, or contracts to keep compliance up to date.
                </p>
                <button className="px-4 py-2 bg-surface-secondary border border-subtle rounded-lg text-[13px] font-semibold text-primary hover:bg-surface-hover transition-colors cursor-pointer">
                  Upload Document
                </button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
