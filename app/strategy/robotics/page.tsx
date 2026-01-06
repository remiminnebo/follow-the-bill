import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { RoboticsInvestmentFlow } from "@/components/home";
import { EcosystemSelector } from "@/components/strategy/ecosystem-selector";
import {
    Search,
    Target,
    BarChart3,
    Lightbulb,
    ArrowDown,
    Bot,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Robotics Strategy | Follow The Bill",
    description:
        "Follow The Bill tracks the Humanoid Robotics revolution—from industrial automation giants in Japan to the fundamental resources powering the next generation of machines.",
};

const strategyPillars = [
    {
        icon: Search,
        title: "Map the Automation Supply Chain",
        description:
            "We systematically trace the entire supply chain powering robotics. From humanoid robots to motion controllers, sensors to semiconductors—we identify every link in the chain.",
    },
    {
        icon: Target,
        title: "Identify Key Manufacturers",
        description:
            "Japan dominates industrial robotics. Companies like Fanuc and Yaskawa control critical manufacturing capabilities that power global automation.",
    },
    {
        icon: BarChart3,
        title: "Follow Global Capital Flows",
        description:
            "Track investments from automotive manufacturers to warehouse automation, from surgical robotics to consumer applications. Capital flows reveal opportunities.",
    },
    {
        icon: Lightbulb,
        title: "Anticipate Automation Demand",
        description:
            "Labor shortages, reshoring trends, and AI integration are driving explosive demand for robotics across every industry—manufacturing, healthcare, logistics.",
    },
];

const supplyChainLevels = [
    {
        level: "Level 1",
        category: "Humanoid & Industrial Robotics",
        description: "Global robot manufacturers",
        isShared: false,
        companies: [
            "🇯🇵 Fanuc (6954.T) - World's largest industrial robot maker",
            "🇯🇵 Yaskawa (6506.T) - Motion control and robotics leader",
            "🇺🇸 Intuitive Surgical - Pioneer in surgical robotics (da Vinci)",
            "🇺🇸 Teradyne - Owns Universal Robots (collaborative robotics)",
            "🇨🇭 ABB - Global industrial automation and robotics",
            "🇨🇳 Baidu - Apollo autonomous driving platform",
            "🇨🇳 XPeng - EV maker developing humanoid robots",
        ],
    },
    {
        level: "Level 2",
        category: "Motion Control & Actuators",
        description: "Precision movement systems",
        isShared: false,
        companies: [
            "🇺🇸 Rockwell Automation - Industrial automation platforms",
            "🇺🇸 Emerson Electric - Process automation leader",
            "🇺🇸 Parker Hannifin - Motion and control technologies",
            "🇯🇵 Hitachi (6501.T) - Electronics and automation",
            "🇩🇪 Siemens - Factory automation systems",
        ],
    },
    {
        level: "Level 3",
        category: "Sensors & Vision",
        description: "The eyes and senses of robots",
        isShared: false,
        companies: [
            "🇺🇸 Cognex - Machine vision systems leader",
            "🇯🇵 Keyence (6861.T) - Sensors and measurement",
            "🇺🇸 Teledyne Technologies - Digital imaging and instrumentation",
            "🇺🇸 ON Semiconductor - Image sensors for robotics",
        ],
    },
    {
        level: "Level 4",
        category: "AI & Autonomy",
        description: "Intelligence powering robotic systems",
        isShared: false,
        companies: [
            "🇺🇸 NVIDIA - AI chips, Omniverse for robotics simulation",
            "🇺🇸 Tesla - Optimus humanoid robot program",
            "🇺🇸 Google/Waymo - Autonomous driving technology",
            "🇺🇸 Amazon - Warehouse robotics (Kiva, Sparrow)",
        ],
    },
    {
        level: "Level 5",
        category: "Semiconductors",
        description: "Computing power for robotic intelligence",
        isShared: true,
        companies: [
            "🇺🇸 NVIDIA - AI chips powering robotic vision and planning",
            "🇹🇼 TSMC - Advanced chip manufacturing",
            "🇺🇸 AMD - High-performance processors",
            "🇺🇸 Broadcom - Custom silicon solutions",
        ],
    },
    {
        level: "Level 6",
        category: "Energy & Nuclear",
        description: "Powering manufacturing and automation",
        isShared: true,
        companies: [
            "🇺🇸 Vistra - Power generation for industrial demand",
            "🇺🇸 Constellation Energy - Nuclear power provider",
            "🇺🇸 NextEra - Renewable energy for factories",
        ],
    },
    {
        level: "Level 7",
        category: "Resources",
        description: "The fundamental building blocks",
        isShared: true,
        companies: [
            "🇺🇸 MP Materials - Rare earth elements for motors",
            "🇺🇸 Freeport-McMoRan - Copper for electrification",
            "🇨🇦 Cameco - Uranium for nuclear power",
        ],
    },
];

