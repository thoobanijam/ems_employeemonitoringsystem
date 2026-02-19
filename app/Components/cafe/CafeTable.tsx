"use client";

import React, { useState, useRef } from "react";
import useProductionBatch from "@/hooks/useProductionBatch";
import { tableSchemas } from "@/data/tableSchemas";
import { AttendanceDay } from "@/types/attendance";

interface CafeTableProps {
    empId: string;
    organization: string;
    department: string;
    trigger?: number;
}

interface CafeItem {
    item: string;
    count: number;
    unit?: string;
    status?: "Pending" | "Received";
    billNo?: string;
    rate?: number;
}

const CafeTable: React.FC<CafeTableProps> = ({ empId, organization, department, trigger }) => {
    const schemaKey = `CAFE_${department}`;
    const schema = tableSchemas[schemaKey] || tableSchemas["CAFE_Inventory"];
    const { data, loading, updateBatchStatus } = useProductionBatch(organization, department, trigger);
    const [selectedRow, setSelectedRow] = useState<string | null>(null);
    const tableRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = () => {
        const content = tableRef.current;
        if (!content) return;
        const printWindow = window.open("", "_blank");
        if (!printWindow) return;
        const title = (department === "Kitchen" || department === "Service") ? `${organization} Kitchen & Service` : `${organization} ${department}`;
        printWindow.document.write(`
            <html>
            <head>
                <title>${title}</title>
                <style>
                    body { font-family: Arial, sans-serif; font-size: 10px; color: #000; background: #fff; margin: 16px; }
                    h2 { font-size: 14px; text-transform: uppercase; margin-bottom: 12px; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #999; padding: 4px 6px; text-align: left; vertical-align: top; }
                    th { background: #e5e7eb; font-weight: bold; text-transform: uppercase; font-size: 9px; }
                    tr:nth-child(even) { background: #f9fafb; }
                    .no-print { display: none !important; }
                </style>
            </head>
            <body>
                <h2>${title}</h2>
                ${content.innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
    };

    // Filtered / Aggregated Data
    const allDates = new Set<string>();
    Object.values(data).forEach(empLogs => Object.keys(empLogs).forEach(d => allDates.add(d)));
    allDates.add(new Date().toISOString().split("T")[0]);

    const getDayInfo = (date: string) => {
        const aggregated: Record<string, any> = {
            openingStock: [] as CafeItem[],
            dispatchedToKitchen: [] as CafeItem[],
            dispatchedToService: [] as CafeItem[],
            kitchenSales: [] as CafeItem[],
            serviceSales: [] as CafeItem[],
            kitchenExcess: [] as CafeItem[],
            serviceExcess: [] as CafeItem[],
        };

        Object.entries(data).forEach(([eId, empLogs]) => {
            const day = empLogs[date];
            if (!day) return;

            const isInventory = eId === "EMP064"; // Jaya Krishna
            const isKitchen = ["EMP055", "EMP056", "EMP057", "EMP058", "EMP059"].includes(eId);
            const isService = ["EMP060", "EMP061", "EMP062", "EMP063"].includes(eId);
            const isCleaning = ["EMP067", "EMP068", "EMP069"].includes(eId);
            const isFloorStaff = isKitchen || isService || isCleaning;

            if (isInventory) {
                if (day.openingStock) aggregated.openingStock.push(...(day.openingStock as any[]));
                if (day.dispatchedToKitchen) aggregated.dispatchedToKitchen.push(...(day.dispatchedToKitchen as any[]));
                if (day.dispatchedToService) aggregated.dispatchedToService.push(...(day.dispatchedToService as any[]));
            }
            if (isKitchen) {
                if (day.salesData) aggregated.kitchenSales.push(...(day.salesData as any[]));
                if (day.excessStock) {
                    const mapped = (day.excessStock as any[]).map((it, idx) => ({ ...it, donorId: eId, localIdx: idx }));
                    aggregated.kitchenExcess.push(...mapped);
                }
            }
            if (isService || isCleaning) {
                if (day.salesData) aggregated.serviceSales.push(...(day.salesData as any[]));
                if (day.excessStock) {
                    const mapped = (day.excessStock as any[]).map((it, idx) => ({ ...it, donorId: eId, localIdx: idx }));
                    aggregated.serviceExcess.push(...mapped);
                }
            }
        });

        const formatItems = (items: any[]) => items.map(i => {
            const unitStr = i.unit && i.unit !== "none" ? ` ${i.unit}` : "";
            return `${i.item.toUpperCase()} ${i.count}${unitStr}${i.status ? ` (${i.status})` : ""}`;
        }).join("\n");

        const stockMap: Record<string, { count: number, unit: string }> = {};
        aggregated.openingStock.forEach((i: CafeItem) => {
            const name = i.item.toUpperCase().trim();
            if (!stockMap[name]) stockMap[name] = { count: 0, unit: i.unit || "" };
            stockMap[name].count += i.count;
        });

        const subtract = (items: CafeItem[]) => {
            items.forEach((i: CafeItem) => {
                const name = i.item.toUpperCase().trim();
                if (stockMap[name]) {
                    stockMap[name].count -= i.count;
                }
            });
        };

        subtract(aggregated.dispatchedToKitchen);
        subtract(aggregated.dispatchedToService);

        const closingStockStr = Object.entries(stockMap)
            .map(([item, data]) => {
                const unitStr = data.unit && data.unit !== "none" ? ` ${data.unit}` : "";
                return `${item} ${data.count}${unitStr}`;
            })
            .join("\n");

        // All floor staff (Kitchen + Service + Cleaning) share the same aggregated view
        const isFloorDept = ["Kitchen", "Service", "Cleaning"].includes(department);
        const allFloorSales = [...aggregated.kitchenSales, ...aggregated.serviceSales];
        const allFloorExcess = [...aggregated.kitchenExcess, ...aggregated.serviceExcess];
        const allDispatchedToFloor = [...aggregated.dispatchedToKitchen, ...aggregated.dispatchedToService];

        return {
            openingStock: formatItems(aggregated.openingStock),
            dispatchedToKitchen: formatItems(aggregated.dispatchedToKitchen),
            dispatchedToService: formatItems(aggregated.dispatchedToService),
            kitchenSales: aggregated.kitchenSales,
            serviceSales: aggregated.serviceSales,
            kitchenExcess: aggregated.kitchenExcess,
            serviceExcess: aggregated.serviceExcess,
            kitchenSalesStr: formatItems(aggregated.kitchenSales),
            serviceSalesStr: formatItems(aggregated.serviceSales),
            kitchenExcessStr: formatItems(aggregated.kitchenExcess),
            serviceExcessStr: formatItems(aggregated.serviceExcess),
            allSalesStr: formatItems([...aggregated.kitchenSales, ...aggregated.serviceSales]),
            allBillsStr: [...aggregated.kitchenSales, ...aggregated.serviceSales].map(i => i.billNo).filter(Boolean).join(", "),
            allRates: [...aggregated.kitchenSales, ...aggregated.serviceSales].reduce((sum: number, i: CafeItem) => sum + (i.rate || 0), 0),
            closingStockStr,
            deptSales: isFloorDept ? allFloorSales : aggregated.kitchenSales,
            deptExcess: isFloorDept ? allFloorExcess : aggregated.kitchenExcess,
            deptSalesStr: isFloorDept ? formatItems(allFloorSales) : formatItems(aggregated.kitchenSales),
            deptTotalRate: (isFloorDept ? allFloorSales : aggregated.kitchenSales)
                .reduce((sum: number, i: CafeItem) => sum + (i.rate || 0), 0),
            deptBillsStr: (isFloorDept ? allFloorSales : aggregated.kitchenSales)
                .map((i: CafeItem) => `${i.item} x${i.count} (${i.billNo})`).join("\n"),
            receivedFromInventory: isFloorDept ? formatItems(allDispatchedToFloor) : formatItems(aggregated.dispatchedToKitchen),
        };
    };

    const sortedDates = Array.from(allDates).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    // Popups
    const [popupType, setPopupType] = useState<"Inventory" | "Dispatched" | "Sales" | "Excess" | null>(null);
    const [activeDate, setActiveDate] = useState("");
    const [items, setItems] = useState<CafeItem[]>([{ item: "", count: 0 }]);
    const [targetDept, setTargetDept] = useState<"Kitchen" | "Service">("Kitchen");

    const addItemField = () => setItems([...items, { item: "", count: 0 }]);
    const updateItem = (index: number, field: keyof CafeItem, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const handleSubmit = async () => {
        if (!activeDate || !empId) return;
        const myLog = data[empId]?.[activeDate] || { loginTime: "N/A", status: "Present" };
        const updates: Partial<AttendanceDay> = {};

        const processedItems = items.filter(i => i.item).map(i => ({
            ...i,
            item: i.item.toUpperCase(),
            unit: i.unit || "bottel"
        }));

        if (popupType === "Sales") {
            const billNo = `BILL${Math.floor(Math.random() * 90000) + 10000}`;
            const newSales = processedItems.map(i => ({ ...i, billNo, rate: (i.rate || 0) * i.count }));
            updates.salesData = [...(myLog.salesData as CafeItem[] || []), ...newSales];
        } else if (popupType === "Inventory") {
            updates.openingStock = [...(myLog.openingStock as CafeItem[] || []), ...processedItems];
        } else if (popupType === "Dispatched") {
            const key = targetDept === "Kitchen" ? "dispatchedToKitchen" : "dispatchedToService";
            updates[key] = [...(myLog[key] as CafeItem[] || []), ...processedItems];
        } else if (popupType === "Excess") {
            const newExcess = processedItems.map(i => ({ ...i, status: "Pending" as const }));
            updates.excessStock = [...(myLog.excessStock as CafeItem[] || []), ...newExcess];
        }

        await updateBatchStatus(empId, activeDate, updates);
        alert(`✅ Successfully added ${popupType?.toLowerCase()}`);
        setPopupType(null);
        setItems([{ item: "", count: 0, unit: "bottel" }]);
    };

    const toggleReceived = async (date: string, donorId: string, itemIndex: number) => {
        const donorLog = data[donorId]?.[date];
        if (!donorLog) return;
        const excess = [...(donorLog.excessStock as CafeItem[] || [])];
        if (excess[itemIndex]) {
            excess[itemIndex].status = "Received";
            await updateBatchStatus(donorId, date, { excessStock: excess });
        }
    };

    if (loading) return <div className="p-4 text-white">Loading Cafe Data...</div>;

    return (
        <div className="w-full overflow-x-auto p-4 text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-2xl uppercase tracking-wider">
                    {["Kitchen", "Service", "Cleaning"].includes(department)
                        ? `${organization} Kitchen, Service & Cleaning`
                        : `${organization} ${department}`}
                </h2>
                <div className="flex gap-2">
                    {department === "Inventory" && (
                        <>
                            <button onClick={() => { setPopupType("Inventory"); setActiveDate(sortedDates[sortedDates.length - 1]); }} className="bg-green-600 px-4 py-2 rounded font-bold hover:bg-green-500">Add Inventory</button>
                            <button onClick={() => { setPopupType("Dispatched"); setActiveDate(sortedDates[sortedDates.length - 1]); }} className="bg-blue-600 px-4 py-2 rounded font-bold hover:bg-blue-500">Dispatched</button>
                        </>
                    )}
                    {(department === "Kitchen" || department === "Service") && (
                        <>
                            <button onClick={() => { setPopupType("Sales"); setActiveDate(sortedDates[sortedDates.length - 1]); }} className="bg-orange-600 px-4 py-2 rounded font-bold hover:bg-orange-500">Add Sales</button>
                            <button onClick={() => { setPopupType("Excess"); setActiveDate(sortedDates[sortedDates.length - 1]); }} className="bg-red-600 px-4 py-2 rounded font-bold hover:bg-red-500">Excess Stock</button>
                        </>
                    )}
                    <button onClick={handleDownloadPDF} className="no-print bg-indigo-600 px-4 py-2 rounded font-bold hover:bg-indigo-500 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg>
                        Download PDF
                    </button>
                </div>
            </div>

            <div ref={tableRef}>
                <table className="w-full border border-gray-700 border-collapse text-xs">
                    <thead>
                        <tr className="bg-gray-800">
                            {schema.headers.map((h, i) => <th key={i} className="border border-gray-700 p-2 uppercase">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedDates.map((date, index) => {
                            const info = getDayInfo(date);
                            const myLog = data[empId]?.[date] || { loginTime: "Absent" };
                            const isRowSelected = selectedRow === date;

                            return (
                                <tr key={date} className={`${isRowSelected ? "bg-orange-900/40" : "hover:bg-gray-800/50"} cursor-pointer`} onClick={() => setSelectedRow(isRowSelected ? null : date)}>
                                    {schema.headers.map((header, i) => {
                                        switch (header) {
                                            case "✔": return <td key={i} className="border border-gray-700 p-2 text-center"><div className={`w-4 h-4 border rounded ${isRowSelected ? "bg-orange-500" : ""}`} /></td>;
                                            case "#": return <td key={i} className="border border-gray-700 p-2 text-center">{index + 1}</td>;
                                            case "Date": return <td key={i} className="border border-gray-700 p-2 text-center whitespace-nowrap">{date}</td>;
                                            case "Morning (8am–1pm)": return <td key={i} className="border border-gray-700 p-2 text-center">{myLog.loginTime === "Absent" ? "Absent" : myLog.loginTime}</td>;
                                            case "Break (1pm–2pm)": return <td key={i} className="border border-gray-700 p-2 text-center text-xs text-gray-400">1:00 PM - 2:00 PM</td>;
                                            case "Evening (2pm–7pm)": return <td key={i} className="border border-gray-700 p-2 text-center">{myLog.loginTime === "Absent" ? "Absent" : myLog.loginTime}</td>;
                                            case "Lagging time": return <td key={i} className="border border-gray-700 p-2 text-center">On time</td>;
                                            case "Opening Stock": return <td key={i} className="border border-gray-700 p-2 whitespace-pre-line leading-relaxed min-w-[180px]">{info.openingStock || "-"}</td>;
                                            case "Closing Stock": return <td key={i} className="border border-gray-700 p-2 text-green-400 font-bold whitespace-pre-line leading-relaxed min-w-[180px]">{info.closingStockStr || "-"}</td>;
                                            case "Dispatche to Service Dept": return <td key={i} className="border border-gray-700 p-2 whitespace-pre-line leading-relaxed min-w-[180px]">{info.dispatchedToService || "-"}</td>;
                                            case "Dispatche to Kitchen Dept": return <td key={i} className="border border-gray-700 p-2 whitespace-pre-line leading-relaxed min-w-[180px]">{info.dispatchedToKitchen || "-"}</td>;
                                            case "Excess Stock from Service":
                                                return (
                                                    <td key={i} className="border border-gray-700 p-2 min-w-[180px]">
                                                        <div className="flex flex-col gap-1 transition-all">
                                                            {info.serviceExcess.map((ex: any, idx: number) => (
                                                                <button key={idx} disabled={ex.status === "Received"} onClick={(e) => { e.stopPropagation(); toggleReceived(date, ex.donorId, ex.localIdx); }} className={`px-2 py-1 rounded text-[10px] text-left ${ex.status === "Received" ? "bg-gray-600 text-gray-400" : "bg-red-600 text-white shadow-sm hover:bg-red-500"}`}>
                                                                    {ex.item} {ex.count} {ex.unit} {ex.status === "Received" ? "(Received)" : "(Pending)"}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </td>
                                                );
                                            case "Excess Stock from Kitchen":
                                                return (
                                                    <td key={i} className="border border-gray-700 p-2 min-w-[180px]">
                                                        <div className="flex flex-col gap-1 transition-all">
                                                            {info.kitchenExcess.map((ex: any, idx: number) => (
                                                                <button key={idx} disabled={ex.status === "Received"} onClick={(e) => { e.stopPropagation(); toggleReceived(date, ex.donorId, ex.localIdx); }} className={`px-2 py-1 rounded text-[10px] text-left ${ex.status === "Received" ? "bg-gray-600 text-gray-400" : "bg-red-600 text-white shadow-sm hover:bg-red-500"}`}>
                                                                    {ex.item} {ex.count} {ex.unit} {ex.status === "Received" ? "(Received)" : "(Pending)"}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </td>
                                                );
                                            case "Received From Inventory": return <td key={i} className="border border-gray-700 p-2 whitespace-pre-line leading-relaxed min-w-[180px]">{info.receivedFromInventory || "-"}</td>;
                                            case "Excess Stock":
                                                return (
                                                    <td key={i} className="border border-gray-700 p-2 min-w-[180px]">
                                                        <div className="flex flex-col gap-1">
                                                            {(info.deptExcess as any[]).map((ex: any, idx: number) => (
                                                                <span key={idx} className={`px-2 py-1 rounded text-[10px] text-left ${ex.status === "Received" ? "bg-gray-700 text-gray-400" : "bg-yellow-700/60 text-yellow-200"}`}>
                                                                    {ex.item} {ex.count} {ex.unit || ""} ({ex.status === "Pending" ? "Pending" : "Dispatched to Inventory"})
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                );
                                            case "Rate":
                                                return (
                                                    <td key={i} className="border border-gray-700 p-2 min-w-[180px]">
                                                        <div className="flex flex-col divide-y divide-gray-700">
                                                            {(info.deptSales as CafeItem[]).map((s, idx) => (
                                                                <div key={idx} className="py-1 flex justify-between items-center text-xs">
                                                                    <span className="text-gray-300">{s.item.toUpperCase()} ×{s.count}</span>
                                                                    <span className="text-green-400 font-bold ml-2">{s.rate || 0}</span>
                                                                </div>
                                                            ))}
                                                            {(info.deptSales as CafeItem[]).length > 1 && (
                                                                <div className="pt-1 flex justify-between text-xs font-bold">
                                                                    <span className="text-gray-400">Total</span>
                                                                    <span className="text-yellow-400">{info.deptTotalRate}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                );
                                            case "Bill No":
                                                return (
                                                    <td key={i} className="border border-gray-700 p-2 min-w-[200px]">
                                                        <div className="flex flex-col divide-y divide-gray-700">
                                                            {(info.deptSales as CafeItem[]).map((s, idx) => (
                                                                <div key={idx} className="py-1 flex items-center gap-2 text-[10px]">
                                                                    <span className="text-blue-400 font-bold whitespace-nowrap">{s.billNo}</span>
                                                                    <span className="text-gray-300">{s.item.toUpperCase()} ×{s.count}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </td>
                                                );

                                            // Quality Controller Columns
                                            case "Opening Stock from inventory": return <td key={i} className="border border-gray-700 p-2 whitespace-pre-line min-w-[180px]">{info.openingStock || "-"}</td>;
                                            case "dispatched Stock from inventory": return <td key={i} className="border border-gray-700 p-2 whitespace-pre-line leading-tight text-[10px] min-w-[150px]">{info.dispatchedToKitchen || info.dispatchedToService ? `Kitchen:\n${info.dispatchedToKitchen}\nService:\n${info.dispatchedToService}` : "-"}</td>;
                                            case "Closing Stock from inventory": return <td key={i} className="border border-gray-700 p-2 font-bold text-green-400 whitespace-pre-line min-w-[180px]">{info.closingStockStr || "-"}</td>;
                                            case "Sold from kitchen & service": return <td key={i} className="border border-gray-700 p-2 whitespace-pre-line">{info.allSalesStr || "-"}</td>;
                                            case "Bill No of kitchen and & service": return <td key={i} className="border border-gray-700 p-2 whitespace-pre-line text-[10px]">{info.allBillsStr || "-"}</td>;
                                            case "Receive cash for sale": return <td key={i} className="border border-gray-700 p-2 text-center text-green-400 font-bold">{info.allRates || 0}</td>;
                                            case "excess stock from kitchen": return <td key={i} className="border border-gray-700 p-2 whitespace-pre-line min-w-[180px]">{info.kitchenExcessStr || "-"}</td>;
                                            case "Excess stock from service": return <td key={i} className="border border-gray-700 p-2 whitespace-pre-line min-w-[180px]">{info.serviceExcessStr || "-"}</td>;

                                            default: return <td key={i} className="border border-gray-700 p-2 text-center">-</td>;
                                        }
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {popupType && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-gray-800 p-6 rounded-xl w-[500px] max-h-[80vh] overflow-y-auto border border-gray-700 shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Add {popupType}</h2>
                        {popupType === "Dispatched" && (
                            <div className="mb-4 flex gap-4">
                                <label className="flex items-center gap-2"><input type="radio" name="dept" checked={targetDept === "Kitchen"} onChange={() => setTargetDept("Kitchen")} /> Kitchen</label>
                                <label className="flex items-center gap-2"><input type="radio" name="dept" checked={targetDept === "Service"} onChange={() => setTargetDept("Service")} /> Service</label>
                            </div>
                        )}
                        <div className="space-y-4">
                            {items.map((it, idx) => (
                                <div key={idx} className="flex gap-2 items-end">
                                    <div className="flex-1">
                                        <label className="text-[10px] text-gray-400 font-bold">Item Name</label>
                                        <input type="text" placeholder="e.g. PEPSI" value={it.item} onChange={(e) => updateItem(idx, "item", e.target.value)} className="w-full bg-gray-900 border border-gray-600 p-2 rounded text-sm uppercase" />
                                    </div>
                                    <div className="w-24">
                                        <label className="text-[10px] text-gray-400 font-bold">Qty</label>
                                        <input type="number" value={it.count} onChange={(e) => updateItem(idx, "count", Number(e.target.value))} className="w-full bg-gray-900 border border-gray-600 p-2 rounded text-sm" />
                                    </div>
                                    <div className="w-24">
                                        <label className="text-[10px] text-gray-400 font-bold">Unit</label>
                                        <select value={it.unit || "bottel"} onChange={(e) => updateItem(idx, "unit", e.target.value)} className="w-full bg-gray-900 border border-gray-600 p-2 rounded text-sm">
                                            <option value="none">none</option>
                                            <option value="bottel">bottel</option>
                                            <option value="packets">packets</option>
                                            <option value="kg">kg</option>
                                            <option value="litres">litres</option>
                                            <option value="dozen">dozen</option>
                                            <option value="box">box</option>
                                            <option value="bundle">bundle</option>
                                            <option value="pieces">pieces</option>
                                            <option value="items">items</option>
                                            <option value="plate">plate</option>
                                            <option value="set">set</option>
                                            <option value="parcel">parcel</option>
                                            <option value="meals">meals</option>
                                        </select>
                                    </div>
                                    {popupType === "Sales" && (
                                        <div className="w-32">
                                            <label className="text-[10px] text-gray-400 font-bold">Rate (per unit)</label>
                                            <input type="number" value={it.rate || 0} onChange={(e) => updateItem(idx, "rate", Number(e.target.value))} className="w-full bg-gray-900 border border-gray-600 p-2 rounded text-sm" />
                                            {it.count > 0 && (it.rate || 0) > 0 && (
                                                <p className="text-[10px] text-green-400 mt-1 font-bold">Total: {it.count * (it.rate || 0)}</p>
                                            )}
                                        </div>
                                    )}
                                    <button onClick={addItemField} className="bg-blue-600 p-2 rounded text-white font-bold">+</button>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-2 mt-8">
                            <button onClick={() => setPopupType(null)} className="bg-gray-600 px-6 py-2 rounded font-bold">Cancel</button>
                            <button onClick={handleSubmit} className="bg-green-600 px-6 py-2 rounded font-bold hover:bg-green-500 shadow-lg">Add</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CafeTable;
