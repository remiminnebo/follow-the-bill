"use client";

import { ArrowDown, Cpu, Building2, Zap, Atom, Server, Factory } from "lucide-react";

interface FlowLevel {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    examples: string[];
}

const flowLevels: FlowLevel[] = [
    {
        icon: Cpu,
        title: "AI Companies",
        description: "Top-tier AI and tech giants driving demand",
        examples: ["OpenAI", "Google", "Microsoft", "NVIDIA"],
    },
    {
        icon: Server,
        title: "Cloud Infrastructure",
        description: "Massive data center expansion and compute needs",
        examples: ["AWS", "Azure", "Google Cloud"],
    },
    {
        icon: Factory,
        title: "Semiconductor Manufacturing",
        description: "Chip production and fabrication",
        examples: ["TSMC", "Samsung", "Intel"],
    },
    {
        icon: Building2,
        title: "Data Centers",
        description: "Physical infrastructure and cooling systems",
        examples: ["Equinix", "Digital Realty"],
    },
    {
        icon: Zap,
        title: "Energy Providers",
        description: "Power generation and distribution",
        examples: ["Vistra", "Constellation"],
    },
    {
        icon: Atom,
        title: "Uranium Mining",
        description: "Fundamental resource extraction",
        examples: ["Cameco", "Kazatomprom"],
    },
];

export function InvestmentFlow() {
    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
                {flowLevels.map((level, index) => (
                    <div key={level.title} className="w-full">
                        {/* Flow Level Card */}
                        <div className="border-2 border-black bg-white p-6 hover:bg-black hover:text-white transition-colors group cursor-pointer">
                            <div className="flex items-start gap-4">
                                <div className="border-2 border-current p-3 shrink-0">
                                    <level.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-serif text-xl font-bold mb-1">
                                        {level.title}
                                    </h3>
                                    <p className="font-sans text-sm opacity-80 mb-2">
                                        {level.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {level.examples.map((example) => (
                                            <span
                                                key={example}
                                                className="font-sans text-xs border border-current px-2 py-1"
                                            >
                                                {example}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Arrow connector */}
                        {index < flowLevels.length - 1 && (
                            <div className="flex justify-center py-2">
                                <div className="flex flex-col items-center">
                                    <div className="w-0.5 h-4 bg-black" />
                                    <ArrowDown className="h-4 w-4" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom label */}
            <div className="mt-8 border-2 border-black bg-black text-white p-4 text-center">
                <p className="font-serif text-lg font-bold">
                    Follow the money from AI to atoms
                </p>
            </div>
        </div>
    );
}
