import { z } from 'zod';
import type { EmployeeRole, ShiftType } from '@/types';

export const onboardingSchema = z.object({
  // Step 1: Personal Details
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  department: z.string().min(2, 'Department is required'),
  
  // Emergency Contact
  emergencyContactName: z.string().min(2, 'Contact name is required'),
  emergencyContactRelation: z.string().min(2, 'Relationship is required'),
  emergencyContactPhone: z.string().min(10, 'Contact phone is required'),

  // Step 2: Role & Shift
  role: z.enum(['operator', 'supervisor', 'inspector', 'maintenance-engineer', 'manager', 'hr'] as [EmployeeRole, ...EmployeeRole[]]),
  shift: z.enum(['morning', 'evening', 'night'] as [ShiftType, ...ShiftType[]]),
  joinDate: z.string(),

  // Step 3: Skills
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
