"use client";

import React, { useState } from "react";
import { employees } from "@/data/employee";
import EmployeeTable from "@/components/EmployeeTable";
import Attendance from "@/components/Attendance";
import TyresProductionButton from "@/components/TyresProductionButton";
import ProductionTable from "@/components/production/ProductionTable";
import MaintenanceTable from "@/components/maintenance/MaintenanceTable";
import SalesTable from "@/components/Sales/SalesTable";
import QualityTable from "@/components/quality/QualityTable";
import CafeTable from "@/components/cafe/CafeTable";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { tableSchemas } from "@/data/tableSchemas";

// Map org + department -> tableType
const departmentToTableMap: Record<string, keyof typeof tableSchemas> = {
  "CITY TYRE_Production": "CITY TYRE_Production",
  "CITY TYRE_Quality Controller": "CITY TYRE_Quality Controller",
  "CITY TYRE_Sales": "CITY TYRE_Sales",
  "CITY TYRE_Maintenance": "CITY TYRE_Maintenance",

  "MILLER_Production": "MILLER_Production",
  "MILLER_Quality Controller": "MILLER_Supervisor",
  "MILLER_Supervisor": "MILLER_Supervisor",
  "MILLER_Sales": "MILLER_Sales",
  "MILLER_Maintenance": "MILLER_Maintenance",
  "MILLER_Shift Operations": "MILLER_Production",
  "MILLER_Engineering": "MILLER_Production",
  "MILLER_Labor": "MILLER_Production",
  "MILLER_Operations": "MILLER_Supervisor",
  "MILLER_Logistics": "MILLER_Sales",

  "CONSTRUCTION_Operations": "CONSTRUCTION_Operations",
  "CONSTRUCTION_Engineering": "CONSTRUCTION_Operations",
  "CONSTRUCTION_Shift Operations": "CONSTRUCTION_Operations",
  "CONSTRUCTION_Labor": "CONSTRUCTION_Operations",

  "CAFE_Kitchen": "CAFE_Java",
  "CAFE_Chefs": "CAFE_Java",
  "CAFE_Billing": "CAFE_Java",
  "CAFE_Store": "CAFE_Java",
  "CAFE_Service": "CAFE_Java",
};

const EmployeeProfilePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [updateFlag, setUpdateFlag] = useState(0);

  const empIdParam = params?.id;
  const empId = Array.isArray(empIdParam) ? empIdParam[0] : empIdParam;

  if (!empId) return <p className="p-10 text-white">Employee ID not found</p>;

  const employee = employees.find(
    (e) => e.id.toLowerCase() === empId.toLowerCase()
  );
  if (!employee) return <p className="p-10 text-white">Employee not found</p>;

  const org = employee.organization.trim() as "CITY TYRE" | "MILLER";
  const dept = employee.department.trim();
  const lookupKey = `${org}_${dept}`;

  let tableType: keyof typeof tableSchemas | undefined;
  if (org.toUpperCase() === "CAFE") {
    tableType = "CAFE_Java";
  } else {
    tableType = (departmentToTableMap[lookupKey] || "CITY TYRE_Production") as keyof typeof tableSchemas;
  }

  const avatar = employee.gender === "female" ? "/avatars/female.avif" : "/avatars/male.avif";

  const handleLogout = () => {
    localStorage.removeItem("loggedEmployee");
    router.push("/employee/employee-login");
  };

  const renderTable = () => {
    const props = { empId, organization: org, department: dept, trigger: updateFlag };

    if (tableType?.includes("Production")) return <ProductionTable {...props} />;
    if (tableType?.includes("Maintenance")) return <MaintenanceTable {...props} />;
    if (tableType?.includes("Sales")) return <SalesTable {...props} />;
    if (tableType?.includes("Quality") || tableType?.includes("Supervisor")) return <QualityTable {...props} />;
    if (tableType?.includes("Java") || org.toUpperCase() === "CAFE") return <CafeTable {...props} />;

    return <ProductionTable {...props} />;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-[#e8effd] min-h-screen">
      <aside className="w-full sm:w-full md:w-[300px] lg:w-[320px] bg-gray-800 text-white p-4 rounded-lg flex-shrink-0 lg:sticky lg:top-4 overflow-y-auto mt-20">
        <div className="flex flex-col items-center gap-3 mb-8">
          <Image
            src={avatar}
            alt="Employee Photo"
            width={250}
            height={250}
            className="rounded-full border shadow-md"
          />
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition-all"
          >
            Logout
          </button>
        </div>

        <div className="flex-1 grid gap-y-2 cursor-pointer w-full max-w-md mt-8">
          {Object.entries({
            Name: employee.name,
            ID: employee.id,
            Organization: employee.organization,
            Department: employee.department,
            Team: employee.team,
            Phone: employee.phone,
            Email: employee.userid,
            Gender: employee.gender,
            Age: employee.age,
            "Date of Joining": employee.DOJ,
            Place: employee.place,
            Qualification: employee.qualification,
            Salary: employee.salary?.toLocaleString(),
          }).map(([key, value]) => (
            <div key={key} className="grid grid-cols-2 border-b border-gray-700 pb-3 hover:bg-gray-700 transition-colors">
              <p className="font-semibold text-gray-400">{key}:</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </aside>

      <div className="mt-24 w-full px-2 sm:px-2 lg:ml-8 flex-grow bg-[#2b3244] rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <TyresProductionButton empId={empId} onUpdate={() => setUpdateFlag((prev) => prev + 1)} />
        </div>

        <div className="p-2">
          {renderTable()}
        </div>
      </div>

      <Attendance empId={employee.id} />
    </div>
  );
};

export default EmployeeProfilePage;
