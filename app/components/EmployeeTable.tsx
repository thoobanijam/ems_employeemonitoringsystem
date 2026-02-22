"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Employee } from "@/types/employee";
import { tableSchemas } from "@/data/tableSchemas";
import { AttendanceDay } from "@/types/attendance";
import { getDailyLogs, saveDailyLog } from "@/actions/dailyLog";
import { addBatch, getBatches } from "@/actions/batch";

interface EmployeeTableProps {
  headers: string[];
  employee: Employee;
  tableType: keyof typeof tableSchemas;
}

// Helper: convert "HH:MM" string to Date today
const timeToDate = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
};

// Calculate lag time
const calcLag = (shiftStart: string, shiftEnd: string, loginTime?: string) => {
  if (!loginTime) return "Absent";

  // Parse times
  const login = timeToDate(loginTime);
  const start = timeToDate(shiftStart);

  // If login is before or at start time, no lag
  if (login <= start) return "On time";

  const diffMs = login.getTime() - start.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  const hr = Math.floor(diffMin / 60);
  const min = diffMin % 60;
  return `${hr} hr ${min} min late`;
};

// Format ISO date to DD/MM/YYYY
const formatDisplayDate = (isoDate: string) => {
  const d = new Date(isoDate);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({ headers,employee, tableType }) => {
  const [attendance, setAttendance] = useState<Record<string, AttendanceDay>>({});
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [availableBatches, setAvailableBatches] = useState<string[]>([]);
  const [newBatchInput, setNewBatchInput] = useState("");

  const schema = tableSchemas[tableType];
  const isProduction = tableType.includes("Production");
  const organization = employee.organization || "CITY TYRE"; // Fallback or derived
  const department = employee.department || "Production";

  // Load logs
  const fetchLogs = useCallback(async () => {
    setLoading(true);
    // Fetch last 30 days for now, or just current month
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 30);

    // Convert to YYYY-MM-DD
    const startStr = start.toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];

    // Ensure we fetch logs
    const logs = await getDailyLogs(employee.id, startStr, todayStr);

    // Base data
    const currentData = (logs.success && logs.data) ? logs.data : {};

    // Ensure today exists if not present
    if (!currentData[todayStr]) {
      currentData[todayStr] = { loginTime: "", status: "Absent" };
    }

    setAttendance(currentData);
    setLoading(false);
  }, [employee.id]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Load batches for non-production
  useEffect(() => {
    if (!isProduction) {
      getBatches(organization).then(res => {
        if (res.success && res.data) {
          setAvailableBatches(res.data.map((b: any) => b.batchNo));
        }
      });
    }
  }, [isProduction, organization]);

  const handleUpdate = async (date: string, updates: Partial<AttendanceDay>) => {
    const currentDay = attendance[date] || {};
    const updatedDay = { ...currentDay, ...updates };

    // Optimistic update
    setAttendance(prev => ({
      ...prev,
      [date]: updatedDay
    }));

    await saveDailyLog(employee.id, date, updatedDay);
  };

  const handleAddBatch = async (date: string) => {
    if (!newBatchInput.trim()) return;

    // Call server action to add batch
    const result = await addBatch(newBatchInput, date, organization, department);

    if (!result.success) {
      alert(result.error);
      return;
    }

    // specific production logic
    const currentDay = attendance[date] || {};
    const existingBatches = (currentDay.batchNo as string[]) || [];
    const newBatches = [...existingBatches, newBatchInput];

    await handleUpdate(date, {
      batchNo: newBatches,
      manufacturingDate: [...(currentDay.manufacturingDate as string[] || []), date],
      completedTarget: newBatches.length
    });

    setNewBatchInput("");
  };

  const handleCheckIn = async (date: string) => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    await handleUpdate(date, { loginTime: timeString, status: 'Present' });
  }

  const renderCell = (col: string, day: AttendanceDay, index: number, date: string) => {
    const isRowLocked = (day.batchNo?.length || 0) > 0 && isProduction;

    switch (col) {
      case "✔":
        return (
          <input
            type="checkbox"
            checked={selectedRow === date}
            onChange={() => setSelectedRow(selectedRow === date ? null : date)}
            className="w-4 h-4 cursor-pointer"
          />
        );
      case "#":
        return index + 1;
      case "Date":
        return formatDisplayDate(date);
      case "Morning (8am–1pm)":
        if (isProduction && !day.loginTime && date === new Date().toISOString().split('T')[0]) {
          return <button onClick={() => handleCheckIn(date)} className="bg-green-600 text-white px-2 py-1 rounded text-xs">Check In</button>
        }
        return day.loginTime || "Absent";
      case "Evening (2pm–7pm)":
        return day.loginTime || "Absent";
      case "Break (1pm–2pm)":
        return "Break";
      case "Lagging time":
        if (!day.loginTime) return "-";
        return calcLag(schema.shiftStartTimes[0], "13:00", day.loginTime);
      case "Target":
      case "Target Sales":
        return schema.target ?? "-";
      case "Completed Target":
        return day.completedTarget ?? 0;
      case "Produced Batch No.":
        if (isProduction) {
          return (
            <div className="flex flex-col gap-1">
              <div className="text-sm">
                {(day.batchNo as string[])?.map(b => <span key={b} className="bg-gray-700 px-1 rounded mr-1">{b}</span>)}
              </div>
              {!isRowLocked && date === new Date().toISOString().split('T')[0] && (
                <div className="flex gap-1">
                  <input
                    value={newBatchInput}
                    onChange={(e) => setNewBatchInput(e.target.value)}
                    placeholder="Batch No"
                    className="w-20 text-black px-1 text-xs"
                  />
                  <button onClick={() => handleAddBatch(date)} className="bg-blue-600 text-white px-2 text-xs rounded">Add</button>
                </div>
              )}
            </div>
          )
        }
        return (day.batchNo as string[])?.join(", ") ?? "-";

      case "Manufacturing Date":
        return (day.manufacturingDate as string[])?.join(", ") ?? "-";
      case "Sold Batch No":
        // Logic for selecting sold batches from available batches
        // For now just return string
        return (day.batchNo as string[])?.join(", ") ?? "-";

      case "Sold":
        return (day.batchNo?.length) ?? 0;
      case "Batch No":
        return (day.batchNo as string[])?.join(", ") ?? "-";
      case "Tyre Model":
        return (day.tyreModel as string[])?.join(", ") ?? "-";
      case "Production":
        return day.production ?? "-";
      case "Sales":
        return day.sales ?? "-";
      case "Maintenance":
        return day.maintenance ?? "-";
      case "Target Trucks":
        return day.targetTrucks ?? "-";
      case "Filled Trucks":
        return day.filledTrucks ?? "-";
      case "Operation":
        return day.operation ?? "-";
      case "Logistic Truck":
        return day.logisticTruck ?? "-";
      case "Achieved":
        return day.achieved ?? "-";
      case "Expiry Date":
        return day.expiryDate ?? "-";
      case "Opening Stock":
        return day.openingStock ?? "-";
      case "Closing Stock":
        return day.closingStock ?? "-";
      case "Bill No":
        return (day.billNo as string[])?.join(", ") ?? "-";
      default:
        return "-";
    }
  };

  if (loading) return <div>Loading...</div>;

  const dates = Object.keys(attendance).sort();

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full mt-4 border border-gray-900 border-collapse ">
        <thead>
          <tr className="bg-gray-500 text-lg cursor-pointer text-[#ffffff]">
            {schema.headers.map((header) => (
              <th key={header} className="border p-2 text-left">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody >
          {dates.length === 0 ? (
            <tr>
              <td colSpan={schema.headers.length} className="text-center p-2">
                No attendance data
              </td>
            </tr>
          ) : (
            dates.map((date, index) => {
              const day = attendance[date];
              const isSelected = selectedRow === date;
              return (
                <tr key={date}
                  className={`cursor-pointer ${isSelected ? "bg-gray-700" : "hover:bg-[#3b3d3d]"}`}
                  onClick={() => isProduction && setSelectedRow(date)} // Row click selection
                >
                  {schema.headers.map((col) => (
                    <td key={col} className="border p-2">
                      {renderCell(col, day, index, date)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
