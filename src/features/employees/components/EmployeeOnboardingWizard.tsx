import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema, type OnboardingFormData } from '../schema';
import { useEmployeeStore } from '../store/useEmployeeStore';
import { useWorkflowStore } from '@/store/useWorkflowStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/Dialog';
import { CheckCircle2, ChevronRight, ChevronLeft, UserPlus } from 'lucide-react';
import type { Employee } from '@/types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STEPS = ['Personal Details', 'Role & Shift', 'Skills'];

export default function EmployeeOnboardingWizard({ open, onOpenChange }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const addEmployee = useEmployeeStore((s) => s.addEmployee);
  const currentUser = useWorkflowStore((s) => s.currentUser);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      role: 'operator',
      shift: 'morning',
      joinDate: new Date().toISOString().split('T')[0],
      skills: [],
    }
  });

  const skills = watch('skills');

  const onSubmit = async (data: OnboardingFormData) => {
    // Transform to Employee payload
    const payload: Omit<Employee, 'id'> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      department: data.department,
      role: data.role,
      shift: data.shift,
      status: 'pending-onboarding',
      joinDate: data.joinDate,
      skills: data.skills,
      certifications: [],
      performance: 0,
      attendanceRate: 0,
      emergencyContacts: [{
        name: data.emergencyContactName,
        relationship: data.emergencyContactRelation,
        phone: data.emergencyContactPhone
      }],
    };

    addEmployee(payload, currentUser?.name || 'System');
    reset();
    setCurrentStep(0);
    onOpenChange(false);
  };

  const nextStep = async () => {
    // Validate current step fields
    let fieldsToValidate: (keyof OnboardingFormData)[] = [];
    if (currentStep === 0) {
      fieldsToValidate = ['name', 'email', 'phone', 'department', 'emergencyContactName', 'emergencyContactRelation', 'emergencyContactPhone'];
    } else if (currentStep === 1) {
      fieldsToValidate = ['role', 'shift', 'joinDate'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['skills'];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep(s => Math.min(s + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(s => Math.max(s - 1, 0));
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) {
        reset();
        setCurrentStep(0);
      }
      onOpenChange(val);
    }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary-600" />
            Employee Onboarding
          </DialogTitle>
          <DialogDescription>
            Complete the wizard to onboard a new employee into the system.
          </DialogDescription>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex items-center justify-between mt-4 mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-surface-300 -z-10" />
          {STEPS.map((step, idx) => (
            <div key={step} className="flex flex-col items-center gap-2 bg-surface px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-colors ${
                idx < currentStep ? 'bg-success-500 text-white' :
                idx === currentStep ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' :
                'bg-surface-secondary text-tertiary border border-[var(--border-default)]'
              }`}>
                {idx < currentStep ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={`text-[11px] font-semibold ${idx <= currentStep ? 'text-primary' : 'text-tertiary'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Personal Details */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-secondary">Full Name</label>
                  <input {...register('name')} className="w-full px-3 py-2 rounded-lg border bg-surface text-[13px] text-primary focus:border-primary-500 outline-none transition-colors" placeholder="e.g. John Doe" />
                  {errors.name && <p className="text-[11px] text-danger-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-secondary">Email</label>
                  <input {...register('email')} type="email" className="w-full px-3 py-2 rounded-lg border bg-surface text-[13px] text-primary focus:border-primary-500 outline-none transition-colors" placeholder="e.g. john@forgemes.com" />
                  {errors.email && <p className="text-[11px] text-danger-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-secondary">Phone Number</label>
                  <input {...register('phone')} className="w-full px-3 py-2 rounded-lg border bg-surface text-[13px] text-primary focus:border-primary-500 outline-none transition-colors" placeholder="+1 (555) 000-0000" />
                  {errors.phone && <p className="text-[11px] text-danger-500">{errors.phone.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-secondary">Department</label>
                  <input {...register('department')} className="w-full px-3 py-2 rounded-lg border bg-surface text-[13px] text-primary focus:border-primary-500 outline-none transition-colors" placeholder="e.g. Assembly Line A" />
                  {errors.department && <p className="text-[11px] text-danger-500">{errors.department.message}</p>}
                </div>
              </div>

              <div className="pt-4 border-t border-subtle">
                <h4 className="text-[13px] font-bold text-primary mb-4">Emergency Contact</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold text-secondary">Contact Name</label>
                    <input {...register('emergencyContactName')} className="w-full px-3 py-2 rounded-lg border bg-surface text-[13px] text-primary focus:border-primary-500 outline-none transition-colors" />
                    {errors.emergencyContactName && <p className="text-[11px] text-danger-500">{errors.emergencyContactName.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold text-secondary">Relationship</label>
                    <input {...register('emergencyContactRelation')} className="w-full px-3 py-2 rounded-lg border bg-surface text-[13px] text-primary focus:border-primary-500 outline-none transition-colors" />
                    {errors.emergencyContactRelation && <p className="text-[11px] text-danger-500">{errors.emergencyContactRelation.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold text-secondary">Phone</label>
                    <input {...register('emergencyContactPhone')} className="w-full px-3 py-2 rounded-lg border bg-surface text-[13px] text-primary focus:border-primary-500 outline-none transition-colors" />
                    {errors.emergencyContactPhone && <p className="text-[11px] text-danger-500">{errors.emergencyContactPhone.message}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Role & Shift */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-secondary">System Role</label>
                  <select {...register('role')} className="w-full px-3 py-2 rounded-lg border bg-surface text-[13px] text-primary focus:border-primary-500 outline-none transition-colors">
                    <option value="operator">Operator</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="inspector">Inspector</option>
                    <option value="maintenance-engineer">Maintenance Engineer</option>
                    <option value="manager">Manager</option>
                    <option value="hr">HR</option>
                  </select>
                  {errors.role && <p className="text-[11px] text-danger-500">{errors.role.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-secondary">Default Shift</label>
                  <select {...register('shift')} className="w-full px-3 py-2 rounded-lg border bg-surface text-[13px] text-primary focus:border-primary-500 outline-none transition-colors">
                    <option value="morning">Morning (06:00 - 14:00)</option>
                    <option value="evening">Evening (14:00 - 22:00)</option>
                    <option value="night">Night (22:00 - 06:00)</option>
                  </select>
                  {errors.shift && <p className="text-[11px] text-danger-500">{errors.shift.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-secondary">Join Date</label>
                  <input type="date" {...register('joinDate')} className="w-full px-3 py-2 rounded-lg border bg-surface text-[13px] text-primary focus:border-primary-500 outline-none transition-colors" />
                  {errors.joinDate && <p className="text-[11px] text-danger-500">{errors.joinDate.message}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Skills */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-3">
                <label className="text-[12px] font-semibold text-secondary">Select Core Skills</label>
                <div className="flex flex-wrap gap-2">
                  {['CNC Machining', 'Welding', 'Quality Control', 'Assembly', 'Robotics', 'Electrical', 'Safety OSHA'].map(skill => (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => {
                        const current = skills || [];
                        if (current.includes(skill)) setValue('skills', current.filter(s => s !== skill));
                        else setValue('skills', [...current, skill]);
                      }}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors border cursor-pointer ${
                        skills?.includes(skill)
                          ? 'bg-primary-100 border-primary-500 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                          : 'bg-surface-secondary border-transparent text-secondary hover:bg-surface-hover'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                {errors.skills && <p className="text-[11px] text-danger-500">{errors.skills.message}</p>}
              </div>
            </div>
          )}

          <DialogFooter className="mt-8 border-t border-subtle pt-6">
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-lg text-[13px] font-medium text-secondary hover:bg-surface-secondary disabled:opacity-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              
              {currentStep < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 rounded-lg text-[13px] font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-lg text-[13px] font-bold bg-success-600 text-white hover:bg-success-700 transition-colors cursor-pointer"
                >
                  {isSubmitting ? 'Onboarding...' : 'Complete Onboarding'}
                </button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
