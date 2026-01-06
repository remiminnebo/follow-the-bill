"use client";

import { useState, useEffect } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Clock, Activity, Layers, Bot } from 'lucide-react';
import { ROBOTICS_CATEGORIES, JAPAN_TICKERS, CHINA_TICKERS } from '@/lib/robotics-tickers';

interface PerformanceData {
    tickers: { symbol: string; price: number; change: number }[];
    history: { date: string; value: number }[];
    currentValue: number;
    startValue: number;
    totalChange: number;
}

interface RoboticsPerformanceChartProps {
    initialData?: PerformanceData | null;
}

export function RoboticsPerformanceChart({ initialData }: RoboticsPerformanceChartProps) {
    const [range, setRange] = useState<'YTD' | '1Y' | '2Y' | '3Y'>('YTD');
    const [data, setData] = useState<PerformanceData | null>(initialData || null);
    const [loading, setLoading] = useState(!initialData);
    const [error, setError] = useState<string | null>(null);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/market-performance?range=${range}&ecosystem=robotics`);
                const result = await response.json();

                if (response.ok && !result.error) {
                    if (result.tickers && result.tickers.length > 0) {
                        setData(result);
                    } else {
                        setData(result);
                    }
                } else {
                    const errorMsg = result.error || "Unknown API error";
                    setError(errorMsg);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [range]);

    // Helper to check if a ticker is a Japan stock
    const isJapanStock = (symbol: string) => JAPAN_TICKERS.includes(symbol);
    // Helper to check if a ticker is a China ADR
    const isChinaStock = (symbol: string) => CHINA_TICKERS.includes(symbol);

    // Get market label for a ticker
    const getMarketLabel = (symbol: string) => {
        if (isJapanStock(symbol)) return { emoji: '🇯🇵', label: 'TSE' };
        if (isChinaStock(symbol)) return { emoji: '🇨🇳', label: 'ADR' };
        return { emoji: '🇺🇸', label: 'NYSE/NASDAQ' };
    };

    if (loading && !data) {
        return (
            <div className="w-full h-[400px] flex items-center justify-center border-2 border-black bg-white">
                <div className="flex flex-col items-center gap-4 text-center px-4">
                    <Activity className="animate-spin h-10 w-10 text-black" />
                    <div>
                        <p className="font-sans text-sm font-black uppercase tracking-tighter">Calculating Robotics Index...</p>
                        <p className="font-sans text-[10px] text-black/50 mt-1 uppercase">Fetching global robotics data (US, Japan, China)</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !data || data.tickers.length === 0) {
        return (
            <div className="w-full h-[400px] flex items-center justify-center border-2 border-black bg-white p-8">
                <div className="text-center max-w-md">
                    <TrendingDown className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p className="font-sans text-sm font-black uppercase tracking-tighter mb-2">Robotics data currently unavailable</p>
                    <p className="font-sans text-xs text-black/60 uppercase mb-6">
                        We are experiencing rate-limiting from our data provider. Please try again in a few minutes.
                    </p>
                    <div className="flex justify-center gap-2">
                        {(['YTD', '1Y', '2Y', '3Y'] as const).map((r) => (
                            <button
                                key={r}
                                onClick={() => setRange(r)}
                                className={`px-4 py-1 font-sans text-xs font-black border-2 border-black transition-none ${range === r ? 'bg-black text-white' : 'bg-white text-black hover:invert'}`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-black">
                <div className="p-6 border-b-2 md:border-b-0 md:border-r-2 border-black bg-white">
                    <div className="flex items-center gap-2 text-black mb-2">
                        <Bot className="h-4 w-4" />
                        <span className="font-sans text-xs font-bold uppercase tracking-widest">Robotics Aggregate Index</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="font-serif text-4xl font-black italic">
                            {typeof data.currentValue === 'number' ? data.currentValue.toFixed(2) : "0.00"}
                        </span>
                        <span className="font-sans text-lg font-bold flex items-center text-black border-2 border-black px-2 py-0.5 ml-2">
                            {data.totalChange >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                            {typeof data.totalChange === 'number' ? data.totalChange.toFixed(2) : "0.00"}%
                        </span>
                    </div>
                </div>

                <div className="p-6 border-b-2 md:border-b-0 md:border-r-2 border-black bg-white">
                    <div className="flex items-center gap-2 text-black mb-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-sans text-xs font-bold uppercase tracking-widest">Time Horizon</span>
                    </div>
                    <div className="flex gap-2">
                        {(['YTD', '1Y', '2Y', '3Y'] as const).map((r) => (
                            <button
                                key={r}
                                onClick={() => setRange(r)}
                                className={`px-4 py-1 font-sans text-sm font-black border-2 border-black transition-none ${range === r ? 'bg-black text-white' : 'bg-white text-black hover:invert'}`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-black text-white">
                    <div className="flex items-center gap-2 mb-2 opacity-70">
                        <Layers className="h-4 w-4" />
                        <span className="font-sans text-xs font-bold uppercase tracking-widest">Robotics Composition</span>
                    </div>
                    <div className="space-y-1">
                        {Object.keys(ROBOTICS_CATEGORIES).map(cat => (
                            <div key={cat} className="flex justify-between items-center text-[10px] font-black uppercase">
                                <span>{cat}</span>
                                <span>{ROBOTICS_CATEGORIES[cat as keyof typeof ROBOTICS_CATEGORIES].length} Assets</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chart */}
            <div className="border-2 border-black bg-white p-6 h-[450px] relative">
                <div className="mb-6">
                    <h3 className="font-serif text-2xl font-black uppercase italic tracking-tighter decoration-4 underline">Robotics Strategy Performance</h3>
                    <p className="font-sans text-xs font-bold mt-1 text-black uppercase tracking-tight">Base 100 normalization / {data?.tickers.length} constituents index (incl. Japan stocks)</p>
                </div>
                <div className="w-full h-[320px]">
                    {hasMounted && (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data?.history}>
                                <defs>
                                    <pattern id="pattern-stripe-robotics" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                        <rect width="2" height="4" transform="translate(0,0)" fill="black" opacity="0.1"></rect>
                                    </pattern>
                                </defs>
                                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#000" strokeOpacity={0.1} />
                                <XAxis
                                    dataKey="date"
                                    axisLine={{ stroke: '#000', strokeWidth: 2 }}
                                    tickLine={{ stroke: '#000', strokeWidth: 2 }}
                                    tick={{ fontSize: 10, fontWeight: '900', fill: '#000', fontFamily: 'var(--font-sans)' }}
                                    minTickGap={30}
                                />
                                <YAxis
                                    domain={['auto', 'auto']}
                                    axisLine={{ stroke: '#000', strokeWidth: 2 }}
                                    tickLine={{ stroke: '#000', strokeWidth: 2 }}
                                    tick={{ fontSize: 10, fontWeight: '900', fill: '#000', fontFamily: 'var(--font-sans)' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        border: '2px solid black',
                                        borderRadius: 0,
                                        backgroundColor: 'white',
                                        fontFamily: 'var(--font-sans)',
                                        fontWeight: '900',
                                        textTransform: 'uppercase'
                                    }}
                                    itemStyle={{ color: 'black' }}
                                    cursor={{ stroke: 'black', strokeWidth: 2 }}
                                />
                                <Area
                                    type="stepAfter"
                                    dataKey="value"
                                    stroke="#000"
                                    strokeWidth={4}
                                    fill="url(#pattern-stripe-robotics)"
                                    fillOpacity={1}
                                    animationDuration={0}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Constituent Table Grouped by Category */}
            <div className="space-y-4">
                <h3 className="font-serif text-2xl font-black uppercase italic tracking-tight">Index Constituents</h3>
                <div className="grid grid-cols-1 gap-6">
                    {Object.entries(ROBOTICS_CATEGORIES).map(([category, symbols]) => {
                        const categoryTickers = data?.tickers.filter(t => symbols.includes(t.symbol)) || [];
                        // Don't hide empty categories - show them as pending so user knows they exist
                        // if (categoryTickers.length === 0) return null;

                        const isSharedCategory = ['Semiconductors', 'Energy & Nuclear', 'Resources'].includes(category);

                        return (
                            <div key={category} className={`border-2 border-black overflow-hidden ${isSharedCategory ? 'bg-black/5' : 'bg-white'}`}>
                                <div className="bg-black text-white p-3 font-black uppercase text-xs tracking-widest flex justify-between items-center">
                                    <span className="flex items-center gap-2">
                                        {category}
                                        {isSharedCategory && (
                                            <span className="text-[10px] font-normal opacity-60 border border-white/30 px-2 py-0.5">
                                                Shared with AI
                                            </span>
                                        )}
                                    </span>
                                    <span className="opacity-60">{categoryTickers.length} Assets</span>
                                </div>
                                <table className="w-full text-left font-sans text-sm border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-black uppercase text-[10px] tracking-widest font-black text-black/40">
                                            <th className="p-3 border-r-2 border-black">Ticker</th>
                                            <th className="p-3 border-r-2 border-black">Price</th>
                                            <th className="p-3 border-r-2 border-black">Market</th>
                                            <th className="p-3 text-right">Daily Change</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black/10">
                                        {categoryTickers.map(t => (
                                            <tr key={t.symbol} className="hover:bg-black hover:text-white group transition-none">
                                                <td className="p-3 font-black border-r-2 border-black group-hover:border-white">
                                                    {t.symbol}
                                                </td>
                                                <td className="p-3 font-black border-r-2 border-black group-hover:border-white">
                                                    {isJapanStock(t.symbol) ? '¥' : '$'}
                                                    {typeof t.price === 'number' ? t.price.toFixed(2) : "0.00"}
                                                </td>
                                                <td className="p-3 border-r-2 border-black group-hover:border-white">
                                                    <span className="text-xs border border-current px-2 py-0.5">
                                                        {getMarketLabel(t.symbol).emoji} {getMarketLabel(t.symbol).label}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-right font-black">
                                                    <span className={`inline-block px-2 py-0.5 border-2 border-black group-hover:border-white`}>
                                                        {typeof t.change === 'number' && t.change >= 0 ? '+' : ''}
                                                        {typeof t.change === 'number' ? t.change.toFixed(2) : "0.00"}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
