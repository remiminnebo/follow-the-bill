"use server";

import { prisma } from "@/lib/db";

export async function getReports(category?: string) {
    return await prisma.report.findMany({
        where: category && category !== "All" ? { category } : {},
        orderBy: {
            publishedAt: "desc",
        },
    });
}
