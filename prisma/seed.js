const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const reports = [
        {
            title: "December 2025: AI Infrastructure Investment Outlook",
            description: "Comprehensive analysis of the AI supply chain investments, from hyperscalers to uranium producers. Covers NVIDIA's continued dominance, data center expansion trends, and the growing importance of nuclear power.",
            publishedAt: new Date("2025-12-01"),
            category: "Market Analysis",
            fileUrl: "/reports/December_2025.pdf",
            isFree: true,
        },
        {
            title: "November 2025: The Nuclear Renaissance",
            description: "Deep dive into the resurgence of nuclear power driven by AI data center demand. Analysis of utility deals, uranium supply constraints, and investment implications.",
            publishedAt: new Date("2025-11-01"),
            category: "Energy",
            fileUrl: "/reports/December_2025.pdf",
            isFree: false,
        },
        {
            title: "October 2025: Semiconductor Supply Chain Tensions",
            description: "Examining the bottlenecks in advanced chip manufacturing. From TSMC capacity to ASML equipment delivery timelines.",
            publishedAt: new Date("2025-10-01"),
            category: "Semiconductors",
            fileUrl: "/reports/December_2025.pdf",
            isFree: false,
        },
        {
            title: "September 2025: Data Center REITs Under Pressure",
            description: "Analysis of the real estate investment trusts powering cloud infrastructure. Valuation concerns, development pipelines, and power availability challenges.",
            publishedAt: new Date("2025-09-01"),
            category: "Infrastructure",
            fileUrl: "/reports/December_2025.pdf",
            isFree: true,
        }
    ];

    console.log('Seeding reports...');

    for (const report of reports) {
        await prisma.report.create({
            data: report,
        });
    }

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        pool.end();
    });
