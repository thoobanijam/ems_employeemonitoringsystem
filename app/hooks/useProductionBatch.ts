"use client";

import { useEffect, useState, useCallback } from "react";
import { AttendanceData, AttendanceDay } from "@/types/attendance";
import { getDailyLogs, saveDailyLog, getMultipleEmployeesLogs } from "@/actions/dailyLog";
import { employees } from "@/data/employee";

export default function useProductionBatch(organization: string, department: string, trigger?: number) {
  const [data, setData] = useState<AttendanceData>({});
  const [loading, setLoading] = useState(true);

  const fetchAllRelevantLogs = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);

    const isAggregator = department === "Quality Controller" || department === "Supervisor";

    const relevantEmployeeIds = employees
      .filter((e) => {
        if (e.organization === organization) {
          if (organization === "CAFE") {
            return ["Inventory", "Kitchen", "Service", "Quality Controller", "Cleaning"].includes(e.department!);
          }
          if (e.department === "Production") return true;
          if (e.department === "Maintenance") return true; // Add Maintenance
          if (isAggregator) return true;
          return e.department === department;
        }
        return false;
      })
      .map(e => e.id);

    const today = new Date().toISOString().split("T")[0];
    const start = new Date();
    start.setDate(start.getDate() - 30);
    const startStr = start.toISOString().split("T")[0];

    try {
      const res = await getMultipleEmployeesLogs(relevantEmployeeIds, startStr, today);
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error("Polling error:", err);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, [organization, department, trigger]);

  useEffect(() => {
    fetchAllRelevantLogs(true);

    // Poll for updates every 10 seconds
    const interval = setInterval(() => fetchAllRelevantLogs(false), 10000);
    return () => clearInterval(interval);
  }, [fetchAllRelevantLogs]);

  const updateBatchStatus = async (empId: string, date: string, updates: Partial<AttendanceDay>) => {
    const currentDay = data[empId]?.[date] || {
      loginTime: "N/A",
      status: "Present",
      batchNo: [],
      manufacturingDate: [],
    };

    const updatedDay = { ...currentDay, ...updates };

    setData((prev) => ({
      ...prev,
      [empId]: {
        ...(prev[empId] || {}),
        [date]: updatedDay,
      },
    }));

    await saveDailyLog(empId, date, updatedDay);
  };

  return {
    data,
    loading,
    updateBatchStatus,
    refresh: () => fetchAllRelevantLogs(true),
  };
}
