"use client";

import Link from "next/link";
import { Bot, Brain, LineChart } from "lucide-react";

interface EcosystemSelectorProps {
    current: 'ai' | 'robotics';
    type?: 'strategy' | 'performance';
}

export function EcosystemSelector({ current, type = 'strategy' }: EcosystemSelectorProps) {
    const basePath = type === 'performance' ? '/performance' : '/strategy';
    const aiHref = basePath;
    const roboticsHref = type === 'performance' ? '/performance/robotics' : '/strategy/robotics';

    return (
        <div className="flex justify-center mb-8">
            <div className="inline-flex border-2 border-black">
                <Link
                    href={aiHref}
                    className={`px-6 py-3 flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-tight transition-none ${current === 'ai'
                            ? 'bg-black text-white'
                            : 'bg-white text-black hover:bg-black/5'
                        }`}
                >
                    <Brain className="h-5 w-5" />
                    AI Ecosystem
                </Link>
                <Link
                    href={roboticsHref}
                    className={`px-6 py-3 flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-tight border-l-2 border-black transition-none ${current === 'robotics'
                            ? 'bg-black text-white'
                            : 'bg-white text-black hover:bg-black/5'
                        }`}
                >
                    <Bot className="h-5 w-5" />
                    Robotics Ecosystem
                </Link>
            </div>
        </div>
    );
}
