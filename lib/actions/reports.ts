"use server";

import { prisma } from "@/lib/db";

export async function getReports(category?: string) {
    const reports = await prisma.report.findMany({
        where: category && category !== "All" ? { category } : {},
        orderBy: {
            publishedAt: "desc",
        },
    });

    return reports.map((report) => {
        const date = new Date(report.publishedAt);
        // Target December 2025 report
        if (date.getFullYear() === 2025 && date.getMonth() === 11) {
            return {
                ...report,
                title: "The Silicon Ceiling and the Indium Key: A Strategic Analysis of AXT Inc.",
                description: "The AI \"Growth\" Story Ends in 2026. Unless We Fix the Physics. Our latest deep dive uncovers the single most obscure, yet critical bottleneck in the AI supply chain: Indium Phosphide (InP), essential for the photonics shift. AXT Inc. ($AXTI) controls ~30-35% of the world's substrate capacity and access to raw materials, making it a critical choke point for hyperscalers like Google, Microsoft, and Nvidia. As AI compute scales, securing InP becomes a multi-trillion dollar imperative."
            };
        }
        return report;
    });
}
