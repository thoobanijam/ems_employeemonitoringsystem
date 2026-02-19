"use server";

import { prisma } from "@/lib/prisma";

export async function addBatch(batchNo: string, date: string, organization: string, department: string) {
    try {
        // Check if batch exists in this org
        const existing = await prisma.batch.findUnique({
            where: {
                batchNo_organization: {
                    batchNo,
                    organization,
                },
            },
        });

        if (existing) {
            return { success: false, error: "Batch number already exists in this organization." };
        }

        const batch = await prisma.batch.create({
            data: {
                batchNo,
                date,
                organization,
                department,
            },
        });

        return { success: true, data: batch };
    } catch (error) {
        console.error("Error adding batch:", error);
        return { success: false, error: "Failed to add batch" };
    }
}

export async function getBatches(organization: string) {
    try {
        const batches = await prisma.batch.findMany({
            where: {
                organization,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return { success: true, data: batches };
    } catch (error) {
        console.error("Error fetching batches:", error);
        return { success: false, error: "Failed to fetch batches" };
    }
}
