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
  const [error, setError] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    async function fetchData() {
      setLoading(true);
      setError(null);
      console.log(`Fetching performance data for range: ${range}`);
      try {
        const response = await fetch(`/api/market-performance?range=${range}`);
        const result = await response.json();
        
        if (response.ok && !result.error) {
          if (result.tickers && result.tickers.length > 0) {
            setData(result);
          } else {
            console.warn("API returned empty ticker list");
            setData(result); 
          }
        } else {
          const errorMsg = result.error || "Unknown API error";
          console.error("API error:", errorMsg);
          setError(errorMsg);
        }
      } catch (err: any) {
        console.error("Failed to fetch performance data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [range]);

  if (loading && !data) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border-2 border-black bg-white">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <Activity className="animate-spin h-10 w-10 text-black" />
          <div>
            <p className="font-sans text-sm font-black uppercase tracking-tighter">Calculating FTB Index...</p>
            <p className="font-sans text-[10px] text-black/50 mt-1 uppercase">Fetching real-time data for 20+ constituents</p>
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
          <p className="font-sans text-sm font-black uppercase tracking-tighter mb-2">Performance data currently unavailable</p>
          <p className="font-sans text-xs text-black/60 uppercase mb-6">
            We are experiencing rate-limiting from our data provider. Please try again in a few minutes or change the time horizon.
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
            <Activity className="h-4 w-4" />
            <span className="font-sans text-xs font-bold uppercase tracking-widest">FTB Aggregate Index</span>
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
          <div className="font-sans text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Strategy Composition</div>
          <div className="flex flex-wrap gap-2">
            {data?.tickers.slice(0, 8).map(t => (
              <span key={t.symbol} className="font-sans text-[10px] font-black border-2 border-white px-1.5 py-0.5">
                {t.symbol}
              </span>
            ))}
            <span className="font-sans text-[10px] font-bold underline">+{data?.tickers.length! - 8} MORE</span>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="border-2 border-black bg-white p-6 h-[450px] relative">
        <div className="mb-6">
          <h3 className="font-serif text-2xl font-black uppercase italic tracking-tighter decoration-4 underline">Cumulative Strategy Performance</h3>
          <p className="font-sans text-xs font-bold mt-1 text-black uppercase tracking-tight">Base 100 normalization / Strategy constituents index</p>
        </div>
        <div className="w-full h-[320px]">
          {hasMounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.history}>
                <defs>
                  <pattern id="pattern-stripe" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
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
                  fill="url(#pattern-stripe)" 
                  fillOpacity={1}
                  animationDuration={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Constituent Table */}
      <div className="border-2 border-black overflow-hidden bg-white">
        <table className="w-full text-left font-sans text-sm border-collapse">
          <thead>
            <tr className="bg-black text-white uppercase text-[11px] tracking-[0.2em] font-black">
              <th className="p-4 border-r border-white/20">Ticker</th>
              <th className="p-4 border-r border-white/20">Price</th>
              <th className="p-4 text-right">Daily Change</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black">
            {data?.tickers.slice(0, 10).map(t => (
              <tr key={t.symbol} className="hover:bg-black hover:text-white group transition-none">
                <td className="p-4 font-black border-r-2 border-black group-hover:border-white">{t.symbol}</td>
                <td className="p-4 font-black border-r-2 border-black group-hover:border-white">${t.price.toFixed(2)}</td>
                <td className="p-4 text-right font-black">
                  <span className={`inline-block px-2 py-0.5 border-2 border-black group-hover:border-white`}>
                    {t.change >= 0 ? '+' : ''}{t.change.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
