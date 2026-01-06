import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { RoboticsPerformanceChart } from "@/components/strategy/robotics-performance-chart";
import { EcosystemSelector } from "@/components/strategy/ecosystem-selector";
import { Bot, LineChart } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Robotics Performance | Follow The Bill",
    description:
        "Educational performance analysis of our Robotics strategy thesis, including Japan industrial robotics and the automation supply chain.",
};

export default async function RoboticsPerformancePage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in?redirect_url=/performance/robotics");
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-[96px]">
                {/* Ecosystem Selector */}
                <section className="border-b-2 border-black bg-white">
                    <div className="section-container py-6">
                        <EcosystemSelector current="robotics" />
                    </div>
                </section>

                {/* Performance Analysis */}
                <section className="border-b-2 border-black bg-gray-50">
                    <div className="section-container py-16 md:py-24">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                                <Bot className="h-10 w-10" />
                                Robotics Strategy Performance
                            </h2>
                            <p className="font-sans text-lg text-black/60 max-w-2xl mx-auto">
                                Tracking our Robotics Ecosystem methodology. We aggregate an index of robotics manufacturers,
                                motion control companies, and shared infrastructure stocks including Japan&apos;s industrial leaders.
                            </p>
                        </div>
                        <RoboticsPerformanceChart />
                    </div>
                </section>

                {/* Japan Stocks Notice */}
                <section className="border-b-2 border-black bg-black text-white">
                    <div className="section-container py-12">
                        <div className="max-w-4xl mx-auto flex items-start gap-6">
                            <div className="text-4xl">🇯🇵</div>
                            <div>
                                <h3 className="font-serif text-xl font-bold mb-2">Japan Stock Exchange (TSE)</h3>
                                <p className="font-sans text-white/80 text-sm leading-relaxed">
                                    Several constituents trade on the Tokyo Stock Exchange (TSE) and are denominated in Japanese Yen (JPY).
                                    Trading hours differ from US markets. Tickers ending in <code className="bg-white/20 px-1">.T</code> indicate
                                    TSE-listed securities. Currency conversion may affect USD-equivalent performance calculations.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Link to AI Performance */}
                <section className="border-b-2 border-black bg-white">
                    <div className="section-container py-12">
                        <div className="text-center">
                            <p className="font-sans text-black/60 mb-4">
                                Compare with our AI Ecosystem performance
                            </p>
                            <a href="/performance" className="inline-block border-2 border-black px-6 py-3 font-sans font-bold hover:bg-black hover:text-white transition-colors">
                                View AI Performance →
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
                                does not guarantee future results. Japan-listed securities (TSE)
                                may have different trading hours and are denominated in JPY.
                                Always conduct your own research and consult with a qualified
                                financial advisor before making investment decisions.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
