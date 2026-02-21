"use client";

import React, { useState, useEffect } from "react";
import { AttendanceDay } from "@/types/attendance";
import { addBatch } from "@/actions/batch";
import { tableSchemas } from "@/data/tableSchemas";
import useProductionBatch from "@/hooks/useProductionBatch";

interface ProductionTableProps {
  empId: string;
  organization: "CITY TYRE" | "MILLER";
  department: string;
  trigger?: number;
}

const ProductionTable: React.FC<ProductionTableProps> = ({ empId, organization, department, trigger }) => {
  const schemaKey = `${organization}_${department}`;
  const schema = tableSchemas[schemaKey] || tableSchemas["CITY TYRE_Production"];
  const target = schema.target || 50;
  const today = new Date().toISOString().split("T")[0];

  const { data, loading, updateBatchStatus } = useProductionBatch(organization, department, trigger);
  const [newBatch, setNewBatch] = useState("");
  const [batchDate, setBatchDate] = useState(today);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  // Auto-login logic
  useEffect(() => {
    if (loading || !empId) return;
    const myLog = data[empId]?.[today];
    if (!myLog || !myLog.loginTime) {
      const now = new Date();
      const loginTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      updateBatchStatus(empId, today, {
        loginTime,
        status: "Present",
        batchNo: [],
        manufacturingDate: [],
        completedTarget: 0
      });
    }
  }, [loading, data, empId, today, updateBatchStatus]);

  if (loading) return <div className="p-4 text-white">Loading Production Data...</div>;

  const handleAddBatch = async () => {
    const normalizedBatch = newBatch.trim().toUpperCase();
    if (!normalizedBatch || !batchDate.trim() || !empId) return;

    const result = await addBatch(normalizedBatch, batchDate, organization, department);
    if (!result.success) {
      alert(result.error);
      return;
    }

    const day = data[empId]?.[batchDate] || {
      loginTime: "N/A",
      status: "Present",
      batchNo: [],
      manufacturingDate: [],
      completedTarget: 0
    };

    const batches = [...(day.batchNo || [])];
    const dates = [...(day.manufacturingDate || [])];
    const expiries = [...(day.expiryDate || [])];

    if (!batches.includes(normalizedBatch)) {
      batches.push(normalizedBatch);
      dates.push(batchDate);

      // Auto-expiry for Miller (6 months after)
      let expiry = "-";
      if (organization === "MILLER") {
        const d = new Date(batchDate);
        d.setMonth(d.getMonth() + 6);
        expiry = d.toISOString().split("T")[0];
      }
      expiries.push(expiry);

      await updateBatchStatus(empId, batchDate, {
        batchNo: batches,
        manufacturingDate: dates,
        expiryDate: expiries,
        completedTarget: batches.length
      });
    }

    setNewBatch("");
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
    // If logged in before 1 PM, they are "present" in morning (possibly late)
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
    // If logged in after start of evening (or stayed), show time. 
    // Usually if they log in after 2 PM, they missed morning.
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

  const myLogs = data[empId] || {};
  const allDates = new Set<string>();
  Object.values(data).forEach(empLogs => Object.keys(empLogs).forEach(d => allDates.add(d)));
  allDates.add(today); // Always ensure today is visible
  const sortedDates = Array.from(allDates).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const getAggregatedDayInfo = (date: string) => {
    const batches: string[] = [];
    const manufacturingDates: string[] = [];
    const expiryDates: string[] = [];

    Object.values(data).forEach(empLogs => {
      const day = empLogs[date];
      if (day?.batchNo) {
        day.batchNo.forEach((b: string, i: number) => {
          if (!batches.includes(b)) {
            batches.push(b);
            manufacturingDates.push((day.manufacturingDate as string[])?.[i] || "-");
            expiryDates.push((day.expiryDate as string[])?.[i] || "-");
          }
        });
      }
    });

    return { batches, manufacturingDates, expiryDates };
  };

  return (
    <div className="w-full overflow-x-auto p-4 text-white">
      <h2 className="font-bold mb-4 text-2xl uppercase text-[#ffffff] tracking-wider">
        {organization} {department} DASHBOARD
      </h2>

      <div className="mb-6 flex gap-2">
        <input
          type="text" placeholder="Batch No" value={newBatch}
          onChange={(e) => setNewBatch(e.target.value)}
          className="border p-2 rounded text-black bg-white uppercase font-bold"
        />
        <input
          type="date" value={batchDate}
          onChange={(e) => setBatchDate(e.target.value)}
          className="border p-2 rounded text-black bg-white"
        />
        <button onClick={handleAddBatch} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold transition-colors shadow-lg uppercase tracking-wide">
          Add Batch
        </button>
      </div>

      <table className="w-full border border-gray-700 border-collapse shadow-xl">
        <thead>
          <tr className="bg-gray-800 text-sm">
            {schema.headers.map((h, i) => (
              <th key={i} className="border border-gray-700 p-2 uppercase tracking-tighter text-[#ffffff]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedDates.map((date, index) => {
            const day = myLogs[date] || { loginTime: "Absent", batchNo: [], manufacturingDate: [], completedTarget: 0 };
            const isRowSelected = selectedRow === date;
            const loginTime = day.loginTime;
            const { batches, manufacturingDates, expiryDates } = getAggregatedDayInfo(date);

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
                    case "Date": return <td key={i} className="border border-gray-700 p-2 text-center font-semibold text-blue-400">{date}</td>;
                    case "Morning (8am–1pm)": return <td key={i} className="border border-gray-700 p-2 text-center">{getMorningTime(loginTime)}</td>;
                    case "Break (1pm–2pm)": return <td key={i} className="border border-gray-700 p-2 text-center text-xs text-gray-400">{getBreakTime(loginTime)}</td>;
                    case "Evening (2pm–7pm)": return <td key={i} className="border border-gray-700 p-2 text-center">{getEveningTime(loginTime)}</td>;
                    case "Lagging time": return <td key={i} className="border border-gray-700 p-2 text-center font-medium text-red-500">{calcLag(loginTime)}</td>;
                    case "Target": return <td key={i} className="border border-gray-700 p-2 text-center">{target}</td>;
                    case "Produced Batch No.":
                      return (
                        <td key={i} className="border border-gray-700 p-2 text-center text-xs">
                          {batches.map((b: string, idx: number) => (
                            <div key={idx} className="mb-1 py-1 px-2 bg-blue-900/30 rounded border border-blue-500/30">{b}</div>
                          ))}
                          {batches.length === 0 && "-"}
                        </td>
                      );
                    case "Manufacturing Date":
                      return (
                        <td key={i} className="border border-gray-700 p-2 text-center text-xs">
                          {manufacturingDates.map((d: string, idx: number) => (
                            <div key={idx} className="mb-1 py-1 px-2 bg-gray-800/50 rounded border border-gray-600/30">{d}</div>
                          ))}
                          {manufacturingDates.length === 0 && "-"}
                        </td>
                      );
                    case "Expiry Date":
                      return (
                        <td key={i} className="border border-gray-700 p-2 text-center text-xs">
                          {expiryDates.map((e: string, idx: number) => (
                            <div key={idx} className="mb-1 py-1 px-2 bg-red-900/30 rounded border border-red-500/30">{e}</div>
                          ))}
                          {expiryDates.length === 0 && "-"}
                        </td>
                      );
                    case "Completed Target": return <td key={i} className="border border-gray-700 p-2 text-center font-bold text-green-400">{batches.length}</td>;
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

export default ProductionTable;
