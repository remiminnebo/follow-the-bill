import YahooFinance from 'yahoo-finance2';

// Create a singleton instance for v3 with specific configuration to avoid rate limits
const yf = new (YahooFinance as any)({
  suppressNotices: ['yahooSurvey'],
  queue: {
    concurrency: 2, // Limit concurrent requests to avoid 429 "Too Many Requests"
    timeout: 10000
  }
});

// Setting a common User-Agent can help with Yahoo's crumb/rate-limiting issues
if ((yf as any)._env) {
  (yf as any)._env.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
}

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
    // Attempt to get historical data
    const result = await yf.historical(symbol, {
      period1: start,
      period2: end,
      interval: '1d',
    }) as any[];

    // Attempt to get current quote
    const quote = await yf.quote(symbol) as any;

    if (!quote || !result || result.length === 0) {
      console.warn(`No data for ${symbol} - Quote: ${!!quote}, History: ${result?.length || 0} points`);
      return null;
    }

    return {
      symbol,
      currentPrice: quote.regularMarketPrice || quote.price || 0,
      changePercent: quote.regularMarketChangePercent || quote.changePercent || 0,
      history: result.map(d => ({ date: d.date, close: d.close })),
    };
  } catch (error: any) {
    console.error(`Error fetching data for ${symbol}: ${error.message}`);
    return null;
  }
}

export async function getAggregatePerformance(range: 'YTD' | '1Y' | '2Y' | '3Y') {
  console.log(`Starting aggregate performance fetch for range: ${range}`);
  
  // Fetch data for all tickers
  const promises = STRATEGY_TICKERS.map(ticker => getStockData(ticker, range));
  const results = await Promise.all(promises);
  const validResults = results.filter((r): r is StockPerformance => r !== null);

  console.log(`Successfully fetched ${validResults.length}/${STRATEGY_TICKERS.length} tickers`);

  if (validResults.length === 0) {
    console.error("All ticker fetches failed. Returning default state.");
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

  const stocksWithHistory = validResults.filter(s => s.history && s.history.length > 0);
  
  if (stocksWithHistory.length === 0) {
    console.error("No stocks with history found.");
    return {
      tickers: validResults.map(r => ({
        symbol: r.symbol,
        price: r.currentPrice,
        change: r.changePercent
      })),
      history: [],
      currentValue: 100,
      startValue: 100,
      totalChange: 0
    };
  }

  stocksWithHistory.forEach(stock => {
    const initialPrice = stock.history[0].close;
    if (!initialPrice || initialPrice === 0) return;
    
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

  if (aggregateHistory.length === 0) {
    return {
      tickers: validResults.map(r => ({
        symbol: r.symbol,
        price: r.currentPrice,
        change: r.changePercent
      })),
      history: [],
      currentValue: 100,
      startValue: 100,
      totalChange: 0
    };
  }

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
