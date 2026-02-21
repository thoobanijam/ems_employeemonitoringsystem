"use client";

import React, { useState } from "react";
import useProductionBatch from "@/hooks/useProductionBatch";
import { tableSchemas } from "@/data/tableSchemas";

interface SalesTableProps {
  organization: "CITY TYRE" | "MILLER";
  empId: string;
  department: string;
  trigger?: number;
}

const SalesTable: React.FC<SalesTableProps> = ({ organization, empId, department, trigger }) => {
  const schemaKey = `${organization}_${department}`;
  const schema = tableSchemas[schemaKey] || tableSchemas["CITY TYRE_Sales"];
  const { data, loading, updateBatchStatus } = useProductionBatch(organization, department, trigger);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const [showPopup, setShowPopup] = useState(false);
  const [activeDate, setActiveDate] = useState("");
  const [activeBatch, setActiveBatch] = useState("");
  const [billNo, setBillNo] = useState("");
  const [tyreModel, setTyreModel] = useState("");

  const [filterSold, setFilterSold] = useState(false);
  const [searchBill, setSearchBill] = useState("");
  const [searchModel, setSearchModel] = useState("");

  if (loading) return <div className="p-4 text-white">Loading Sales Data...</div>;

  const allDates = new Set<string>();
  Object.values(data).forEach(empLogs => Object.keys(empLogs).forEach(d => allDates.add(d)));
  allDates.add(new Date().toISOString().split("T")[0]); // Always ensure today is visible

  const getDayInfo = (date: string) => {
    const allBatchesInDay = new Set<string>();
    const acceptedInMaintenance = new Set<string>();
    const aggregatedSalesStatus: Record<string, string> = {};
    const aggregatedSalesBillNo: Record<string, string> = {};
    const aggregatedSalesTyreModel: Record<string, string> = {};

    Object.values(data).forEach(empLogs => {
      const day = empLogs[date];
      if (day?.batchNo) {
        day.batchNo.forEach(b => allBatchesInDay.add(b));
      }

      if (day?.maintenanceStatus) {
        Object.entries(day.maintenanceStatus).forEach(([b, s]) => {
          if (s === "Accepted") acceptedInMaintenance.add(b);
        });
      }

      if (day?.salesStatus) {
        Object.entries(day.salesStatus).forEach(([b, s]) => {
          if (s === "Sold") aggregatedSalesStatus[b] = s;
        });
      }
      if (day?.salesBillNo) {
        Object.entries(day.salesBillNo).forEach(([b, bill]) => {
          if (bill) aggregatedSalesBillNo[b] = bill as string;
        });
      }
      if (day?.salesTyreModel) {
        Object.entries(day.salesTyreModel).forEach(([b, model]) => {
          if (model) aggregatedSalesTyreModel[b] = model as string;
        });
      }
    });

    const pendingInMaintenance = new Set<string>();
    allBatchesInDay.forEach(b => {
      if (!acceptedInMaintenance.has(b)) pendingInMaintenance.add(b);
    });

    return {
      batches: Array.from(allBatchesInDay),
      isAnySold: Object.values(aggregatedSalesStatus).some(s => s === "Sold"),
      aggregatedSalesStatus,
      aggregatedSalesBillNo,
      aggregatedSalesTyreModel,
      pendingInMaintenance
    };
  };

  const sortedDates = Array.from(allDates)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .filter(date => {
      const info = getDayInfo(date);
      if (filterSold && !info.isAnySold) return false;
      const allBills = Object.values(info.aggregatedSalesBillNo);
      const allModels = Object.values(info.aggregatedSalesTyreModel);
      if (searchBill && !allBills.some(b => b.toLowerCase().includes(searchBill.toLowerCase()))) return false;
      if (searchModel && !allModels.some(m => m.toLowerCase().includes(searchModel.toLowerCase()))) return false;
      return true;
    });

  const handleMarkSold = async () => {
    const normalizedBill = billNo.trim().toUpperCase();
    const normalizedModel = tyreModel.trim().toUpperCase();

    if (!normalizedBill || !normalizedModel || !empId) {
      alert("Please enter Bill No and Tyre Model");
      return;
    }

    const myLog = data[empId]?.[activeDate] || {};
    const existingBills = Object.values(myLog.salesBillNo || {});
    if (existingBills.includes(normalizedBill)) {
      alert("This Bill Number has already been used!");
      return;
    }

    const salesStatus = { ...(myLog.salesStatus || {}) };
    const salesBillNo = { ...(myLog.salesBillNo || {}) };
    const salesTyreModel = { ...(myLog.salesTyreModel || {}) };

    salesStatus[activeBatch] = "Sold";
    salesBillNo[activeBatch] = normalizedBill;
    salesTyreModel[activeBatch] = normalizedModel;

    await updateBatchStatus(empId, activeDate, { salesStatus, salesBillNo, salesTyreModel });
    setShowPopup(false);
    setBillNo("");
    setTyreModel("");
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="font-bold mb-4 text-2xl uppercase text-[#ffffff] tracking-wider">
          {organization} {department} DASHBOARD
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterSold(!filterSold)}
            className={`px-4 py-2 rounded font-bold transition-all ${filterSold ? "bg-green-600 shadow-inner" : "bg-gray-700 hover:bg-gray-600 shadow-md"}`}
          >
            {filterSold ? "Showing Sold" : "Filter by Sold"}
          </button>
          <input
            type="text" placeholder="Search Bill No..."
            value={searchBill} onChange={(e) => setSearchBill(e.target.value)}
            className="bg-gray-800 border border-gray-600 px-3 py-2 rounded text-sm focus:border-blue-500 outline-none"
          />
          <input
            type="text" placeholder="Search Tyre Model..."
            value={searchModel} onChange={(e) => setSearchModel(e.target.value)}
            className="bg-gray-800 border border-gray-600 px-3 py-2 rounded text-sm focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      <table className="w-full border border-gray-700 border-collapse">
        <thead>
          <tr className="bg-gray-800 text-sm">
            {schema.headers.map((h, i) => (
              <th key={i} className="border border-gray-700 p-2 text-[#ffffff] uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedDates.map((date, index) => {
            const myLog = data[empId]?.[date] || { loginTime: "Absent", salesStatus: {}, salesBillNo: {}, salesTyreModel: {} };
            const isRowSelected = selectedRow === date;
            const info = getDayInfo(date);
            const { batches } = info;
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
                              const status = info.aggregatedSalesStatus[b] || "Pending";
                              const isPendingInMaintenance = info.pendingInMaintenance.has(b);

                              return (
                                <button
                                  key={b}
                                  disabled={isPendingInMaintenance}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (status !== "Sold" && !isPendingInMaintenance) {
                                      setActiveDate(date);
                                      setActiveBatch(b);
                                      setShowPopup(true);
                                    }
                                  }}
                                  className={`px-2 py-1 text-[10px] rounded font-bold transition-all ${status === "Sold" ? "bg-green-600 text-white shadow-sm" :
                                      isPendingInMaintenance ? "bg-gray-600 text-gray-400 cursor-not-allowed border border-gray-500 opacity-60" :
                                        "bg-blue-500 text-white hover:bg-blue-400 shadow-md"
                                    }`}
                                >
                                  {b} ({status === "Sold" ? "Sold" : isPendingInMaintenance ? "Transit/Pending" : "Ready"})
                                </button>
                              );
                            })}
                          </div>
                        </td>
                      );
                    case "Target": return <td key={i} className="border border-gray-700 p-2 text-center">{schema.target || 50}</td>;
                    case "Bill No": return <td key={i} className="border border-gray-700 p-2 text-xs">{Object.values(info.aggregatedSalesBillNo).join(", ") || "-"}</td>;
                    case "Tyre Model": return <td key={i} className="border border-gray-700 p-2 text-xs">{Object.values(info.aggregatedSalesTyreModel).join(", ") || "-"}</td>;
                    default: return <td key={i} className="border border-gray-700 p-2 text-center text-gray-500">-</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-xl w-[400px] border border-gray-700 shadow-2xl transition-all scale-100 opacity-100">
            <h2 className="text-xl font-bold mb-4 text-white">Add Sold Bill No ({activeBatch})</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Bill Number</label>
                <input type="text" placeholder="Enter Bill No" value={billNo} onChange={(e) => setBillNo(e.target.value.toUpperCase())} className="w-full bg-gray-900 border border-gray-600 p-2 rounded text-white focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Tyre Model</label>
                <input type="text" placeholder="Enter Tyre Model" value={tyreModel} onChange={(e) => setTyreModel(e.target.value.toUpperCase())} className="w-full bg-gray-900 border border-gray-600 p-2 rounded text-white focus:border-blue-500 outline-none transition-all" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-8">
              <button onClick={() => setShowPopup(false)} className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded font-bold transition-all">Cancel</button>
              <button onClick={handleMarkSold} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-bold transition-all shadow-lg">Mark as Sold</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesTable;
