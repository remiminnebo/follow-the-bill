import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { PerformanceChart } from "@/components/strategy/performance-chart";
import { EcosystemSelector } from "@/components/strategy/ecosystem-selector";
import { Brain, LineChart } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "AI Performance | Follow The Bill",
    description:
        "Track the educational performance analysis of our AI strategy thesis, aggregating 20+ companies across the full AI supply chain.",
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
                {/* Ecosystem Selector */}
                <section className="border-b-2 border-black bg-white">
                    <div className="section-container py-6">
                        <EcosystemSelector current="ai" type="performance" />
                    </div>
                </section>

                {/* Performance Analysis */}
                <section className="border-b-2 border-black bg-gray-50">
                    <div className="section-container py-16 md:py-24">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                                <Brain className="h-10 w-10" />
                                AI Strategy Performance
                            </h2>
                            <p className="font-sans text-lg text-black/60 max-w-2xl mx-auto">
                                Backtesting our AI Ecosystem methodology against the market. We track an aggregate index of all 20+ companies identified in our supply chain deep dive.
                            </p>
                        </div>
                        <PerformanceChart />
                    </div>
                </section>

                {/* Link to Robotics Performance */}
                <section className="border-b-2 border-black bg-white">
                    <div className="section-container py-12">
                        <div className="text-center">
                            <p className="font-sans text-black/60 mb-4">
                                Compare with our Robotics Ecosystem performance
                            </p>
                            <a href="/performance/robotics" className="inline-block border-2 border-black px-6 py-3 font-sans font-bold hover:bg-black hover:text-white transition-colors">
                                View Robotics Performance →
                            </a>
                        </div>
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
                                specific securities or investment strategies. Past performance
                                does not guarantee future results. Always conduct your own
                                research and consult with a qualified financial advisor before
                                making investment decisions.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
