"use server";

import { prisma } from "@/lib/prisma";
import { employees } from "../data/employee";

async function ensureEmployeeExists(employeeId: string) {
    const employee = await prisma.employee.findUnique({
        where: { id: employeeId }
    });

    if (!employee) {
        const staticEmp = employees.find(e => e.id === employeeId);
        if (staticEmp) {
            const [firstName, ...lastNameParts] = staticEmp.name.split(" ");
            await prisma.employee.create({
                data: {
                    id: staticEmp.id,
                    firstName: firstName || "Unknown",
                    lastName: lastNameParts.join(" ") || "Employee",
                    email: staticEmp.userid, // using userid as email since it's unique
                    phone: staticEmp.phone,
                    department: staticEmp.department,
                    team: staticEmp.team,
                }
            });
        }
    }
}

export async function getDailyLogs(employeeId: string, startDate: string, endDate: string) {
    try {
        await ensureEmployeeExists(employeeId);
        const logs = await prisma.dailyLog.findMany({
            where: {
                employeeId,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            select: {
                date: true,
                data: true,
            }
        });
        // Transform to expected format { [date]: data }
        const formattedLogs = logs.reduce((acc: any, log: { date: string; data: any }) => {
            acc[log.date] = log.data;
            return acc;
        }, {});

        return { success: true, data: formattedLogs };
    } catch (error) {
        console.error("Error fetching daily logs:", error);
        return { success: false, error: "Failed to fetch logs" };
    }
}

export async function saveDailyLog(employeeId: string, date: string, data: any) {
    try {
        await ensureEmployeeExists(employeeId);
        const log = await prisma.dailyLog.upsert({
            where: {
                employeeId_date: {
                    employeeId,
                    date,
                },
            },
            update: {
                data,
            },
            create: {
                employeeId,
                date,
                data,
            },
        });
        return { success: true, data: log };
    } catch (error) {
        console.error("Error saving daily log:", error);
        return { success: false, error: "Failed to save log" };
    }
}
export async function getMultipleEmployeesLogs(employeeIds: string[], startDate: string, endDate: string) {
    try {
        // Ensure all these employees exist in DB (minimal check)
        await Promise.all(employeeIds.map(id => ensureEmployeeExists(id)));

        const logs = await prisma.dailyLog.findMany({
            where: {
                employeeId: { in: employeeIds },
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            select: {
                employeeId: true,
                date: true,
                data: true,
            }
        });

        // Transform to { [empId]: { [date]: data } }
        const result: any = {};
        logs.forEach(log => {
            if (!result[log.employeeId]) result[log.employeeId] = {};
            result[log.employeeId][log.date] = log.data;
        });

        return { success: true, data: result };
    } catch (error) {
        console.error("Error fetching multiple employees logs:", error);
        return { success: false, error: "Failed to fetch multiple logs" };
    }
}
