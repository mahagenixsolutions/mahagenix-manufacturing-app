// ============================================================
// ForgeMES — Type Definitions
// ============================================================

// --- Enums ---

export type MachineStatus = 'running' | 'idle' | 'stopped' | 'maintenance';
export type WorkOrderStatus = 'queued' | 'in-progress' | 'quality-check' | 'completed' | 'delayed' | 'cancelled';
export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type ShiftType = 'morning' | 'evening' | 'night';
export type AlertCategory = 'machine-failure' | 'quality-issue' | 'low-inventory' | 'maintenance-due' | 'safety';
export type AlertSeverity = 'critical' | 'warning' | 'info';
export type InspectionStatus = 'pending' | 'passed' | 'failed' | 'in-review';
export type MaintenanceType = 'preventive' | 'corrective' | 'predictive' | 'emergency';
export type MaintenanceStatus = 'scheduled' | 'in-progress' | 'completed' | 'overdue';
export type EmployeeRole = 'operator' | 'supervisor' | 'inspector' | 'maintenance-engineer' | 'manager' | 'hr';
export type EmployeeStatus = 'pending-onboarding' | 'active' | 'on-break' | 'off-shift' | 'on-leave' | 'off-boarded';

// --- Core Entities ---

export interface Machine {
  id: string;
  name: string;
  type: string;
  line: string;
  status: MachineStatus;
  temperature: number;      // °C
  speed: number;             // RPM
  power: number;             // kW
  currentTask: string | null;
  operator: string | null;
  progress: number;          // 0-100
  runtime: number;           // minutes today
  downtime: number;          // minutes today
  oee: number;               // 0-100
  lastMaintenance: string;   // ISO date
  nextMaintenance: string;   // ISO date
  imageUrl?: string;
}

export interface ProductionLine {
  id: string;
  name: string;
  status: MachineStatus;
  machines: string[];        // machine IDs
  currentOutput: number;
  targetOutput: number;
  efficiency: number;        // 0-100
  activeOperators: number;
}

export interface WorkOrder {
  id: string;
  product: string;
  description: string;
  status: WorkOrderStatus;
  priority: Priority;
  line: string;
  machine: string;
  operator: string;
  supervisor: string;
  quantity: number;
  completed: number;
  progress: number;          // 0-100
  startDate: string;
  deadline: string;
  materials: MaterialRequirement[];
  notes: string[];
}

export interface MaterialRequirement {
  sku: string;
  name: string;
  required: number;
  allocated: number;
  unit: string;
}

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  department: string;
  shift: ShiftType;
  status: EmployeeStatus;
  avatar?: string;
  phone: string;
  email: string;
  skills: string[];
  certifications: Certification[];
  performance: number;       // 0-100
  attendanceRate: number;    // 0-100
  assignedMachine?: string;
  joinDate: string;
  emergencyContacts?: EmergencyContact[];
  documents?: EmployeeDocument[];
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface EmployeeDocument {
  id: string;
  name: string;
  type: 'id' | 'certification' | 'contract' | 'other';
  uploadDate: string;
  url: string;
}

export interface AuditLog {
  id: string;
  entityId: string;
  entityType: 'employee' | 'machine' | 'work-order';
  action: 'created' | 'updated' | 'status-changed' | 'deleted' | 'shift-assigned' | 'document-uploaded';
  description: string;
  performedBy: string;       // User ID or name
  timestamp: string;         // ISO date
  metadata?: Record<string, any>;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
}

export interface QualityInspection {
  id: string;
  workOrder: string;
  product: string;
  inspector: string;
  status: InspectionStatus;
  defectsFound: number;
  defectTypes: DefectRecord[];
  inspectionDate: string;
  line: string;
  batchSize: number;
  sampleSize: number;
  passRate: number;          // 0-100
  images?: string[];
  notes: string;
}

export interface DefectRecord {
  type: string;
  count: number;
  severity: 'minor' | 'major' | 'critical';
  location: string;
  imageUrl?: string;
}

export interface InventoryItem {
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  location: string;
  supplier: string;
  lastRestocked: string;
  consumption: number;      // units per day avg
  unitPrice: number;
  status: 'adequate' | 'low' | 'critical' | 'out-of-stock';
}

export interface MaintenanceRecord {
  id: string;
  machine: string;
  machineName: string;
  type: MaintenanceType;
  status: MaintenanceStatus;
  priority: Priority;
  description: string;
  assignedTo: string;
  scheduledDate: string;
  completedDate?: string;
  estimatedDuration: number; // minutes
  actualDuration?: number;
  parts: string[];
  cost?: number;
  notes: string;
}

export interface Alert {
  id: string;
  category: AlertCategory;
  severity: AlertSeverity;
  title: string;
  message: string;
  source: string;            // machine ID or area
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
}

export interface Shift {
  type: ShiftType;
  label: string;
  startTime: string;         // HH:mm
  endTime: string;           // HH:mm
  completed: number;
  running: number;
  delayed: number;
  operators: number;
  isActive: boolean;
}

export interface KPI {
  id: string;
  label: string;
  value: number;
  target?: number;
  unit: string;
  trend: number;             // percentage change
  trendDirection: 'up' | 'down' | 'flat';
  sparklineData: number[];
  icon: string;              // Lucide icon name
}

export interface Factory {
  id: string;
  name: string;
  location: string;
  timezone: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  category: 'critical' | 'production' | 'maintenance' | 'inventory' | 'quality';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// --- Chart Data ---

export interface TimeSeriesPoint {
  time: string;
  value: number;
}

export interface ProductionTimelineEntry {
  hour: string;
  production: number;
  downtime: number;
  maintenance: number;
  alerts: number;
}

// --- Table / Filter ---

export interface FilterOption {
  label: string;
  value: string;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  render?: (value: unknown, row: T) => React.ReactNode;
}
