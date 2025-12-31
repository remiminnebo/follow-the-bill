"use client";

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, TrendingDown, Clock, Activity } from 'lucide-react';

interface PerformanceData {
  tickers: { symbol: string; price: number; change: number }[];
  history: { date: string; value: number }[];
  currentValue: number;
  startValue: number;
  totalChange: number;
}

export function PerformanceChart() {
  const [range, setRange] = useState<'YTD' | '1Y' | '2Y' | '3Y'>('YTD');
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/market-performance?range=${range}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch performance data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [range]);

  if (loading && !data) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border-2 border-black bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <Activity className="animate-spin h-8 w-8 text-black" />
          <p className="font-sans text-sm font-bold">Calculating FTB Index...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-black">
        <div className="p-6 border-b-2 md:border-b-0 md:border-r-2 border-black bg-white">
          <div className="flex items-center gap-2 text-black/60 mb-2">
            <Activity className="h-4 w-4" />
            <span className="font-sans text-xs font-bold uppercase tracking-wider">FTB Aggregate Index</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-4xl font-bold">{data?.currentValue.toFixed(2)}</span>
            <span className={`font-sans text-lg font-bold flex items-center ${data && data.totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data && data.totalChange >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {data?.totalChange.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="p-6 border-b-2 md:border-b-0 md:border-r-2 border-black bg-white">
          <div className="flex items-center gap-2 text-black/60 mb-2">
            <Clock className="h-4 w-4" />
            <span className="font-sans text-xs font-bold uppercase tracking-wider">Time Horizon</span>
          </div>
          <div className="flex gap-2">
            {(['YTD', '1Y', '2Y', '3Y'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 font-sans text-sm font-bold border-2 border-black transition-colors ${range === r ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-black text-white">
          <div className="font-sans text-xs font-bold uppercase tracking-wider opacity-60 mb-2">Strategy Composition</div>
          <div className="flex flex-wrap gap-2">
            {data?.tickers.slice(0, 8).map(t => (
              <span key={t.symbol} className="font-sans text-[10px] font-bold border border-white/30 px-1">
                {t.symbol}
              </span>
            ))}
            <span className="font-sans text-[10px] font-bold opacity-60">+{data?.tickers.length! - 8} more</span>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="border-2 border-black bg-white p-6 h-[450px]">
        <div className="mb-6">
          <h3 className="font-serif text-xl font-bold italic underline decoration-2 offset-4">Cumulative Strategy Performance</h3>
          <p className="font-sans text-sm text-black/60">Base 100 normalization of all supply chain level constituents.</p>
        </div>
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.history}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis 
                dataKey="date" 
                axisLine={{ stroke: '#000', strokeWidth: 2 }}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 'bold', fill: '#000' }}
                minTickGap={30}
              />
              <YAxis 
                domain={['auto', 'auto']}
                axisLine={{ stroke: '#000', strokeWidth: 2 }}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 'bold', fill: '#000' }}
              />
              <Tooltip 
                contentStyle={{ border: '2px solid black', borderRadius: 0, fontFamily: 'var(--font-sans)', fontWeight: 'bold' }}
                labelStyle={{ marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#000" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Constituent Table Snippet */}
      <div className="border-2 border-black overflow-hidden">
        <table className="w-full text-left font-sans text-sm">
          <thead>
            <tr className="bg-black text-white uppercase text-[10px] tracking-widest font-bold">
              <th className="p-3">Ticker</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-right">Daily Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {data?.tickers.slice(0, 5).map(t => (
              <tr key={t.symbol} className="hover:bg-gray-50">
                <td className="p-3 font-bold">{t.symbol}</td>
                <td className="p-3 font-mono">${t.price.toFixed(2)}</td>
                <td className={`p-3 text-right font-bold ${t.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {t.change >= 0 ? '+' : ''}{t.change.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
