import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { ReportCard } from "@/components/reports";

export const metadata: Metadata = {
    title: "Reports",
    description:
        "Access monthly investment research reports tracking AI ecosystem investments from tech giants to fundamental resources.",
};

// Mock data - in production this would come from database
const reports = [
    {
        id: "december-2025",
        title: "December 2025: AI Infrastructure Investment Outlook",
        description:
            "Comprehensive analysis of the AI supply chain investments, from hyperscalers to uranium producers. Covers NVIDIA's continued dominance, data center expansion trends, and the growing importance of nuclear power.",
        publishedAt: "December 2025",
        category: "Market Analysis",
        fileUrl: "/reports/December_2025.pdf",
        isFree: true,
    },
    {
        id: "november-2025",
        title: "November 2025: The Nuclear Renaissance",
        description:
            "Deep dive into the resurgence of nuclear power driven by AI data center demand. Analysis of utility deals, uranium supply constraints, and investment implications.",
        publishedAt: "November 2025",
        category: "Energy",
        fileUrl: "/reports/December_2025.pdf", // Placeholder
        isFree: false,
    },
    {
        id: "october-2025",
        title: "October 2025: Semiconductor Supply Chain Tensions",
        description:
            "Examining the bottlenecks in advanced chip manufacturing. From TSMC capacity to ASML equipment delivery timelines.",
        publishedAt: "October 2025",
        category: "Semiconductors",
        fileUrl: "/reports/December_2025.pdf", // Placeholder
        isFree: false,
    },
    {
        id: "september-2025",
        title: "September 2025: Data Center REITs Under Pressure",
        description:
            "Analysis of the real estate investment trusts powering cloud infrastructure. Valuation concerns, development pipelines, and power availability challenges.",
        publishedAt: "September 2025",
        category: "Infrastructure",
        fileUrl: "/reports/December_2025.pdf", // Placeholder
        isFree: true,
    },
    {
        id: "august-2025",
        title: "August 2025: Hyperscaler Capex Surge",
        description:
            "Breaking down the massive capital expenditure announcements from Microsoft, Google, Amazon, and Meta. Where is the money going?",
        publishedAt: "August 2025",
        category: "Market Analysis",
        fileUrl: "/reports/December_2025.pdf", // Placeholder
        isFree: false,
    },
    {
        id: "july-2025",
        title: "July 2025: Rare Earth Positioning",
        description:
            "Strategic analysis of rare earth element supply chains critical to AI hardware. China dependencies and alternative sourcing strategies.",
        publishedAt: "July 2025",
        category: "Resources",
        fileUrl: "/reports/December_2025.pdf", // Placeholder
        isFree: true,
    },
];

const categories = [
    "All",
    "Market Analysis",
    "Energy",
    "Semiconductors",
    "Infrastructure",
    "Resources",
];

export default function ReportsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-[96px]">
                {/* Hero */}
                <section className="border-b-2 border-black">
                    <div className="section-container py-16 md:py-20">
                        <div className="max-w-4xl">
                            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                                Research Reports
                            </h1>
                            <p className="font-sans text-xl text-black/80">
                                Monthly analysis tracking capital flows through the AI
                                ecosystem. From hyperscaler investments to fundamental resource
                                producers.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters */}
                <section className="border-b-2 border-black">
                    <div className="section-container py-4">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category, index) => (
                                <button
                                    key={category}
                                    className={`font-sans text-sm px-4 py-2 border-2 border-black transition-colors ${index === 0
                                        ? "bg-black text-white"
                                        : "bg-white text-black hover:bg-black hover:text-white"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Reports Grid */}
                <section>
                    <div className="section-container py-12 md:py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reports.map((report) => (
                                <ReportCard key={report.id} report={report} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center gap-2">
                            <button className="font-sans text-sm px-4 py-2 border-2 border-black bg-black text-white">
                                1
                            </button>
                            <button className="font-sans text-sm px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors">
                                2
                            </button>
                            <button className="font-sans text-sm px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors">
                                3
                            </button>
                            <button className="font-sans text-sm px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors">
                                Next →
                            </button>
                        </div>
                    </div>
                </section>

                {/* Subscribe CTA */}
                <section className="border-t-2 border-black bg-black text-white">
                    <div className="section-container py-16 text-center">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                            Get Full Access to All Reports
                        </h2>
                        <p className="font-sans text-white/80 mb-6 max-w-xl mx-auto">
                            Subscribe to unlock all premium reports, early access to new
                            research, and exclusive community discussions.
                        </p>
                        <button className="font-sans bg-white text-black border-2 border-white px-8 py-3 hover:bg-black hover:text-white transition-colors">
                            Subscribe Now
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
