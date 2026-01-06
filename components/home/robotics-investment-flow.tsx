"use client";

import { ArrowDown, Bot, Cpu, Zap, Atom, Eye, Cog, Brain } from "lucide-react";

interface FlowLevel {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    examples: string[];
    isShared?: boolean;
}

const flowLevels: FlowLevel[] = [
    {
        icon: Bot,
        title: "Humanoid & Industrial Robotics",
        description: "Global robotics manufacturers (US, Japan, China)",
        examples: ["Fanuc 🇯🇵", "Tesla 🇺🇸", "Baidu 🇨🇳", "ABB 🇨🇭"],
    },
    {
        icon: Cog,
        title: "Motion Control & Actuators",
        description: "Precision motion systems powering robotic movement",
        examples: ["Rockwell 🇺🇸", "Emerson 🇺🇸", "Hitachi 🇯🇵"],
    },
    {
        icon: Eye,
        title: "Sensors & Vision",
        description: "Machine vision and sensing technologies",
        examples: ["Cognex 🇺🇸", "Keyence 🇯🇵", "Teledyne 🇺🇸"],
    },
    {
        icon: Brain,
        title: "AI & Autonomy",
        description: "Intelligence powering robotic systems",
        examples: ["NVIDIA 🇺🇸", "Tesla 🇺🇸", "Google 🇺🇸"],
    },
    {
        icon: Cpu,
        title: "Semiconductors",
        description: "Chips powering robotic intelligence",
        examples: ["NVIDIA", "TSMC", "AMD"],
        isShared: true,
    },
    {
        icon: Zap,
        title: "Energy Providers",
        description: "Power generation for manufacturing and data centers",
        examples: ["Vistra", "Constellation"],
        isShared: true,
    },
    {
        icon: Atom,
        title: "Resources",
        description: "Raw materials for electrification and robotics",
        examples: ["Cameco", "MP Materials"],
        isShared: true,
    },
];

export function RoboticsInvestmentFlow() {
    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
                {flowLevels.map((level, index) => (
                    <div key={level.title} className="w-full">
                        {/* Flow Level Card */}
                        <div className={`border-2 border-black p-6 hover:bg-black hover:text-white transition-colors group cursor-pointer ${level.isShared ? 'bg-black/5' : 'bg-white'
                            }`}>
                            <div className="flex items-start gap-4">
                                <div className="border-2 border-current p-3 shrink-0">
                                    <level.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-serif text-xl font-bold">
                                            {level.title}
                                        </h3>
                                        {level.isShared && (
                                            <span className="font-sans text-[10px] uppercase tracking-wider border border-current px-2 py-0.5">
                                                Shared with AI
                                            </span>
                                        )}
                                    </div>
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
                    Follow the money from robots to resources
                </p>
            </div>
        </div>
    );
}
