import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { PerformanceChart } from "@/components/strategy/performance-chart";
import { LineChart } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Performance",
    description:
        "“Follow The Bill” is a methodology for understanding investment opportunities by tracing capital flows through the AI ecosystem. When billions flow into AI development, we ask: where does that money ultimately go?",
};

export default async function PerformancePage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in?redirect_url=/performance");
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-[96px]">
                {/* Performance Analysis */}
                <section className="border-b-2 border-black bg-gray-50">
                    <div className="section-container py-16 md:py-24">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                                <LineChart className="h-10 w-10" />
                                Strategy Performance
                            </h2>
                            <p className="font-sans text-lg text-black/60 max-w-2xl mx-auto">
                                Backtesting our methodology against the market. We track an aggregate index of all 20+ companies identified in our supply chain deep dive.
                            </p>
                        </div>
                        <PerformanceChart />
                    </div>
                </section>

                {/* Disclaimer */}
                <section className="bg-white">
                    <div className="section-container py-16">
                        <div className="max-w-4xl mx-auto border-2 border-black p-8">
                            <h3 className="font-serif text-xl font-bold mb-4">Disclaimer</h3>
                            <p className="font-sans text-sm text-black/60 leading-relaxed">
                                Follow The Bill is an educational non-profit organization. The
                                information provided is for educational purposes only and should
                                not be construed as investment advice. We do not recommend
                                specific securities or investment strategies. Always conduct
                                your own research and consult with a qualified financial advisor
                                before making investment decisions.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
