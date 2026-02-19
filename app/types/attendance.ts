export interface AttendanceDay {
  loginTime: string;
  status: "Absent" | "Present";

  // Tyre / batch info
  batchNo?: string[];
  tyreModel?: string[];

  // Production / targets
  completedTarget?: number;
  production?: number;
  sales?: number;
  maintenance?: number;

  // Trucks info
  targetTrucks?: number;
  filledTrucks?: number;

  // Operations / logistics
  operation?: string;
  logisticTruck?: number;

  // Construction / sales
  achieved?: number;
  billNo?: string[];

  // Additional fields for production
  manufacturingDate?: string[];
  expiryDate?: string[];

  // Track status per batch (shared across departments)
  maintenanceStatus?: Record<string, "Pending" | "Accepted">;
  salesStatus?: Record<string, "Pending" | "Sold">;
  salesBillNo?: Record<string, string>;
  salesTyreModel?: Record<string, string>;
  maintenanceRemark?: string;

  // Cafe stock
  openingStock?: any;
  closingStock?: any;

  [key: string]: any;
}

export interface AttendanceData {
  [empId: string]: {
    [date: string]: AttendanceDay;
  };
}
