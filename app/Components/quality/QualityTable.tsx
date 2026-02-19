"use client";

import React, { useState } from "react";
import useProductionBatch from "@/hooks/useProductionBatch";
import { tableSchemas } from "@/data/tableSchemas";

interface QualityTableProps {
  organization: "CITY TYRE" | "MILLER";
  empId: string;
  department: string;
  trigger?: number;
}

const QualityTable: React.FC<QualityTableProps> = ({ organization, empId, department, trigger }) => {
  const schemaKey = organization === "MILLER" && (department === "Quality Controller" || department === "Supervisor")
    ? "MILLER_Supervisor"
    : `${organization}_${department}`;

  const schema = tableSchemas[schemaKey] || tableSchemas["CITY TYRE_Quality Controller"];
  const { data, loading } = useProductionBatch(organization, department, trigger);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  type FilterType = "All" | "Pending" | "Accepted" | "Remarked" | "Sold";
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  if (loading) return <div className="p-4 text-white">Loading Quality Data...</div>;

  const allDates = new Set<string>();
  Object.values(data).forEach(empLogs => Object.keys(empLogs).forEach(d => allDates.add(d)));
  allDates.add(new Date().toISOString().split("T")[0]); // Always ensure today is visible

  const getAggregatedData = (date: string) => {
    const info = {
      produced: [] as string[],
      pending: [] as string[],
      accepted: [] as string[],
      sold: [] as string[],
      remarks: [] as string[],
      logisticTrucks: [] as string[],
    };

    const acceptedBatches = new Set<string>();
    const pendingBatches = new Set<string>();

    Object.values(data).forEach(empLogs => {
      const day = empLogs[date];
      if (!day) return;

      if (day.batchNo) {
        info.produced.push(...day.batchNo);
        // By default, if it's produced, it might be pending if not handled by maintenance
        day.batchNo.forEach(b => pendingBatches.add(b));
      }

      if (day.maintenanceStatus) {
        Object.entries(day.maintenanceStatus).forEach(([b, s]) => {
          if (s === "Accepted") {
            acceptedBatches.add(b);
            pendingBatches.delete(b);
          } else if (s === "Pending") {
            // It remains in pending unless someone else accepted it
          }
        });
      }

      if (day.salesStatus) {
        Object.entries(day.salesStatus).forEach(([b, s]) => {
          if (s === "Sold") info.sold.push(b);
        });
      }
      if (day.maintenanceRemark) info.remarks.push(day.maintenanceRemark);
      if (day.logisticTruck !== undefined) info.logisticTrucks.push(String(day.logisticTruck));
    });

    info.accepted = Array.from(acceptedBatches);
    info.pending = Array.from(pendingBatches).filter(b => !acceptedBatches.has(b));

    return {
      produced: [...new Set(info.produced)],
      pending: [...new Set(info.pending)],
      accepted: [...new Set(info.accepted)],
      sold: [...new Set(info.sold)],
      remarks: [...new Set(info.remarks)],
      logisticTrucks: [...new Set(info.logisticTrucks)],
    };
  };

  const sortedDates = Array.from(allDates)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .filter(date => {
      const agg = getAggregatedData(date);
      if (activeFilter === "Pending") return agg.pending.length > 0;
      if (activeFilter === "Accepted") return agg.accepted.length > 0;
      if (activeFilter === "Remarked") return agg.remarks.length > 0;
      if (activeFilter === "Sold") return agg.sold.length > 0;
      return true;
    });

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="font-bold text-2xl uppercase text-[#ffffff] tracking-wider">
          {organization} {department === "Quality Controller" ? "QUALITY CONTROLLER" : department.toUpperCase()} DASHBOARD
        </h2>
        <div className="flex flex-wrap gap-2">
          {(["All", "Pending", "Accepted", "Remarked", "Sold"] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${activeFilter === f ? "bg-blue-600 shadow-inner" : "bg-gray-700 hover:bg-gray-600 shadow-md"}`}
            >
              {f === "Remarked" ? "With Remarks" : f}
            </button>
          ))}
        </div>
      </div>

      <table className="w-full border border-gray-700 border-collapse">
        <thead>
          <tr className="bg-gray-800 text-sm">
            {schema.headers.map((h, i) => (
              <th key={i} className="border border-gray-700 p-2 text-[#ffffff] uppercase tracking-tighter">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedDates.map((date, index) => {
            const myLog = data[empId]?.[date] || { loginTime: "Absent" };
            const loginTime = myLog.loginTime;
            const agg = getAggregatedData(date);
            const isRowSelected = selectedRow === date;

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
                    case "Production":
                      return <td key={i} className="border border-gray-700 p-2 text-xs">{agg.produced.join(", ") || "-"}</td>;
                    case "pending Batch No From Maintenance":
                    case "Pending Batch No From Maintenance":
                      return (
                        <td key={i} className="border border-gray-700 p-2 text-xs text-red-400">
                          {agg.pending.map((b, idx) => (
                            <div key={idx}>{b} PENDING</div>
                          ))}
                          {agg.pending.length === 0 && "-"}
                        </td>
                      );
                    case "Accepted Batch No From Maintenance":
                    case "Maintenance":
                      return <td key={i} className="border border-gray-700 p-2 text-xs text-green-400">{agg.accepted.join(", ") || "-"}</td>;
                    case "Sold Sales No From Sales":
                    case "Sold Batch No":
                    case "Sales":
                      return <td key={i} className="border border-gray-700 p-2 text-xs text-blue-400">{agg.sold.join(", ") || "-"}</td>;
                    case "Logistic Truck":
                      return <td key={i} className="border border-gray-700 p-2 text-xs">{agg.logisticTrucks.join(", ") || "-"}</td>;
                    case "Remark": return <td key={i} className="border border-gray-700 p-2 text-xs italic">{agg.remarks.join("; ") || "-"}</td>;
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

export default QualityTable;
