import YahooFinance from 'yahoo-finance2';

// Create a singleton instance for v3
const yf = new (YahooFinance as any)({
  suppressNotices: ['yahooSurvey']
});

// Tickers from Strategy Deep Dive
export const STRATEGY_TICKERS = [
  'MSFT', 'GOOGL', 'AMZN', 'META', // Level 1: AI & Cloud
  'NVDA', 'TSM', 'AMD', 'AVGO', 'ASML', // Level 2: Semiconductors
  'EQIX', 'DLR', 'VRT', 'SBGSY', // Level 3: Infrastructure
  'VST', 'CEG', 'NRG', 'NEE', // Level 4: Energy
  'CCJ', 'KAP.L', 'MP', 'FCX' // Level 5: Resources
];

export interface StockPerformance {
  symbol: string;
  currentPrice: number;
  changePercent: number;
  history: { date: Date; close: number }[];
}

export async function getStockData(symbol: string, range: 'YTD' | '1Y' | '2Y' | '3Y') {
  const end = new Date();
  let start = new Date();

  switch (range) {
    case 'YTD':
      start = new Date(new Date().getFullYear(), 0, 1);
      break;
    case '1Y':
      start.setFullYear(end.getFullYear() - 1);
      break;
    case '2Y':
      start.setFullYear(end.getFullYear() - 2);
      break;
    case '3Y':
      start.setFullYear(end.getFullYear() - 3);
      break;
  }

  try {
    const result = await yf.historical(symbol, {
      period1: start,
      period2: end,
      interval: '1d',
    }) as any[];

    const quote = await yf.quote(symbol) as any;

    if (!quote || !result) {
      console.error(`Empty data received for ${symbol}`);
      return null;
    }

    return {
      symbol,
      currentPrice: quote.regularMarketPrice || 0,
      changePercent: quote.regularMarketChangePercent || 0,
      history: result.map(d => ({ date: d.date, close: d.close })),
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
}

export async function getAggregatePerformance(range: 'YTD' | '1Y' | '2Y' | '3Y') {
  const promises = STRATEGY_TICKERS.map(ticker => getStockData(ticker, range));
  const results = await Promise.all(promises);
  const validResults = results.filter((r): r is StockPerformance => r !== null);

  if (validResults.length === 0) {
    return {
      tickers: [],
      history: [],
      currentValue: 100,
      startValue: 100,
      totalChange: 0
    };
  }

  // Normalize history data to index 100 starting at 'start'
  const aggregateMap: Map<string, number> = new Map();
  const dateCounts: Map<string, number> = new Map();

  validResults.forEach(stock => {
    if (stock.history.length === 0) return;
    const initialPrice = stock.history[0].close;
    
    stock.history.forEach(day => {
      const dateStr = day.date.toISOString().split('T')[0];
      const normalizedPrice = (day.close / initialPrice) * 100;
      
      aggregateMap.set(dateStr, (aggregateMap.get(dateStr) || 0) + normalizedPrice);
      dateCounts.set(dateStr, (dateCounts.get(dateStr) || 0) + 1);
    });
  });

  const aggregateHistory = Array.from(aggregateMap.entries())
    .map(([date, total]) => ({
      date,
      value: total / (dateCounts.get(date) || 1)
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    tickers: validResults.map(r => ({
      symbol: r.symbol,
      price: r.currentPrice,
      change: r.changePercent
    })),
    history: aggregateHistory,
    currentValue: aggregateHistory[aggregateHistory.length - 1]?.value || 100,
    startValue: 100,
    totalChange: ((aggregateHistory[aggregateHistory.length - 1]?.value || 100) - 100)
  };
}
