"use client";

import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useProductionBatch from "@/hooks/useProductionBatch";
import { employees } from "@/data/employee";
import { addBatch } from "@/actions/batch";

interface TyresProductionButtonProps {
  empId: string;
  onUpdate?: () => void;
}

const TyresProductionButton: React.FC<TyresProductionButtonProps> = ({ empId, onUpdate }) => {
  const [filterDate, setFilterDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [manufacturingDate, setManufacturingDate] = useState(new Date().toISOString().split("T")[0]);
  const [expiryDate, setExpiryDate] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [currentEmployee, setCurrentEmployee] = useState<typeof employees[0] | null>(null);

  const { updateBatchStatus, data } = useProductionBatch(
    currentEmployee?.organization || "CITY TYRE",
    currentEmployee?.department || "Production"
  );

  useEffect(() => {
    const employee = employees.find((e) => e.id === empId) || null;
    setCurrentEmployee(employee);
  }, [empId]);

  // Auto-calculate expiry date (6 months after)
  useEffect(() => {
    if (manufacturingDate) {
      const date = new Date(manufacturingDate);
      date.setMonth(date.getMonth() + 6);
      setExpiryDate(date.toISOString().split("T")[0]);
    }
  }, [manufacturingDate, showBatchModal]);

  const handleMDateChange = (val: string) => {
    setManufacturingDate(val);
  };

  if (!currentEmployee || currentEmployee.department !== "Production") return null;

  const addBatchNoHandler = async () => {
    const normalizedBatch = batchNo.trim().toUpperCase();
    if (!currentEmployee || !normalizedBatch || !manufacturingDate || !targetDate) {
      alert("Please fill all fields.");
      return;
    }

    // Use server action for uniqueness
    const result = await addBatch(
      normalizedBatch,
      targetDate,
      currentEmployee.organization,
      currentEmployee.department
    );

    if (!result.success) {
      alert(result.error);
      return;
    }

    // Sync with DailyLog
    const day = data[empId]?.[targetDate] || {
      batchNo: [],
      manufacturingDate: [],
      expiryDate: [],
      completedTarget: 0
    };

    // Aggregate all batches for this date from the department
    const departmentBatches = new Set<string>();
    Object.values(data).forEach(empLogs => {
      const d = empLogs[targetDate];
      if (d?.batchNo) {
        d.batchNo.forEach((b: string) => departmentBatches.add(b));
      }
    });

    if (!departmentBatches.has(normalizedBatch)) {
      const batches = [...(day.batchNo || [])];
      const mDates = [...(day.manufacturingDate || [])];
      const eDates = [...(day.expiryDate || [])];

      batches.push(normalizedBatch);
      mDates.push(manufacturingDate);
      eDates.push(expiryDate || "-");

      await updateBatchStatus(empId, targetDate, {
        batchNo: batches,
        manufacturingDate: mDates,
        expiryDate: eDates,
        completedTarget: batches.length
      });
    }

    alert("Batch added successfully!");

    setBatchNo("");
    setManufacturingDate(new Date().toISOString().split("T")[0]);
    setExpiryDate("");
    setShowBatchModal(false);

    onUpdate?.(); // optional refresh for table
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`${currentEmployee.organization} PRODUCTION REPORT`, 10, 10);

    const tableData: any[][] = [];
    Object.entries(data).forEach(([empId, logs]) => {
      Object.entries(logs).forEach(([date, day]: [string, any]) => {
        if (day.batchNo && day.batchNo.length > 0) {
          day.batchNo.forEach((b: string, i: number) => {
            tableData.push([
              date,
              b,
              day.manufacturingDate?.[i] || "-",
              day.expiryDate?.[i] || "-"
            ]);
          });
        }
      });
    });

    autoTable(doc, {
      head: [["Date", "Batch No", "Manufacturing Date", "Expiry Date"]],
      body: tableData,
      startY: 20,
    });

    doc.save(`${currentEmployee.organization}_production_report.pdf`);
  };

  return (
    <div className="my-4 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-1 bg-white text-black rounded"
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="border p-1 bg-white text-black rounded"
        />
        <button
          onClick={() => setShowBatchModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold transition-colors shadow-lg"
        >
          ADD BATCH NO
        </button>
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition-colors shadow-lg"
        >
          DOWNLOAD PDF
        </button>
      </div>

      {showBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="bg-gray-800 p-6 rounded-xl w-[500px] shadow-2xl border border-gray-700 text-white">
            <h2 className="text-xl font-bold mb-4 underline decoration-green-500 underline-offset-4 uppercase">
              Add Production Batch
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Batch Number</label>
                <input
                  type="text"
                  placeholder="Ex: B101"
                  value={batchNo}
                  onChange={(e) => setBatchNo(e.target.value)}
                  className="border border-gray-600 bg-gray-900 p-2 w-full rounded focus:border-green-500 outline-none uppercase"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Manufacturing Date</label>
                <input
                  type="date"
                  value={manufacturingDate}
                  onChange={(e) => handleMDateChange(e.target.value)}
                  className="border border-gray-600 bg-gray-900 p-2 w-full rounded focus:border-green-500 outline-none"
                />
              </div>
              {currentEmployee.organization === "MILLER" && (
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Expiry Date</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="border border-gray-600 bg-gray-900 p-2 w-full rounded focus:border-green-500 outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowBatchModal(false)}
                className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded text-white font-bold transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={addBatchNoHandler}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-bold transition-colors shadow-lg shadow-green-900/20 uppercase"
              >
                SAVE BATCH
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TyresProductionButton;
