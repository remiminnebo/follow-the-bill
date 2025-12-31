import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { InvestmentFlow } from "@/components/home";
import {
    Search,
    Target,
    BarChart3,
    Lightbulb,
    ArrowDown,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Strategy",
    description:
        "“Follow The Bill” is a methodology for understanding investment opportunities by tracing capital flows through the AI ecosystem. When billions flow into AI development, we ask: where does that money ultimately go?",
};

const strategyPillars = [
    {
        icon: Search,
        title: "Trace the Supply Chain",
        description:
            "We systematically map the entire supply chain that powers AI infrastructure. When a tech giant announces a $100B AI investment, we analyze where that capital ultimately flows.",
    },
    {
        icon: Target,
        title: "Identify Bottlenecks",
        description:
            "Every supply chain has constraints. We identify the critical chokepoints—whether it's advanced chip packaging, rare earth minerals, or power generation capacity.",
    },
    {
        icon: BarChart3,
        title: "Analyze Capital Flows",
        description:
            "Follow the money from hyperscalers to infrastructure providers, from semiconductor fabs to raw material producers. Understanding capital allocation reveals investment opportunities.",
    },
    {
        icon: Lightbulb,
        title: "Anticipate Demand",
        description:
            "AI growth creates cascading demand throughout the supply chain. A new data center doesn't just need chips—it needs power, cooling, and the resources that generate them.",
    },
];

const supplyChainLevels = [
    {
        level: "Level 1",
        category: "AI & Cloud",
        description: "The demand originators",
        companies: [
            "OpenAI - Leading AI development driving compute demand",
            "Microsoft - Massive Azure expansion for AI workloads",
            "Google - Gemini and cloud AI infrastructure",
            "Amazon - AWS AI services and custom chips",
            "Meta - AI infrastructure for social platforms",
        ],
    },
    {
        level: "Level 2",
        category: "Semiconductors",
        description: "The enablers of compute",
        companies: [
            "NVIDIA - GPU dominance in AI training",
            "TSMC - Advanced chip manufacturing",
            "AMD - Alternative AI and data center chips",
            "Broadcom - Custom AI accelerators",
            "ASML - Lithography equipment monopoly",
        ],
    },
    {
        level: "Level 3",
        category: "Infrastructure",
        description: "Physical manifestation of digital demand",
        companies: [
            "Equinix - Leading data center REIT",
            "Digital Realty - Hyperscale data centers",
            "Vertiv - Cooling and power systems",
            "Schneider Electric - Data center infrastructure",
        ],
    },
    {
        level: "Level 4",
        category: "Energy",
        description: "Powering the AI revolution",
        companies: [
            "Vistra - Power generation flexing to AI demand",
            "Constellation Energy - Nuclear renaissance beneficiary",
            "NRG Energy - Texas power market exposure",
            "NextEra - Renewable energy for data centers",
        ],
    },
    {
        level: "Level 5",
        category: "Resources",
        description: "The fundamental building blocks",
        companies: [
            "Cameco - Leading uranium producer",
            "Kazatomprom - World's largest uranium miner",
            "MP Materials - Rare earth elements",
            "Freeport-McMoRan - Copper for electrification",
        ],
    },
];

export default function StrategyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-[96px]">
                {/* Hero */}
                <section className="border-b-2 border-black">
                    <div className="section-container py-16 md:py-24">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                                Our Strategy
                            </h1>
                            <p className="font-sans text-xl text-black/80 leading-relaxed">
                                &ldquo;Follow The Bill&rdquo; is a methodology for understanding
                                investment opportunities by tracing capital flows through the AI
                                ecosystem. When billions flow into AI development, we ask: where
                                does that money ultimately go?
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Thesis */}
                <section className="border-b-2 border-black bg-black text-white">
                    <div className="section-container py-16 md:py-24">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
                                The Core Thesis
                            </h2>
                            <div className="space-y-6 font-sans text-lg text-white/90 leading-relaxed">
                                <p>
                                    The AI boom is not just a technology trend—it&apos;s a
                                    multi-trillion dollar infrastructure buildout. Every AI model
                                    trained, every chatbot query answered, requires an enormous
                                    physical infrastructure that traces back to fundamental
                                    resources.
                                </p>
                                <p>
                                    When tech giants announce massive AI investments, that capital
                                    flows through a predictable chain: from cloud compute needs,
                                    through semiconductor production, into data center
                                    construction, and ultimately to power generation and raw
                                    materials.
                                </p>
                                <p>
                                    By understanding this chain, we can identify investment
                                    opportunities at every level—often in overlooked sectors that
                                    will directly benefit from AI growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Strategy Pillars */}
                <section className="border-b-2 border-black">
                    <div className="section-container py-16 md:py-24">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
                            Four Pillars of Analysis
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                            {strategyPillars.map((pillar, index) => (
                                <div
                                    key={pillar.title}
                                    className={`border-2 border-black p-8 ${index < 2 ? "border-b-0 md:border-b-2" : ""
                                        } ${index % 2 === 0 ? "md:border-r-0" : ""}`}
                                >
                                    <div className="border-2 border-black p-3 inline-block mb-4">
                                        <pillar.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-serif text-2xl font-bold mb-3">
                                        {pillar.title}
                                    </h3>
                                    <p className="font-sans text-black/80 leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Interactive Flow */}
                <section className="border-b-2 border-black">
                    <div className="section-container py-16 md:py-24">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                                The Investment Chain
                            </h2>
                            <p className="font-sans text-lg text-black/60 max-w-2xl mx-auto">
                                Interactive visualization of capital flows through the AI
                                ecosystem.
                            </p>
                        </div>
                        <InvestmentFlow />
                    </div>
                </section>

                {/* Detailed Breakdown */}
                <section className="border-b-2 border-black">
                    <div className="section-container py-16 md:py-24">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
                            Supply Chain Deep Dive
                        </h2>
                        <div className="max-w-4xl mx-auto space-y-0">
                            {supplyChainLevels.map((level, index) => (
                                <div key={level.level}>
                                    <div className="border-2 border-black bg-white p-8">
                                        <div className="flex items-start gap-4">
                                            <div className="border-2 border-black px-3 py-1 font-sans text-sm font-bold shrink-0">
                                                {level.level}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-serif text-2xl font-bold mb-1">
                                                    {level.category}
                                                </h3>
                                                <p className="font-sans text-black/60 mb-4">
                                                    {level.description}
                                                </p>
                                                <ul className="space-y-2">
                                                    {level.companies.map((company) => (
                                                        <li
                                                            key={company}
                                                            className="font-sans text-sm text-black/80 border-l-2 border-black pl-4"
                                                        >
                                                            {company}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {index < supplyChainLevels.length - 1 && (
                                        <div className="flex justify-center py-3">
                                            <ArrowDown className="h-6 w-6" />
                                        </div>
                                    )}
                                </div>
                            ))}
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