export default function RoboticsStrategyPage() {
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

                {/* Hero */}
                <section className="border-b-2 border-black">
                    <div className="section-container py-16 md:py-24">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="border-2 border-black p-3">
                                    <Bot className="h-8 w-8" />
                                </div>
                                <span className="font-sans text-sm font-bold uppercase tracking-widest">
                                    Robotics Ecosystem
                                </span>
                            </div>
                            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                                The Robotics Revolution
                            </h1>
                            <p className="font-sans text-xl text-black/80 leading-relaxed">
                                Humanoid robots, industrial automation, and surgical robotics are transforming every industry. We trace capital flows from robot manufacturers through their complete supply chains—from Japan&apos;s industrial giants to the raw materials powering the automation revolution.
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
                                    The robotics revolution is entering its exponential phase. Labor shortages, reshoring initiatives, and AI breakthroughs are converging to create unprecedented demand for automation.
                                </p>
                                <p>
                                    Japan has dominated industrial robotics for decades—Fanuc, Yaskawa, and Keyence represent critical chokepoints in the global supply chain. As humanoid robots move from labs to factories, these companies and their suppliers stand to benefit enormously.
                                </p>
                                <p>
                                    Our Robotics strategy thesis shares infrastructure with our AI thesis—both require advanced semiconductors, abundant energy, and rare earth materials. By understanding these connections, we identify overlapping opportunities and unique robotics plays.
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
                                The Robotics Investment Chain
                            </h2>
                            <p className="font-sans text-lg text-black/60 max-w-2xl mx-auto">
                                Interactive visualization of capital flows through the robotics
                                ecosystem. Shared categories with AI are marked.
                            </p>
                        </div>
                        <RoboticsInvestmentFlow />
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
                                    <div className={`border-2 border-black p-8 ${level.isShared ? 'bg-black/5' : 'bg-white'}`}>
                                        <div className="flex items-start gap-4">
                                            <div className="flex flex-col gap-2 shrink-0">
                                                <div className="border-2 border-black px-3 py-1 font-sans text-sm font-bold">
                                                    {level.level}
                                                </div>
                                                {level.isShared && (
                                                    <div className="border border-black px-2 py-0.5 font-sans text-[10px] font-bold uppercase text-center">
                                                        Shared
                                                    </div>
                                                )}
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

                {/* Global Leaders */}
                <section className="border-b-2 border-black bg-black text-white">
                    <div className="section-container py-16 md:py-24">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
                                🌐 Global Robotics Leaders
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="border-2 border-white p-6">
                                    <h3 className="font-serif text-xl font-bold mb-4">🇯🇵 Japan</h3>
                                    <ul className="space-y-3 font-sans text-white/80 text-sm">
                                        <li className="border-l-2 border-white pl-4">
                                            <strong>Fanuc</strong> - 60%+ of global CNC market
                                        </li>
                                        <li className="border-l-2 border-white pl-4">
                                            <strong>Yaskawa</strong> - #1 in servo motors
                                        </li>
                                        <li className="border-l-2 border-white pl-4">
                                            <strong>Keyence</strong> - Highest margins in automation
                                        </li>
                                    </ul>
                                </div>
                                <div className="border-2 border-white p-6">
                                    <h3 className="font-serif text-xl font-bold mb-4">🇺🇸 United States</h3>
                                    <ul className="space-y-3 font-sans text-white/80 text-sm">
                                        <li className="border-l-2 border-white pl-4">
                                            <strong>Tesla</strong> - Optimus humanoid robot
                                        </li>
                                        <li className="border-l-2 border-white pl-4">
                                            <strong>NVIDIA</strong> - AI chips for robotics
                                        </li>
                                        <li className="border-l-2 border-white pl-4">
                                            <strong>Intuitive Surgical</strong> - da Vinci surgical robots
                                        </li>
                                    </ul>
                                </div>
                                <div className="border-2 border-white p-6">
                                    <h3 className="font-serif text-xl font-bold mb-4">🇨🇳 China</h3>
                                    <ul className="space-y-3 font-sans text-white/80 text-sm">
                                        <li className="border-l-2 border-white pl-4">
                                            <strong>Baidu</strong> - Apollo autonomous driving
                                        </li>
                                        <li className="border-l-2 border-white pl-4">
                                            <strong>XPeng</strong> - EV + humanoid robotics
                                        </li>
                                        <li className="border-l-2 border-white pl-4">
                                            Growing domestic robotics industry
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA to AI Strategy */}
                <section className="border-b-2 border-black bg-white">
                    <div className="section-container py-16">
                        <div className="text-center">
                            <h3 className="font-serif text-2xl font-bold mb-4">
                                Explore Our Other Thesis
                            </h3>
                            <p className="font-sans text-black/60 mb-6 max-w-xl mx-auto">
                                Our AI Ecosystem strategy shares infrastructure with Robotics but focuses on cloud computing, data centers, and AI software companies.
                            </p>
                            <Link href="/strategy">
                                <Button className="bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors rounded-none font-sans px-8 py-6">
                                    View AI Strategy →
                                </Button>
                            </Link>
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
                                specific securities or investment strategies. Japan-listed securities
                                (Tokyo Stock Exchange) may have different trading hours and are
                                denominated in JPY. Always conduct your own research and consult with
                                a qualified financial advisor before making investment decisions.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
