"use client";

import React, { useState } from "react";
import useProductionBatch from "@/hooks/useProductionBatch";
import { tableSchemas } from "@/data/tableSchemas";

interface MaintenanceTableProps {
  organization: "CITY TYRE" | "MILLER";
  empId: string;
  department: string;
  trigger?: number;
}

const MaintenanceTable: React.FC<MaintenanceTableProps> = ({ organization, empId, department, trigger }) => {
  const schemaKey = `${organization}_${department}`;
  const schema = tableSchemas[schemaKey] || tableSchemas["CITY TYRE_Maintenance"];
  const { data, loading, updateBatchStatus } = useProductionBatch(organization, department, trigger);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [filterAccepted, setFilterAccepted] = useState(false);

  if (loading) return <div className="p-4 text-white">Loading Maintenance Data...</div>;

  const allDates = new Set<string>();
  Object.values(data).forEach(empLogs => Object.keys(empLogs).forEach(d => allDates.add(d)));
  allDates.add(new Date().toISOString().split("T")[0]); // Always ensure today is visible

  const getAggregatedInfo = (date: string) => {
    const batches: string[] = [];
    let hasAccepted = false;
    const batchStatuses: Record<string, "Pending" | "Accepted"> = {};

    Object.values(data).forEach(empLogs => {
      const day = empLogs[date];
      if (day?.batchNo) batches.push(...day.batchNo);
      if (day?.maintenanceStatus) {
        Object.entries(day.maintenanceStatus).forEach(([b, s]) => {
          if (s === "Accepted") {
            hasAccepted = true;
            batchStatuses[b] = "Accepted";
          } else if (!batchStatuses[b]) {
            batchStatuses[b] = "Pending";
          }
        });
      }
    });

    return { batches: Array.from(new Set(batches)), hasAccepted, batchStatuses };
  };

  const sortedDates = Array.from(allDates)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .filter(date => {
      if (!filterAccepted) return true;
      return getAggregatedInfo(date).hasAccepted;
    });

  const handleStatusToggle = async (date: string, batch: string, currentStatus: string) => {
    if (!empId) return;
    const myLog = data[empId]?.[date] || { maintenanceStatus: {} };
    const newStatus = currentStatus === "Accepted" ? "Pending" : "Accepted";
    const maintenanceStatus = { ...(myLog.maintenanceStatus || {}) };
    maintenanceStatus[batch] = newStatus as "Pending" | "Accepted";
    await updateBatchStatus(empId, date, { maintenanceStatus });
  };

  const handleRemarkChange = async (date: string, remark: string) => {
    if (!empId) return;
    await updateBatchStatus(empId, date, { maintenanceRemark: remark });
  };

  const timeToMinutes = (time: string) => {
    if (!time || time === "N/A" || time === "Absent") return 0;
    const [h, m] = time.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return 0;
    return h * 60 + m;
  };

  const getMorningTime = (loginTime?: string) => {
    if (!loginTime || loginTime === "Absent") return "Absent";
    const min = timeToMinutes(loginTime);
    return min < 13 * 60 ? loginTime : "Absent";
  };

  const getBreakTime = (loginTime?: string) => {
    if (!loginTime || loginTime === "Absent") return "Absent";
    const min = timeToMinutes(loginTime);
    return min < 14 * 60 ? "1:00 PM - 2:00 PM" : "Absent";
  };

  const getEveningTime = (loginTime?: string) => {
    if (!loginTime || loginTime === "Absent") return "Absent";
    const min = timeToMinutes(loginTime);
    return min < 19 * 60 ? loginTime : "Absent";
  };

  const calcLag = (loginTime?: string) => {
    if (!loginTime || loginTime === "Absent") return "10 hours lag";
    if (loginTime === "N/A") return "-";
    const loginMin = timeToMinutes(loginTime);
    const startMin = 8 * 60;
    if (loginMin <= startMin) return "On time";
    const diff = loginMin - startMin;
    return `${Math.floor(diff / 60)} hr ${diff % 60} min late`;
  };

  return (
    <div className="w-full overflow-x-auto p-4 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl uppercase text-[#ffffff] tracking-wider">
          {organization} {department} DASHBOARD
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterAccepted(!filterAccepted)}
            className={`px-4 py-2 rounded font-bold transition-all ${filterAccepted ? "bg-green-600 shadow-inner" : "bg-gray-700 hover:bg-gray-600 shadow-md"}`}
          >
            {filterAccepted ? "Showing Accepted" : "Filter by Accepted"}
          </button>
        </div>
      </div>

      <table className="w-full border border-gray-700 border-collapse shadow-xl">
        <thead>
          <tr className="bg-gray-800 text-sm">
            {schema.headers.map((h, i) => (
              <th key={i} className="border border-gray-700 p-2 text-[#ffffff] uppercase tracking-tighter">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedDates.map((date, index) => {
            const myLog = data[empId]?.[date] || { loginTime: "Absent", maintenanceStatus: {}, maintenanceRemark: "" };
            const isRowSelected = selectedRow === date;
            const { batches } = getAggregatedInfo(date);
            const loginTime = myLog.loginTime;

            return (
              <tr key={date} className={`${isRowSelected ? "bg-blue-900/40" : "hover:bg-gray-800/50"} transition-colors cursor-pointer`} onClick={() => setSelectedRow(isRowSelected ? null : date)}>
                {schema.headers.map((header, i) => {
                  switch (header) {
                    case "✔":
                      return (
                        <td key={i} className="border border-gray-700 p-2 text-center">
                          <div className={`w-5 h-5 border-2 rounded sm flex items-center justify-center transition-colors ${isRowSelected ? "bg-blue-500 border-blue-500" : "border-gray-500 bg-transparent"}`}>
                            {isRowSelected && <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>}
                          </div>
                        </td>
                      );
                    case "#": return <td key={i} className="border border-gray-700 p-2 text-center">{index + 1}</td>;
                    case "Date": return <td key={i} className="border border-gray-700 p-2 text-center">{date}</td>;
                    case "Morning (8am–1pm)": return <td key={i} className="border border-gray-700 p-2 text-center">{getMorningTime(loginTime)}</td>;
                    case "Break (1pm–2pm)": return <td key={i} className="border border-gray-700 p-2 text-center text-xs text-gray-400">{getBreakTime(loginTime)}</td>;
                    case "Evening (2pm–7pm)": return <td key={i} className="border border-gray-700 p-2 text-center">{getEveningTime(loginTime)}</td>;
                    case "Lagging time": return <td key={i} className="border border-gray-700 p-2 text-center">{calcLag(loginTime)}</td>;
                    case "Produced Batch No.":
                      return (
                        <td key={i} className="border border-gray-700 p-2">
                          <div className="flex flex-wrap gap-1">
                            {batches.map(b => {
                              const status = getAggregatedInfo(date).batchStatuses[b] || "Pending";
                              return (
                                <button
                                  key={b}
                                  onClick={(e) => { e.stopPropagation(); handleStatusToggle(date, b, status); }}
                                  className={`px-2 py-1 text-[10px] rounded font-bold transition-all ${status === "Accepted" ? "bg-green-600 text-white shadow-sm" : "bg-yellow-500 text-black hover:bg-yellow-400 shadow-md"}`}
                                >
                                  {b} ({status})
                                </button>
                              );
                            })}
                          </div>
                        </td>
                      );
                    case "Remark":
                      return (
                        <td key={i} className="border border-gray-700 p-2">
                          <textarea
                            value={myLog.maintenanceRemark || ""}
                            onChange={(e) => handleRemarkChange(date, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-gray-900 border border-gray-600 p-1 text-xs rounded min-h-[40px] focus:border-blue-500 outline-none transition-all"
                            placeholder="Remark..."
                          />
                        </td>
                      );
                    default: return <td key={i} className="border border-gray-700 p-2 text-center text-gray-500">-</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceTable;
