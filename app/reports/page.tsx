import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { ReportCard } from "@/components/reports";
import { getReports } from "@/lib/actions/reports";

export const metadata: Metadata = {
    title: "Reports",
    description:
        "“Follow The Bill” is a methodology for understanding investment opportunities by tracing capital flows through the AI ecosystem. When billions flow into AI development, we ask: where does that money ultimately go?",
};

const categories = [
    "All",
    "Market Analysis",
    "Energy",
    "Semiconductors",
    "Infrastructure",
    "Resources",
];

export default async function ReportsPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const { category } = await searchParams;
    const reports = await getReports(category);

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
                            {categories.map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/reports?category=${cat}`}
                                    className={`font-sans text-sm px-4 py-2 border-2 border-black transition-colors no-underline ${(!category && cat === "All") || category === cat
                                        ? "bg-black text-white"
                                        : "bg-white text-black hover:bg-black hover:text-white"
                                        }`}
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Reports Grid */}
                <section>
                    <div className="section-container py-12 md:py-16">
                        {reports.length === 0 ? (
                            <div className="text-center py-12 border-2 border-black bg-gray-50">
                                <p className="font-sans text-lg text-black/60 italic">No reports found in this category.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {reports.map((report) => (
                                    <ReportCard key={report.id} report={{
                                        ...report,
                                        publishedAt: new Date(report.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                                    }} />
                                ))}
                            </div>
                        )}

                        {/* Pagination - Simplified for now */}
                        <div className="mt-12 flex justify-center gap-2">
                            <button className="font-sans text-sm px-4 py-2 border-2 border-black bg-black text-white cursor-not-allowed">
                                1
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
